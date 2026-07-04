




class Home {
  constructor(ui) { this.ui = ui; }

  render() {
    const state = this.ui.state;
    const allAlbums = state.enrichedLibrary.flatMap(a =>
      a.albums.map(alb => ({ artistId: a.id, artistName: a.artist, albumId: alb.id, albumName: alb.album, coverUrl: alb.coverUrl, genre: a.genre }))
    );
    const allSongs = state.getAllSongs();
    const featured = IdUtils.sample(allAlbums, 15);
    const topPicks = IdUtils.sample(allSongs, 12);
    const spotlight = IdUtils.sample([...state.enrichedLibrary], 10);

    return `
      <div class="pb-28 animate-fadeInUp">
        <div class="mb-8">
          <h1 class="font-black text-2xl md:text-3xl lg:text-4xl mb-2">
            Welcome to MyBeats<span style="color: hsl(var(--accent-coral));">\u2122</span>
          </h1>
          <p style="color: hsl(var(--text-secondary));">Streaming & sharing your favorite music for free.</p>
        </div>
        ${this.ui.scrollSection('Discover Albums', featured.map((item, i) => this.ui.albumCard(item.artistId, item.artistName, item.albumId, item.albumName, item.coverUrl, i)))}
        ${this.topPicksSection(topPicks)}
        ${this.ui.scrollSection('Artist Spotlight', spotlight.map((a, i) => this.ui.artistCard(a, i)))}
        ${state.recentlyPlayed.length ? this.ui.scrollSection('Recently Played', state.recentlyPlayed.slice(0, 8).map((s, i) => this.ui.recentCard(s, i))) : ''}
        ${state.playlists.length ? this.playlistsGrid(state.playlists) : ''}
      </div>
    `;
  }

  topPicksSection(songs) {
    return `
      <section class="mb-8">
        <h2 class="section-header">Top Picks for You</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
          ${songs.map((s, i) => `
            <button class="song-row w-full animate-fadeInUp" data-song-id="${s.id}" style="animation-delay: ${i * 40}ms">
              <img src="${s.coverUrl}" class="w-12 h-12 rounded-xl object-cover">
              <div class="flex-1 min-w-0 text-left">
                <p class="font-semibold text-sm truncate">${s.title}</p>
                <p class="text-xs truncate" style="color: hsl(var(--text-secondary));">${s.artist} \u2022 ${s.album}</p>
              </div>
              <svg class="hoverPlay" width="16" height="16" style="color: hsl(var(--text-secondary));" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <polygon points="5,3 19,12 5,21"/>
              </svg>
            </button>
          `).join('')}
        </div>
      </section>
    `;
  }

  playlistsGrid(playlists) {
    return `
      <section class="mb-8">
        <h2 class="section-header">Your Playlists</h2>
        <div class="grid grid-cols-6 sm:grid-cols-4 lg:grid-cols-6 gap-3">
          ${playlists.map((pl, i) => `
            <div class="rounded-md p-2 transition-all cursor-pointer animate-fadeInUp hover:-translate-y-1"
                 style="background: hsl(var(--bg-elevated)); animation-delay: ${i * 50}ms">
              <div class="w-full aspect-square rounded-md mb-3 flex items-center justify-center"
                   style="background: linear-gradient(135deg, hsl(var(--accent-coral) / 0.2), hsl(var(--accent-pink) / 0.15));">
                ${Icons.general.playlist(36)}
              </div>
              <p class="font-semibold text-sm truncate">${pl.name}</p>
              <p class="text-xs" style="color: hsl(var(--text-secondary));">${pl.songs.length} songs</p>
            </div>
          `).join('')}
        </div>
      </section>
    `;
  }
}

class Library {
  constructor(ui) { this.ui = ui; }

  render() {
    const state = this.ui.state;
    return `
      <div class="pb-28 animate-fadeInUp">
        <div class="space-y-8">
          ${state.enrichedLibrary.map((artist, i) => `
            <section class="animate-fadeInUp" style="animation-delay: ${i * 80}ms">
              <button class="flex items-center gap-3 mb-4 group" data-artist-id="${artist.id}">
                <img src="${artist.imageUrl}" class="w-12 h-12 rounded-full object-cover transition-transform group-hover:scale-110">
                <div class="text-left">
                  <h4 class="font-bold text-md group-hover:underline">${artist.artist}</h4>
                  <p class="text-xs" style="color: hsl(var(--text-secondary));">${artist.genre || 'Artist'} \u2022 ${artist.albums.length} albums</p>
                </div>
              </button>
              <div class="scroll-row">
                ${artist.albums.map(alb => this.ui.albumCard(artist.id, artist.artist, alb.id, alb.album, alb.coverUrl)).join('')}
              </div>
            </section>
          `).join('')}
        </div>
      </div>
    `;
  }
}

