

class State {
  constructor() {
    // ==================== DATA ENRICHMENT ====================
    this.IMAGE_BASE_URLS = {
      artist: '/content/artistPortraits/',
      album: '/content/albumCovers/'
    };
    
    this.enrichedLibrary = this.buildEnrichedLibrary();

    // ==================== PAGE STATE ====================
    this.currentPage = 'home';
    this.artistPageName = null;
    this.selectedAlbumName = null;
    this.isSearchOpen = false;
    this.searchQuery = '';

    // ==================== PLAYER STATE ====================
    this.currentSong = null;
    this.isPlaying = false;
    this.currentTime = 0;
    this.duration = 0;
    this.queue = [];
    this.queueIndex = -1;
    this.recentlyPlayed = [];
    this.volume = 0.7;
    this.isMuted = false;
    this.isShuffled = false;
    this.repeatMode = 'off';
    this.isDrawerOpen = false;
    this.playbackRate = 1;
    this.sleepTimerId = null;
    this.isQueueOpen = false;
    this.isLyricsOpen = false;

    // ==================== FAVORITES & PLAYLISTS (LOCALSTORAGE) ====================
    this.favoriteSongs = JSON.parse(localStorage.getItem('mybeats_fav_songs')) || [];
    this.favoriteArtists = JSON.parse(localStorage.getItem('mybeats_fav_artists')) || [];
    this.favoriteAlbums = JSON.parse(localStorage.getItem('mybeats_fav_albums')) || [];

    this.playlists = JSON.parse(localStorage.getItem('mybeats_playlists')) || [];
    this.playlists = this.playlists.map(pl => ({
      id: pl.id || 'pl' + Date.now(),
      name: pl.name || 'Unnamed',
      description: pl.description || '',
      tags: pl.tags || [],
      songs: pl.songs || []
    }));

    // ==================== UI ELEMENTS ====================
    this.loadingBarEl = document.getElementById('loading-bar');
    this.modalOverlay = document.getElementById('modal-overlay');
    this.modalEl = document.getElementById('modal');
    this.toastEl = document.getElementById('toast');
  }

  // ==================== IMAGE HELPER ====================
  getImageFilename(name) {
    if (!name) return 'default';
    return name.replace(/[^a-zA-Z0-9]/g, '').toLowerCase().trim() || 'default';
  }

  updatePlaylist(playlistId, updates) {
    const pl = this.playlists.find(p => p.id === playlistId);
    if (pl) Object.assign(pl, updates);
    this.persist();
  }

  // ==================== LIBRARY BUILDING ====================
buildEnrichedLibrary() {
  return metadata.map(artist => {
    const enrichedArtist = {
      ...artist,
      imageUrl: `${this.IMAGE_BASE_URLS.artist}${this.getImageFilename(artist.artist)}.png`
    };
    
    enrichedArtist.albums = artist.albums.map(album => ({
      ...album,
      coverUrl: `${this.IMAGE_BASE_URLS.album}${this.getImageFilename(album.album)}.png`
    }));

// Safe ID generation
if (enrichedArtist.artist && typeof enrichedArtist.artist === 'string') {
  enrichedArtist.id = enrichedArtist.id || 
    `artist-${enrichedArtist.artist.replace(/\s/g, '_').toLowerCase()}`;
} else {
  enrichedArtist.id = enrichedArtist.id || 'artist-unknown';
}

if (Array.isArray(enrichedArtist.albums)) {
  enrichedArtist.albums.forEach(alb => {
    if (alb.album && typeof alb.album === 'string') {
      alb.id = alb.id || 
        `album-${enrichedArtist.id}-${alb.album.replace(/\s/g, '_').toLowerCase()}`;
    } else {
      alb.id = alb.id || 'album-unknown';
    }
  });
}


    return enrichedArtist;
  });
}
  // ==================== DATA ACCESS HELPERS ====================
  getAllSongs() {
    const all = [];
    this.enrichedLibrary.forEach(artist => {
      artist.albums.forEach(album => {
        album.songs.forEach(song => {
          all.push({
            ...song,
            artist: artist.artist,
            album: album.album,
            coverUrl: album.coverUrl,
            artistImageUrl: artist.imageUrl
          });
        });
      });
    });
    return all;
  }

  findArtist(name) {
    return this.enrichedLibrary.find(a => a.artist === name);
  }

  findSong(id) {
    return this.getAllSongs().find(s => s.id == id);
  }

  formatTime(s) {
    if (!s || isNaN(s)) return '0:00';
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, '0')}`;
  }

  // ==================== UI NOTIFICATIONS ====================
  showToast(msg) {
    this.toastEl.textContent = msg;
    this.toastEl.classList.add('show');
    setTimeout(() => this.toastEl.classList.remove('show'), 2500);
  }

  persist() {
    localStorage.setItem('mybeats_fav_songs', JSON.stringify(this.favoriteSongs));
    localStorage.setItem('mybeats_fav_artists', JSON.stringify(this.favoriteArtists));
    localStorage.setItem('mybeats_fav_albums', JSON.stringify(this.favoriteAlbums));
    localStorage.setItem('mybeats_playlists', JSON.stringify(this.playlists));
  }

  // ==================== LOADING BAR ====================
  loadingBarStart(callback) {
    this.loadingStartTime = performance.now();
    this.loadingProgress = 0;

    clearInterval(this.loadingTimer);
    this.loadingBarEl.classList.remove('hidden', 'complete');
    this.loadingBarEl.classList.add('active');
    this.loadingBarEl.style.width = '2%';

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        this.loadingTimer = setInterval(() => {
          if (this.loadingProgress >= 90) return;

          const increment = (Math.random() * 5) + (this.loadingProgress < 25 ? 6 : 1.5);
          this.loadingProgress = Math.min(this.loadingProgress + increment, 90);
          this.loadingBarEl.style.width = this.loadingProgress + '%';
        }, 180);

        if (typeof callback === "function") callback();
      });
    });
  }

  loadingBarComplete() {
    clearInterval(this.loadingTimer);

    const elapsed = performance.now() - this.loadingStartTime;
    const minimumVisible = 900;
    const extraDelay = 500;
    const wait = Math.max(0, (minimumVisible - elapsed) + extraDelay);

    setTimeout(() => {
      this.loadingBarEl.style.width = "100%";
      this.loadingBarEl.classList.add("complete");

      setTimeout(() => {
        this.loadingBarEl.classList.add("hidden");

        setTimeout(() => {
          this.loadingBarEl.classList.remove("active", "complete");
          this.loadingBarEl.style.width = "0%";
        }, 400);
      }, 350);
    }, wait);
  }

  waitForProgress(target = 20) {
    return new Promise(resolve => {
      const check = () => {
        if (this.loadingProgress >= target) {
          resolve();
        } else {
          requestAnimationFrame(check);
        }
      };
      check();
    });
  }

  // ==================== MODAL SYSTEM ====================
  modalOpen(content) {
    this.modalEl.innerHTML = content;
    this.modalOverlay.classList.add('active');
    this.modalEl.classList.add('active');
  }

  modalClose() {
    this.modalOverlay.classList.remove('active');
    this.modalEl.classList.remove('active');
  }
}
