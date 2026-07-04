/**
 * Application Bootstrap
 *
 * Creates the three core objects — colorExtractor, state, audioPlayer —
 * then wires up the UI layer and media-session bridge.
 *
 * NOTE:  Do NOT instantiate `State` or `AudioEngine` more than once.
 *        Previous code had duplicate constructors here; keep it lean.
 */

// 1. Colour extraction (must exist before first playSong call)
window.colorExtractor = new ColorExtractor();

// 2. Core state + audio engine (both live in background.js)
window.state       = new PlayerState();
window.audioPlayer = new AudioEngine(window.state);

// 3. UI layer
window.favoritesPlaylists = new FavoritesPlaylists(window.state);
window.uiManager          = new UIManager(window.state, window.audioPlayer, window.favoritesPlaylists);

// 4. Global helpers exposed for inline HTML onclick handlers
window.closeModal          = () => window.state.modalClose();
window.createNewPlaylist   = () => window.favoritesPlaylists.createNewPlaylist();
window.renamePlaylist      = (id) => window.favoritesPlaylists.renamePlaylist(id);
window.deletePlaylist      = (id) => window.favoritesPlaylists.deletePlaylist(id);
window.addSongToPlaylist   = (plId, songId) => window.favoritesPlaylists.addSongToPlaylist(plId, songId);
window.toggleFavAndReRender = (id) => window.uiManager.toggleFavAndReRender(id);

// 5. Media Session bridge
window.mediaSessionManager = new MediaSessionManager(window.state, window.audioPlayer);
window.audioPlayer.setMediaSessionManager(window.mediaSessionManager);

// 6. Dismiss the initial loading screen — the app is now interactive.
if (typeof window.hideInitialLoader === 'function') {
  window.hideInitialLoader();
}