class Favorites {
  constructor(ui) { this.ui = ui; }

  render() {
    const state = this.ui.state;
    const tabToCount = {
      songs: state.favoriteSongs.length,
      artists: state.favoriteArtists.length,
      albums: state.favoriteAlbums.length,
      playlists: state.playlists.length,
    };
    const tabs = [
      { key: 'songs',     label: 'Songs',     count: tabToCount.songs },
      { key: 'artists',   label: 'Artists',   count: tabToCount.artists },
      { key: 'albums',    label: 'Albums',    count: tabToCount.albums },
      { key: 'playlists', label: 'Playlists', count: tabToCount.playlists },
    ];
    return `
      <div class="pb-28 animate-fadeInUp">
        <div class="flex gap-2 mb-6 overflow-x-auto pb-2">
          ${tabs.map(({ key, label, count }) => `
            <button class="tab-btn ${key === state.favoritesTab ? 'active' : ''}" data-tab="${key}">
              ${label} (${count})
            </button>
          `).join('')}
        </div>
        <div id="favorites-content">${this.tabContent(state.favoritesTab)}</div>
      </div>
    `;
  }

  tabContent(tab) {
    const state = this.ui.state;
    const empty = msg => `<p class="text-center py-12" style="color: hsl(var(--text-secondary));">${msg}</p>`;

    if (tab === 'songs') {
      const songIds = state.favoriteSongs;
      if (!songIds.length) return empty('No favorite songs yet');
      const songs = songIds.map(id => state.getSongById(id)).filter(Boolean);
      return `<div class="space-y-1">${songs.map((s, i) => this.ui.songRow(s, i)).join('')}</div>`;
    }

    if (tab === 'artists') {
      const artistIds = state.favoriteArtists;
      if (!artistIds.length) return empty('No favorite artists yet');
      const artists = artistIds.map(id => state.getArtistById(id)).filter(Boolean);
      return `<div class="flex flex-wrap gap-3">
        ${artists.map((a, i) => `
          <button class="flex items-center gap-3 px-4 py-3 rounded-xl animate-fadeInUp"
                  style="background: hsl(var(--bg-elevated)); animation-delay: ${i * 40}ms"
                  data-artist-id="${a.id}">
            <img src="${a.imageUrl}" class="w-10 h-10 rounded-full object-cover">
            <span class="font-semibold">${a.artist}</span>
          </button>
        `).join('')}
      </div>`;
    }

    if (tab === 'albums') {
      const albumIds = state.favoriteAlbums;
      if (!albumIds.length) return empty('No favorite albums yet');
      const albums = albumIds.map(id => state.getAlbumById(id)).filter(Boolean);
      return `<div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        ${albums.map((alb, i) => `
          <div class="animate-fadeInUp" style="animation-delay: ${i * 50}ms"
               data-artist-id="${alb.artistId}" data-album-id="${alb.id}">
            <div class="album-cover-wrap mb-2">
              <img src="${alb.coverUrl}" class="w-full aspect-square object-cover">
            </div>
            <p class="font-semibold text-sm truncate">${alb.album}</p>
            <p class="text-xs truncate" style="color: hsl(var(--text-secondary));">${alb.artistName}</p>
          </div>
        `).join('')}
      </div>`;
    }

    if (tab === 'playlists') {
      return state.playlists.length
        ? `<div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            ${state.playlists.map((pl, i) => `
              <div class="p-4 rounded-xl animate-fadeInUp"
                   style="background: hsl(var(--bg-elevated)); animation-delay: ${i * 50}ms">
                <div class="flex items-center justify-between">
                  <div>
                    <p class="font-semibold">${pl.name}</p>
                    <p class="text-xs" style="color: hsl(var(--text-secondary));">${pl.songs.length} songs</p>
                  </div>
                  <button onclick="window.favoritesPlaylists.openPlaylistModal()"
                          class="p-2 rounded-full hover:bg-interactive">
                    ${Icons.general.moreHoriz(18)}
                  </button>
                </div>
              </div>
            `).join('')}
           </div>`
        : empty('No playlists yet');
    }
    return '';
  }
}

class Playlists {
  constructor(ui) { this.ui = ui; }

