class UIManager {
  constructor(state, audioPlayer, favorites) {
    this.state = state;
    this.audioPlayer = audioPlayer;
    this.favorites = favorites;
    this.isTransitioning = false;
    this.isBreadcrumbHidden = false;
    this.state.favoritesTab = 'songs';
    this.state.selectedPlaylistName = null;
    this.state.isCreatingPlaylist = false;
    this.skipProgress = false;
    this.fragmentLoadDelay = 1500;
    this.popoverDelay = 400;
    this._spinner = null;
    this._favTabLoading = false;
    this._artistTabLoading = false;

    this.router = new Router(this);
    this.player = new PlayerManager(this);
    this.search = new SearchManager(this);
    this.contentEvents = new ContentEventManager(this);

    this.homePage      = new Home(this);
    this.libraryPage   = new Library(this);
    this.favoritesPage = new Favorites(this);
    this.playlistsPage = new Playlists(this);
    this.artistPage    = new Artists(this);
    this.errorPage     = new Error404(this);

    this.init();
    window.NProgress?.configure({ showSpinner: true, speed: 300, trickleSpeed: 600 });
  }

  _ensureSpinner() {
    const main = document.getElementById('main-content');
    if (!main) return null;
    if (!this._spinner || !this._spinner.el || !main.contains(this._spinner.el)) {
      this._spinner?.remove?.();
      this._spinner = new Spinner({ type: 'area', container: main });
    }
    return this._spinner;
  }

  showSpinner() {
    this._ensureSpinner()?.show();
  }

  hideSpinner() {
    this._spinner?.hide();
  }

  init() {
    this.render = this.render.bind(this);
    this.navigate = this.navigate.bind(this);
    this.handlePopState = this.handlePopState.bind(this);
    AppListeners.bindAll(this);
    this.router.syncWithURL();
    window.addEventListener('popstate', this.handlePopState);
  }

  navigate(page, artistId = null, albumId = null) {
    if (!this.skipProgress && window.NProgress) NProgress.start();
    this.skipProgress = false;
    this.router.goToPage(page, artistId, albumId);
  }

  handlePopState() { this.router.handlePopState(); }

  likeStatus(type, isFavorite, isHovered, tempState) {
    if (isHovered)          return isFavorite ? Icons.hearts.likedRemove() : Icons.hearts.likedHover();
    if (tempState === 'check')       return Icons.hearts.likedConfirmation();
    if (tempState === 'exclamation') return Icons.hearts.likedError();
    return isFavorite ? Icons.hearts.liked() : Icons.hearts.notLiked();
  }

  artistNameTooltip(artistId, displayText = null) {
    const artist = this.state.getArtistById(artistId);
    if (!artist) return displayText || 'Unknown';
    const name = artist.artist;
    const text = displayText || name;
    return `

    <div class="tooltip-wrapper" tabindex="0" role="button">
      <span class="text">${text}
        <span
           class="popup"
           role="tooltip"
           onclick="event.stopPropagation(); window.uiManager.navigate('artist', '${artistId}')">
          View Artist
        </span>
      </span>
    </div>

    `;
  }

  scrollSection(title, cards) {
    return `<section data-area="scroll" class="section"><h2 class="section-header">${title}</h2><div class="scroll-row">${cards.join('')}</div></section>`;
  }

  albumCard(artistId, artistName, albumId, albumName, coverUrl, index = 0, size = '150px') {
    return `
      <div data-card="album" class="card animate-fadeInUp" style="--w: ${size}; --d: ${index * 50}ms">
        <div class="wrap" data-artist-id="${artistId}" data-album-id="${albumId}">
          <img src="${coverUrl}">
          <div class="overlay"
               data-play-album='${JSON.stringify({ artistId, albumId })}'>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="white"><polygon points="5,3 19,12 5,21"/></svg>
          </div>
        </div>
        <p class="title">${albumName}</p>
        <p class="sub">${artistName}</p>
      </div>
    `;
  }

  artistCard(artist, index = 0) {
    return `
      <button data-card="artist" data-dynamic="true" class="animate-fadeInUp"
              style="--d: ${index * 60}ms" data-artist-id="${artist.id}">
        <img src="${artist.imageUrl}">
        <p class="name">${artist.artist}</p>
        <p class="sub">${artist.genre || 'Artist'}</p>
      </button>
    `;
  }

