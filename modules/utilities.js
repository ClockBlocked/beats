/**
 * utilities.js — Consolidated helpers, colour extraction, and persistence.
 *
 * Contains:
 *   - CONFIG        — app-wide configuration constants
 *   - Utils         — general helper functions (slugify, clamp, shuffled, formatTime, id, newId)
 *   - IdUtils       — ID normalization, HSL conversion, sampling
 *   - ColorExtractor — album art colour extraction and theme application
 *   - PersistenceManager — localStorage save/restore of player state
 */

// ═══════════════ CONFIG ═══════════════
const CONFIG = {
  IMAGE_BASE: {
    artist: 'https://clockblocked.github.io/beats/content/artistPortraits/',
    album:  'https://clockblocked.github.io/beats/content/albumCovers/'
  },
  FAVOURITES: {
    favSongs:   'Songs',
    favArtists: 'Artists',
    favAlbums:  'Albums',
    playlists:  'Playlists'
  },
  LOADING: {
    minVisibleMs: 900,
    extraDelayMs: 500,
    settleMs:     400,
    fillMs:       350
  },
  QUEUE: {
    recentMax: 30
  },
  VOLUME: {
    default: 1.0
  }
};

// ═══════════════ Utils ═══════════════
const Utils = {
  slugify(name) {
    if (!name) return 'default';
    return name.replace(/[^a-zA-Z0-9]/g, '').toLowerCase().trim() || 'default';
  },
  clamp(val, min, max) {
    return Math.min(max, Math.max(min, val));
  },
  shuffled(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  },
  formatTime(s) {
    if (!s || !isFinite(s)) return '0:00';
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, '0')}`;
  },
  // Normalizes any incoming id (number/string/null) to a canonical string
  // key so every lookup map uses a single consistent key type.
  id(val) {
    return val == null ? '' : String(val);
  },
  // Generates a fresh, collision-resistant id for things the user creates
  // at runtime (e.g. playlists). NEVER derived from a name.
  newId(prefix = 'id') {
    if (typeof crypto !== 'undefined' && crypto.randomUUID) {
      return `${prefix}_${crypto.randomUUID()}`;
    }
    return `${prefix}_${Date.now()}_${Math.floor(Math.random() * 1e6)}`;
  }
};

// ═══════════════ IdUtils ═══════════════
class IdUtils {
  static normalize(v) { return v == null ? '' : String(v); }
  static hslToRgb(hslStr) {
    const m = hslStr.match(/hsl\((\d+),\s*(\d+)%,\s*(\d+)%\)/);
    if (!m) return { r: 255, g: 107, b: 107 };
    let h = parseInt(m[1]) / 360;
    let s = parseInt(m[2]) / 100;
    let l = parseInt(m[3]) / 100;
    let r, g, b;
    if (s === 0) {
      r = g = b = l;
    } else {
      const hue2rgb = (p, q, t) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1/6) return p + (q - p) * 6 * t;
        if (t < 1/2) return q;
        if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
        return p;
      };
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = hue2rgb(p, q, h + 1/3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1/3);
    }
    return { r: Math.round(r * 255), g: Math.round(g * 255), b: Math.round(b * 255) };
  }
  static sample(arr, n) {
    const copy = [...arr];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy.slice(0, n);
  }
}

// ═══════════════ ColorExtractor ═══════════════
class ColorExtractor {
  constructor(options = {}) {
    this.cache = new Map();
    this.defaultColors = {
      primary:   '#1a1a2e',
      secondary: '#16213e',
      accent:    '#e94560'
    };
    this.opts = {
      sampleRate:       10,
      skipThreshold:    30,
      whiteThreshold:   225,
      colorQuantize:    10,
      dominantColorCount: 3,
      ...options
    };
  }

  async extractColors(imageUrl) {
    if (!imageUrl) return { ...this.defaultColors };
    if (this.cache.has(imageUrl)) return this.cache.get(imageUrl);
    try {
      const img = await this._loadImage(imageUrl);
      const pixels = this._getPixels(img);
      const colors = this._dominantColors(pixels);
      this.cache.set(imageUrl, colors);
      return colors;
    } catch (err) {
      console.warn('[ColorExtractor] Extraction failed, using defaults.', err);
      return { ...this.defaultColors };
    }
  }

  applyThemeToPlayer(colors) {
    const root = document.documentElement;
    root.style.setProperty('--player-primary',   colors.primary);
    root.style.setProperty('--player-secondary', colors.secondary);
    root.style.setProperty('--player-accent',    colors.accent);
    const gradient = `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`;
    root.style.setProperty('--player-gradient', gradient);
    root.style.setProperty('--player-glow', `${colors.accent}40`);
    root.style.setProperty('--player-glow-strong', `${colors.accent}80`);
    root.style.setProperty('--player-tint', this._mixWithBlack(colors.primary, 0.65));
    root.style.setProperty('--theme-transition', 'background 0.6s ease, color 0.35s ease, box-shadow 0.5s ease, border-color 0.4s ease');
    window.dispatchEvent(new CustomEvent('themechange', { detail: { ...colors } }));
  }

  _loadImage(url) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'Anonymous';
      img.onload  = () => resolve(img);
      img.onerror = () => reject(new Error('Image load error'));
      img.src = url;
    });
  }

  _getPixels(img) {
    const canvas = document.createElement('canvas');
    const ctx    = canvas.getContext('2d', { willReadFrequently: true });
    const maxSize = 100;
    let { width, height } = img;
    if (width > height) { height = (height / width) * maxSize; width = maxSize; }
    else { width = (width / height) * maxSize; height = maxSize; }
    canvas.width  = Math.max(1, Math.floor(width));
    canvas.height = Math.max(1, Math.floor(height));
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    return ctx.getImageData(0, 0, canvas.width, canvas.height).data;
  }

  _dominantColors(pixelData) {
    const colorMap = new Map();
    for (let i = 0; i < pixelData.length; i += this.opts.sampleRate * 4) {
      const r = pixelData[i], g = pixelData[i + 1], b = pixelData[i + 2], a = pixelData[i + 3];
      if (a < 128) continue;
      const brightness = (r + g + b) / 3;
      if (brightness < this.opts.skipThreshold || brightness > this.opts.whiteThreshold) continue;
      const key = `${Math.floor(r / this.opts.colorQuantize)},${Math.floor(g / this.opts.colorQuantize)},${Math.floor(b / this.opts.colorQuantize)}`;
      colorMap.set(key, (colorMap.get(key) || 0) + 1);
    }
    const sorted = [...colorMap.entries()].sort((a, b) => b[1] - a[1]).slice(0, this.opts.dominantColorCount);
    const palette = sorted.map(([key]) => {
      const [r, g, b] = key.split(',').map(v => parseInt(v) * this.opts.colorQuantize);
      return { r, g, b };
    });
    return this._buildScheme(palette);
  }

  _buildScheme(palette) {
    if (!palette.length) return { ...this.defaultColors };
    const hslPalette = palette.map(c => this._rgbToHsl(c));
    const primary = { h: hslPalette[0].h, s: Math.min(hslPalette[0].s, 40), l: Math.max(hslPalette[0].l, 80) };
    const secondary = { h: hslPalette[0].h, s: Math.min(hslPalette[0].s, 30), l: Math.min(hslPalette[0].l, 70) };
    const vibrant = hslPalette.reduce((a, b) => (a.s > b.s ? a : b));
    const accent = { h: vibrant.h, s: Math.min(vibrant.s + 20, 100), l: Utils.clamp(vibrant.l, 45, 55) };
    return {
      primary:   `hsl(${primary.h}, ${primary.s}%, ${primary.l}%)`,
      secondary: `hsl(${secondary.h}, ${secondary.s}%, ${secondary.l}%)`,
      accent:    `hsl(${accent.h}, ${accent.s}%, ${accent.l}%)`
    };
  }

  _rgbToHsl({ r, g, b }) {
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;
    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
        case g: h = ((b - r) / d + 2) / 6; break;
        case b: h = ((r - g) / d + 4) / 6; break;
      }
    } else { h = s = 0; }
    return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
  }

  _mixWithBlack(color, ratio) {
    const match = color.match(/hsl\((\d+),\s*(\d+)%,\s*(\d+)%\)/);
    if (!match) return color;
    const [, h, s, l] = match.map(Number);
    return `hsl(${h}, ${s}%, ${Math.round(l * (1 - ratio))}%)`;
  }
}

// ═══════════════ PersistenceManager ═══════════════
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
