const CONFIG = {
  IMAGE_BASE: {
    artist: 'https://mybeats.xo.je/content/artistPortraits/',
    album:  'https://mybeats.xo.je/content/albumCovers/'
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
  id(val) {
    return val == null ? '' : String(val);
  }
};

class PlayerState {
  constructor() {
    this.enrichedLibrary = this.buildLibrary();

    // Page state – store IDs instead of names
    this.currentPage        = 'home';
    this.artistId           = null;       // numeric ID
    this.artistPageName     = null;       // only for display
    this.selectedAlbumId    = null;
    this.selectedAlbumName  = null;
    this.isSearchOpen       = false;
    this.searchQuery        = '';

    // Player state
    this.currentSong   = null;      // full song object with ID, artistId, albumId
    this.isPlaying     = false;
    this.currentTime   = 0;
    this.duration      = 0;
    this.queue         = [];        // array of song objects (each has IDs)
    this.queueIndex    = -1;
    this.recentlyPlayed = [];
    this.volume        = CONFIG.VOLUME.default;
    this.isMuted       = false;
    this.isShuffled    = false;
    this.repeatMode    = 'off';
    this.isDrawerOpen  = false;
    this.playbackRate  = 1;
    this.sleepTimerId  = null;
    this.isQueueOpen   = false;
    this.isLyricsOpen  = false;

    // Favourites & playlists – now store IDs
    this.favoriteSongs   = [];   // song IDs
    this.favoriteArtists = [];   // artist IDs
    this.favoriteAlbums  = [];   // album IDs
    this.playlists       = [];   // each playlist: { id, name, description, tags, songs: [songId, ...] }

    this.loadPersisted();

    this.loadingBarEl = document.getElementById('loading-bar');
    this.modalOverlay = document.getElementById('modal-overlay');
    this.modalEl      = document.getElementById('modal');
    this.toastEl      = document.getElementById('toast');

    this.loadingProgress = 0;
    this.loadingTimer    = null;
    this.loadingStart    = 0;
  }

  buildLibrary() {
    if (typeof metadata === 'undefined') {
      console.error('[PlayerState] Global `metadata` not found. Library is empty.');
      return [];
    }
    return metadata.map(artist => {
      const imageUrl = `${CONFIG.IMAGE_BASE.artist}${Utils.slugify(artist.artist)}.png`;
      return {
        ...artist,
        id: String(artist.id),   // ensure string for consistency
        imageUrl,
        albums: artist.albums.map(album => ({
          ...album,
          id: String(album.id),
          coverUrl: `${CONFIG.IMAGE_BASE.album}${Utils.slugify(album.album)}.png`
        }))
      };
    });
  }

  // ----- lookup helpers (all ID‑based) -----
  getArtistById(id) {
    const sid = Utils.id(id);
    return this.enrichedLibrary.find(a => Utils.id(a.id) === sid);
  }

  getAlbumById(id) {
    const sid = Utils.id(id);
    for (const artist of this.enrichedLibrary) {
      const album = artist.albums.find(a => Utils.id(a.id) === sid);
      if (album) return { ...album, artistId: artist.id, artistName: artist.artist };
    }
    return undefined;
  }

  getSongById(id) {
    const sid = Utils.id(id);
    for (const artist of this.enrichedLibrary) {
      for (const album of artist.albums) {
        for (const song of album.songs) {
          if (Utils.id(song.id) === sid) {
            return {
              ...song,
              artistId: artist.id,
              albumId: album.id,
              artist: artist.artist,
              album: album.album,
              coverUrl: album.coverUrl,
              artistImageUrl: artist.imageUrl
            };
          }
        }
      }
    }
    return undefined;
  }
  

  getArtistByIdOrName(identifier) {
    if (!identifier) return undefined;
    // Try as ID first
    const byId = this.getArtistById(identifier);
    if (byId) return byId;
    // Try as exact name match
    return this.enrichedLibrary.find(a => a.artist === identifier);
  }

  // ... rest of class unchanged ...



  // Get all songs with full metadata (including IDs)
  getAllSongs() {
    const all = [];
    for (const artist of this.enrichedLibrary) {
      for (const album of artist.albums) {
        for (const song of album.songs) {
          all.push({
            ...song,
            artistId: artist.id,
            albumId: album.id,
            artist: artist.artist,
            album: album.album,
            coverUrl: album.coverUrl,
            artistImageUrl: artist.imageUrl
          });
        }
      }
    }
    return all;
  }

  // ----- deprecated name‑based methods (kept for backward compatibility) -----
  findArtist(name) {
    return this.enrichedLibrary.find(a => a.artist === name);
  }
  findArtistById(id) { return this.getArtistById(id); }
  findAlbumById(artist, albumId) {
    if (!artist?.albums) return undefined;
    const sid = Utils.id(albumId);
    return artist.albums.find(a => Utils.id(a.id) === sid);
  }
  findSong(id) { return this.getSongById(id); }

  // ----- ID helpers for URL generation -----
  getArtistId(name) {
    const artist = this.findArtist(name);
    return artist?.id || Utils.slugify(name);
  }
  getAlbumId(artistName, albumName) {
    const artist = typeof artistName === 'object' ? artistName : this.findArtist(artistName);
    if (!artist?.albums) return Utils.slugify(albumName);
    const album = artist.albums.find(a => a.album === albumName);
    return album?.id || Utils.slugify(albumName);
  }
  getPlaylistId(name) {
    const pl = this.playlists.find(p => p.name === name);
    return pl?.id || Utils.slugify(name);
  }

  formatTime(s) { return Utils.formatTime(s); }

  // ----- Persistence (store IDs) -----
  loadPersisted() {
    this.favoriteSongs   = this.parseStore(CONFIG.FAVOURITES.favSongs, []);
    this.favoriteArtists = this.parseStore(CONFIG.FAVOURITES.favArtists, []);
    this.favoriteAlbums  = this.parseStore(CONFIG.FAVOURITES.favAlbums, []);

    this.playlists = this.parseStore(CONFIG.FAVOURITES.playlists, []).map(pl => ({
      id:          pl.id          || 'pl' + Date.now(),
      name:        pl.name        || 'Unnamed',
      description: pl.description || '',
      tags:        pl.tags        || [],
      songs:       pl.songs       || []   // now store song IDs
    }));
  }

  parseStore(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch {
      return fallback;
    }
  }

  persist() {
    localStorage.setItem(CONFIG.FAVOURITES.favSongs,   JSON.stringify(this.favoriteSongs));
    localStorage.setItem(CONFIG.FAVOURITES.favArtists, JSON.stringify(this.favoriteArtists));
    localStorage.setItem(CONFIG.FAVOURITES.favAlbums,  JSON.stringify(this.favoriteAlbums));
    localStorage.setItem(CONFIG.FAVOURITES.playlists,  JSON.stringify(this.playlists));
  }

  updatePlaylist(playlistId, updates) {
    const pl = this.playlists.find(p => p.id === playlistId);
    if (pl) Object.assign(pl, updates);
    this.persist();
  }

  // ----- UI helpers (toast, modal, loading bar) -----
  showToast(msg) {
    if (!this.toastEl) return;
    this.toastEl.textContent = msg;
    this.toastEl.classList.add('show');
    clearTimeout(this.toastTimer);
    this.toastTimer = setTimeout(() => this.toastEl.classList.remove('show'), 2500);
  }

  loadingBarStart(callback) {
    this.loadingStart = performance.now();
    this.loadingProgress = 0;
    clearInterval(this.loadingTimer);

    this.loadingBarEl?.classList.remove('hidden', 'complete');
    this.loadingBarEl?.classList.add('active');
    if (this.loadingBarEl) this.loadingBarEl.style.width = '2%';

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        this.loadingTimer = setInterval(() => {
          if (this.loadingProgress >= 90) return;
          const increment = (Math.random() * 5) + (this.loadingProgress < 25 ? 6 : 1.5);
          this.loadingProgress = Math.min(this.loadingProgress + increment, 90);
          if (this.loadingBarEl) this.loadingBarEl.style.width = this.loadingProgress + '%';
        }, 180);

        if (typeof callback === 'function') callback();
      });
    });
  }

  loadingBarComplete() {
    clearInterval(this.loadingTimer);
    const elapsed = performance.now() - this.loadingStart;
    const wait = Math.max(0, (CONFIG.LOADING.minVisibleMs - elapsed) + CONFIG.LOADING.extraDelayMs);

    setTimeout(() => {
      if (this.loadingBarEl) {
        this.loadingBarEl.style.width = '100%';
        this.loadingBarEl.classList.add('complete');
      }
      setTimeout(() => {
        this.loadingBarEl?.classList.add('hidden');
        setTimeout(() => {
          this.loadingBarEl?.classList.remove('active', 'complete');
          if (this.loadingBarEl) this.loadingBarEl.style.width = '0%';
          this.loadingProgress = 0;
        }, CONFIG.LOADING.settleMs);
      }, CONFIG.LOADING.fillMs);
    }, wait);
  }

  waitForProgress(target = 20) {
    return new Promise(resolve => {
      const check = () => {
        if (this.loadingProgress >= target) resolve();
        else requestAnimationFrame(check);
      };
      check();
    });
  }

  modalOpen(content) {
    if (!this.modalEl || !this.modalOverlay) return;
    this.modalEl.innerHTML = content;
    this.modalOverlay.classList.add('active');
    this.modalEl.classList.add('active');
  }

  modalClose() {
    this.modalOverlay?.classList.remove('active');
    this.modalEl?.classList.remove('active');
  }
}


