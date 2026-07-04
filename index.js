/**
 * Module Loader — sequential script injection with error handling.
 *
 * Order matters: colours.js must load before background.js so that
 * `window.colorExtractor` exists when the audio engine needs it.
 */
(function() {
  'use strict';

  // Static version for cache busting — change this on every deploy
  const APP_VERSION = 'v2024.06.3';

  const modules = [
    '/modules/colours.js',
    '/modules/library.js',
    '/modules/background.js',
    '/modules/FavoritesPlaylists.js',
    '/modules/pages.js',
    '/modules/listeners.js',
    '/modules/UIManager.js',
    '/modules/ui-enhancements.js',
    '/modules/MediaSessionManager.js',
    '/modules/main.js',
    '/modules/memory.js'
  ];

  function loadScript(src) {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      // Append version for cache busting on new deploys only
      script.src = src;// + (src.indexOf('?') > -1 ? '&' : '?') + APP_VERSION;
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