  recentCard(song, index = 0) {
    return `
      <div data-card="recent" class="card animate-fadeInUp" style="--w: 140px; --d: ${index * 50}ms">
        <div class="wrap" data-song-id="${song.id}">
          <img src="${song.coverUrl}">
          <div class="overlay">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="white"><polygon points="5,3 19,12 5,21"/></svg>
          </div>
        </div>
        <p class="title">${song.title}</p>
        <p class="sub">${song.artist}</p>
      </div>
    `;
  }

  songRow(song, index, showDuration = true) {
    const artistId = song.artistId;
    const albumId  = song.albumId;
    return `
      <div class="song-row animate-fadeInUp" style="--d: ${index * 25}ms">
        <button class="main" data-song-id="${song.id}">
          <img src="${song.coverUrl}" class="cover">
          <div class="info">
            <p class="title">${song.title}</p>
            <p class="sub">
              ${this.artistNameTooltip(artistId)}
              •
              <span class="album-link" data-artist-id="${artistId}" data-album-id="${albumId}" onclick="event.stopPropagation(); window.uiManager.navigate('artist', '${artistId}', '${albumId}')">${song.album}</span>
            </p>
          </div>
        </button>
        <button class="downloadBtn" data-action="download-song" data-song-id="${song.id}" data-song-title="${song.title}" data-song-thumbnail="${song.coverUrl}" title="Download">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
            <polyline points="7 10 12 15 17 10"/>
            <line x1="12" y1="15" x2="12" y2="3"/>
          </svg>
        </button>
        ${showDuration ? `<span class="time">${song.duration}</span>` : ''}
        <button class="heart ${this.favorites.isSongFavorite(song.id) ? 'favorited' : ''}" data-fav-song="${song.id}">
          ${this.likeStatus('song', this.favorites.isSongFavorite(song.id), false, null)}
        </button>
      </div>
    `;
  }

  render() {
    this.main = document.getElementById('main-content');
    this.scrollToTop();
    if (this.isTransitioning) {
      if (this.transitionStart && (Date.now() - this.transitionStart > 2000)) {
        console.warn('[UIManager] Transition timeout — forcing reset');
        this.isTransitioning = false;
      } else {
        return;
      }
    }
    this.isTransitioning = true;
    this.transitionStart = Date.now();
    Object.assign(this.main.style, {
      transition: 'opacity 0.3s ease, transform 0.3s ease',
      opacity: '0',
      transform: 'translateY(10px)',
    });
    this.routes();
    this.player.renderMiniPlayer();
  }

  routes() {
    const pageMap = {
      home:      () => this.homePage.render(),
      library:   () => this.libraryPage.render(),
      favorites: () => this.favoritesPage.render(),
      playlists: () => this.playlistsPage.render(),
      artist:    () => this.artistPage.render(),
      '404':     () => this.errorPage.render(),
    };
    setTimeout(() => {
      try {
        this.main.innerHTML = (pageMap[this.state.currentPage] ?? (() => '<div>Not found</div>'))();
        this._ensureSpinner();
        Object.assign(this.main.style, { opacity: '1', transform: 'translateY(0)' });
        setTimeout(() => { this.main.style.transition = ''; this.isTransitioning = false; }, 300);
        this.contentEvents.attachContentEvents();
        if (window.NProgress && NProgress.status !== null) NProgress.done();
        this._maybeAutoPlayDeepLink();
      } catch (err) {
        console.error('[UIManager] Page render error:', err);
        this.isTransitioning = false;
        if (window.NProgress && NProgress.status !== null) NProgress.done();
      }
    }, 300);
  }