// ----- AudioEngine (unchanged except for using song objects with IDs) -----
class AudioEngine {
  constructor(state) {
    this.state = state;
    this.audio = document.getElementById('global-audio');
    this.mediaSessionManager = null;
    if (!this.audio) {
      console.error('[AudioEngine] <audio id="global-audio"> not found in DOM.');
    }
    this.bindAudioEvents();
  }

  setMediaSessionManager(manager) {
    this.mediaSessionManager = manager;
  }

  bindAudioEvents() {
    if (!this.audio) return;
    this.audio.addEventListener('timeupdate', () => {
      this.state.currentTime = this.audio.currentTime;
      window.uiManager?.updateProgressOnly();
    });
    this.audio.addEventListener('loadedmetadata', () => {
      this.state.duration = this.audio.duration || 0;
      window.uiManager?.updateProgressOnly();
    });
    this.audio.addEventListener('ended', () => this.skipForward());
    this.audio.addEventListener('play', () => {
      this.state.isPlaying = true;
      this.notifyPlaybackChange();
    });
    this.audio.addEventListener('pause', () => {
      this.state.isPlaying = false;
      this.notifyPlaybackChange();
    });
    this.audio.addEventListener('error', (e) => {
      const err = e.target.error;
      console.error('[AudioEngine] Audio error! code:', err?.code, '| message:', err?.message, '| src:', this.audio.src);
      this.state.loadingBarComplete?.();
      this.skipForward();
    });
  }

