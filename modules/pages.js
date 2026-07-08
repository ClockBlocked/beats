






class Home {
  constructor(ui) { this.ui = ui; }

  buildAllSongs(state) {
    return state.enrichedLibrary.flatMap(artist =>
      artist.albums.flatMap(album =>
        album.songs.map(song => ({
          ...song,
          artistId: artist.id,
          albumId: album.id,
          artist: artist.artist,
          album: album.album,
          coverUrl: album.coverUrl,
          artistImageUrl: artist.imageUrl,
          genre: artist.genre || ''
        }))
      )
    );
  }

  pickForYouMix(state, allSongs) {
    const favoriteSet = new Set(state.favoriteSongs.map(String));
    const favoriteSongs = allSongs.filter(song => favoriteSet.has(String(song.id)));
    const picks = favoriteSongs.slice(0, 6);
    if (picks.length >= 6) return picks;
    const filler = IdUtils.sample(allSongs.filter(song => !picks.some(p => String(p.id) === String(song.id))), 6 - picks.length);
    return [...picks, ...filler];
  }

  quickPlaySection(genres) {
    return `
      <section class="quick-play mb-8">
        <div class="quick-play-hero rounded-2xl p-6" style="background: linear-gradient(135deg, hsl(var(--accent-coral) / 0.15), hsl(var(--accent-pink) / 0.1)); border: 1px solid hsl(var(--border-subtle) / 0.25);">
          <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-4">
            <div>
              <h2 class="text-xl font-bold">Quick Play</h2>
              <p class="text-sm" style="color: hsl(var(--text-secondary));">Jump right in</p>
            </div>
            <button class="shuffle-all-btn px-5 py-2.5 rounded-xl font-semibold text-sm flex items-center gap-2 justify-center"
                    style="background: linear-gradient(135deg, hsl(var(--accent-coral)), hsl(var(--accent-pink))); color: white;"
                    data-action="shuffle-all"
                    onclick="window.pagesActions.shuffleAll()">
              ${Icons.player.shuffle(16)} Shuffle All
            </button>
          </div>
          <div class="flex flex-wrap gap-2">
            ${genres.map(g => `<button class="genre-pill px-4 py-1.5 rounded-full text-xs font-medium transition-all hover:scale-105" style="background: hsl(var(--bg-elevated)); border: 1px solid hsl(var(--border-subtle) / 0.3);" data-genre="${g}" onclick="window.pagesActions.playGenre(this.dataset.genre)">${g}</button>`).join('')}
          </div>
        </div>
      </section>
    `;
  }

  moodMixSection(moods) {
    return `
      <section class="mb-8">
        <h2 class="section-header">Mood Mix</h2>
        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          ${moods.map((mood, i) => `
            <button class="mood-card rounded-xl p-4 text-left transition-all hover:-translate-y-1 animate-fadeInUp"
                    style="background: linear-gradient(135deg, ${mood.gradient}); animation-delay: ${i * 60}ms; border: 1px solid hsl(var(--border-subtle) / 0.2);"
                    data-mood="${mood.key}"
                    onclick="window.pagesActions.playMood(this.dataset.mood)">
              <span class="text-2xl mb-2 block">${mood.emoji}</span>
              <p class="font-bold text-sm">${mood.label}</p>
              <p class="text-xs opacity-70">${mood.desc}</p>
            </button>
          `).join('')}
        </div>
      </section>
    `;
  }

  statsSection(stats) {
    return `
      <section class="mb-8">
        <div class="stats-card rounded-2xl p-5" style="background: hsl(var(--bg-elevated)); border: 1px solid hsl(var(--border-subtle) / 0.2);">
          <h3 class="font-bold text-sm mb-3" style="color: hsl(var(--text-secondary));">Your Library</h3>
          <div class="grid grid-cols-5 gap-3 text-center">
            ${stats.map(s => `
              <div>
                <p class="text-xl font-black" style="color: hsl(var(--accent-coral));">${s.value}</p>
                <p class="text-xs" style="color: hsl(var(--text-secondary));">${s.label}</p>
              </div>
            `).join('')}
          </div>
        </div>
      </section>
    `;
  }