  _maybeAutoPlayDeepLink() {
    const songId = this.state.pendingDeepLinkSong;
    if (!songId) return;
    this.state.pendingDeepLinkSong = null;
    const url = new URL(window.location.href);
    url.searchParams.delete('song');
    history.replaceState(null, '', url.pathname + (url.search ? url.search : '') + url.hash);
    if (this.state.currentPage !== 'artist') return;
    const song = this.state.getSongById(songId);
    if (!song) return;
    const queue = Utils.buildAlbumQueue(this.state, song.artistId, song.albumId);
    const startSong = queue.find(s => Utils.id(s.id) === Utils.id(songId)) || song;
    this.audioPlayer.playSong(startSong, queue.length ? queue : null, true, 'album');
  }

toggleTheme() {
  const html = document.documentElement;
  const currentTheme = html.getAttribute('data-theme') || 'light';
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

  html.setAttribute('data-theme', newTheme);

  localStorage.setItem('theme', newTheme);

  document.querySelectorAll('.themeToggle').forEach(btn => {
    btn.classList.toggle('dark', newTheme === 'dark');
  });
}

  openSearch() { this.search.openSearch(); }
  closeSearch() { this.search.closeSearch(); }

  showArtistPopover(artistId, event) { this.contentEvents.showArtistPopover(artistId, event); }

  closePlayerDrawer() { this.player.closeDrawer(); }
  openPlayerDrawer() { this.player.openDrawer(); }
  updateMiniPlayer() { this.player.renderMiniPlayer(); }
  updateProgressOnly() { this.player.updateProgressOnly(); }

  updateFullPlayer() {
    const drawer = document.getElementById('full-player-drawer');
    if (drawer) {
      this.player.softUpdateDrawer(drawer);
    } else if (this.state.isDrawerOpen) {
      this.player.renderFullPlayer();
    }
  }

  toggleFavAndReRender(songId) {
    const song = this.state.getSongById(songId);
    if (!song) return;
    this.favorites.toggleFavoriteSong(song);
    const isFav = this.favorites.isSongFavorite(songId);
    document.querySelectorAll(`[data-fav-song="${songId}"]`).forEach(btn => {
      btn.classList.toggle('favorited', isFav);
      btn.innerHTML = this.likeStatus('song', isFav, false, null);
    });
    const likeBtn = document.getElementById('like-btn');
    if (likeBtn && this.state.currentSong && String(this.state.currentSong.id) === String(songId)) {
      likeBtn.classList.toggle('favorited', isFav);
      likeBtn.innerHTML = this.likeStatus('song', isFav, false, null);
    }
    const favMini = document.getElementById('fav-mini');
    if (favMini && this.state.currentSong && String(this.state.currentSong.id) === String(songId)) {
      favMini.classList.toggle('favorited', isFav);
      favMini.innerHTML = this.likeStatus('song', isFav, false, null);
    }
  }

  showShortcutsHelp() {
    const shortcuts = [
      ['Space', 'Play / Pause'],
      ['←', 'Previous track'],
      ['→', 'Next track'],
      ['↑', 'Volume up'],
      ['↓', 'Volume down'],
      ['M', 'Mute'],
      ['L', 'Favorite current song'],
      ['S', 'Shuffle'],
      ['R', 'Cycle repeat mode'],
      ['Q', 'Up Next queue'],
      ['Ctrl/⌘ + K', 'Search'],
      ['?', 'This help'],
      ['Esc', 'Close dialogs']
    ];
    this.state.modalOpen(`
      <div data-modal="shortcuts" class="shortcuts-help">
        <div class="head">
          <h2 class="title">Keyboard Shortcuts</h2>
          <button onclick="window.closeModal()" class="close">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M18 6L6 18M6 6l12 12"/></svg>
          </button>
        </div>
        <div data-list="shortcuts" class="grid">
          ${shortcuts.map(([key, description]) => `
            <div class="row">
              <span class="desc">${description}</span>
              <kbd class="kbd">${key}</kbd>
            </div>
          `).join('')}
        </div>
      </div>
    `);
  }

