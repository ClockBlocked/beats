class FavoritesPlaylists {
  constructor(state) {
    this.state = state;
  }

  // ==================== FAVORITES (all ID‑based) ====================

  isSongFavorite(id) {
    return this.state.favoriteSongs.some(sid => String(sid) === String(id));
  }

  toggleFavoriteSong(song) {
    const id = String(song.id);
    const idx = this.state.favoriteSongs.findIndex(sid => String(sid) === id);
    if (idx >= 0) {
      this.state.favoriteSongs.splice(idx, 1);
      this.state.showToast('Removed from favorites');
    } else {
      this.state.favoriteSongs.push(id);
      this.state.showToast('Added to favorites');
    }
    this.state.persist();
    if (this.state.isDrawerOpen) window.uiManager?.updateFullPlayer();
  }

  isArtistFavorite(id) {
    return this.state.favoriteArtists.some(aid => String(aid) === String(id));
  }

  toggleFavoriteArtist(id) {
    const sid = String(id);
    const idx = this.state.favoriteArtists.findIndex(aid => String(aid) === sid);
    if (idx >= 0) {
      this.state.favoriteArtists.splice(idx, 1);
    } else {
      this.state.favoriteArtists.push(sid);
    }
    this.state.persist();
    window.uiManager?.render();
  }

  isAlbumFavorite(id) {
    return this.state.favoriteAlbums.some(aid => String(aid) === String(id));
  }

  toggleFavoriteAlbum(id) {
    const sid = String(id);
    const idx = this.state.favoriteAlbums.findIndex(aid => String(aid) === sid);
    if (idx >= 0) {
      this.state.favoriteAlbums.splice(idx, 1);
      this.state.showToast('Removed from favorite albums');
    } else {
      this.state.favoriteAlbums.push(sid);
      this.state.showToast('Added to favorite albums');
    }
    this.state.persist();
    if (this.state.isDrawerOpen) window.uiManager?.updateFullPlayer();
  }

  // ==================== PLAYLISTS ====================

  openPlaylistModal() {
    const content = `
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-xl font-bold">Your Playlists</h2>
        <button onclick="window.favoritesPlaylists.closeModal()" class="p-2 rounded-full hover:bg-interactive">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M18 6L6 18M6 6l12 12"/></svg>
        </button>
      </div>
      <div class="space-y-2 mb-4">
        ${this.state.playlists.map(pl => `
          <div class="flex items-center justify-between p-3 rounded-lg" style="background: hsl(var(--bg-elevated));">
            <div>
              <p class="font-semibold">${pl.name}</p>
              <p class="text-xs" style="color: hsl(var(--text-secondary));">${pl.songs.length} songs</p>
            </div>
            <div class="flex gap-2">
              <button onclick="window.favoritesPlaylists.renamePlaylist('${pl.id}')" class="p-2 rounded-full hover:bg-interactive">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
              </button>
              <button onclick="window.favoritesPlaylists.deletePlaylist('${pl.id}')" class="p-2 rounded-full hover:bg-red-500/20" style="color: hsl(var(--destructive));">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
              </button>
            </div>
          </div>
        `).join('') || '<p class="text-center py-4" style="color: hsl(var(--text-secondary));">No playlists yet</p>'}
      </div>
      <button onclick="window.favoritesPlaylists.createNewPlaylist()" class="w-full py-3 rounded-xl font-semibold" style="background: linear-gradient(135deg, hsl(var(--accent-coral)), hsl(var(--accent-pink))); color: white;">
        + Create New Playlist
      </button>
    `;
    this.state.modalOpen(content);
  }

  closeModal() { this.state.modalClose(); }

  createNewPlaylist() {
    const content = `
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-xl font-bold">Create Playlist</h2>
        <button onclick="window.favoritesPlaylists.closeModal()" class="p-2 rounded-full hover:bg-interactive">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M18 6L6 18M6 6l12 12"/></svg>
        </button>
      </div>
      <input type="text" id="new-playlist-name" placeholder="Playlist name" class="w-full p-3 rounded-lg mb-4" style="background: hsl(var(--bg-elevated));">
      <button onclick="window.favoritesPlaylists.createPlaylistFromModal()" class="w-full py-3 rounded-xl font-semibold" style="background: linear-gradient(135deg, hsl(var(--accent-coral)), hsl(var(--accent-pink))); color: white;">
        Create
      </button>
    `;
    this.state.modalOpen(content);
  }

  createPlaylistFromModal() {
    const name = document.getElementById('new-playlist-name')?.value.trim();
    if (!name) return;
    const newPlaylist = {
      id: 'pl' + Date.now(),
      name: name,
      description: '',
      tags: [],
      songs: []
    };
    this.state.playlists.push(newPlaylist);
    this.state.persist();
    this.state.modalClose();
    this.state.showToast(`Playlist "${name}" created`);
    window.uiManager?.render();
  }

  // Add a song (by ID) to a playlist
  addSongToPlaylist(plId, songId) {
    const pl = this.state.playlists.find(p => p.id === plId);
    const sid = String(songId);
    if (pl && !pl.songs.some(s => String(s) === sid)) {
      pl.songs.push(sid);
      this.state.persist();
      this.state.showToast('Added to ' + pl.name);
      this.state.modalClose();
    }
  }

  addToPlaylistModal(song) {
    if (!this.state.playlists.length) {
      this.state.modalOpen(`
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-xl font-bold">Add to Playlist</h2>
          <button onclick="window.favoritesPlaylists.closeModal()" class="p-2 rounded-full hover:bg-interactive">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M18 6L6 18M6 6l12 12"/></svg>
          </button>
        </div>
        <p class="text-center py-4" style="color: hsl(var(--text-secondary));">No playlists yet.</p>
        <button onclick="window.favoritesPlaylists.closeModal(); document.getElementById('create-playlist-btn')?.click();"
                class="w-full py-3 rounded-xl font-semibold mt-2"
                style="background: linear-gradient(135deg, hsl(var(--accent-coral)), hsl(var(--accent-pink))); color: white;">
          Create New Playlist
        </button>
      `);
      return;
    }

    const songContext = song
      ? `<div class="flex items-center gap-3 mb-4 p-3 rounded-lg" style="background: hsl(var(--bg-interactive));">
           <img src="${song.coverUrl}" class="w-10 h-10 rounded-md object-cover">
           <div class="min-w-0">
             <p class="font-semibold text-sm truncate">${song.title}</p>
             <p class="text-xs truncate" style="color: hsl(var(--text-secondary));">${song.artist}</p>
           </div>
         </div>`
      : '';

    const list = this.state.playlists.map(pl => `
      <button class="w-full text-left px-4 py-3 rounded-lg hover:bg-interactive transition-colors flex items-center gap-3 mb-1"
              onclick="window.favoritesPlaylists.addSongToPlaylist('${pl.id}', '${song?.id || ''}')">
        <div class="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
             style="background: linear-gradient(135deg, hsl(var(--accent-coral) / 0.2), hsl(var(--accent-pink) / 0.15));">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="color: hsl(var(--accent-coral));">
            <path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>
          </svg>
        </div>
        <div class="min-w-0 flex-1">
          <p class="font-semibold text-sm truncate">${pl.name}</p>
          <p class="text-xs" style="color: hsl(var(--text-secondary));">${pl.songs.length} songs</p>
        </div>
      </button>
    `).join('');

    this.state.modalOpen(`
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-xl font-bold">Add to Playlist</h2>
        <button onclick="window.favoritesPlaylists.closeModal()" class="p-2 rounded-full hover:bg-interactive">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M18 6L6 18M6 6l12 12"/></svg>
        </button>
      </div>
      ${songContext}
      <div class="max-h-64 overflow-y-auto" style="scrollbar-width: thin;">${list}</div>
    `);
  }

  // Helper to get full song object from ID (used in UIManager)
  getSongById(id) {
    return this.state.getSongById(id);
  }
}