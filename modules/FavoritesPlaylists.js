class FavoritesPlaylists {
  constructor(state) {
    this.state = state;
  }


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


  openPlaylistModal() {
    const content = `
      <div data-modal="playlists" class="playlists">
        <div class="head">
          <h2 class="title">Your Playlists</h2>
          <button onclick="window.favoritesPlaylists.closeModal()" class="close">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M18 6L6 18M6 6l12 12"/></svg>
          </button>
        </div>
        <div data-list="playlists" class="rows">
          ${this.state.playlists.map(pl => `
            <div class="row">
              <div class="info">
                <p class="name">${Utils.escapeHtml(pl.name)}</p>
                <p class="count">${pl.songs.length} songs</p>
              </div>
              <div class="actions">
                <button onclick="window.favoritesPlaylists.renamePlaylist('${pl.id}')" class="edit">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                </button>
                <button onclick="window.favoritesPlaylists.deletePlaylist('${pl.id}')" class="delete">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                </button>
              </div>
            </div>
          `).join('') || '<p class="empty">No playlists yet</p>'}
        </div>
        <button onclick="window.favoritesPlaylists.createNewPlaylist()" class="cta">
          + Create New Playlist
        </button>
      </div>
    `;
    this.state.modalOpen(content);
  }

  closeModal() { this.state.modalClose(); }

  createNewPlaylist() {
    const content = `
      <div data-modal="create-playlist" class="create">
        <div class="head">
          <h2 class="title">Create Playlist</h2>
          <button onclick="window.favoritesPlaylists.closeModal()" class="close">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M18 6L6 18M6 6l12 12"/></svg>
          </button>
        </div>
        <input type="text" id="new-playlist-name" placeholder="Playlist name" class="input">
        <button onclick="window.favoritesPlaylists.createPlaylistFromModal()" class="cta">
          Create
        </button>
      </div>
    `;
    this.state.modalOpen(content);
  }

  createPlaylistFromModal() {
    const name = document.getElementById('new-playlist-name')?.value.trim();
    if (!name) return;
    const newPlaylist = {
      id: Utils.newId('pl'),
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

  renamePlaylist(id) {
    const pl = this.state.playlists.find(p => p.id === id);
    if (!pl) return;
    const content = `
      <div data-modal="rename-playlist" class="rename">
        <div class="head">
          <h2 class="title">Rename Playlist</h2>
          <button onclick="window.favoritesPlaylists.closeModal()" class="close">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M18 6L6 18M6 6l12 12"/></svg>
          </button>
        </div>
        <input type="text" id="rename-playlist-name" value="${String(pl.name).replace(/"/g, '&quot;')}" placeholder="Playlist name" class="input">
        <button onclick="window.favoritesPlaylists.confirmRenamePlaylist('${pl.id}')" class="cta">
          Rename
        </button>
      </div>
    `;
    this.state.modalOpen(content);
  }

  confirmRenamePlaylist(id) {
    const pl = this.state.playlists.find(p => p.id === id);
    const name = document.getElementById('rename-playlist-name')?.value.trim();
    if (!pl || !name) return;
    pl.name = name;
    this.state.persist();
    this.state.modalClose();
    this.state.showToast(`Playlist renamed to "${name}"`);
    window.uiManager?.render();
  }

  deletePlaylist(id) {
    const pl = this.state.playlists.find(p => p.id === id);
    if (!pl) return;
    const content = `
      <div data-modal="delete-playlist" class="delete">
        <div class="head">
          <h2 class="title">Delete Playlist</h2>
          <button onclick="window.favoritesPlaylists.closeModal()" class="close">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M18 6L6 18M6 6l12 12"/></svg>
          </button>
        </div>
        <p class="note">Delete "${Utils.escapeHtml(pl.name)}"? This cannot be undone.</p>
        <div class="actions">
          <button onclick="window.favoritesPlaylists.closeModal()" class="cancel">
            Cancel
          </button>
          <button onclick="window.favoritesPlaylists.confirmDeletePlaylist('${pl.id}')" class="confirm">
            Delete
          </button>
        </div>
      </div>
    `;
    this.state.modalOpen(content);
  }

  confirmDeletePlaylist(id) {
    const pl = this.state.playlists.find(p => p.id === id);
    if (!pl) return;
    this.state.playlists = this.state.playlists.filter(p => p.id !== id);
    this.state.persist();
    this.state.modalClose();
    this.state.showToast(`Playlist "${pl.name}" deleted`);
    window.uiManager?.render();
  }

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
        <div data-modal="add-to-playlist" class="add">
          <div class="head">
            <h2 class="title">Add to Playlist</h2>
            <button onclick="window.favoritesPlaylists.closeModal()" class="close">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M18 6L6 18M6 6l12 12"/></svg>
            </button>
          </div>
          <p class="empty">No playlists yet.</p>
          <button onclick="window.favoritesPlaylists.closeModal(); document.getElementById('create-playlist-btn')?.click();"
                  class="cta">
            Create New Playlist
          </button>
        </div>
      `);
      return;
    }

    const songContext = song
      ? `<div class="context">
           <img src="${song.coverUrl}" class="cover">
           <div class="info">
             <p class="title">${song.title}</p>
             <p class="sub">${song.artist}</p>
           </div>
         </div>`
      : '';

    const list = this.state.playlists.map(pl => `
      <button class="pick"
              onclick="window.favoritesPlaylists.addSongToPlaylist('${pl.id}', '${song?.id || ''}')">
        <div class="icon">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>
          </svg>
        </div>
        <div class="info">
          <p class="name">${Utils.escapeHtml(pl.name)}</p>
          <p class="count">${pl.songs.length} songs</p>
        </div>
      </button>
    `).join('');

    this.state.modalOpen(`
      <div data-modal="add-to-playlist" class="add">
        <div class="head">
          <h2 class="title">Add to Playlist</h2>
          <button onclick="window.favoritesPlaylists.closeModal()" class="close">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M18 6L6 18M6 6l12 12"/></svg>
          </button>
        </div>
        ${songContext}
        <div data-list="playlists" class="scroll">${list}</div>
      </div>
    `);
  }

  getSongById(id) {
    return this.state.getSongById(id);
  }
}
