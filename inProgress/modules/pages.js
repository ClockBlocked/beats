






/***********************************************
          *******  H O M E  ********
***********************************************/
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
      <section data-area="quick-play" class="section">
        <div class="hero">
          <div class="top">
            <div class="heading">
              <h2 class="title">Quick Play</h2>
              <p class="sub">Jump right in</p>
            </div>
            <button class="shuffle"
                    data-action="shuffle-all"
                    onclick="window.pagesActions.shuffleAll()">
              ${Icons.player.shuffle(16)} Shuffle All
            </button>
          </div>
          <div data-list="genres" class="pills">
            ${genres.map(g => `<button class="pill" data-genre="${g}" onclick="window.pagesActions.playGenre(this.dataset.genre)">${g}</button>`).join('')}
          </div>
        </div>
      </section>
    `;
  }

  moodMixSection(moods) {
    return `
      <section data-area="moods" class="section">
        <h2 class="section-header">Mood Mix</h2>
        <div data-list="moods" class="grid">
          ${moods.map((mood, i) => `
            <button data-card="mood" class="card animate-fadeInUp"
                    style="--g: ${mood.gradient}; --d: ${i * 60}ms;"
                    data-mood="${mood.key}"
                    onclick="window.pagesActions.playMood(this.dataset.mood)">
              <span class="emoji">${mood.emoji}</span>
              <p class="label">${mood.label}</p>
              <p class="desc">${mood.desc}</p>
            </button>
          `).join('')}
        </div>
      </section>
    `;
  }

  statsSection(stats) {
    return `
      <section data-area="stats" class="section">
        <div class="card">
          <h3 class="title">Your Library</h3>
          <div data-list="stats" class="grid">
            ${stats.map(s => `
              <div class="stat">
                <p class="value">${s.value}</p>
                <p class="label">${s.label}</p>
              </div>
            `).join('')}
          </div>
          <button class="stats-dash-btn" onclick="window.pagesActions.openStatsDashboard()">View listening stats</button>
        </div>
      </section>
    `;
  }

  mixCard(song, index) {
    return `
      <div data-card="mix" class="card animate-fadeInUp" style="--d: ${index * 50}ms;">
        <div class="row">
          <button class="cover" data-song-id="${song.id}" data-play-source="home">
            <img src="${song.coverUrl}">
          </button>
          <div class="info">
            <p class="kicker">For You</p>
            <p class="title">${song.title}</p>
            <p class="sub">${song.artist} • ${song.album}</p>
          </div>
          <button class="play"
                  data-song-id="${song.id}"
                  onclick="event.stopPropagation(); window.pagesActions.playSong(this.dataset.songId, 'home')">
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
  { key: 'chill',   label: 'Chill',   emoji: '🌊', desc: 'Laid back vibes',     gradient: 'rgba(26, 77, 102, 0.5), rgba(46, 66, 92, 0.5)' },
  { key: 'energy',  label: 'Energy',  emoji: '⚡', desc: 'High intensity',      gradient: 'rgba(191, 56, 20, 0.5), rgba(191, 0, 38, 0.5)' },
  { key: 'focus',   label: 'Focus',   emoji: '🎯', desc: 'Deep concentration',  gradient: 'rgba(81, 48, 128, 0.5), rgba(102, 36, 128, 0.5)' },
  { key: 'party',   label: 'Party',   emoji: '🎉', desc: 'Turn it up',          gradient: 'rgba(204, 0, 77, 0.5), rgba(191, 48, 64, 0.5)' },
  { key: 'romance', label: 'Romance', emoji: '💕', desc: 'Love songs',          gradient: 'rgba(191, 0, 77, 0.5), rgba(179, 26, 77, 0.5)' }
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
      <div data-page="home" class="page animate-fadeInUp">
        <div data-area="welcome" class="welcome">
          <h1 class="title">
            Welcome to MyBeats<span class="accent">™</span>
          </h1>
          <p class="sub">Streaming & sharing your favorite music for free.</p>
        </div>
        ${this.quickPlaySection(genres)}
        ${this.ui.scrollSection('Discover Albums', featured.map((item, i) => this.ui.albumCard(item.artistId, item.artistName, item.albumId, item.albumName, item.coverUrl, i)))}
        ${this.moodMixSection(moods)}
        ${this.topPicksSection(topPicks)}
        ${this.mostPlayedSection()}
        ${this.statsSection(stats)}
        ${newReleases.length ? this.ui.scrollSection('New Releases', newReleases.map((item, i) => this.ui.albumCard(item.artistId, item.artistName, item.albumId, item.albumName, item.coverUrl, i))) : ''}
        ${this.ui.scrollSection('Artist Spotlight', spotlight.map((a, i) => this.ui.artistCard(a, i)))}
        ${forYouMix.length ? `<section data-area="for-you" class="section"><h2 class="section-header">For You Mix</h2><div data-list="mixes" class="grid">${forYouMix.map((song, i) => this.mixCard(song, i)).join('')}</div></section>` : ''}
        ${state.recentlyPlayed.length ? this.ui.scrollSection('Recently Played', state.recentlyPlayed.slice(0, 8).map((s, i) => this.ui.recentCard(s, i))) : ''}
        ${state.playlists.length ? this.playlistsGrid(state.playlists) : ''}
      </div>
    `;
  }

  topPicksSection(songs) {
    return `
      <section data-area="top-picks" class="section">
        <h2 class="section-header">Top Picks for You</h2>
        <div data-list="songs" class="grid">
          ${songs.map((s, i) => `
            <button class="song-row animate-fadeInUp" style="--d: ${i * 40}ms;" data-song-id="${s.id}" data-play-source="home">
              <img src="${s.coverUrl}" class="cover">
              <div class="info">
                <p class="title">${s.title}</p>
                <p class="sub">${s.artist} • ${s.album}</p>
              </div>
              <div class="icon">
                ${Icons.player.play(14)}
              </div>
            </button>
          `).join('')}
        </div>
      </section>
    `;
  }

  mostPlayedSection() {
    const state = this.ui.state;
    if (!state.playCounts || Object.keys(state.playCounts).length < 3) return '';
    const songs = state.getMostPlayed(8);
    if (!songs.length) return '';
    return `
      <section data-area="most-played" class="section">
        <h2 class="section-header">Most Played</h2>
        <div data-list="songs" class="grid">
          ${songs.map((s, i) => `
            <button class="song-row animate-fadeInUp" style="--d: ${i * 40}ms;" data-song-id="${s.id}" data-play-source="home">
              <img src="${s.coverUrl}" class="cover">
              <div class="info">
                <p class="title">${s.title}</p>
                <p class="sub">${s.artist} • ${s.album}</p>
              </div>
              <span class="most-played-count">${state.getPlayCount(s.id)} plays</span>
            </button>
          `).join('')}
        </div>
      </section>
    `;
  }

  statsDashboard() {
    const state = this.ui.state;
    const stats = state.listenStats || { totalSeconds: 0, plays: 0, perArtist: {}, perSong: {} };
    const totalSeconds = Math.round(stats.totalSeconds || 0);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const timeLabel = hours ? `${hours}h ${minutes}m` : `${minutes}m`;
    const topArtists = state.getTopArtistsByPlays(5);
    const topSongs = state.getTopSongsByTime(5);
    const fmtSecs = (secs) => {
      const s = Math.round(secs);
      const h = Math.floor(s / 3600);
      const m = Math.floor((s % 3600) / 60);
      return h ? `${h}h ${m}m` : `${m}m`;
    };
    const emptyState = `
      <div class="empty">
        No listening data yet — play some music!
      </div>
    `;
    return `
      <div data-modal="stats" class="stats-dash">
        <div class="head">
          <h2 class="title">Listening Stats</h2>
          <button onclick="window.closeModal()" class="close">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M18 6L6 18M6 6l12 12"/></svg>
          </button>
        </div>
        <div class="stats-total-grid">
          <div class="stats-total-card">
            <p class="stats-total-value">${timeLabel}</p>
            <p class="stats-total-label">Total listening time</p>
          </div>
          <div class="stats-total-card">
            <p class="stats-total-value">${stats.plays || 0}</p>
            <p class="stats-total-label">Total plays</p>
          </div>
        </div>
        ${!topArtists.length && !topSongs.length ? emptyState : `
          <div class="stats-dash-grid">
            <div class="stats-dash-col">
              <h3 class="stats-dash-heading">Top Artists</h3>
              ${topArtists.length ? topArtists.map((entry, i) => `
                <div class="stats-dash-row" data-artist-id="${entry.artist.id}">
                  <span class="stats-dash-rank">${i + 1}</span>
                  <img src="${entry.artist.imageUrl}" class="stats-dash-thumb" alt="${entry.artist.artist}">
                  <div class="stats-dash-info">
                    <p class="stats-dash-title">${entry.artist.artist}</p>
                    <p class="stats-dash-sub">${entry.plays} plays</p>
                  </div>
                </div>
              `).join('') : '<p class="stats-dash-empty">No artist plays yet</p>'}
            </div>
            <div class="stats-dash-col">
              <h3 class="stats-dash-heading">Top Songs</h3>
              ${topSongs.length ? topSongs.map((entry, i) => `
                <div class="stats-dash-row">
                  <span class="stats-dash-rank">${i + 1}</span>
                  <img src="${entry.song.coverUrl}" class="stats-dash-thumb stats-dash-thumb-square" alt="${entry.song.title}">
                  <div class="stats-dash-info">
                    <p class="stats-dash-title">${entry.song.title}</p>
                    <p class="stats-dash-sub">${fmtSecs(entry.seconds)} listened</p>
                  </div>
                </div>
              `).join('') : '<p class="stats-dash-empty">No songs tracked yet</p>'}
            </div>
          </div>
        `}
      </div>
    `;
  }

  playlistsGrid(playlists) {
    const state = this.ui.state;
    return `
      <section data-area="playlists" class="section">
        <h2 class="section-header">Your Playlists</h2>
        <div data-list="playlists" class="grid">
          ${playlists.map((pl, i) => {
            const preview = pl.songs.map(songId => state.getSongById(songId)).filter(Boolean).slice(0, 4);
            return `
              <div data-card="playlist" class="card animate-fadeInUp" style="--d: ${i * 50}ms;" data-playlist-view="${pl.name}">
                <div class="playlist-card-cover cover">
                  ${preview.length ? `
                    <div class="mosaic">
                      ${Array.from({ length: 4 }).map((_, idx) => preview[idx]
                        ? `<img src="${preview[idx].coverUrl}" class="thumb">`
                        : `<div class="cell"></div>`).join('')}
                    </div>
                  ` : `<div class="placeholder">${Icons.general.playlist(36)}</div>`}
                  <button class="playlist-play-overlay" data-playlist-play="${pl.id}" title="Play playlist">
                    ${Icons.player.play(18)}
                  </button>
                </div>
                <p class="name">${pl.name}</p>
                <p class="count">${pl.songs.length} songs</p>
              </div>
            `;
          }).join('')}
        </div>
      </section>
    `;
  }
}
/***********************************************************************************
***********************************************************************************/








/***********************************************
        *******  L I B R A R Y  ********
***********************************************/
class Library {
  constructor(ui) { this.ui = ui; }

  render() {
    const state = this.ui.state;
    return `
      <div data-page="library" class="page animate-fadeInUp">
        <div class="stack">
          ${state.enrichedLibrary.map((artist, i) => `
            <section data-area="artist" class="artist animate-fadeInUp" style="--d: ${i * 80}ms">
              <button class="head" data-artist-id="${artist.id}">
                <img src="${artist.imageUrl}" class="avatar">
                <div class="info">
                  <h4 class="name">${artist.artist}</h4>
                  <p class="sub">${artist.genre || 'Artist'} • ${artist.albums.length} albums</p>
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
/***********************************************************************************
***********************************************************************************/







/***********************************************
      *******  P L A Y L I S T S  ********
***********************************************/
class Playlists {
  constructor(ui) { this.ui = ui; }

  render() {
    const state = this.ui.state;
    const viewing = state.selectedPlaylistName;
    return `
      <div data-page="playlists" class="page animate-fadeInUp">
        <div class="head">
          <div class="heading">
            <p class="kicker">Playlists</p>
            <h1 class="title">${viewing || 'Your mixes'}</h1>
            <p class="sub">Curate albums, moods, and artist journeys you can revisit anytime.</p>
          </div>
          <button id="create-playlist-btn" class="create"
                  onclick="window.uiManager.showSpinner(); setTimeout(() => { document.getElementById('create-playlist-modal')?.classList.remove('hidden'); window.uiManager.hideSpinner(); }, window.uiManager.fragmentLoadDelay);">
            + Create
          </button>
        </div>
        ${viewing ? this.playlistViewer(viewing) : this.playlistsGrid()}
      </div>
    `;
  }

  playlistsGrid() {
    const state = this.ui.state;
    if (!state.playlists.length) {
      return `
        <div class="empty">
          <div class="icon">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>
          </div>
          <h3 class="title">No playlists yet</h3>
          <p class="desc">Create your first playlist to organize your favorite songs</p>
        </div>
      `;
    }
    return `
      <div data-list="playlists" class="grid">
        ${state.playlists.map((pl, i) => {
          const previewSongs = pl.songs.map(id => state.getSongById(id)).filter(Boolean).slice(0, 3);
          return `
            <div data-card="playlist" class="card animate-fadeInUp" style="--d: ${i * 60}ms" data-playlist-view="${pl.name}">
              <div class="head">
                <div class="heading">
                  <p class="kicker">Playlist</p>
                  <p class="name">${pl.name}</p>
                  <p class="count">${pl.songs.length} songs</p>
                </div>
                <div class="actions">
                  <button class="playlist-card-play" data-playlist-play="${pl.id}" title="Play playlist">
                    ${Icons.player.play(14)}
                  </button>
                  <button class="more" onclick="event.stopPropagation(); window.favoritesPlaylists.openPlaylistModal()">
                    ${Icons.general.moreHoriz(18)}
                  </button>
                </div>
              </div>
              <div class="previews">
                ${previewSongs.map(s => `<img src="${s.coverUrl}" class="thumb">`).join('')}
                ${pl.songs.length > 3 ? `<div class="extra">+${pl.songs.length - 3}</div>` : ''}
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `;
  }

  playlistViewer(name) {
    const state = this.ui.state;
    const playlist = state.playlists.find(p => p.name === name);
    if (!playlist) return `<div class="missing">Playlist not found</div>`;
    const songs = playlist.songs.map(id => state.getSongById(id)).filter(Boolean);
    return `
      <div data-area="viewer" class="viewer">
        <div class="head">
          <div class="heading">
            <p class="kicker">Playlist</p>
            <h2 class="title">${playlist.name}</h2>
            <p class="sub">${songs.length} songs • curated by you</p>
          </div>
          <div class="actions">
            <button class="playlist-hero-btn" data-playlist-play="${playlist.id}" title="Play playlist">
              ${Icons.player.play(14)} <span>Play</span>
            </button>
            <button class="playlist-hero-btn playlist-hero-btn-alt" data-playlist-shuffle="${playlist.id}" title="Shuffle playlist">
              ${Icons.player.shuffle(14)} <span>Shuffle</span>
            </button>
            <button class="share-playlist-btn share" data-playlist-id="${playlist.id}">
              Share
            </button>
          </div>
        </div>
        <div data-list="songs" class="rows">
          ${songs.map((s, i) => `
            <div class="song-row" data-song-id="${s.id}" data-playlist-id="${playlist.id}" data-play-source="playlist">
              <span class="num">${i + 1}</span>
              <img src="${s.coverUrl}" class="cover">
              <div class="info">
                <p class="title">${s.title}</p>
                <p class="sub">${s.artist}</p>
              </div>
              <button class="downloadBtn" data-action="download-song" data-song-id="${s.id}" data-song-title="${s.title}" data-song-thumbnail="${s.coverUrl}" title="Download">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                  <polyline points="7 10 12 15 17 10"/>
                  <line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
              </button>
              <p class="time">${s.duration}</p>
              <button class="remove-from-playlist-btn remove" data-playlist-id="${playlist.id}" data-song-id="${s.id}">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M18 6L6 18M6 6l12 12"/></svg>
              </button>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }
}
/***********************************************************************************
***********************************************************************************/








/***********************************************
      *******  F A V O R I T E S  ********
***********************************************/
class Favorites {
  constructor(ui) { this.ui = ui; }

  emptyState(emoji, title, desc) {
    return `
      <div class="empty animate-fadeInUp">
        <div class="icon">${emoji}</div>
        <h3 class="title">${title}</h3>
        <p class="desc">${desc}</p>
      </div>
    `;
  }

  renderSongCards(songs) {
    return `
      <div data-list="songs" class="rows">
        ${songs.map((s, i) => `
          <div class="row animate-fadeInUp" style="--d: ${i * 40}ms">
            <button class="cover" data-song-id="${s.id}" data-play-source="favorites">
              <img src="${s.coverUrl}">
            </button>
            <div class="info">
              <p class="title">${s.title}</p>
              <p class="sub">${s.artist} • ${s.album}</p>
              <p class="time">${s.duration}</p>
            </div>
            <div class="actions">
              <button class="play" title="Play"
                      data-song-id="${s.id}"
                      onclick="event.stopPropagation(); window.pagesActions.playSong(this.dataset.songId, 'favorites')">
                ${Icons.player.play(14)}
              </button>
              <button class="downloadBtn" data-action="download-song" data-song-id="${s.id}" data-song-title="${s.title}" data-song-thumbnail="${s.coverUrl}" title="Download">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                  <polyline points="7 10 12 15 17 10"/>
                  <line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
              </button>
              <button class="heart ${this.ui.favorites.isSongFavorite(s.id) ? 'favorited' : ''}" data-fav-song="${s.id}">
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
      <div data-list="artists" class="grid">
        ${artists.map((a, i) => `
          <button data-card="artist" class="card animate-fadeInUp" style="--d: ${i * 40}ms" data-artist-id="${a.id}">
            <img src="${a.imageUrl}" class="avatar">
            <p class="name">${a.artist}</p>
            <p class="sub">${a.genre || 'Artist'}</p>
          </button>
        `).join('')}
      </div>
    `;
  }

  renderAlbumCards(albums) {
    return `
      <div data-list="albums" class="grid">
        ${albums.map((alb, i) => `
          <div data-card="album" class="card animate-fadeInUp" style="--d: ${i * 50}ms" data-artist-id="${alb.artistId}" data-album-id="${alb.id}">
            <div class="album-cover-wrap wrap">
              <img src="${alb.coverUrl}" class="cover">
            </div>
            <p class="title">${alb.album}</p>
            <p class="sub">${alb.artistName}</p>
          </div>
        `).join('')}
      </div>
    `;
  }

  renderPlaylistCards(playlists) {
    return `
      <div data-list="playlists" class="grid">
        ${playlists.map((pl, i) => `
          <div data-card="playlist" class="card animate-fadeInUp" style="--d: ${i * 50}ms">
            <div class="row">
              <div class="heading">
                <p class="kicker">Saved Playlist</p>
                <p class="name">${pl.name}</p>
                <p class="count">${pl.songs.length} songs</p>
              </div>
              <div class="actions">
                <button class="playlist-card-play" data-playlist-play="${pl.id}" title="Play playlist">
                  ${Icons.player.play(14)}
                </button>
                <button class="more" onclick="window.favoritesPlaylists.openPlaylistModal()">
                  ${Icons.general.moreHoriz(18)}
                </button>
              </div>
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
      <div data-page="favorites" class="page animate-fadeInUp">
        <section data-area="hero" class="hero">
          <div class="wrap">
            <div class="heading">
              <p class="kicker">Favorites</p>
              <h1 class="title">Your collection</h1>
              <p class="sub">All the songs, artists, and albums you never want to lose.</p>
            </div>
            <div data-list="stats" class="stats">
              ${tabs.map(tab => `
                <div class="stat">
                  <p class="value">${tab.count}</p>
                  <p class="label">${tab.label}</p>
                </div>
              `).join('')}
            </div>
          </div>
          <p class="total">${totalFavs} saved picks across your library.</p>
        </section>
        <div data-area="tabs" class="tabs">
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
/***********************************************************************************
***********************************************************************************/
/***********************************************
        *******  A R T I S T S  ********
***********************************************/
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
<div class="artist-page" data-page="artist">

        <div class="artist-meta">
          <h4 class="artist-name">${artist.artist}</h4>
          <button class="artist-heart ${this.ui.favorites.isArtistFavorite(artist.id) ? 'favorited' : ''}"
                  data-artist-heart="${artist.id}">
            ${this.ui.likeStatus('artist', this.ui.favorites.isArtistFavorite(artist.id), false, null)}
          </button>
        </div>


  <div data-area="about">
    ${this.aboutSection(artist, activeAlbum)}
  </div>
  ${similarIds.length ? this.similarMarquee(rows, artist.id) : ''}
  <div class="spacer"></div>
</div>
    `;
  }

  aboutSection(artist, activeAlbum) {
    return `
    <div data-area="albums" class="area albumTabs">
      ${artist.albums.map(alb => `
        <button class="albumTab ${alb.id === activeAlbum.id ? 'active' : ''}"
                data-artist-id="${artist.id}"
                data-album-id="${alb.id}"
                onclick="window.uiManager.refreshArtistContent('${artist.id}', '${alb.id}')">
          ${alb.album}
        </button>
      `).join('')}
    </div>


    <div data-area="hero" class="hero-card">

      <div class="hero-cover">
        <img src="${activeAlbum.coverUrl}" alt="${activeAlbum.album}">
        <div class="heroFade"></div>
        <div class="hero-scrim"></div>
      </div>


      <div class="hero-body">


        <div class="album-meta">
          <h3 class="album-title">${activeAlbum.album}</h3><br>
          <span class="track-count">${activeAlbum.songs.length} tracks</span>
        </div>

        <button class="play-all"
                data-play-album='${JSON.stringify({ artistId: artist.id, albumId: activeAlbum.id })}'>
          ${Icons.player.play(16)} Shuffle
        </button>

      </div>


      <div data-list="songs" class="pages artist mobile">

        <div class="header">
          <div class="left">
            <span class="badge">Double Platinum</span>
            <span class="year">${activeAlbum.year || '2024'}</span>
          </div>
          <span class="hint">Double-click</span>
        </div>

        <div class="body">
          ${activeAlbum.songs.map((song, i) => this.createSongRow(song, i, artist, activeAlbum)).join('')}
        </div>

      </div>



    </div>
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
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="1.5" fill="currentColor" fill-opacity="0.1"/>
              <polygon points="10,7 17,12 10,17" fill="currentColor"/>
            </svg>
          </div>
        </div>
        <div class="center">
          <div class="title">
            <span>${song.title}</span>
          </div>
        </div>
        <div class="right">
          <div class="time">${song.duration}</div>
          <button class="heart ${isFav ? 'favorited' : ''}" data-fav-song="${song.id}">
            ${this.ui.likeStatus('song', isFav, false, null)}
          </button>
          <button class="downloadBtn" data-action="download-song" data-song-id="${song.id}" data-song-title="${song.title}" data-song-thumbnail="${album.coverUrl}" title="Download">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="7 10 12 15 17 10"/>
              <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
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
            <span class="artist-name-pill animate-fadeIn" data-artist-id="${a.id}" data-artist-name="${a.artist}"
                  onclick="window.uiManager.showSpinner(); setTimeout(() => { window.uiManager.contentEvents.showArtistPopover('${a.id}', event); window.uiManager.hideSpinner(); }, window.uiManager.popoverDelay);">
              ${a.artist}
            </span>
          `).join('')}
        </div>
      </div>
    `;
    return `
      <div data-area="similar" class="similar-artists-section">
        <h5 class="similar-artists-title">Listen to similar Artists</h5>
        ${rows.map((row, i) => row.length ? marquee(row, ...configs[i]) : '').join('')}
      </div>
    `;
  }
}
/***********************************************************************************
***********************************************************************************/








/***********************************************
          *******  E R R O R  ********
***********************************************/
class Error404 {
  constructor(ui) {
    this.ui = ui;
  }

  render() {
    return `
    <div data-page="404" class="page animate-fadeInUp">
      <div class="wrap">
        <div class="code">404</div>
        <h1 class="title">Page Not Found</h1>
        <p class="desc">
          The page you're looking for doesn't exist or may have been moved.
        </p>
        <div class="actions">
          <button onclick="window.pagesActions.goHome()" class="home">
            🏠 Take me Home
          </button>
          <button onclick="window.history.back()" class="back">
            ↩ Go Back
          </button>
        </div>
        <div class="note">
          <p>Error 404 — The requested resource could not be found.</p>
        </div>
      </div>
    </div>
    `;
  }
}
/***********************************************************************************
***********************************************************************************/








/***********************************************
        *******  H E L P E R S  ********
***********************************************/
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
    playQueue(queue, index = 0, label = '', source = null) {
      if (!queue.length || !window.uiManager?.audioPlayer) return;
      const safeIndex = Math.max(0, Math.min(index, queue.length - 1));
      window.uiManager.audioPlayer.playSong(queue[safeIndex], queue, true, source);
      if (label) (window.uiManager?.state || window.state)?.showToast?.(label);
    },
    playSong(songId, source = null) {
      const state = window.uiManager?.state || window.state;
      const song = state?.getSongById?.(songId);
      if (song && window.uiManager?.audioPlayer) window.uiManager.audioPlayer.playSong(song, null, true, source);
    },
    shuffleAll() {
      const songs = IdUtils.sample(this.buildSongs(), this.buildSongs().length);
      this.playQueue(songs, 0, 'Shuffling your whole library', 'home');
    },
    playGenre(genre) {
      const genreSongs = this.buildSongs().filter(song => String(song.genre).toLowerCase() === String(genre).toLowerCase());
      if (!genreSongs.length) return;
      const pick = IdUtils.sample(genreSongs, 1)[0];
      this.playSong(pick.id, 'home');
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
      this.playQueue(queue, 0, `${mood.charAt(0).toUpperCase() + mood.slice(1)} mix loaded`, 'home');
    },
    openStatsDashboard() {
      if (!window.uiManager || !window.state) return;
      window.state.modalOpen(window.uiManager.homePage.statsDashboard());
    },
    goHome() {
      const state = window.uiManager?.state || window.state;
      if (state) {
        state.is404 = false;
        window.uiManager?.navigate('home');
      }
    }
  };
}
/***********************************************************************************
***********************************************************************************/





/**
*
*  Copyright Cole Hanson
*
*        2 0 2 6
*
**/