  render() {
    const state = this.ui.state;
    return `
      <div class="pb-28 animate-fadeInUp">
    <div class="breadcrumb-toggle-bar">
      <div class="max-w-7xl mx-auto flex justify-center">
        <button id="breadcrumb-toggle">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
        </button>
      </div>
    </div>
        <div class="flex items-center justify-between mb-6">
          <h1 class="font-black text-2xl md:text-3xl">Your Playlists</h1>
          <button id="create-playlist-btn" class="px-4 py-2 rounded-xl font-semibold"
                  style="background: linear-gradient(135deg, hsl(var(--accent-coral)), hsl(var(--accent-pink))); color: white;">
            + New Playlist
          </button>
        </div>
        <div class="space-y-6" id="playlists-container">
          ${state.playlists.map(pl => this.playlistViewer(pl)).join('')}
        </div>
      </div>
    `;
  }

  playlistViewer(pl) {
    const state = this.ui.state;
    const songIds = pl.songs;
    const songList = songIds.length
      ? songIds.map((songId, i) => {
          const song = state.getSongById(songId);
          if (!song) return '';
          return `
            <div class="song-row w-full group animate-fadeIn" style="animation-delay: ${i * 20}ms" data-song-id="${song.id}">
              <img src="${song.coverUrl}" class="w-8 h-8 rounded-md object-cover">
              <div class="flex-1 min-w-0 text-left">
                <p class="font-medium text-sm truncate">${song.title}</p>
                <p class="text-xs truncate" style="color: hsl(var(--text-secondary));">${song.artist}</p>
              </div>
              <button class="remove-from-playlist-btn p-1 rounded-full opacity-0 group-hover:opacity-100 transition-all hover:bg-destructive/20"
                      data-playlist-id="${pl.id}" data-song-id="${song.id}">
                ${Icons.general.close(14)}
              </button>
            </div>
          `;
        }).join('')
      : `<p class="text-sm italic py-4 text-center" style="color: hsl(var(--text-secondary));">No songs yet. Click the \u22ee menu on any song to add.</p>`;

    return `
      <div class="playlist-card rounded-xl p-5 transition-all" data-playlist-id="${pl.id}" style="background: hsl(var(--bg-elevated));">
        <div class="flex flex-wrap items-start gap-4">
          <div class="w-24 h-24 rounded-xl flex items-center justify-center flex-shrink-0"
               style="background: linear-gradient(135deg, hsl(var(--accent-coral) / 0.2), hsl(var(--accent-pink) / 0.15));">
            ${Icons.general.playlist(36)}
          </div>
          <div class="flex-1 min-w-0">
            <div class="flex items-start justify-between gap-2">
              <input type="text"
                     class="playlist-name-input text-xl font-bold bg-transparent border-b border-transparent hover:border-interactive focus:border-accent-coral outline-none w-full mb-1"
                     value="${pl.name.replace(/"/g, '&quot;')}"
                     data-playlist-id="${pl.id}" data-field="name" placeholder="Playlist name">
              <button class="share-playlist-btn p-2 rounded-full hover:bg-interactive flex-shrink-0" data-playlist-id="${pl.id}">
                ${Icons.general.share(18)}
              </button>
            </div>
            <textarea class="playlist-description-input text-sm bg-transparent border border-interactive rounded-lg p-2 w-full mt-2"
                      placeholder="Add a description..."
                      data-playlist-id="${pl.id}" data-field="description" rows="2">${pl.description?.replace(/"/g, '&quot;') || ''}</textarea>
            <div class="tags-container flex flex-wrap gap-2 mt-3" data-playlist-id="${pl.id}">
              ${(pl.tags || []).map(tag => `
                <span class="tag-chip px-3 py-1 rounded-full text-xs flex items-center gap-1 animate-fadeIn"
                      style="background: hsl(var(--bg-interactive));">
                  ${tag}
                  <button class="remove-tag-btn hover:text-destructive transition-colors"
                          data-tag="${tag.replace(/"/g, '&quot;')}">\u00d7</button>
                </span>
              `).join('')}
              <input type="text"
                     class="tag-input bg-transparent border-b border-interactive outline-none text-sm"
                     placeholder="Add tag + Enter" data-playlist-id="${pl.id}">
            </div>
          </div>
        </div>
        <div class="mt-4">
          <h3 class="text-sm font-semibold uppercase tracking-wider mb-2" style="color: hsl(var(--text-secondary));">
            Songs \u00b7 ${pl.songs.length}
          </h3>
          <div class="space-y-1 max-h-60 overflow-y-auto custom-scrollbar pr-2">${songList}</div>
        </div>
      </div>
    `;
  }
}

