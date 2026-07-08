/**
 * Module Loader — sequential script injection with error handling.
 *
 * Load order:
 *   1. utilities.js  — CONFIG, Utils, IdUtils, ColorExtractor, PersistenceManager
 *   2. library.js    — metadata catalogue
 *   3. background.js — PlayerState, AudioEngine
 *   4. FavoritesPlaylists.js — favorites & playlist management
 *   5. core.js       — Icons, Router, AppListeners, ContentEventManager, SearchManager
 *   6. players.js    — PlayerManager, MediaSessionManager
 *   7. pages.js      — Home, Library, Favorites, Playlists, Artists page builders
 *   8. UIManager.js  — UIManager class (slim)
 *   9. main.js       — bootstrap
 */
(function() {
  'use strict';

  // Static version for cache busting — change this on every deploy
  const APP_VERSION = 'v2024.07.1';

  const modules = [
    '/beats/modules/utilities.js',
    '/beats/modules/library.js',
    '/beats/modules/background.js',
    '/beats/modules/FavoritesPlaylists.js',
    '/beats/modules/core.js',
    '/beats/modules/players.js',
    '/beats/modules/pages.js',
    '/beats/modules/UIManager.js',
    '/beats/modules/main.js'
  ];

  function loadScript(src) {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      // Append version for cache busting on new deploys
      script.src = src + (src.indexOf('?') > -1 ? '&' : '?') + APP_VERSION;
      script.async = false; // Maintain load order
      script.onload = () => resolve();
      script.onerror = () => reject(new Error('Failed to load ' + src));
      document.head.appendChild(script);
    });
  }

  async function boot() {
    for (const src of modules) {
      try {
        await loadScript(src);
      } catch (err) {
        console.error('[Boot]', err);
        document.body.innerHTML = `
          <div style="color:#ff6b6b;padding:2rem;font-family:sans-serif;text-align:center;">
            <h2 style="margin-bottom:0.5rem;">Failed to load ${src}</h2>
            <p style="color:#94a3b8;">Please refresh. If the problem persists, check the console.</p>
          </div>
        `;
        return;
      }
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
