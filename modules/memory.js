/**
 * persistence.js — restores playback state on page load, saves on changes.
 *
 * KEY BEHAVIOUR (Issue #2 fix):
 *   When the page is refreshed, the last-played song is loaded at the
 *   exact saved timestamp but remains PAUSED.  The mini-player and
 *   full-player progress bars both reflect the correct saved position.
 *   If the song was actively playing before the refresh, playback
 *   resumes automatically.
 */

(function() {
  'use strict';

  const STORAGE_KEYS = {
    LAST_SONG:        'mybeats_last_song',
    QUEUE:            'mybeats_queue',
    QUEUE_INDEX:      'mybeats_queue_index',
    CURRENT_TIME:     'mybeats_current_time',
    IS_PLAYING:       'mybeats_is_playing',
    VOLUME:           'mybeats_volume',
    MUTED:            'mybeats_muted',
    PLAYBACK_RATE:    'mybeats_playback_rate',
    REPEAT_MODE:      'mybeats_repeat_mode',
    SHUFFLED:         'mybeats_shuffled',
    RECENTLY_PLAYED:  'mybeats_recently_played'
  };

  class PersistenceManager {
    constructor(state, audioPlayer) {
      this.state = state;
      this.audioPlayer = audioPlayer;
      this.saveThrottle = null;
      this.lastSavedTime = 0;
      this._restored = false;

      // Restore immediately when state is ready
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => this.restoreState());
      } else {
        // Defer slightly so the rest of the app bootstraps first
        setTimeout(() => this.restoreState(), 50);
      }

      this.bindSaveEvents();
    }

    /* ================================================================
       RESTORE STATE — called once on page load
       ================================================================ */
    restoreState() {
      if (this._restored) return;
      this._restored = true;

      try {
        // 1. Volume & mute
        const vol = localStorage.getItem(STORAGE_KEYS.VOLUME);
        if (vol !== null) {
          this.state.volume = parseFloat(vol);
          this.audioPlayer.setVolume(this.state.volume);
        }
        const muted = localStorage.getItem(STORAGE_KEYS.MUTED);
        if (muted !== null) {
          this.state.isMuted = muted === 'true';
          if (this.state.isMuted) this.audioPlayer.audio.volume = 0;
          else this.audioPlayer.audio.volume = this.state.volume;
        }

        // 2. Playback rate
        const rate = localStorage.getItem(STORAGE_KEYS.PLAYBACK_RATE);
        if (rate !== null) {
          this.state.playbackRate = parseFloat(rate);
          this.audioPlayer.audio.playbackRate = this.state.playbackRate;
        }

        // 3. Repeat & shuffle
        const repeat = localStorage.getItem(STORAGE_KEYS.REPEAT_MODE);
        if (repeat !== null) this.state.repeatMode = repeat;
        const shuffled = localStorage.getItem(STORAGE_KEYS.SHUFFLED);
        if (shuffled !== null) this.state.isShuffled = shuffled === 'true';

        // 4. Queue, current song & playback position
        const savedQueue = localStorage.getItem(STORAGE_KEYS.QUEUE);
        const savedIdx   = localStorage.getItem(STORAGE_KEYS.QUEUE_INDEX);
        const lastSong   = localStorage.getItem(STORAGE_KEYS.LAST_SONG);

        if (savedQueue && savedIdx !== null && lastSong) {
          const queue = JSON.parse(savedQueue);
          const song  = JSON.parse(lastSong);
          const idx   = parseInt(savedIdx, 10);

          if (queue.length && idx >= 0 && idx < queue.length && song.id == queue[idx]?.id) {
            this.state.queue = queue;
            this.state.queueIndex = idx;
            this.state.currentSong = song;

            const savedTime   = parseFloat(localStorage.getItem(STORAGE_KEYS.CURRENT_TIME) || '0');
            const wasPlaying  = localStorage.getItem(STORAGE_KEYS.IS_PLAYING) === 'true';

            // Use the dedicated restore method — loads audio at saved time,
            // stays paused unless wasPlaying is true
            this.audioPlayer.restorePlaybackState(song, queue, savedTime, wasPlaying);
          }
        }

        // 5. Recently played
        const recent = localStorage.getItem(STORAGE_KEYS.RECENTLY_PLAYED);
        if (recent) {
          try { this.state.recentlyPlayed = JSON.parse(recent); } catch(e) {}
        }

        // 6. Update UI
        if (window.uiManager) {
          if (this.state.isDrawerOpen) {
            window.uiManager.updateFullPlayer();
          }
          window.uiManager.updateMiniPlayer();
        }

      } catch (e) {
        console.warn('[Persistence] Restore error:', e);
      }
    }

    /* ================================================================
       SAVE EVENT BINDINGS
       ================================================================ */
    bindSaveEvents() {
      const audio = this.audioPlayer.audio;

      // Save on play/pause
      audio.addEventListener('play', () => this.saveState());
      audio.addEventListener('pause', () => this.saveState());

      // Save current time (throttled to every 2 seconds)
      audio.addEventListener('timeupdate', () => {
        const now = Date.now();
        if (now - this.lastSavedTime > 2000) {
          this.lastSavedTime = now;
          this.saveCurrentTime();
        }
      });

      // Save before page unload
      window.addEventListener('beforeunload', () => this.saveState(true));

      // Also save on visibility change (user switches tabs)
      document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'hidden') {
          this.saveState(true);
        }
      });

      // Wrap key methods to save on changes
      this.wrapMethod('playSong', () => this.saveState());
      this.wrapMethod('skipForward', () => this.saveState());
      this.wrapMethod('skipBack', () => this.saveState());
      this.wrapMethod('setVolume', () => this.saveVolume());
      this.wrapMethod('toggleMute', () => this.saveVolume());
      this.wrapMethod('cycleRepeat', () => this.saveMode());
      this.wrapMethod('toggleShuffle', () => this.saveMode());
    }

    wrapMethod(methodName, afterHook) {
      const original = this.audioPlayer[methodName];
      if (typeof original !== 'function') return;
      this.audioPlayer[methodName] = function(...args) {
        const result = original.apply(this, args);
        afterHook();
        return result;
      };
    }

    /* ================================================================
       SAVE METHODS
       ================================================================ */
    saveState(immediate = false) {
      if (!this.state.currentSong) return;

      const doSave = () => {
        try {
          localStorage.setItem(STORAGE_KEYS.LAST_SONG, JSON.stringify(this.state.currentSong));
          localStorage.setItem(STORAGE_KEYS.QUEUE, JSON.stringify(this.state.queue));
          localStorage.setItem(STORAGE_KEYS.QUEUE_INDEX, this.state.queueIndex.toString());
          localStorage.setItem(STORAGE_KEYS.IS_PLAYING, this.state.isPlaying.toString());
          localStorage.setItem(STORAGE_KEYS.RECENTLY_PLAYED, JSON.stringify(this.state.recentlyPlayed));
          this.saveCurrentTime();
          this.saveVolume();
          this.saveMode();
        } catch (e) {
          console.warn('[Persistence] Save failed:', e);
        }
      };

      if (immediate) {
        doSave();
      } else {
        clearTimeout(this.saveThrottle);
        this.saveThrottle = setTimeout(doSave, 200);
      }
    }

    saveCurrentTime() {
      if (this.audioPlayer.audio) {
        localStorage.setItem(STORAGE_KEYS.CURRENT_TIME, this.audioPlayer.audio.currentTime.toString());
      }
    }

    saveVolume() {
      localStorage.setItem(STORAGE_KEYS.VOLUME, this.state.volume.toString());
      localStorage.setItem(STORAGE_KEYS.MUTED, this.state.isMuted.toString());
      localStorage.setItem(STORAGE_KEYS.PLAYBACK_RATE, this.state.playbackRate.toString());
    }

    saveMode() {
      localStorage.setItem(STORAGE_KEYS.REPEAT_MODE, this.state.repeatMode);
      localStorage.setItem(STORAGE_KEYS.SHUFFLED, this.state.isShuffled.toString());
    }
  }

  // Hook into the existing global objects after they are created
  function initPersistence() {
    if (window.state && window.audioPlayer && !window._persistence) {
      window._persistence = new PersistenceManager(window.state, window.audioPlayer);
    } else {
      setTimeout(initPersistence, 50);
    }
  }
  initPersistence();
})();
