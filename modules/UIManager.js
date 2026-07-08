/* ==================================================================
   UIManager
   Icons, Router, AppListeners, ContentEventManager, and SearchManager
   were moved to core.js. IdUtils was moved to utilities.js.
   PlayerManager was moved to players.js.
   ================================================================== */

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

    this.router = new Router(this);
    this.player = new PlayerManager(this);
    this.search = new SearchManager(this);
    this.contentEvents = new ContentEventManager(this);

// Page Builders
this.homePage      = new Home(this);
this.libraryPage   = new Library(this);
this.favoritesPage = new Favorites(this);
this.playlistsPage = new Playlists(this);
this.artistPage    = new Artists(this);
    
    this.init();
  }

  init() {
    this.render = this.render.bind(this);
    this.navigate = this.navigate.bind(this);
    this.handlePopState = this.handlePopState.bind(this);
    AppListeners.bindAll(this); // <-- all static listeners are now applied here
    this.router.syncWithURL();
    window.addEventListener('popstate', this.handlePopState);
  }

  navigate(page, artistId = null, albumId = null) {
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
    return `<span class="artist-name-tooltip hover:underline">${text}<span class="artist-tooltip-popup" onclick="event.stopPropagation(); window.uiManager.navigate('artist', '${artistId}')">View Artist</span></span>`;
  }

  scrollSection(title, cards) {
    return `<section class="mb-8"><h2 class="section-header">${title}</h2><div class="scroll-row">${cards.join('')}</div></section>`;
  }

  albumCard(artistId, artistName, albumId, albumName, coverUrl, index = 0, size = '150px') {
    return `
      <div style="width: ${size}; animation-delay: ${index * 50}ms" class="animate-fadeInUp">
        <div class="album-cover-wrap mb-2" data-artist-id="${artistId}" data-album-id="${albumId}">
          <img src="${coverUrl}" style="width: ${size}; height: ${size}; object-fit: cover;">
          <div class="play-overlay p-2 rounded-full"
               style="background: linear-gradient(135deg, hsl(var(--accent-coral)), hsl(var(--accent-pink)));"
               data-play-album='${JSON.stringify({ artistId, albumId })}'>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="white"><polygon points="5,3 19,12 5,21"/></svg>
          </div>
        </div>
        <p class="font-semibold text-xs truncate">${albumName}</p>
        <p class="text-xs" style="color: hsl(var(--text-secondary));">${artistName}</p>
      </div>
    `;
  }

  artistCard(artist, index = 0) {
    return `
      <button data-dynamic="true" class="artist-card animate-fadeInUp"
              style="width: 130px; animation-delay: ${index * 60}ms" data-artist-id="${artist.id}">
        <img src="${artist.imageUrl}">
        <p class="font-semibold text-sm text-center truncate w-full">${artist.artist}</p>
        <p class="text-xs" style="color: hsl(var(--text-secondary));">${artist.genre || 'Artist'}</p>
      </button>
    `;
  }

  recentCard(song, index = 0) {
    return `
      <div style="width: 140px; animation-delay: ${index * 50}ms" class="animate-fadeInUp">
        <div class="album-cover-wrap mb-2" data-song-id="${song.id}">
          <img src="${song.coverUrl}" class="w-36 h-36 object-cover">
          <div class="play-overlay p-2 rounded-full"
               style="background: linear-gradient(135deg, hsl(var(--accent-coral)), hsl(var(--accent-pink)));">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="white"><polygon points="5,3 19,12 5,21"/></svg>
          </div>
        </div>
        <p class="font-semibold text-xs truncate">${song.title}</p>
        <p class="text-xs truncate" style="color: hsl(var(--text-secondary));">${song.artist}</p>
      </div>
    `;
  }

  songRow(song, index, showDuration = true) {
    const artistId = song.artistId;
    const albumId  = song.albumId;
    return `
      <div class="song-row animate-fadeInUp" style="animation-delay: ${index * 25}ms">
        <button class="flex items-center gap-3 flex-1 min-w-0" data-song-id="${song.id}">
          <img src="${song.coverUrl}" class="w-10 h-10 rounded-lg object-cover">
          <div class="text-left min-w-0">
            <p class="font-semibold text-sm truncate">${song.title}</p>
            <p class="text-xs truncate" style="color: hsl(var(--text-secondary));">
              ${this.artistNameTooltip(artistId)}
              \u2022
              <span class="hover:underline cursor-pointer" data-artist-id="${artistId}" data-album-id="${albumId}" onclick="event.stopPropagation(); window.uiManager.navigate('artist', '${artistId}', '${albumId}')">${song.album}</span>
            </p>
          </div>
        </button>
        ${showDuration ? `<span class="text-xs" style="color: hsl(var(--text-tertiary));">${song.duration}</span>` : ''}
        <button class="song-action-btn ${this.favorites.isSongFavorite(song.id) ? 'favorited' : ''}" data-fav-song="${song.id}">
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
    };
    setTimeout(() => {
      try {
        this.main.innerHTML = (pageMap[this.state.currentPage] ?? (() => '<div>Not found</div>'))();
        Object.assign(this.main.style, { opacity: '1', transform: 'translateY(0)' });
        setTimeout(() => { this.main.style.transition = ''; this.isTransitioning = false; }, 300);
        this.contentEvents.attachContentEvents();
      } catch (err) {
        console.error('[UIManager] Page render error:', err);
        this.isTransitioning = false;
      }
    }, 300);
  }

  toggleTheme() {
    const body = document.body;
    const isDark = body.classList.toggle('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    document.querySelectorAll('.theme-toggle-btn').forEach(btn => {
      btn.classList.toggle('dark', isDark);
    });
    if (isDark) {
      document.documentElement.style.setProperty('--bg-body', '220 28% 11%');
      document.documentElement.style.setProperty('--bg-surface', '220 25% 14%');
    } else {
      document.documentElement.style.setProperty('--bg-body', '0 0% 98%');
      document.documentElement.style.setProperty('--bg-surface', '0 0% 95%');
    }
  }

  openSearch() { this.search.openSearch(); }
  closeSearch() { this.search.closeSearch(); }

  showArtistPopover(artistId, event) { this.contentEvents.showArtistPopover(artistId, event); }

  closePlayerDrawer() { this.player.closeDrawer(); }
  openPlayerDrawer() { this.player.openDrawer(); }
  updateMiniPlayer() { this.player.renderMiniPlayer(); }
  updateProgressOnly() { this.player.updateProgressOnly(); }

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
}