  notifyPlaybackChange() {
    this.refreshQueueIfOpen();
    window.uiManager?.updateMiniPlayer();
    if (this.state.isDrawerOpen) window.uiManager?.updateFullPlayer();
  }

  refreshQueueIfOpen() {
    const queueModal = document.getElementById('queue-modal');
    if (queueModal?.classList.contains('open')) {
      window.uiManager?.renderQueueList();
    }
  }

  restorePlaybackState(song, queue, savedTime, wasPlaying) {
    console.log('[AudioEngine] restorePlaybackState:', song?.title, '| savedTime:', savedTime, '| wasPlaying:', wasPlaying);
    if (!song || !this.audio) {
      console.warn('[AudioEngine] restorePlaybackState aborted — missing song or audio element');
      return;
    }
    this.state.loadingBarStart();

    if (queue && queue.length) {
      this.state.queue = queue;
      const idx = queue.findIndex(s => s.id == song.id);
      this.state.queueIndex = idx >= 0 ? idx : 0;
    } else {
      this.state.queue = [song];
      this.state.queueIndex = 0;
    }

    this.state.currentSong = song;
    this.extractTheme(song.coverUrl);

    const srcNeedsChange = this.audio.src !== song.downloadPath;
    if (srcNeedsChange) {
      this.audio.src = song.downloadPath;
      this.audio.load();
    }
    this.audio.playbackRate = this.state.playbackRate;
    this.mediaSessionManager?.updateMetadata(song);

    const applyRestoredState = () => {
      const validTime = (savedTime > 0 && savedTime < (this.audio.duration || Infinity))
        ? savedTime
        : 0;
      this.audio.currentTime = validTime;
      this.state.currentTime = validTime;
      this.state.duration = this.audio.duration || 0;

      if (wasPlaying) {
        this.audio.play()
          .then(() => {
            this.state.isPlaying = true;
            this.mediaSessionManager?.updateMetadata(song);
          })
          .catch(err => {
            console.warn('[AudioEngine] Auto-play blocked on restore:', err);
            this.state.isPlaying = false;
          })
          .finally(() => {
            this.state.loadingBarComplete();
            this.notifyPlaybackChange();
          });
      } else {
        this.state.isPlaying = false;
        this.state.loadingBarComplete();
        this.notifyPlaybackChange();
      }
    };

    if (this.audio.readyState >= HTMLMediaElement.HAVE_METADATA) {
      applyRestoredState();
    } else {
      const onMetadata = () => {
        this.audio.removeEventListener('loadedmetadata', onMetadata);
        applyRestoredState();
      };
      this.audio.addEventListener('loadedmetadata', onMetadata, { once: true });
      setTimeout(() => {
        this.audio.removeEventListener('loadedmetadata', onMetadata);
        this.state.loadingBarComplete();
        this.notifyPlaybackChange();
      }, 8000);
    }
  }

