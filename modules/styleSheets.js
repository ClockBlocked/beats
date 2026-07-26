/**
 * styleSheets.js — Dynamic Stylesheet Loader
 * Injects all project stylesheets in correct cascade order.
 * Loaded early in <head> to minimize FOUC.
 */

(function loadStyleSheets() {
  const BASE_PATH = '/beats/styleSheets/';

  // Ordered for proper CSS cascade: base → navbars → pages → players → overlays → catch-all
  const sheets = [
    'base/setup',
    'base/themes',
    'base/icons',
    'base/images',
    'base/lists',
    'base/youTube',
    'navbars/top',
    'navbars/breadcrumbs',
    'navbars/albums',
    'pages/home',
    'pages/library',
    'pages/playlists',
    'pages/artists',
    'pages/favorites',
    'players/drawer',
    'players/floating',
    'overlays/modals',
    'overlays/dropDowns',
    'overlays/popOvers',
    'overlays/search',
    'overlays/toasts',
    'overlays/toolTips',
    'unSorted'
  ];

  const fragment = document.createDocumentFragment();

  sheets.forEach(name => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = `${BASE_PATH}${name}.css`;
    fragment.appendChild(link);
  });

  document.head.appendChild(fragment);
})();