  showSettingsModal() {
    const current = Prefs.get('accent');
    const accents = Object.entries(Prefs.ACCENTS).map(([key, colors]) => ({ key, colors }));
    const accentLabels = {
      coral: 'Coral',
      ruby: 'Ruby',
      amber: 'Amber',
      emerald: 'Emerald',
      azure: 'Azure',
      violet: 'Violet'
    };
    this.state.modalOpen(`
      <div data-modal="settings" class="settings-modal">
        <div class="head">
          <h2 class="title">Settings</h2>
          <button onclick="window.closeModal()" class="close">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M18 6L6 18M6 6l12 12"/></svg>
          </button>
        </div>
        <p class="label">Accent color</p>
        <div data-list="swatches" class="swatches">
          ${accents.map(({ key, colors }) => `
            <button class="swatch ${key === current ? 'active' : ''}" data-accent="${key}"
                    title="${accentLabels[key] || key}"
                    style="background: linear-gradient(135deg, rgb(${colors.coral}), rgb(${colors.pink}));"></button>
          `).join('')}
        </div>
        <p class="label">Playback</p>
        <label class="toggle">
          <input type="checkbox" id="pref-fade" ${Prefs.get('fadeTransitions') ? 'checked' : ''}>
          <span>Fade transitions between tracks</span>
        </label>
        <label class="toggle">
          <input type="checkbox" id="pref-radio" ${Prefs.get('radioAutoplay') ? 'checked' : ''}>
          <span>Radio autoplay when queue ends</span>
        </label>
      </div>
    `);
    document.querySelectorAll('[data-modal="settings"] .swatch').forEach(btn => {
      btn.addEventListener('click', () => {
        Prefs.set('accent', btn.dataset.accent);
        Prefs.applyAccent(btn.dataset.accent);
        document.querySelectorAll('[data-modal="settings"] .swatch').forEach(x => x.classList.toggle('active', x === btn));
        this.state.showToast(`Accent: ${accentLabels[btn.dataset.accent] || btn.dataset.accent}`);
      });
    });
    document.getElementById('pref-fade')?.addEventListener('change', (e) => {
      Prefs.set('fadeTransitions', e.target.checked);
      this.state.showToast(e.target.checked ? 'Fade transitions on' : 'Fade transitions off');
    });
    document.getElementById('pref-radio')?.addEventListener('change', (e) => {
      Prefs.set('radioAutoplay', e.target.checked);
      this.state.showToast(e.target.checked ? 'Radio autoplay on' : 'Radio autoplay off');
    });
  }

  scrollToTop(duration = 500) {
    const startY = window.scrollY;
    const startTime = performance.now();
    const ease = (t) => 1 - Math.pow(1 - t, 4);
    const step = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      window.scrollTo(0, startY * (1 - ease(progress)));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  refreshArtistContent(artistId, albumId) {
    if (this._artistTabLoading) return;
    if (artistId !== this.state.artistId) {
      this.navigate('artist', artistId, albumId);
      return;
    }
    this._artistTabLoading = true;
    this.state.selectedAlbumId = albumId;
    history.pushState({}, '', '/artist/' + artistId + '/album/' + albumId);
    this.router.updateTitle();
    this.router.updateBreadcrumbs();
    const artist = this.state.getArtistById(artistId);
    const album = artist?.albums.find(a => IdUtils.normalize(a.id) === IdUtils.normalize(albumId));
    const aboutArea = document.querySelector('[data-page="artist"] > [data-area="about"]');
    const spinner = aboutArea ? new Spinner({ type: 'area', container: aboutArea }) : null;
    spinner?.show();
    setTimeout(() => {
      if (artist && album && aboutArea) {
        aboutArea.innerHTML = this.artistPage.aboutSection(artist, album);
        aboutArea.querySelectorAll('.tab').forEach(btn => {
          btn.classList.toggle('active', IdUtils.normalize(btn.dataset.albumId) === IdUtils.normalize(albumId));
        });
        this.contentEvents.attachContentEvents();
      }
      spinner?.hide();
      setTimeout(() => spinner?.remove(), 400);
      this._artistTabLoading = false;
    }, 600);
  }

  refreshFavoritesContent(tab) {
    if (this._favTabLoading) return;
    const favContainer = document.getElementById('favorites-content');
    if (!favContainer) return;
    this._favTabLoading = true;
    const spinner = new Spinner({ type: 'area', container: favContainer });
    spinner.show();
    this.state.favoritesTab = tab;
    history.pushState(null, '', `/favorites/${tab}`);
    this.router.updateBreadcrumbs();
    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.tab === tab);
    });
    setTimeout(() => {
      favContainer.innerHTML = this.favoritesPage.tabContent(tab);
      this.contentEvents.attachContentEvents();
      spinner.hide();
      spinner.remove();
      this._favTabLoading = false;
    }, 600);
  }
}