class Artists {
  constructor(ui) { this.ui = ui; }

  render() {
    const state = this.ui.state;
    const artistId = state.artistId;
    if (!artistId) return '<div>Artist not found</div>';
    const artist = state.getArtistById(artistId);
    if (!artist) return '<div>Artist not found</div>';

    const activeAlbumId = state.selectedAlbumId;
    const activeAlbum = activeAlbumId
      ? artist.albums.find(a => IdUtils.normalize(a.id) === IdUtils.normalize(activeAlbumId))
      : artist.albums[0];
    if (!activeAlbum) return '<div>Album not found</div>';

    const similarIds = artist.similar || [];
    const similarArtists = similarIds
      .map(id => state.getArtistByIdOrName(id))
      .filter(Boolean);
    const rows = [
      similarArtists.slice(0, 4),
      similarArtists.slice(4, 8),
      similarArtists.slice(8, 12)
    ];

    return `
      <div class="artist-page animate-fadeInUp">
        <div class="album-tabs-container">
          <div class="album-tabs">
            ${artist.albums.map(alb => `
              <button data-dynamic="true"
                      class="album-tab ${alb.id === activeAlbum.id ? 'active' : ''}"
                      data-artist-id="${artist.id}"
                      data-album-id="${alb.id}">
                ${alb.album}
              </button>
            `).join('')}
          </div>
        </div>

        <div class="artist-header flex items-center gap-3 mb-4 px-4">
          <h1 class="text-3xl font-bold">${artist.artist}</h1>
          <button class="artist-heart-btn p-2 rounded-full hover:bg-interactive ${this.ui.favorites.isArtistFavorite(artist.id) ? 'favorited' : ''}"
                  data-artist-heart="${artist.id}">
            ${this.ui.likeStatus('artist', this.ui.favorites.isArtistFavorite(artist.id), false, null)}
          </button>
        </div>

        <div class="album-display">
          <div class="album-cover-display">
            <img src="${activeAlbum.coverUrl}" alt="${activeAlbum.album}">
            <div class="album-cover-fade"></div>
            <div class="album-info-overlay">
              <h2 class="album-title">${activeAlbum.album}</h2>
              <p class="album-meta">${artist.artist} \u2022 ${activeAlbum.songs.length} tracks</p>
            </div>
          </div>
        </div>

        <div class="songs-list">
          ${activeAlbum.songs.map((song, i) => this.createSongRow(song, i, artist, activeAlbum)).join('')}
        </div>

        ${similarIds.length ? this.similarMarquee(rows, artist.id) : ''}
      </div>
    `;
  }

  createSongRow(song, index, artist, album) {
    const isFav = this.ui.favorites.isSongFavorite(song.id);
    return `
      <div class="song-item ${this.ui.state.currentSong?.id == song.id ? 'playing' : ''}"
           data-song-id="${song.id}"
           data-context='${JSON.stringify({ artistId: artist.id, albumId: album.id })}'>
        <div class="song-number">${index + 1}</div>
        <div class="song-play-btn">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><polygon points="5,3 19,12 5,21"/></svg>
        </div>
        <div class="song-title-cell"><div class="song-title-text">${song.title}</div></div>
        <div class="song-duration">${song.duration}</div>
        <button class="song-action-btn ${isFav ? 'favorited' : ''}" data-fav-song="${song.id}">
          ${this.ui.likeStatus('song', isFav, false, null)}
        </button>
        <button class="song-action-btn" data-more-song="${song.id}">
          ${Icons.general.moreVert(18)}
        </button>
      </div>
    `;
  }

  similarMarquee(rows, artistId) {
    const configs = [['left', 40], ['right', 45], ['left', 35]];
    const marquee = (artists, dir, dur) => `
      <div class="marquee-container">
        <div class="marquee-track marquee-${dir}" style="animation-duration: ${dur}s;">
          ${[...artists, ...artists].map(a => `
            <span class="artist-name-pill animate-fadeIn" data-artist-id="${a.id}" data-artist-name="${a.artist}">${a.artist}</span>
          `).join('')}
        </div>
      </div>
    `;
    return `
      <div class="similar-artists-section">
        <h3 class="similar-artists-title">Similar Artists</h3>
        ${rows.map((row, i) => row.length ? marquee(row, ...configs[i]) : '').join('')}
      </div>
    `;
  }
}