  mixCard(song, index) {
    return `
      <div class="mix-card rounded-2xl p-3 animate-fadeInUp"
           style="background: hsl(var(--bg-elevated)); border: 1px solid hsl(var(--border-subtle) / 0.22); animation-delay: ${index * 50}ms;">
        <div class="flex items-center gap-3">
          <button class="relative" data-song-id="${song.id}">
            <img src="${song.coverUrl}" class="w-16 h-16 rounded-2xl object-cover">
          </button>
          <div class="flex-1 min-w-0">
            <p class="text-xs uppercase tracking-[0.2em] mb-1" style="color: hsl(var(--text-secondary));">For You</p>
            <p class="font-bold text-sm truncate">${song.title}</p>
            <p class="text-xs truncate" style="color: hsl(var(--text-secondary));">${song.artist} • ${song.album}</p>
          </div>
          <button class="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                  style="background: linear-gradient(135deg, hsl(var(--accent-coral)), hsl(var(--accent-pink))); color: white;"
                  data-song-id="${song.id}"
                  onclick="event.stopPropagation(); window.pagesActions.playSong(this.dataset.songId)">
            ${Icons.player.play(14)}
          </button>
        </div>
      </div>
    `;
  }

  render() {
    const state = this.ui.state;
    const allAlbums = state.enrichedLibrary.flatMap(a =>
      a.albums.map(alb => ({ artistId: a.id, artistName: a.artist, albumId: alb.id, albumName: alb.album, coverUrl: alb.coverUrl, genre: a.genre }))
    );
    const allSongs = this.buildAllSongs(state);
    const featured = IdUtils.sample(allAlbums, 15);
    const topPicks = IdUtils.sample(allSongs, 12);
    const spotlight = IdUtils.sample([...state.enrichedLibrary], 10);
    const genres = [...new Set(state.enrichedLibrary.map(a => a.genre).filter(Boolean))];
    const moods = [
      { key: 'chill', label: 'Chill', emoji: '🌊', desc: 'Laid back vibes', gradient: 'hsl(200 60% 25% / 0.5), hsl(220 50% 20% / 0.5)' },
      { key: 'energy', label: 'Energy', emoji: '⚡', desc: 'High intensity', gradient: 'hsl(20 80% 30% / 0.5), hsl(0 70% 25% / 0.5)' },
      { key: 'focus', label: 'Focus', emoji: '🎯', desc: 'Deep concentration', gradient: 'hsl(260 50% 25% / 0.5), hsl(280 40% 20% / 0.5)' },
      { key: 'party', label: 'Party', emoji: '🎉', desc: 'Turn it up', gradient: 'hsl(330 60% 30% / 0.5), hsl(350 50% 25% / 0.5)' },
      { key: 'romance', label: 'Romance', emoji: '💕', desc: 'Love songs', gradient: 'hsl(340 50% 25% / 0.5), hsl(320 40% 20% / 0.5)' }
    ];
    const stats = [
      { label: 'Artists', value: state.enrichedLibrary.length },
      { label: 'Albums', value: state.enrichedLibrary.reduce((sum, artist) => sum + artist.albums.length, 0) },
      { label: 'Songs', value: allSongs.length },
      { label: 'Favs', value: state.favoriteSongs.length + state.favoriteArtists.length + state.favoriteAlbums.length },
      { label: 'Lists', value: state.playlists.length }
    ];
    const newReleases = state.enrichedLibrary.filter(artist => artist.albums.length).slice(0, 8).map(artist => ({
      artistId: artist.id,
      artistName: artist.artist,
      albumId: artist.albums[0].id,
      albumName: artist.albums[0].album,
      coverUrl: artist.albums[0].coverUrl
    }));
    const forYouMix = this.pickForYouMix(state, allSongs);

    return `
      <div class="pb-28 animate-fadeInUp">
        <div class="mb-8">
          <h1 class="font-black text-2xl md:text-3xl lg:text-4xl mb-2">
            Welcome to MyBeats<span style="color: hsl(var(--accent-coral));">™</span>
          </h1>
          <p style="color: hsl(var(--text-secondary));">Streaming & sharing your favorite music for free.</p>
        </div>
        ${this.quickPlaySection(genres)}
        ${this.ui.scrollSection('Discover Albums', featured.map((item, i) => this.ui.albumCard(item.artistId, item.artistName, item.albumId, item.albumName, item.coverUrl, i)))}
        ${this.moodMixSection(moods)}
        ${this.topPicksSection(topPicks)}
        ${this.statsSection(stats)}
        ${newReleases.length ? this.ui.scrollSection('New Releases', newReleases.map((item, i) => this.ui.albumCard(item.artistId, item.artistName, item.albumId, item.albumName, item.coverUrl, i))) : ''}
        ${this.ui.scrollSection('Artist Spotlight', spotlight.map((a, i) => this.ui.artistCard(a, i)))}
        ${forYouMix.length ? `<section class="mb-8"><h2 class="section-header">For You Mix</h2><div class="mix-grid grid grid-cols-1 lg:grid-cols-2 gap-3">${forYouMix.map((song, i) => this.mixCard(song, i)).join('')}</div></section>` : ''}
        ${state.recentlyPlayed.length ? this.ui.scrollSection('Recently Played', state.recentlyPlayed.slice(0, 8).map((s, i) => this.ui.recentCard(s, i))) : ''}
        ${state.playlists.length ? this.playlistsGrid(state.playlists) : ''}
      </div>
    `;
  }

