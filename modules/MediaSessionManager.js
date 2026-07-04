/**
 * MediaSessionManager — controls the OS-level media session notification.
 *
 * Provides: title, artist, album, artwork, playback controls, and
 * seek/progress support in the notification shade / lock screen.
 */
class MediaSessionManager {
  constructor(state, audioPlayer) {
    this.state = state;
    this.audioPlayer = audioPlayer;
    this.audio = audioPlayer.audio;
    this._isSupported = 'mediaSession' in navigator;
    if (!this._isSupported) {
      console.warn('[MediaSession] API not supported in this browser');
      return;
    }

    // Bound listeners for clean removal
    this._onPlay = () => this.updatePlaybackState();
    this._onPause = () => this.updatePlaybackState();
    this._onEnded = () => this.updatePlaybackState();
    this._onTimeUpdate = () => this._schedulePositionUpdate();
    this._onLoadedMetadata = () => this.updatePositionState();
    this._onRateChange = () => this.updatePositionState();

    this._positionUpdateScheduled = false;
    this._setupActionHandlers();
    this._attachAudioListeners();
  }

  // ==================== PUBLIC API ====================

  /**
   * Set full metadata for the currently playing song.
   * 
   * CRITICAL ORDER FOR ANDROID:
   *   1. Set playbackState FIRST (some Android builds require this)
   *   2. Then set metadata
   *   3. Then set position state
   * 
   * Provides multiple artwork sizes so the OS can pick the best one
   * for the notification shade, lock screen, smart watch, etc.
   */
  updateMetadata(songData) {
    if (!this._isSupported || !songData) {
      console.warn('[MediaSession] updateMetadata called with no songData');
      return;
    }

    const { title, artist, album } = songData;

    // Android's notification shade fetches artwork in its own OS process,
    // not the page's JS context — relative URLs won't reliably resolve there.
    const coverUrl = songData.coverUrl
      ? new URL(songData.coverUrl, window.location.origin).href
      : null;

    if (!title || !artist) {
      console.warn('[MediaSession] Missing title or artist in songData:', songData);
    }

    // STEP 1: Set playback state FIRST (required by some Android builds)
    this.updatePlaybackState();

    // STEP 2: Build artwork array with multiple sizes
    const artwork = this._buildArtwork(coverUrl);

    // STEP 3: Set metadata
    try {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: title || 'Unknown Title',
        artist: artist || 'Unknown Artist',
        album: album || '',
        artwork: artwork
      });
      console.log('[MediaSession] Metadata set:', title, '-', artist, artwork);
    } catch (err) {
      console.error('[MediaSession] Metadata with artwork failed, retrying without:', err);
      // Fallback: metadata without artwork (images might have CORS issues)
      try {
        navigator.mediaSession.metadata = new MediaMetadata({
          title: title || 'Unknown Title',
          artist: artist || 'Unknown Artist',
          album: album || ''
        });
        console.log('[MediaSession] Metadata set (no artwork):', title, '-', artist);
      } catch (err2) {
        console.error('[MediaSession] Complete metadata failure:', err2);
      }
    }

    // STEP 4: Position state
    this.updatePositionState();

    // STEP 5: Attempt to preload artwork so the OS can cache it.
    // This helps on Android where the SystemUI fetches artwork asynchronously.
    if (coverUrl) {
      this._preloadArtwork(coverUrl);
    }
  }

  /** Reset media session when playback stops or queue is empty */
  clearMetadata() {
    if (!this._isSupported) return;
    navigator.mediaSession.metadata = null;
    navigator.mediaSession.playbackState = 'none';
    if ('setPositionState' in navigator.mediaSession) {
      navigator.mediaSession.setPositionState({ duration: 0, playbackRate: 1, position: 0 });
    }
  }

  updatePlaybackState() {
    if (!this._isSupported) return;
    const isPlaying = this.state.isPlaying;
    navigator.mediaSession.playbackState = isPlaying ? 'playing' : 'paused';
  }

  updatePositionState() {
    if (!this._isSupported || !this.state.currentSong) return;
    if ('setPositionState' in navigator.mediaSession) {
      navigator.mediaSession.setPositionState({
        duration: this.state.duration || 0,
        playbackRate: this.audio.playbackRate || 1,
        position: this.audio.currentTime || 0
      });
    }
  }

  /** Remove all listeners and stop pending updates. Call when the player is destroyed. */
  destroy() {
    if (!this._isSupported) return;

    this.audio.removeEventListener('play', this._onPlay);
    this.audio.removeEventListener('pause', this._onPause);
    this.audio.removeEventListener('ended', this._onEnded);
    this.audio.removeEventListener('timeupdate', this._onTimeUpdate);
    this.audio.removeEventListener('loadedmetadata', this._onLoadedMetadata);
    this.audio.removeEventListener('ratechange', this._onRateChange);

    if (this._rafId) cancelAnimationFrame(this._rafId);

    this.clearMetadata();
  }

  // ==================== PRIVATE ====================

  /**
   * Build artwork array with multiple sizes for the OS media session.
   * Android's media framework picks the closest size for the notification.
   */
  _buildArtwork(coverUrl) {
    if (!coverUrl) return [];

    const type = this._detectMimeType(coverUrl);

    // Provide a range of standard sizes. The browser/OS will pick
    // the best fit for the notification shade / lock screen.
    return [
      { src: coverUrl, sizes: '96x96',   type },
      { src: coverUrl, sizes: '128x128', type },
      { src: coverUrl, sizes: '192x192', type },
      { src: coverUrl, sizes: '256x256', type },
      { src: coverUrl, sizes: '384x384', type },
      { src: coverUrl, sizes: '512x512', type }
    ];
  }

  /**
   * Preload artwork image so the OS media session can display it.
   * Android's SystemUI fetches artwork asynchronously, so preloading
   * helps ensure the image is ready when the notification is shown.
   */
  _preloadArtwork(url) {
    if (!url) return;
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => console.log('[MediaSession] Artwork preloaded:', url);
    img.onerror = () => console.warn('[MediaSession] Artwork failed to preload:', url);
    img.src = url;
  }

  /** Detect MIME type from URL extension */
  _detectMimeType(url) {
    if (!url) return 'image/png';
    const lower = url.toLowerCase();
    if (lower.endsWith('.jpg') || lower.endsWith('.jpeg')) return 'image/jpeg';
    if (lower.endsWith('.webp')) return 'image/webp';
    if (lower.endsWith('.gif')) return 'image/gif';
    if (lower.endsWith('.svg')) return 'image/svg+xml';
    return 'image/png'; // default fallback
  }

  _setupActionHandlers() {
    const ms = navigator.mediaSession;
    if (!ms) return;

    const safeHandler = (action, fn) => {
      try { ms.setActionHandler(action, fn); }
      catch (e) { console.warn('[MediaSession] Action not supported:', action); }
    };

    safeHandler('play',          () => this.audioPlayer.togglePlay?.());
    safeHandler('pause',         () => this.audioPlayer.togglePlay?.());
    safeHandler('previoustrack', () => this.audioPlayer.skipBack?.());
    safeHandler('nexttrack',     () => this.audioPlayer.skipForward?.());

    safeHandler('seekbackward', (details) => {
      const offset = details?.seekOffset || 10;
      this.audio.currentTime = Math.max(0, this.audio.currentTime - offset);
    });

    safeHandler('seekforward', (details) => {
      const offset = details?.seekOffset || 10;
      this.audio.currentTime = Math.min(this.state.duration, this.audio.currentTime + offset);
    });

    safeHandler('seekto', (details) => {
      if (details?.seekTime != null) {
        this.audio.currentTime = Math.min(this.state.duration, Math.max(0, details.seekTime));
      }
    });

    safeHandler('stop', () => {
      this.audio.pause();
      this.audio.currentTime = 0;
      this.state.isPlaying = false;
      this.clearMetadata();
    });
  }

  _attachAudioListeners() {
    this.audio.addEventListener('play', this._onPlay);
    this.audio.addEventListener('pause', this._onPause);
    this.audio.addEventListener('ended', this._onEnded);
    this.audio.addEventListener('timeupdate', this._onTimeUpdate);
    this.audio.addEventListener('loadedmetadata', this._onLoadedMetadata);
    this.audio.addEventListener('ratechange', this._onRateChange);
  }

  /** Throttled position state update using requestAnimationFrame */
  _schedulePositionUpdate() {
    if (this._positionUpdateScheduled) return;
    this._positionUpdateScheduled = true;
    this._rafId = requestAnimationFrame(() => {
      this._positionUpdateScheduled = false;
      this._rafId = null;
      this.updatePositionState();
    });
  }
}