  playSong(song, newQueue = null, startFromBeginning = false) {
    if (!song) {
      console.warn('[AudioEngine] playSong called with no song');
      return;
    }
    console.log('[AudioEngine] playSong called:', song.title || 'unknown', '| id:', song.id, '| src:', song.downloadPath, '| startFromBeginning:', startFromBeginning);

    if (startFromBeginning || this.audio.src !== song.downloadPath) {
      this.audio.currentTime = 0;
      this.state.currentTime = 0;
    }

    this.preparePlayback(song, newQueue);
    const playPromise = this.audio.play();
    if (playPromise) {
      playPromise
        .then(() => { console.log('[AudioEngine] audio.play() resolved'); this.handlePlaySuccess(); })
        .catch(err => { console.warn('[AudioEngine] audio.play() rejected:', err.name, err.message); this.handlePlayFailure(err); });
    } else {
      console.log('[AudioEngine] audio.play() returned no promise (legacy browser)');
      this.handlePlaySuccess();
    }
  }

  preparePlayback(song, newQueue) {
    console.log('[AudioEngine] preparePlayback:', song.title || 'unknown', '| downloadPath:', song.downloadPath);
    this.state.loadingBarStart();
    this.resolveQueueForSong(song, newQueue);
    this.extractTheme(song.coverUrl);
    this.state.currentSong = song;

    if (this.audio.src !== song.downloadPath) {
      console.log('[AudioEngine] Setting audio.src to:', song.downloadPath);
      this.audio.src = song.downloadPath;
      this.audio.load();
    }
    this.audio.playbackRate = this.state.playbackRate;
  }

  resolveQueueForSong(song, newQueue) {
    if (newQueue) {
      this.state.queue = newQueue;
      this.state.queueIndex = this.state.queue.findIndex(s => s.id == song.id);
    } else if (!this.state.queue.length) {
      this.state.queue = [song];
      this.state.queueIndex = 0;
    } else {
      const existingIdx = this.state.queue.findIndex(s => s.id == song.id);
      if (existingIdx >= 0) {
        this.state.queueIndex = existingIdx;
      } else {
        this.state.queue = [song];
        this.state.queueIndex = 0;
      }
    }
  }

  extractTheme(coverUrl) {
    if (window.colorExtractor && coverUrl) {
      window.colorExtractor.extractColors(coverUrl)
        .then(colors => window.colorExtractor.applyThemeToPlayer(colors))
        .catch(() => {});
    }
  }

