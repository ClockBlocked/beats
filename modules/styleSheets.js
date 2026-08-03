



(function loadStyleSheets() {
  const BASE_PATH = '/styleSheets/';

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
    'overlays/toolTips'
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