  topPicksSection(songs) {
    return `
      <section class="mb-8">
        <h2 class="section-header">Top Picks for You</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          ${songs.map((s, i) => `
            <button class="song-row w-full animate-fadeInUp rounded-2xl px-3 py-3 text-left" data-song-id="${s.id}" style="animation-delay: ${i * 40}ms; background: hsl(var(--bg-elevated)); border: 1px solid hsl(var(--border-subtle) / 0.2);">
              <img src="${s.coverUrl}" class="w-14 h-14 rounded-2xl object-cover">
              <div class="flex-1 min-w-0 text-left">
                <p class="font-semibold text-sm truncate">${s.title}</p>
                <p class="text-xs truncate" style="color: hsl(var(--text-secondary));">${s.artist} • ${s.album}</p>
              </div>
              <div class="w-10 h-10 rounded-full flex items-center justify-center" style="background: hsl(var(--bg-interactive)); color: hsl(var(--text-secondary));">
                ${Icons.player.play(14)}
              </div>
            </button>
          `).join('')}
        </div>
      </section>
    `;
  }

  playlistsGrid(playlists) {
    const state = this.ui.state;
    return `
      <section class="mb-8">
        <h2 class="section-header">Your Playlists</h2>
        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          ${playlists.map((pl, i) => {
            const preview = pl.songs.map(songId => state.getSongById(songId)).filter(Boolean).slice(0, 4);
            return `
              <div class="rounded-2xl p-3 transition-all cursor-pointer animate-fadeInUp hover:-translate-y-1"
                   style="background: hsl(var(--bg-elevated)); animation-delay: ${i * 50}ms; border: 1px solid hsl(var(--border-subtle) / 0.2);">
                <div class="w-full aspect-square rounded-2xl mb-3 overflow-hidden" style="background: linear-gradient(135deg, hsl(var(--accent-coral) / 0.2), hsl(var(--accent-pink) / 0.15));">
                  ${preview.length ? `
                    <div class="grid grid-cols-2 gap-1 w-full h-full p-1">
                      ${Array.from({ length: 4 }).map((_, idx) => preview[idx]
                        ? `<img src="${preview[idx].coverUrl}" class="w-full h-full rounded-xl object-cover">`
                        : `<div class="rounded-xl" style="background: hsl(var(--bg-interactive));"></div>`).join('')}
                    </div>
                  ` : `<div class="w-full h-full flex items-center justify-center">${Icons.general.playlist(36)}</div>`}
                </div>
                <p class="font-semibold text-sm truncate">${pl.name}</p>
                <p class="text-xs" style="color: hsl(var(--text-secondary));">${pl.songs.length} songs</p>
              </div>
            `;
          }).join('')}
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
                  <p class="text-xs" style="color: hsl(var(--text-secondary));">${artist.genre || 'Artist'} • ${artist.albums.length} albums</p>
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

  emptyState(emoji, title, body) {
    return `
      <div class="empty-card rounded-3xl py-14 px-6 text-center" style="background: hsl(var(--bg-elevated)); border: 1px dashed hsl(var(--border-subtle) / 0.35);">
        <div class="text-5xl mb-4">${emoji}</div>
        <h3 class="text-xl font-bold mb-2">${title}</h3>
        <p class="max-w-sm mx-auto text-sm" style="color: hsl(var(--text-secondary));">${body}</p>
      </div>
    `;
  }

  renderSongCards(songs) {
    return `
      <div class="grid grid-cols-1 xl:grid-cols-2 gap-4">
        ${songs.map((s, i) => `
          <div class="rounded-3xl p-4 animate-fadeInUp"
               style="background: hsl(var(--bg-elevated)); border: 1px solid hsl(var(--border-subtle) / 0.2); animation-delay: ${i * 40}ms;">
            <div class="flex gap-4 items-center">
              <button class="relative flex-shrink-0" data-song-id="${s.id}">
                <img src="${s.coverUrl}" class="w-20 h-20 rounded-2xl object-cover">
              </button>
              <div class="flex-1 min-w-0">
                <p class="text-xs uppercase tracking-[0.2em] mb-1" style="color: hsl(var(--text-secondary));">Favorite Song</p>
                <p class="font-bold text-base truncate">${s.title}</p>
                <p class="text-sm truncate" style="color: hsl(var(--text-secondary));">${s.artist} • ${s.album}</p>
                <div class="flex items-center gap-2 mt-3">
                  <button class="px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-2"
                          style="background: linear-gradient(135deg, hsl(var(--accent-coral)), hsl(var(--accent-pink))); color: white;"
                          data-song-id="${s.id}"
                          onclick="event.stopPropagation(); window.pagesActions.playSong(this.dataset.songId)">
                    ${Icons.player.play(12)} Play
                  </button>
                  <button class="add-to-playlist-btn px-3 py-2 rounded-xl text-xs font-semibold"
                          style="background: hsl(var(--bg-interactive));"
                          data-song-id="${s.id}">
                    + Playlist
                  </button>
                </div>
              </div>
              <button class="song-action-btn ${this.ui.favorites.isSongFavorite(s.id) ? 'favorited' : ''}" data-fav-song="${s.id}">
                ${this.ui.likeStatus('song', this.ui.favorites.isSongFavorite(s.id), false, null)}
              </button>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  renderArtistCards(artists) {
    return `
      <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        ${artists.map((a, i) => `
          <button class="rounded-3xl p-5 text-center animate-fadeInUp transition-all hover:-translate-y-1"
                  style="background: hsl(var(--bg-elevated)); border: 1px solid hsl(var(--border-subtle) / 0.2); animation-delay: ${i * 40}ms"
                  data-artist-id="${a.id}">
            <img src="${a.imageUrl}" class="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover mx-auto mb-4 ring-4" style="--tw-ring-color: hsl(var(--accent-coral) / 0.15);">
            <p class="font-bold truncate">${a.artist}</p>
            <p class="text-xs mt-1" style="color: hsl(var(--text-secondary));">${a.genre || 'Artist'}</p>
          </button>
        `).join('')}
      </div>
    `;
  }

  renderAlbumCards(albums) {
    return `
      <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        ${albums.map((alb, i) => `
          <div class="rounded-3xl p-3 animate-fadeInUp transition-all hover:-translate-y-1 cursor-pointer"
               style="background: hsl(var(--bg-elevated)); border: 1px solid hsl(var(--border-subtle) / 0.2); animation-delay: ${i * 50}ms"
               data-artist-id="${alb.artistId}" data-album-id="${alb.id}">
            <div class="album-cover-wrap mb-3 overflow-hidden rounded-2xl">
              <img src="${alb.coverUrl}" class="w-full aspect-square object-cover transition-transform hover:scale-105">
            </div>
            <p class="font-semibold text-sm truncate">${alb.album}</p>
            <p class="text-xs truncate" style="color: hsl(var(--text-secondary));">${alb.artistName}</p>
          </div>
        `).join('')}
      </div>
    `;
  }

  renderPlaylistCards(playlists) {
    return `
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        ${playlists.map((pl, i) => `
          <div class="rounded-3xl p-5 animate-fadeInUp"
               style="background: hsl(var(--bg-elevated)); border: 1px solid hsl(var(--border-subtle) / 0.2); animation-delay: ${i * 50}ms">
            <div class="flex items-start justify-between gap-4">
              <div>
                <p class="text-xs uppercase tracking-[0.2em] mb-1" style="color: hsl(var(--text-secondary));">Saved Playlist</p>
                <p class="font-bold text-lg">${pl.name}</p>
                <p class="text-sm mt-1" style="color: hsl(var(--text-secondary));">${pl.songs.length} songs</p>
              </div>
              <button onclick="window.favoritesPlaylists.openPlaylistModal()" class="p-2 rounded-full hover:bg-interactive">
                ${Icons.general.moreHoriz(18)}
              </button>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

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
    const totalFavs = tabToCount.songs + tabToCount.artists + tabToCount.albums;
    return `
      <div class="pb-28 animate-fadeInUp">
        <section class="fav-hero rounded-3xl p-6 mb-6" style="background: linear-gradient(135deg, hsl(var(--accent-coral) / 0.18), hsl(var(--accent-pink) / 0.1)); border: 1px solid hsl(var(--border-subtle) / 0.2);">
          <div class="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p class="text-xs uppercase tracking-[0.25em] mb-2" style="color: hsl(var(--text-secondary));">Favorites</p>
              <h1 class="font-black text-2xl md:text-3xl mb-2">Your collection</h1>
              <p style="color: hsl(var(--text-secondary));">All the songs, artists, and albums you never want to lose.</p>
            </div>
            <div class="grid grid-cols-4 gap-3 text-center w-full md:w-auto">
              ${tabs.map(tab => `
                <div class="rounded-2xl px-3 py-3" style="background: hsl(var(--bg-elevated) / 0.8);">
                  <p class="text-lg font-black" style="color: hsl(var(--accent-coral));">${tab.count}</p>
                  <p class="text-[11px]" style="color: hsl(var(--text-secondary));">${tab.label}</p>
                </div>
              `).join('')}
            </div>
          </div>
          <p class="text-sm mt-4" style="color: hsl(var(--text-secondary));">${totalFavs} saved picks across your library.</p>
        </section>
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

    if (tab === 'songs') {
      const songIds = state.favoriteSongs;
      if (!songIds.length) return this.emptyState('🎵', 'No favorite songs yet', 'Tap the heart on any track to build a quick-play collection you can come back to anytime.');
      const songs = songIds.map(id => state.getSongById(id)).filter(Boolean);
      return this.renderSongCards(songs);
    }

    if (tab === 'artists') {
      const artistIds = state.favoriteArtists;
      if (!artistIds.length) return this.emptyState('🎤', 'No favorite artists yet', 'Save the artists you love most and they will show up here with instant access to their discography.');
      const artists = artistIds.map(id => state.getArtistById(id)).filter(Boolean);
      return this.renderArtistCards(artists);
    }

    if (tab === 'albums') {
      const albumIds = state.favoriteAlbums;
      if (!albumIds.length) return this.emptyState('💿', 'No favorite albums yet', 'Mark standout albums to keep your best full-length listens one tap away.');
      const albums = albumIds.map(id => state.getAlbumById(id)).filter(Boolean);
      return this.renderAlbumCards(albums);
    }

    if (tab === 'playlists') {
      return state.playlists.length
        ? this.renderPlaylistCards(state.playlists)
        : this.emptyState('📚', 'No playlists yet', 'Create a playlist to start curating moods, moments, and all your repeat-worthy tracks.');
    }
    return '';
  }
}

class Playlists {
  constructor(ui) { this.ui = ui; }

  render() {
    const state = this.ui.state;
    const totalSongs = state.playlists.reduce((sum, pl) => sum + pl.songs.length, 0);
    return `
      <div class="pb-28 animate-fadeInUp">
        <div class="breadcrumb-toggle-bar">
          <div class="max-w-7xl mx-auto flex justify-center">
            <button id="breadcrumb-toggle">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
            </button>
          </div>
        </div>
        <section class="play-hero rounded-3xl p-6 mb-6" style="background: linear-gradient(135deg, hsl(var(--accent-coral) / 0.18), hsl(var(--accent-pink) / 0.1)); border: 1px solid hsl(var(--border-subtle) / 0.2);">
          <div class="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p class="text-xs uppercase tracking-[0.25em] mb-2" style="color: hsl(var(--text-secondary));">Playlists</p>
              <h1 class="font-black text-2xl md:text-3xl mb-2">Your Playlists</h1>
              <p style="color: hsl(var(--text-secondary));">Shape your soundtrack with hand-picked collections and shareable moments.</p>
            </div>
            <div class="flex flex-wrap gap-3 items-center">
              <div class="rounded-2xl px-4 py-3 text-center" style="background: hsl(var(--bg-elevated) / 0.82);">
                <p class="text-xl font-black" style="color: hsl(var(--accent-coral));">${state.playlists.length}</p>
                <p class="text-xs" style="color: hsl(var(--text-secondary));">Playlists</p>
              </div>
              <div class="rounded-2xl px-4 py-3 text-center" style="background: hsl(var(--bg-elevated) / 0.82);">
                <p class="text-xl font-black" style="color: hsl(var(--accent-coral));">${totalSongs}</p>
                <p class="text-xs" style="color: hsl(var(--text-secondary));">Songs</p>
              </div>
              <button id="create-playlist-btn" class="px-4 py-2 rounded-xl font-semibold"
                      style="background: linear-gradient(135deg, hsl(var(--accent-coral)), hsl(var(--accent-pink))); color: white;">
                + New Playlist
              </button>
            </div>
          </div>
        </section>
        <div class="space-y-6" id="playlists-container">
          ${state.playlists.map(pl => this.playlistViewer(pl)).join('')}
        </div>
      </div>
    `;
  }

  playlistViewer(pl) {
    const state = this.ui.state;
    const previewSongs = pl.songs.map(songId => state.getSongById(songId)).filter(Boolean).slice(0, 4);
    const songIds = pl.songs;
    const songList = songIds.length
      ? songIds.map((songId, i) => {
          const song = state.getSongById(songId);
          if (!song) return '';
          return `
            <div class="song-row w-full group animate-fadeIn rounded-2xl px-3 py-3" style="animation-delay: ${i * 20}ms; background: hsl(var(--bg-interactive) / 0.35);" data-song-id="${song.id}">
              <div class="w-7 text-xs font-bold text-center" style="color: hsl(var(--text-secondary));">${i + 1}</div>
              <img src="${song.coverUrl}" class="w-10 h-10 rounded-xl object-cover">
              <div class="flex-1 min-w-0 text-left">
                <p class="font-medium text-sm truncate">${song.title}</p>
                <p class="text-xs truncate" style="color: hsl(var(--text-secondary));">${song.artist}</p>
              </div>
              <p class="text-[11px] hidden sm:block" style="color: hsl(var(--text-secondary));">${song.duration || ''}</p>
              <button class="remove-from-playlist-btn p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all hover:bg-destructive/20"
                      data-playlist-id="${pl.id}" data-song-id="${song.id}">
                ${Icons.general.close(14)}
              </button>
            </div>
          `;
        }).join('')
      : `<p class="text-sm italic py-6 text-center" style="color: hsl(var(--text-secondary));">No songs yet. Click the ⋮ menu on any song to add.</p>`;

    return `
      <div class="playlist-card rounded-3xl p-5 transition-all relative overflow-hidden" data-playlist-id="${pl.id}" style="background: hsl(var(--bg-elevated)); border: 1px solid hsl(var(--border-subtle) / 0.2);">
        <div class="absolute inset-x-0 top-0 h-1.5" style="background: linear-gradient(135deg, hsl(var(--accent-coral)), hsl(var(--accent-pink)));"></div>
        <div class="flex flex-col lg:flex-row items-start gap-5">
          <div class="w-full lg:w-32 lg:flex-shrink-0">
            <div class="rounded-3xl overflow-hidden aspect-square" style="background: linear-gradient(135deg, hsl(var(--accent-coral) / 0.2), hsl(var(--accent-pink) / 0.15));">
              ${previewSongs.length ? `
                <div class="grid grid-cols-2 gap-1 w-full h-full p-1">
                  ${Array.from({ length: 4 }).map((_, idx) => previewSongs[idx]
                    ? `<img src="${previewSongs[idx].coverUrl}" class="w-full h-full rounded-2xl object-cover">`
                    : `<div class="rounded-2xl" style="background: hsl(var(--bg-interactive));"></div>`).join('')}
                </div>
              ` : `<div class="w-full h-full flex items-center justify-center">${Icons.general.playlist(40)}</div>`}
            </div>
          </div>
          <div class="flex-1 min-w-0 w-full">
            <div class="flex items-start justify-between gap-3">
              <div class="flex-1 min-w-0">
                <input type="text"
                       class="playlist-name-input text-2xl font-black bg-transparent border-b border-transparent hover:border-interactive focus:border-accent-coral outline-none w-full mb-2"
                       value="${pl.name.replace(/"/g, '&quot;')}"
                       data-playlist-id="${pl.id}" data-field="name" placeholder="Playlist name">
                <p class="text-xs uppercase tracking-[0.25em] mb-3" style="color: hsl(var(--text-secondary));">${pl.songs.length} tracks curated</p>
              </div>
              <button class="share-playlist-btn p-2 rounded-full hover:bg-interactive flex-shrink-0" data-playlist-id="${pl.id}">
                ${Icons.general.share(18)}
              </button>
            </div>
            <textarea class="playlist-description-input text-sm bg-transparent border border-interactive rounded-2xl p-3 w-full"
                      placeholder="Add a description..."
                      data-playlist-id="${pl.id}" data-field="description" rows="2">${pl.description?.replace(/"/g, '&quot;') || ''}</textarea>
            <div class="tags-container flex flex-wrap gap-2 mt-3" data-playlist-id="${pl.id}">
              ${(pl.tags || []).map(tag => `
                <span class="tag-chip px-3 py-1 rounded-full text-xs flex items-center gap-1 animate-fadeIn"
                      style="background: hsl(var(--bg-interactive));">
                  ${tag}
                  <button class="remove-tag-btn hover:text-destructive transition-colors"
                          data-tag="${tag.replace(/"/g, '&quot;')}">×</button>
                </span>
              `).join('')}
              <input type="text"
                     class="tag-input bg-transparent border-b border-interactive outline-none text-sm"
                     placeholder="Add tag + Enter" data-playlist-id="${pl.id}">
            </div>
            <div class="mt-5">
              <div class="flex items-center justify-between mb-3">
                <h3 class="text-sm font-semibold uppercase tracking-wider" style="color: hsl(var(--text-secondary));">
                  Songs · ${pl.songs.length}
                </h3>
                <p class="text-xs" style="color: hsl(var(--text-secondary));">Drag the vibe forward</p>
              </div>
              <div class="space-y-2 max-h-72 overflow-y-auto custom-scrollbar pr-2">${songList}</div>
            </div>
          </div>
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
    .map(id => state.getArtistById(id))
    .filter(Boolean);
  const rows = [
    similarArtists.slice(0, 4),
    similarArtists.slice(4, 8),
    similarArtists.slice(8, 12)
  ];

  return `
<div data-page="artist" class="artist-page animate-fadeInUp">

 <div id="stickyWrapper">
  <div class="area albumTabs">
    <div><div>
      ${artist.albums.map(alb => `
        <button data-dynamic="true"
                class="albumTab ${alb.id === activeAlbum.id ? 'active' : ''}"
                data-artist-id="${artist.id}"
                data-album-id="${alb.id}">
          ${alb.album}
        </button>
      `).join('')}
    </div></div>
  </div>

  <div data-area="songsList" class="heroWrap">
    <div class="hero">
      <img src="${activeAlbum.coverUrl}" alt="${activeAlbum.album}">
      <div class="heroScrim"></div>
    </div>
    <div class="heroBody">
      <div class="metaData">
        <h1 class="name">${artist.artist}</h1>
        <button class="artistHeartBtn ${this.ui.favorites.isArtistFavorite(artist.id) ? 'favorited' : ''}"
                data-artist-heart="${artist.id}">
          ${this.ui.likeStatus('artist', this.ui.favorites.isArtistFavorite(artist.id), false, null)}
        </button>
      </div>
      <div class="albumInfo">
        <h2 class="name">${activeAlbum.album}</h2>
        <span class="stats">${activeAlbum.songs.length} tracks</span>
      </div>
      <button class="play"
              data-play-album='${JSON.stringify({ artistId: artist.id, albumId: activeAlbum.id })}'>
        ${Icons.player.play(16)} Play All
      </button>
    </div>
  </div>
 </div>

 
  <div class="songsList">
    <div class="header">
      <div class="subHeader">
        <span class="tag">Track List</span>
        <h3 class="title">Album cuts</h3>
      </div>
      <span class="hint">Double click to play</span>
    </div>
    <div class="body">
      ${activeAlbum.songs.map((song, i) => this.createSongRow(song, i, artist, activeAlbum)).join('')}
    </div>
  </div>

  ${similarIds.length ? this.similarMarquee(rows, artist.id) : ''}
</div>

<div style="height: 200px;"></div>
  `;
}

createSongRow(song, index, artist, album) {
  const isFav = this.ui.favorites.isSongFavorite(song.id);
  const isPlaying = this.ui.state.currentSong?.id == song.id;
  return `
    <div class="songItem ${isPlaying ? 'playing' : ''}"
         data-song-id="${song.id}"
         data-context='${JSON.stringify({ artistId: artist.id, albumId: album.id })}'>
     
     <div class="left">
      <div class="trackNum">${index + 1}</div>
      <div class="play">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><polygon points="5,3 19,12 5,21"/></svg>
      </div>
     </div>
     
      <div class="center">
        <div class="title">${song.title}</div>
      </div>

     <div class="right">
      <div class="time">${song.duration}</div>
      <button class="heart ${isFav ? 'favorited' : ''}" data-fav-song="${song.id}">
        ${this.ui.likeStatus('song', isFav, false, null)}
      </button>
      <button class="moreMenu" data-more-song="${song.id}">
        ${Icons.general.moreVert(18)}
      </button>
     </div>
     
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

if (typeof window !== 'undefined') {
  window.pagesActions = {
    buildSongs() {
      const state = window.uiManager?.state || window.state;
      if (!state?.enrichedLibrary) return [];
      return state.enrichedLibrary.flatMap(artist =>
        artist.albums.flatMap(album =>
          album.songs.map(song => ({
            ...song,
            artistId: artist.id,
            albumId: album.id,
            artist: artist.artist,
            album: album.album,
            coverUrl: album.coverUrl,
            artistImageUrl: artist.imageUrl,
            genre: artist.genre || ''
          }))
        )
      );
    },
    playQueue(queue, index = 0, label = '') {
      if (!queue.length || !window.uiManager?.audioPlayer) return;
      const safeIndex = Math.max(0, Math.min(index, queue.length - 1));
      window.uiManager.audioPlayer.playSong(queue[safeIndex], queue, true);
      if (label) (window.uiManager?.state || window.state)?.showToast?.(label);
    },
    playSong(songId) {
      const state = window.uiManager?.state || window.state;
      const song = state?.getSongById?.(songId);
      if (song && window.uiManager?.audioPlayer) window.uiManager.audioPlayer.playSong(song, null, true);
    },
    shuffleAll() {
      const songs = IdUtils.sample(this.buildSongs(), this.buildSongs().length);
      this.playQueue(songs, 0, 'Shuffling your whole library');
    },
    playGenre(genre) {
      const genreSongs = this.buildSongs().filter(song => String(song.genre).toLowerCase() === String(genre).toLowerCase());
      if (!genreSongs.length) return;
      const pick = IdUtils.sample(genreSongs, 1)[0];
      this.playSong(pick.id);
      (window.uiManager?.state || window.state)?.showToast?.(`Playing ${genre}`);
    },
    playMood(mood) {
      const moodMap = {
        chill: ['pop', 'indie', 'acoustic', 'r&b', 'soul'],
        energy: ['dance', 'electronic', 'edm', 'hip hop', 'rock', 'pop'],
        focus: ['indie', 'acoustic', 'classical', 'instrumental', 'alternative'],
        party: ['dance', 'electronic', 'club', 'pop', 'hip hop'],
        romance: ['r&b', 'soul', 'ballad', 'pop', 'love']
      };
      const tags = moodMap[mood] || [];
      const allSongs = this.buildSongs();
      const filtered = allSongs.filter(song => tags.some(tag => String(song.genre).toLowerCase().includes(tag)));
      const queue = IdUtils.sample(filtered.length ? filtered : allSongs, Math.min(12, (filtered.length ? filtered : allSongs).length));
      this.playQueue(queue, 0, `${mood.charAt(0).toUpperCase() + mood.slice(1)} mix loaded`);
    }
  };
}