  handlePlaySuccess() {
    this.state.isPlaying = true;
    this.state.loadingBarComplete();
    this.mediaSessionManager?.updateMetadata(this.state.currentSong);
    this.notifyPlaybackChange();
    this.bumpRecentlyPlayed(this.state.currentSong);
  }

  handlePlayFailure(err) {
    console.warn('[AudioEngine] Playback failed:', err);
    this.state.isPlaying = false;
    this.state.loadingBarComplete();
    this.notifyPlaybackChange();
  }

  bumpRecentlyPlayed(song) {
    this.state.recentlyPlayed = [
      song,
      ...this.state.recentlyPlayed.filter(s => s.id !== song.id)
    ].slice(0, CONFIG.QUEUE.recentMax);
  }

  togglePlay() {
    if (!this.state.currentSong) {
      console.warn('[AudioEngine] togglePlay: no current song');
      return;
    }
    if (this.state.isPlaying) {
      console.log('[AudioEngine] Pausing');
      this.audio.pause();
      this.state.isPlaying = false;
    } else {
      console.log('[AudioEngine] Resuming, src =', this.audio.src);
      this.audio.play()
        .then(() => {
          console.log('[AudioEngine] Resume successful');
          this.state.isPlaying = true;
          this.mediaSessionManager?.updateMetadata(this.state.currentSong);
        })
        .catch(err => console.warn('[AudioEngine] Resume failed:', err.name, err.message));
    }
    this.notifyPlaybackChange();
  }

  skipForward() {
    console.log('[AudioEngine] skipForward, queueIndex:', this.state.queueIndex, 'queueLength:', this.state.queue.length);
    if (!this.state.queue.length) return;
    if (this.state.repeatMode === 'one') {
      this.audio.currentTime = 0;
      this.audio.play();
      return;
    }
    let nextIdx = this.state.queueIndex + 1;
    if (nextIdx >= this.state.queue.length) {
      if (this.state.repeatMode === 'all') {
        nextIdx = 0;
      } else {
        this.state.isPlaying = false;
        this.notifyPlaybackChange();
        return;
      }
    }
    this.state.queueIndex = nextIdx;
    this.playSong(this.state.queue[this.state.queueIndex], this.state.queue);
  }

  skipBack() {
    console.log('[AudioEngine] skipBack');
    if (!this.state.queue.length) return;
    if (this.audio.currentTime > 3) {
      this.audio.currentTime = 0;
      return;
    }
    let prevIdx = this.state.queueIndex - 1;
    if (prevIdx < 0) {
      if (this.state.repeatMode === 'all') {
        prevIdx = this.state.queue.length - 1;
      } else {
        return;
      }
    }
    this.state.queueIndex = prevIdx;
    this.playSong(this.state.queue[this.state.queueIndex], this.state.queue);
  }

  setVolume(val) {
    this.state.volume = Utils.clamp(val, 0, 1);
    this.audio.volume = this.state.isMuted ? 0 : this.state.volume;
  }

  toggleMute() {
    this.state.isMuted = !this.state.isMuted;
    this.audio.volume = this.state.isMuted ? 0 : this.state.volume;
    if (this.state.isDrawerOpen) window.uiManager?.updateFullPlayer();
  }

  toggleShuffle() {
    this.state.isShuffled = !this.state.isShuffled;
    if (this.state.isShuffled && this.state.queue.length > 1) {
      const currentSong = this.state.queue[this.state.queueIndex];
      const others = this.state.queue.filter((_, i) => i !== this.state.queueIndex);
      this.state.queue = [currentSong, ...Utils.shuffled(others)];
      this.state.queueIndex = 0;
    }
    if (this.state.isDrawerOpen) window.uiManager?.updateFullPlayer();
  }

  cycleRepeat() {
    const modes = ['off', 'all', 'one'];
    const idx = modes.indexOf(this.state.repeatMode);
    this.state.repeatMode = modes[(idx + 1) % modes.length];
    if (this.state.isDrawerOpen) window.uiManager?.updateFullPlayer();
  }
}