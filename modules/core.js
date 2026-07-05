/**
 * core.js — Navigation, page routing, search, event management, and icons.
 *
 * Contains:
 *   - Icons           — SVG icon library
 *   - Router          — page navigation & URL management with smooth breadcrumbs
 *   - AppListeners    — global, static, and dynamic event bindings
 *   - ContentEventManager — content-area event delegation
 *   - SearchManager   — search modal UI and results
 *
 * Dependencies: Utils, IdUtils, Icons (from utilities.js)
 */

class Icons {
  static hearts = {
    notLiked() {
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="18" height="18">
        <path opacity=".4" fill="currentColor" d="M32 165.1c0 55 34.4 107.1 71.8 152.5 42.1 51.2 93.4 96 128.5 122.9 6.2 4.8 14.4 7.5 23.7 7.5s17.4-2.7 23.7-7.5c35.1-26.8 86.4-71.7 128.5-122.9 37.3-45.4 71.8-97.5 71.8-152.5 0-55.9-45.3-101.1-101.1-101.1-32.4 0-62.9 15.6-81.9 41.9l-28 38.7c-3 4.2-7.8 6.6-13 6.6s-10-2.5-13-6.6l-28-38.7C196.1 79.6 165.6 64 133.1 64 77.3 64 32 109.3 32 165.1z"/>
        <path fill="currentColor" fill-opacity="0.2" d="M378.9 64c-32.4 0-62.9 15.6-81.9 41.9l-28 38.7c-3 4.2-7.8 6.6-13 6.6s-10-2.5-13-6.6l-28-38.7 0 0c-19-26.3-49.5-41.9-81.9-41.9-55.9 0-101.1 45.3-101.1 101.1 0 55 34.4 107.1 71.8 152.5 42.1 51.2 93.4 96 128.5 122.9 6.2 4.8 14.4 7.5 23.7 7.5s17.4-2.7 23.7-7.5c35.1-26.8 86.4-71.7 128.5-122.9 37.3-45.4 71.8-97.5 71.8-152.5 0-55.9-45.3-101.1-101.1-101.1zM271 87.1c25-34.6 65.2-55.1 107.9-55.1 73.5 0 133.1 59.6 133.1 133.1 0 67.4-41.6 127.3-79.1 172.8-44.1 53.6-97.3 100.1-133.8 127.9-12.4 9.4-27.6 14.1-43.1 14.1s-30.8-4.6-43.1-14.1C176.4 438 123.2 391.5 79.1 338 41.6 292.4 0 232.5 0 165.1 0 91.6 59.6 32 133.1 32 175.8 32 216 52.5 241 87.1l15 20.7 15-20.7z"/>
      </svg>`;
    },
    liked() {
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="18" height="18">
        <path opacity=".4" fill="currentColor" d="M32 165.1c0 55 34.4 107.1 71.8 152.5 42.1 51.2 93.4 96 128.5 122.9 6.2 4.8 14.4 7.5 23.7 7.5s17.4-2.7 23.7-7.5c35.1-26.8 86.4-71.7 128.5-122.9 37.3-45.4 71.8-97.5 71.8-152.5 0-55.9-45.3-101.1-101.1-101.1-32.4 0-62.9 15.6-81.9 41.9l-28 38.7c-3 4.2-7.8 6.6-13 6.6s-10-2.5-13-6.6l-28-38.7C196.1 79.6 165.6 64 133.1 64 77.3 64 32 109.3 32 165.1z"/>
        <path fill="currentColor" d="M378.9 64c-32.4 0-62.9 15.6-81.9 41.9l-28 38.7c-3 4.2-7.8 6.6-13 6.6s-10-2.5-13-6.6l-28-38.7 0 0c-19-26.3-49.5-41.9-81.9-41.9-55.9 0-101.1 45.3-101.1 101.1 0 55 34.4 107.1 71.8 152.5 42.1 51.2 93.4 96 128.5 122.9 6.2 4.8 14.4 7.5 23.7 7.5s17.4-2.7 23.7-7.5c35.1-26.8 86.4-71.7 128.5-122.9 37.3-45.4 71.8-97.5 71.8-152.5 0-55.9-45.3-101.1-101.1-101.1zM271 87.1c25-34.6 65.2-55.1 107.9-55.1 73.5 0 133.1 59.6 133.1 133.1 0 67.4-41.6 127.3-79.1 172.8-44.1 53.6-97.3 100.1-133.8 127.9-12.4 9.4-27.6 14.1-43.1 14.1s-30.8-4.6-43.1-14.1C176.4 438 123.2 391.5 79.1 338 41.6 292.4 0 232.5 0 165.1 0 91.6 59.6 32 133.1 32 175.8 32 216 52.5 241 87.1l15 20.7 15-20.7z"/>
      </svg>`;
    },
    likedConfirmation() {
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" width="20" height="20">
        <path opacity=".4" fill="green" d="M32 165.1c0-55.9 45.3-101.1 101.1-101.1 32.4 0 62.9 15.6 81.9 41.9l28 38.7c3 4.2 7.8 6.6 13 6.6s10-2.5 13-6.6l28-38.7c19-26.3 49.5-41.9 81.9-41.9 55.9 0 101.1 45.3 101.1 101.1 0 16-2.9 31.7-7.9 47.1-12.9-2.7-26.3-4.2-40.1-4.2-106 0-192 86-192 192 0 16.1 2 31.8 5.7 46.8-5.1-1.2-9.6-3.4-13.4-6.3-35.1-26.8-86.4-71.7-128.5-122.9-37.3-45.4-71.8-97.5-71.8-152.5z"/>
        <path fill="green" d="M378.9 64c-32.4 0-62.9 15.6-81.9 41.9l-28 38.7c-3 4.2-7.8 6.6-13 6.6s-10-2.5-13-6.6l-28-38.7c-19-26.3-49.5-41.9-81.9-41.9-55.9 0-101.1 45.3-101.1 101.1 0 55 34.4 107.1 71.8 152.5 42.1 51.2 93.4 96 128.5 122.9 3.8 2.9 8.4 5.1 13.4 6.3 2.9 11.5 6.8 22.6 11.7 33.2-.5 0-.9 0-1.4 0-15.6 0-30.8-4.6-43.1-14.1-36.5-27.9-89.7-74.4-133.8-127.9-37.5-45.5-79.1-105.5-79.1-172.8 0-73.5 59.6-133.1 133.1-133.1 42.7 0 82.8 20.5 107.9 55.1l15 20.7 15-20.7c25-34.6 65.2-55.1 107.9-55.1 73.5 0 133.1 59.6 133.1 133.1 0 19.4-3.5 38.3-9.3 56.3-9.8-3.9-20.1-7-30.6-9.2 5-15.4 7.9-31.1 7.9-47.1 0-55.9-45.3-101.1-101.1-101.1zM432 512a112 112 0 1 0 0-224 112 112 0 1 0 0 224zm0-256a144 144 0 1 1 0 288 144 144 0 1 1 0-288zm57.4 83.1c7.1 5.2 8.7 15.2 3.5 22.4l-64 88c-2.8 3.8-7 6.2-11.7 6.5s-9.3-1.3-12.6-4.6l-40-40c-6.2-6.2-6.2-16.4 0-22.6s16.4-6.2 22.6 0l26.8 26.8 53-72.9c5.2-7.1 15.2-8.7 22.4-3.5z"/>
      </svg>`;
    },
    likedError() {
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" width="20" height="20">
        <path opacity=".4" fill="orange" d="M32 165.1c0-55.9 45.3-101.1 101.1-101.1 32.4 0 62.9 15.6 81.9 41.9l28 38.7c3 4.2 7.8 6.6 13 6.6s10-2.5 13-6.6l28-38.7c19-26.3 49.5-41.9 81.9-41.9 55.9 0 101.1 45.3 101.1 101.1 0 16-2.9 31.7-7.9 47.1-12.9-2.7-26.3-4.2-40.1-4.2-106 0-192 86-192 192 0 16.1 2 31.8 5.7 46.8-5.1-1.2-9.6-3.4-13.4-6.3-35.1-26.8-86.4-71.7-128.5-122.9-37.3-45.4-71.8-97.5-71.8-152.5z"/>
        <path fill="orange" d="M378.9 64c-32.4 0-62.9 15.6-81.9 41.9l-28 38.7c-3 4.2-7.8 6.6-13 6.6s-10-2.5-13-6.6l-28-38.7c-19-26.3-49.5-41.9-81.9-41.9-55.9 0-101.1 45.3-101.1 101.1 0 55 34.4 107.1 71.8 152.5 42.1 51.2 93.4 96 128.5 122.9 3.8 2.9 8.4 5.1 13.4 6.3 2.9 11.5 6.8 22.6 11.7 33.2-.5 0-.9 0-1.4 0-15.6 0-30.8-4.6-43.1-14.1-36.5-27.9-89.7-74.4-133.8-127.9-37.5-45.5-79.1-105.5-79.1-172.8 0-73.5 59.6-133.1 133.1-133.1 42.7 0 82.8 20.5 107.9 55.1l15 20.7 15-20.7c25-34.6 65.2-55.1 107.9-55.1 73.5 0 133.1 59.6 133.1 133.1 0 19.4-3.5 38.3-9.3 56.3-9.8-3.9-20.1-7-30.6-9.2 5-15.4 7.9-31.1 7.9-47.1 0-55.9-45.3-101.1-101.1-101.1zM544 400a112 112 0 1 0 -224 0 112 112 0 1 0 224 0zm-256 0a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144 44a20 20 0 1 1 0 40 20 20 0 1 1 0-40zm0-124c8.8 0 16 7.2 16 16l0 64c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-64c0-8.8 7.2-16 16-16z"/>
      </svg>`;
    },
    likedRemove() {
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" width="20" height="20">
        <path opacity=".4" fill="gray" d="M32 165.1c0-55.9 45.3-101.1 101.1-101.1 32.4 0 62.9 15.6 81.9 41.9l28 38.7c3 4.2 7.8 6.6 13 6.6s10-2.5 13-6.6l28-38.7c19-26.3 49.5-41.9 81.9-41.9 55.9 0 101.1 45.3 101.1 101.1 0 16-2.9 31.7-7.9 47.1-12.9-2.7-26.3-4.2-40.1-4.2-106 0-192 86-192 192 0 16.1 2 31.8 5.7 46.8-5.1-1.2-9.6-3.4-13.4-6.3-35.1-26.8-86.4-71.7-128.5-122.9-37.3-45.4-71.8-97.5-71.8-152.5z"/>
        <path fill="gray" d="M378.9 64c-32.4 0-62.9 15.6-81.9 41.9l-28 38.7c-3 4.2-7.8 6.6-13 6.6s-10-2.5-13-6.6l-28-38.7c-19-26.3-49.5-41.9-81.9-41.9-55.9 0-101.1 45.3-101.1 101.1 0 55 34.4 107.1 71.8 152.5 42.1 51.2 93.4 96 128.5 122.9 3.8 2.9 8.4 5.1 13.4 6.3 2.9 11.5 6.8 22.6 11.7 33.2-.5 0-.9 0-1.4 0-15.6 0-30.8-4.6-43.1-14.1-36.5-27.9-89.7-74.4-133.8-127.9-37.5-45.5-79.1-105.5-79.1-172.8 0-73.5 59.6-133.1 133.1-133.1 42.7 0 82.8 20.5 107.9 55.1l15 20.7 15-20.7c25-34.6 65.2-55.1 107.9-55.1 73.5 0 133.1 59.6 133.1 133.1 0 19.4-3.5 38.3-9.3 56.3-9.8-3.9-20.1-7-30.6-9.2 5-15.4 7.9-31.1 7.9-47.1 0-55.9-45.3-101.1-101.1-101.1zM432 512a112 112 0 1 0 0-224 112 112 0 1 0 0 224zm0-256a144 144 0 1 1 0 288 144 144 0 1 1 0-288zm80 144c0 8.8-7.2 16-16 16l-128 0c-8.8 0-16-7.2-16-16s7.2-16 16-16l128 0c8.8 0 16 7.2 16 16z"/>
      </svg>`;
    },
    likedHover() {
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" width="20" height="20">
        <path opacity=".4" fill="pink" d="M32 165.1c0-55.9 45.3-101.1 101.1-101.1 32.4 0 62.9 15.6 81.9 41.9l28 38.7c3 4.2 7.8 6.6 13 6.6s10-2.5 13-6.6l28-38.7c19-26.3 49.5-41.9 81.9-41.9 55.9 0 101.1 45.3 101.1 101.1 0 16-2.9 31.7-7.9 47.1-12.9-2.7-26.3-4.2-40.1-4.2-106 0-192 86-192 192 0 16.1 2 31.8 5.7 46.8-5.1-1.2-9.6-3.4-13.4-6.3-35.1-26.8-86.4-71.7-128.5-122.9-37.3-45.4-71.8-97.5-71.8-152.5z"/>
        <path fill="pink" d="M378.9 64c-32.4 0-62.9 15.6-81.9 41.9l-28 38.7c-3 4.2-7.8 6.6-13 6.6s-10-2.5-13-6.6l-28-38.7c-19-26.3-49.5-41.9-81.9-41.9-55.9 0-101.1 45.3-101.1 101.1 0 55 34.4 107.1 71.8 152.5 42.1 51.2 93.4 96 128.5 122.9 3.8 2.9 8.4 5.1 13.4 6.3 2.9 11.5 6.8 22.6 11.7 33.2-.5 0-.9 0-1.4 0-15.6 0-30.8-4.6-43.1-14.1-36.5-27.9-89.7-74.4-133.8-127.9-37.5-45.5-79.1-105.5-79.1-172.8 0-73.5 59.6-133.1 133.1-133.1 42.7 0 82.8 20.5 107.9 55.1l15 20.7 15-20.7c25-34.6 65.2-55.1 107.9-55.1 73.5 0 133.1 59.6 133.1 133.1 0 19.4-3.5 38.3-9.3 56.3-9.8-3.9-20.1-7-30.6-9.2 5-15.4 7.9-31.1 7.9-47.1 0-55.9-45.3-101.1-101.1-101.1zM544 400a112 112 0 1 0 -224 0 112 112 0 1 0 224 0zm-256 0a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm160-64l0 48 48 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-48 0 0 48c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-48-48 0c-8.8 0-16-7.2-16-16s7.2-16 16-16l48 0 0-48c0-8.8 7.2-16 16-16s16 7.2 16 16z"/>
      </svg>`;
    },
  };
  static player = {
    play(size = 22) {
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="${size}" height="${size}"><path opacity=".4" fill="currentColor" d="M91.2 36.9c-12.4-6.8-27.4-6.5-39.6.7S32 57.9 32 72v368c0 14.1 7.5 27.2 19.6 34.4s27.2 7.5 39.6.7l336-184c12.8-7 20.8-20.5 20.8-35.1s-8-28.1-20.8-35.1L91.2 36.9z"/><path fill="currentColor" d="M91.2 36.9c-12.4-6.8-27.4-6.5-39.6.7S32 57.9 32 72v368c0 14.1 7.5 27.2 19.6 34.4s27.2 7.5 39.6.7l336-184c12.8-7 20.8-20.5 20.8-35.1s-8-28.1-20.8-35.1L91.2 36.9z"/></svg>`;
    },
    pause(size = 22) {
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" width="${size}" height="${size}"><path opacity=".4" fill="currentColor" d="M48 32C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h64c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48H48zm224 0c-26.5 0-48 21.5-48 48v352c0 26.5 21.5 48 48 48h64c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48h-64z"/><path fill="currentColor" d="M48 32C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h64c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48H48zm224 0c-26.5 0-48 21.5-48 48v352c0 26.5 21.5 48 48 48h64c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48h-64z"/></svg>`;
    },
    skipForward(size = 20) {
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" width="${size}" height="${size}"><path opacity=".4" fill="currentColor" d="M0 72L0 440c0 14.7 8.1 28.2 21 35.2s28.7 6.3 41-1.8l258-169.6 0-95.7-258-169.6c-12.3-8.1-28-8.8-41-1.8S0 57.3 0 72z"/><path fill="currentColor" d="M352 32l0 0c17.7 0 32 14.3 32 32l0 384c0 17.7-14.3 32-32 32l0 0c-17.7 0-32-14.3-32-32l0-384c0-17.7 14.3-32 32-32z"/></svg>`;
    },
    previous(size = 28) {
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" width="${size}" height="${size}"><path opacity=".4" fill="currentColor" d="M64 208.1l0 95.7 258 169.6c12.3 8.1 28 8.8 41 1.8s21-20.5 21-35.2l0-368c0-14.7-8.1-28.2-21-35.2s-28.7-6.3-41 1.8L64 208.1z"/><path fill="currentColor" d="M32 32l0 0C14.3 32 0 46.3 0 64L0 448c0 17.7 14.3 32 32 32l0 0c17.7 0 32-14.3 32-32L64 64c0-17.7-14.3-32-32-32z"/></svg>`;
    },
    next(size = 28) {
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" width="${size}" height="${size}"><path opacity=".4" fill="currentColor" d="M0 72L0 440c0 14.7 8.1 28.2 21 35.2s28.7 6.3 41-1.8l258-169.6 0-95.7-258-169.6c-12.3-8.1-28-8.8-41-1.8S0 57.3 0 72z"/><path fill="currentColor" d="M352 32l0 0c17.7 0 32 14.3 32 32l0 384c0 17.7-14.3 32-32 32l0 0c-17.7 0-32-14.3-32-32l0-384c0-17.7 14.3-32 32-32z"/></svg>`;
    },
    shuffle(size = 22) {
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="${size}" height="${size}"><path opacity=".4" fill="currentColor" d="M0 384c0 17.7 14.3 32 32 32l64 0c30.2 0 58.7-14.2 76.8-38.4L224 309.3c-13.3-17.8-26.7-35.6-40-53.3l-62.4 83.2c-6 8.1-15.5 12.8-25.6 12.8l-64 0c-17.7 0-32 14.3-32 32zM224 202.7c13.3 17.8 26.7 35.6 40 53.3l62.4-83.2c6-8.1 15.5-12.8 25.6-12.8l32 0 0 32c0 12.9 7.8 24.6 19.8 29.6s25.7 2.2 34.9-6.9l64-64c6-6 9.4-14.1 9.4-22.6s-3.4-16.6-9.4-22.6l-64-64c-9.2-9.2-22.9-11.9-34.9-6.9S384 51.1 384 64l0 32-32 0c-30.2 0-58.7 14.2-76.8 38.4L224 202.7z"/><path fill="currentColor" d="M352 416c-30.2 0-58.7-14.2-76.8-38.4L121.6 172.8c-6-8.1-15.5-12.8-25.6-12.8l-64 0c-17.7 0-32-14.3-32-32S14.3 96 32 96l64 0c30.2 0 58.7 14.2 76.8 38.4L326.4 339.2c6 8.1 15.5 12.8 25.6 12.8l32 0 0-32c0-12.9 7.8-24.6 19.8-29.6s25.7-2.2 34.9 6.9l64 64c6 6 9.4 14.1 9.4 22.6s-3.4 16.6-9.4 22.6l-64 64c-9.2 9.2-22.9 11.9-34.9 6.9S384 460.9 384 448l0-32-32 0z"/></svg>`;
    },
  };
  static general = {
    close(size = 16) {
      return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>`;
    },
    share(size = 18) {
      return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>`;
    },
    moreHoriz(size = 18) {
      return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/></svg>`;
    },
    moreVert(size = 18) {
      return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="currentColor"><path d="M12 8a2 2 0 1 0-2-2 2 2 0 0 0 2 2zm0 2a2 2 0 1 0 2 2 2 2 0 0 0-2-2zm0 6a2 2 0 1 0 2 2 2 2 0 0 0-2-2z"/></svg>`;
    },
    playlist(size = 36) {
      return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="color: hsl(var(--accent-coral));"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>`;
    },
    chevronDown() {
      return `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"><polyline points="6 9 12 15 18 9"/></svg>`;
    },
  };
}

class Router {
  constructor(ui) {
    this.ui = ui;
    this.state = ui.state;
    this.audioPlayer = ui.audioPlayer;
    this.favorites = ui.favorites;
  }

  goToPage(page, artistId = null, albumId = null) {
    if (this.state.isDrawerOpen) this.ui.closePlayerDrawer();
    let artist = null;
    if (artistId) {
      artist = this.state.getArtistById(artistId);
      if (!artist) {
        artist = this.state.enrichedLibrary.find(a => a.artist === artistId);
        if (artist) artistId = artist.id;
      }
    }
    const isSameArtistPage = page === 'artist'
      && this.state.currentPage === 'artist'
      && artistId === this.state.artistId;

    const runNav = async () => {
      const tab = this.state.favoritesTab || 'songs';
      const album = albumId ? this.state.getAlbumById(albumId) : null;
      const urlMap = {
        home:      '/',
        library:   '/library',
        favorites: '/favorites' + (tab !== 'songs' ? '/' + tab : ''),
        playlists: this.state.selectedPlaylistId
          ? `/playlist/${this.state.selectedPlaylistId}`
          : '/playlists',
        artist: artistId
          ? albumId
            ? `/artist/${artistId}/album/${albumId}`
            : `/artist/${artistId}`
          : '/',
      };
      const titleMap = {
        home:      'MyBeats \u2014 Home',
        library:   'MyBeats \u2014 Library',
        favorites: `MyBeats \u2014 Favorites / ${tab.charAt(0).toUpperCase() + tab.slice(1)}`,
        playlists: this.state.selectedPlaylistName
          ? `MyBeats \u2014 Playlist: ${this.state.selectedPlaylistName}`
          : 'MyBeats \u2014 Playlists',
        artist: artist
          ? album ? `MyBeats \u2014 ${artist.artist} / ${album.album}` : `MyBeats \u2014 ${artist.artist}`
          : 'MyBeats',
      };
      this.state.currentPage          = page;
      this.state.artistId             = artistId || null;
      this.state.artistPageName       = artist?.artist || null;
      this.state.selectedAlbumId      = albumId || null;
      this.state.selectedAlbumName    = album?.album || null;
      this.state.isSearchOpen         = false;
      this.state.selectedPlaylistName = null;
      this.state.isCreatingPlaylist   = false;
      history.pushState(null, '', urlMap[page] ?? '/');
      document.title = titleMap[page] ?? 'MyBeats';
      this.updateActiveNav();
      this.updateBreadcrumbs();
      this.ui.render();
      this.state.loadingBarComplete();
    };

    if (isSameArtistPage) {
      runNav();
    } else {
      this.state.loadingBarStart(async () => {
        await this.state.waitForProgress(20);
        runNav();
      });
    }
  }

  syncWithURL() {
    const parts = window.location.pathname.split('/').filter(p => p);
    if (!parts.length) {
      this.state.currentPage = 'home';
    } else {
      const page = parts[0];
      if (page === 'library') {
        this.state.currentPage = 'library';
      } else if (page === 'favorites') {
        this.state.currentPage = 'favorites';
        this.state.favoritesTab = parts[1] || 'songs';
      } else if (page === 'playlist' && parts[1]) {
        const playlistId = parts[1];
        const playlist = this.state.playlists.find(p => IdUtils.normalize(p.id) === IdUtils.normalize(playlistId));
        this.state.currentPage = 'playlists';
        this.state.selectedPlaylistName = playlist?.name || null;
        this.state.selectedPlaylistId   = playlist ? playlistId : null;
      } else if (page === 'artist' && parts[1]) {
        const artistId = parts[1];
        const artist = this.state.getArtistById(artistId);
        if (artist) {
          this.state.currentPage    = 'artist';
          this.state.artistId       = artistId;
          this.state.artistPageName = artist.artist;
          if (parts[2] === 'album' && parts[3]) {
            const albumId = parts[3];
            const album = artist.albums.find(a => IdUtils.normalize(a.id) === IdUtils.normalize(albumId));
            this.state.selectedAlbumId   = album ? albumId : null;
            this.state.selectedAlbumName = album?.album || null;
          } else {
            this.state.selectedAlbumId   = null;
            this.state.selectedAlbumName = null;
          }
        } else {
          this.state.currentPage = 'home';
        }
      } else {
        this.state.currentPage = 'home';
      }
    }
    this.updateActiveNav();
    this.updateBreadcrumbs();
    this.updateTitle();
    this.ui.render();
  }

  handlePopState() { this.syncWithURL(); }

  updateActiveNav() {
    document.querySelectorAll('.nav-link').forEach(link => {
      link.classList.toggle('active', link.dataset.nav === this.state.currentPage);
    });
  }

  updateBreadcrumbs() {
    const container = document.getElementById('breadcrumb-items');
    if (!container) return;
    const crumbs = this.getBreadcrumbs();
    const existingItems = container.querySelectorAll('.breadcrumb-item, .breadcrumb-sep');

    // Fade out existing items
    existingItems.forEach(el => {
      el.style.transition = 'opacity 0.25s ease, transform 0.25s ease';
      el.style.opacity = '0';
      el.style.transform = 'translateX(-8px)';
    });

    setTimeout(() => {
      if (!crumbs.length) {
        container.innerHTML = '<span class="breadcrumb-item active" style="color: hsl(var(--text-secondary));">Home</span>';
      } else {
        container.innerHTML = crumbs.map((crumb, i) => {
          const isLast = i === crumbs.length - 1;
          return `
            <span class="breadcrumb-item ${isLast ? 'active' : ''}"
                  style="opacity: 0; transform: translateX(8px); transition: opacity 0.3s ease ${i * 0.08}s, transform 0.3s ease ${i * 0.08}s; color: hsl(var(--text-secondary));">
              ${crumb}
            </span>
            ${!isLast ? `<span class="breadcrumb-sep" style="opacity: 0; transition: opacity 0.3s ease ${i * 0.08 + 0.04}s; color: hsl(var(--text-tertiary));">›</span>` : ''}
          `;
        }).join('');
      }
      // Trigger reflow then animate in
      requestAnimationFrame(() => {
        container.querySelectorAll('.breadcrumb-item, .breadcrumb-sep').forEach(el => {
          el.style.opacity = '1';
          el.style.transform = 'translateX(0)';
        });
      });
    }, 250);
  }

  getBreadcrumbs() {
    const crumbs = [];
    const page   = this.state.currentPage;
    if (page === 'home') {
      crumbs.push('Home');
    } else if (page === 'library') {
      crumbs.push('Library');
    } else if (page === 'favorites') {
      const tab = (this.state.favoritesTab || 'songs');
      crumbs.push('Library', 'Favorites', tab.charAt(0).toUpperCase() + tab.slice(1));
    } else if (page === 'playlists') {
      crumbs.push('Library', 'Playlists');
      if (this.state.selectedPlaylistName) crumbs.push(this.state.selectedPlaylistName);
      if (this.state.isCreatingPlaylist)   crumbs.push('Create');
    } else if (page === 'artist') {
      crumbs.push('Artists');
      if (this.state.artistPageName)    crumbs.push(this.state.artistPageName);
      if (this.state.selectedAlbumName) crumbs.push(this.state.selectedAlbumName);
    }
    return crumbs;
  }

  toggleBreadcrumb() {
    const trail = document.querySelector('.breadcrumb-trail');
    const toggleIcon = document.querySelector('#breadcrumb-toggle .chevron-icon');
    if (!trail) return;
    this.ui.isBreadcrumbHidden = !this.ui.isBreadcrumbHidden;
    if (this.ui.isBreadcrumbHidden) {
      trail.classList.add('hide');
      if (toggleIcon) toggleIcon.classList.add('flipped');
    } else {
      trail.classList.remove('hide');
      if (toggleIcon) toggleIcon.classList.remove('flipped');
    }
  }

  updateTitle() {
    const page = this.state.currentPage;
    const tab = (this.state.favoritesTab || 'songs');
    const artist = this.state.artistId ? this.state.getArtistById(this.state.artistId) : null;
    const album  = this.state.selectedAlbumId ? this.state.getAlbumById(this.state.selectedAlbumId) : null;
    const titles = {
      home:      'MyBeats \u2014 Home',
      library:   'MyBeats \u2014 Library',
      favorites: `MyBeats \u2014 Favorites / ${tab.charAt(0).toUpperCase() + tab.slice(1)}`,
      playlists: this.state.selectedPlaylistName ? `MyBeats \u2014 Playlist: ${this.state.selectedPlaylistName}` : 'MyBeats \u2014 Playlists',
      artist:    artist
        ? (album ? `MyBeats \u2014 ${artist.artist} / ${album.album}` : `MyBeats \u2014 ${artist.artist}`)
        : 'MyBeats',
    };
    document.title = titles[page] ?? 'MyBeats';
  }
}

class AppListeners {
  // Global listeners (always active)
  static global(ui) {
    return [
      {
        el: document.getElementById('modal-overlay'),
        type: 'click',
        handler: () => ui.state.modalClose()
      },
      {
        el: window,
        type: 'keydown',
        handler: (e) => {
          if (e.target.tagName === 'INPUT') return;
          switch (e.code) {
            case 'Space':       e.preventDefault(); ui.audioPlayer.togglePlay(); break;
            case 'ArrowLeft':   e.preventDefault(); ui.audioPlayer.skipBack(); break;
            case 'ArrowRight':  e.preventDefault(); ui.audioPlayer.skipForward(); break;
            case 'ArrowUp':     e.preventDefault(); ui.audioPlayer.setVolume(ui.state.volume + 0.05); break;
            case 'ArrowDown':   e.preventDefault(); ui.audioPlayer.setVolume(ui.state.volume - 0.05); break;
            case 'Escape':
              if (ui.state.isDrawerOpen) ui.closePlayerDrawer();
              if (document.querySelector('.modal.active')) ui.state.modalClose();
              break;
          }
        }
      }
    ];
  }

  // Static nav listeners (bound once)
  static static(ui) {
    const navButtons = document.querySelectorAll('.nav-link[data-nav]');
    return Array.from(navButtons).map(btn => ({
      el: btn,
      type: 'click',
      handler: () => ui.navigate(btn.dataset.nav)
    }));
  }

  // Init listeners (popstate, breadcrumb toggle, search triggers, theme, etc.)
  static init(ui) {
    return [
      {
        el: window,
        type: 'popstate',
        handler: () => ui.router.handlePopState()
      },
      {
        el: document.getElementById('breadcrumb-toggle'),
        type: 'click',
        handler: () => ui.router.toggleBreadcrumb()
      },
      {
        el: document.getElementById('open-search'),
        type: 'click',
        handler: () => ui.openSearch()
      },
      {
        el: document.getElementById('open-search-bc'),
        type: 'click',
        handler: () => ui.openSearch()
      },
      {
        el: document.getElementById('close-search'),
        type: 'click',
        handler: () => ui.closeSearch()
      },
      {
        el: document.getElementById('search-overlay'),
        type: 'click',
        handler: () => ui.closeSearch()
      },
      {
        el: document.getElementById('theme-toggle'),
        type: 'click',
        handler: () => ui.toggleTheme()
      },
      {
        el: document.getElementById('theme-toggle-bc'),
        type: 'click',
        handler: () => ui.toggleTheme()
      },
      // search input debounce
      {
        setup: (bind) => {
          const input = document.getElementById('search-input');
          if (input) {
            let timer;
            const handler = (e) => {
              clearTimeout(timer);
              ui.state.searchQuery = e.target.value;
              timer = setTimeout(() => ui.search.updateDropdown(), 200);
            };
            input.addEventListener('input', handler);
            bind.push({ el: input, type: 'input', handler });
          }
        }
      },
      // global key: escape / cmd+k
      {
        setup: (bind) => {
          const handler = (e) => {
            if (e.key === 'Escape' && ui.state.isSearchOpen) ui.closeSearch();
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') { e.preventDefault(); ui.openSearch(); }
          };
          document.addEventListener('keydown', handler);
          bind.push({ el: document, type: 'keydown', handler });
        }
      },
      // theme initial
      {
        immediate: () => {
          const saved = localStorage.getItem('theme') || 'dark';
          const btns = document.querySelectorAll('.theme-toggle-btn');
          if (saved === 'light') {
            document.body.classList.remove('dark');
            btns.forEach(b => b.classList.remove('dark'));
          } else {
            document.body.classList.add('dark');
            btns.forEach(b => b.classList.add('dark'));
          }
        }
      }
    ];
  }

  // Dynamic listeners (content events)
  static add(ui) {
    return []; // placeholder
  }

  static remove(ui) {
    return [];
  }

  // Convenience: bind all static listeners at once
  static bindAll(ui) {
    const bindList = [];
    const attach = (arr) => {
      arr.forEach(item => {
        if (item.setup) {
          item.setup(bindList);
        } else if (item.immediate) {
          item.immediate();
        } else if (item.el && item.type && item.handler) {
          item.el.addEventListener(item.type, item.handler);
          bindList.push(item);
        }
      });
    };
    attach(AppListeners.global(ui));
    attach(AppListeners.static(ui));
    attach(AppListeners.init(ui));
    attach(AppListeners.add(ui));
    return bindList;
  }
}

class ContentEventManager {
  constructor(ui) {
    this.ui = ui;
    this.heartTimeouts = new Map();
  }

  setupHeartButton(btn, type, id) {
    let tempState = null;
    let timeoutId = null;
    const songRow = type === 'song' ? btn.closest('.song-row, .song-item') : null;
    const fav = this.ui.favorites;
    const isFav = () => type === 'song' ? fav.isSongFavorite(id) : fav.isArtistFavorite(id);
    const updateIcon = (isHovered) => { btn.innerHTML = this.ui.likeStatus(type, isFav(), isHovered, tempState); };
    const onMouseEnter = () => updateIcon(true);
    const onMouseLeave = () => updateIcon(false);
    const target = songRow || btn;
    target.addEventListener('mouseenter', onMouseEnter);
    target.addEventListener('mouseleave', onMouseLeave);
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (timeoutId) clearTimeout(timeoutId);
      if (type === 'song') {
        const song = this.ui.state.getSongById(id);
        if (song) fav.toggleFavoriteSong(song);
      } else {
        fav.toggleFavoriteArtist(id);
      }
      btn.classList.toggle('favorited', isFav());
      tempState = 'check';
      updateIcon(false);
      timeoutId = setTimeout(() => {
        tempState = null;
        updateIcon(false);
        timeoutId = null;
        const isInFavorites = btn.closest('#favorites-content') !== null;
        if (isInFavorites && !isFav() && type === 'song') {
          btn.closest('.song-row')?.remove();
          const tabBtn = document.querySelector('.tab-btn[data-tab="songs"]');
          if (tabBtn) {
            const match = tabBtn.textContent.match(/(\d+)/);
            if (match) tabBtn.textContent = `Songs (${parseInt(match[1]) - 1})`;
          }
        }
      }, 5000);
      this.heartTimeouts.set(btn, { timeoutId, onMouseEnter, onMouseLeave, songRow });
    });
    this.heartTimeouts.set(btn, { timeoutId, onMouseEnter, onMouseLeave, songRow });
  }

  attachHeartEvents() {
    this.heartTimeouts.forEach(({ timeoutId, onMouseEnter, onMouseLeave, songRow }, btn) => {
      clearTimeout(timeoutId);
      const target = songRow || btn;
      target.removeEventListener('mouseenter', onMouseEnter);
      target.removeEventListener('mouseleave', onMouseLeave);
    });
    this.heartTimeouts.clear();

    document.querySelectorAll('[data-fav-song]').forEach(btn => {
      this.setupHeartButton(btn, 'song', btn.dataset.favSong);
    });
    document.querySelectorAll('[data-artist-heart]').forEach(btn => {
      this.setupHeartButton(btn, 'artist', btn.dataset.artistHeart);
    });
  }

  showArtistPopover(artistId, event) {
    document.querySelector('.artist-popover')?.remove();
    const state = this.ui.state;
    const artist = state.getArtistById(artistId);
    if (!artist) return;
    const popover = document.createElement('div');
    popover.className = 'artist-popover fixed z-50 animate-popoverReveal';
    popover.innerHTML = `
      <div class="popover-gradient-border"></div>
      <div class="popover-content">
        <div class="popover-header">
          <div class="popover-avatar-wrapper">
            <img src="${artist.imageUrl}" class="popover-avatar" alt="${artist.artist}">
            <div class="popover-avatar-glow"></div>
          </div>
          <div class="popover-title-section">
            <h3 class="popover-artist-name">${artist.artist}</h3>
            <span class="popover-genre-badge">${artist.genre || 'Artist'}</span>
          </div>
        </div>
        <div class="popover-stats">
          <div class="popover-stat">
            <span class="popover-stat-value">${artist.albums?.length || 0}</span>
            <span class="popover-stat-label">Albums</span>
          </div>
          <div class="popover-stat-divider"></div>
          <div class="popover-stat">
            <span class="popover-stat-value">${artist.monthlyListeners || '24.5K'}</span>
            <span class="popover-stat-label">Listeners</span>
          </div>
          <div class="popover-stat-divider"></div>
          <div class="popover-stat">
            <span class="popover-stat-value">${artist.topSong?.plays || '12.3K'}</span>
            <span class="popover-stat-label">Plays</span>
          </div>
        </div>
        <div class="popover-actions">
          <button class="popover-btn popover-btn-primary" data-artist-id="${artist.id}" data-action="go-artist">
            <svg class="popover-btn-icon" viewBox="0 0 20 20" fill="currentColor"><path d="M10 12.5L16.5 8L10 3.5L3.5 8L10 12.5Z M3.5 12L10 16.5L16.5 12"/></svg>
            <span>View Profile</span>
          </button>
          <button class="popover-btn popover-btn-secondary" data-artist-id="${artist.id}" data-action="play-top">
            <svg class="popover-btn-icon" viewBox="0 0 20 20" fill="currentColor"><path d="M6 3L16 10L6 17V3Z"/></svg>
            <span>Play Top Hit</span>
          </button>
        </div>
        <div class="popover-footer">
          <div class="popover-waveform"><span></span><span></span><span></span><span></span><span></span></div>
          <span class="popover-tip">Click outside to close</span>
        </div>
      </div>
    `;
    popover.style.setProperty('--popover-x', event.clientX + 'px');
    popover.style.setProperty('--popover-y', event.clientY + 'px');
    document.body.appendChild(popover);
    requestAnimationFrame(() => {
      const rect = popover.getBoundingClientRect();
      const pad = 20;
      if (rect.right > window.innerWidth - pad) popover.style.setProperty('--popover-x', (window.innerWidth - rect.width - pad) + 'px');
      if (rect.bottom > window.innerHeight - pad) popover.style.setProperty('--popover-y', (window.innerHeight - rect.height - pad) + 'px');
    });
    const closePopover = () => { popover.style.animation = 'popoverFadeOut 0.2s ease forwards'; setTimeout(() => popover.remove(), 200); };
    setTimeout(() => window.addEventListener('click', closePopover, { once: true }), 10);
    popover.addEventListener('click', (e) => {
      e.stopPropagation();
      const btn = e.target.closest('button');
      if (!btn) return;
      const action = btn.dataset.action;
      const id = btn.dataset.artistId;
      if (navigator.vibrate) navigator.vibrate(20);
      if (action === 'go-artist') {
        btn.classList.add('popover-btn-pressed');
        this.ui.navigate('artist', id);
      } else if (action === 'play-top') {
        const a = state.getArtistById(id);
        if (a?.albums?.length) {
          btn.classList.add('popover-btn-pressed');
          const firstAlbum = a.albums[0];
          const queue = firstAlbum.songs.map(s => ({
            ...s,
            artistId: a.id,
            albumId: firstAlbum.id,
            artist: a.artist,
            album: firstAlbum.album,
            coverUrl: firstAlbum.coverUrl,
            artistImageUrl: a.imageUrl
          }));
          this.ui.audioPlayer.playSong(queue[0], queue, true);
        }
      }
      closePopover();
    });
  }

  showSongMenu(songId, event) {
    document.querySelector('.song-context-menu')?.remove();
    const state = this.ui.state;
    const song = state.getSongById(songId);
    if (!song) return;
    const isFav = this.ui.favorites.isSongFavorite(songId);
    const menu = document.createElement('div');
    menu.className = 'song-context-menu fixed z-50 rounded-xl p-2 animate-fadeInUp';
    Object.assign(menu.style, { background: 'hsl(var(--bg-surface))', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.5)', minWidth: '180px', left: event.clientX + 'px', top: event.clientY + 'px' });
    menu.innerHTML = `
      <button class="context-item w-full text-left px-6 py-4 rounded-lg hover:bg-interactive transition-colors flex items-center gap-2" data-action="add-fav">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="${isFav ? 'currentColor' : 'none'}" stroke="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
        ${isFav ? 'Remove from Favorites' : 'Add to Favorites'}
      </button>
      <button class="context-item w-full text-left px-4 py-2 rounded-lg hover:bg-interactive transition-colors flex items-center gap-2" data-action="add-playlist">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>
        Add to Playlist
      </button>
      <button class="context-item w-full text-left px-4 py-2 rounded-lg hover:bg-interactive transition-colors flex items-center gap-2" data-action="view-artist" data-artist-id="${song.artistId}">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="8" r="4"/><path d="M5.3 18.3C6.8 16.5 9.2 15 12 15s5.2 1.5 6.7 3.3"/></svg>
        View Artist
      </button>
      <button class="context-item w-full text-left px-4 py-2 rounded-lg hover:bg-interactive transition-colors flex items-center gap-2" data-action="view-album" data-artist-id="${song.artistId}" data-album-id="${song.albumId}">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect x="2" y="2" width="20" height="20" rx="2.18"/><circle cx="12" cy="12" r="3"/></svg>
        View Album
      </button>
    `;
    document.body.appendChild(menu);
    const rect = menu.getBoundingClientRect();
    if (rect.right > window.innerWidth) menu.style.left = (window.innerWidth - rect.width - 10) + 'px';
    if (rect.bottom > window.innerHeight) menu.style.top = (window.innerHeight - rect.height - 10) + 'px';
    setTimeout(() => window.addEventListener('click', () => menu.remove(), { once: true }), 0);
    menu.addEventListener('click', (e) => {
      e.stopPropagation();
      const action = e.target.closest('.context-item')?.dataset.action;
      if (!action) return;
      if (action === 'add-fav') this.ui.favorites.toggleFavoriteSong(song);
      if (action === 'add-playlist') window.favoritesPlaylists.addToPlaylistModal(song);
      if (action === 'view-artist') this.ui.navigate('artist', song.artistId);
      if (action === 'view-album') this.ui.navigate('artist', song.artistId, song.albumId);
      menu.remove();
    });
  }

  attachContentEvents() {
    this.heartTimeouts.forEach(({ timeoutId }) => clearTimeout(timeoutId));
    this.heartTimeouts.clear();

    const mainContent = document.getElementById('main-content');
    if (mainContent && !mainContent.artistClicksBound) {
      mainContent.artistClicksBound = true;
      mainContent.addEventListener('click', (e) => {
        const el = e.target.closest('[data-artist-id]');
        if (!el) return;
        const artistId = el.dataset.artistId;
        const albumId  = el.dataset.albumId || null;
        e.stopPropagation();
        this.ui.navigate('artist', artistId, albumId);
      });
      mainContent.addEventListener('dblclick', (e) => {
        const el = e.target.closest('.album-cover-wrap[data-artist-id][data-album-id]');
        if (!el) return;
        const artistId = el.dataset.artistId;
        const albumId  = el.dataset.albumId;
        if (!artistId || !albumId) return;
        const artist = this.ui.state.getArtistById(artistId);
        const album  = artist?.albums.find(a => IdUtils.normalize(a.id) === IdUtils.normalize(albumId));
        if (artist && album) {
          const queue = album.songs.map(s => ({
            ...s,
            artistId: artist.id,
            albumId: album.id,
            artist: artist.artist,
            album: album.album,
            coverUrl: album.coverUrl,
            artistImageUrl: artist.imageUrl
          }));
          this.ui.audioPlayer.playSong(queue[0], queue, true);
        }
      });
    }

    document.querySelectorAll('[data-song-id]').forEach(el => {
      el.addEventListener('dblclick', () => {
        const songId = el.dataset.songId;
        const song = this.ui.state.getSongById(songId);
        if (!song) return;
        if (el.dataset.context) {
          const ctx = JSON.parse(el.dataset.context);
          const artist = this.ui.state.getArtistById(ctx.artistId);
          const album  = artist?.albums.find(a => IdUtils.normalize(a.id) === IdUtils.normalize(ctx.albumId));
          if (album) {
            const queue = album.songs.map(s => ({
              ...s,
              artistId: artist.id,
              albumId: album.id,
              artist: artist.artist,
              album: album.album,
              coverUrl: album.coverUrl,
              artistImageUrl: artist.imageUrl
            }));
            this.ui.audioPlayer.playSong(queue.find(s => IdUtils.normalize(s.id) === IdUtils.normalize(songId)), queue, true);
            return;
          }
        }
        this.ui.audioPlayer.playSong(song, null, true);
      });
    });

    document.querySelectorAll('[data-play-album]').forEach(el => {
      const handler = (e) => {
        e.stopPropagation();
        const data = JSON.parse(el.dataset.playAlbum);
        const artist = this.ui.state.getArtistById(data.artistId);
        const album  = artist?.albums.find(a => IdUtils.normalize(a.id) === IdUtils.normalize(data.albumId));
        if (artist && album) {
          const queue = album.songs.map(s => ({
            ...s,
            artistId: artist.id,
            albumId: album.id,
            artist: artist.artist,
            album: album.album,
            coverUrl: album.coverUrl,
            artistImageUrl: artist.imageUrl
          }));
          this.ui.audioPlayer.playSong(queue[0], queue, true);
        }
      };
      el.addEventListener('click', handler);
      el.addEventListener('dblclick', handler);
    });

    document.querySelectorAll('[data-more-song]').forEach(el => {
      el.addEventListener('click', (e) => { e.stopPropagation(); this.showSongMenu(el.dataset.moreSong, e); });
    });

    document.querySelectorAll('.add-to-playlist-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const song = this.ui.state.getSongById(btn.dataset.songId);
        if (song) this.ui.favorites.addToPlaylistModal(song);
      });
    });

    document.querySelectorAll('.artist-name-pill').forEach(el => {
      el.addEventListener('click', (e) => {
        e.stopPropagation();
        const artistId = el.dataset.artistId;
        if (artistId) this.showArtistPopover(artistId, e);
      });
    });

    document.querySelectorAll('[data-album-id][data-dynamic="true"]').forEach(el => {
      el.addEventListener('click', () => {
        const artistId = IdUtils.normalize(el.dataset.artistId);
        const albumId  = IdUtils.normalize(el.dataset.albumId);
        if (artistId && albumId) this.ui.navigate('artist', artistId, albumId);
      });
    });

    if (this.ui.state.currentPage === 'playlists') {
      const createPlBtn = document.getElementById('create-playlist-btn');
      if (createPlBtn && !createPlBtn._hasListener) {
        createPlBtn._hasListener = true;
        createPlBtn.addEventListener('click', () => {
          window.favoritesPlaylists.createNewPlaylist();
          this.ui.render();
        });
      }

      document.querySelectorAll('.playlist-name-input, .playlist-description-input').forEach(el => {
        el.addEventListener('input', (e) => {
          const pl = this.ui.state.playlists.find(p => p.id === e.target.dataset.playlistId);
          if (pl) { pl[e.target.dataset.field] = e.target.value; this.ui.state.persist(); }
        });
      });

      document.querySelectorAll('.tag-input').forEach(input => {
        input.addEventListener('keydown', (e) => {
          if (e.key !== 'Enter' || !e.target.value.trim()) return;
          e.preventDefault();
          const pl = this.ui.state.playlists.find(p => p.id === e.target.dataset.playlistId);
          if (!pl) return;
          const newTag = e.target.value.trim();
          if (!pl.tags) pl.tags = [];
          if (pl.tags.includes(newTag)) return;
          pl.tags.push(newTag);
          this.ui.state.persist();
          const chip = document.createElement('span');
          chip.className = 'tag-chip px-3 py-1 rounded-full text-xs flex items-center gap-1 animate-fadeIn';
          chip.style.background = 'hsl(var(--bg-interactive))';
          const safeTag = newTag.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
          chip.innerHTML = `${safeTag} <button class="remove-tag-btn hover:text-destructive transition-colors" data-tag="${safeTag}">\u00d7</button>`;
          e.target.closest('.tags-container').insertBefore(chip, e.target);
          chip.querySelector('.remove-tag-btn').addEventListener('click', (ce) => {
            ce.stopPropagation();
            pl.tags = pl.tags.filter(t => t !== ce.target.dataset.tag);
            this.ui.state.persist();
            chip.remove();
          });
          e.target.value = '';
        });
      });

      document.querySelectorAll('.remove-tag-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          const plId = e.target.closest('.tags-container').dataset.playlistId;
          const pl = this.ui.state.playlists.find(p => p.id === plId);
          if (pl?.tags) { pl.tags = pl.tags.filter(t => t !== e.target.dataset.tag); this.ui.state.persist(); e.target.closest('.tag-chip').remove(); }
        });
      });

      document.querySelectorAll('.remove-from-playlist-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          const pl = this.ui.state.playlists.find(p => p.id === btn.dataset.playlistId);
          if (pl) { pl.songs = pl.songs.filter(sid => String(sid) !== String(btn.dataset.songId)); this.ui.state.persist(); btn.closest('.song-row').remove(); }
        });
      });

      document.querySelectorAll('.share-playlist-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          const pl = this.ui.state.playlists.find(p => p.id === btn.dataset.playlistId);
          if (!pl) return;
          const shareText = `Playlist: ${pl.name}\n${pl.songs.length} songs\n${pl.description || ''}`;
          if (navigator.share) { navigator.share({ title: pl.name, text: shareText }); }
          else { navigator.clipboard?.writeText(shareText).then(() => this.ui.state.showToast('Playlist copied to clipboard')); }
        });
      });
    }

    this.attachHeartEvents();

    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const tab = btn.dataset.tab;
        this.ui.state.favoritesTab = tab;
        history.pushState(null, '', '/favorites' + (tab !== 'songs' ? '/' + tab : ''));
        document.getElementById('favorites-content').innerHTML = this.ui.favoritesPage.tabContent(tab);
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.toggle('active', b === btn));
        this.ui.router.updateBreadcrumbs();
        this.attachContentEvents();
      });
    });
  }
}

class SearchManager {
  constructor(ui) { this.ui = ui; }

  openSearch() {
    this.ui.state.isSearchOpen = true;
    this.ui.state.searchQuery = '';
    document.querySelector('.breadCrumbsWrapper')?.classList.add('search-active');
    const searchBar = document.getElementById('search-bar');
    if (searchBar) {
      searchBar.classList.remove('hidden');
      searchBar.style.opacity = '0';
      requestAnimationFrame(() => { searchBar.style.opacity = '1'; });
      if (window.innerWidth > 768) setTimeout(() => document.getElementById('search-input')?.focus(), 150);
    }
    const container = document.getElementById('search-results-container');
    if (container) container.remove();
  }

  closeSearch() {
    this.ui.state.isSearchOpen = false;
    this.ui.state.searchQuery = '';
    document.querySelector('.breadCrumbsWrapper')?.classList.remove('search-active');
    const searchBar = document.getElementById('search-bar');
    if (searchBar) {
      searchBar.style.opacity = '0';
      setTimeout(() => { searchBar.classList.add('hidden'); searchBar.style.opacity = ''; }, 250);
    }
    const input = document.getElementById('search-input');
    if (input) input.value = '';
    const container = document.getElementById('search-results-container');
    if (container) container.remove();
  }

  updateDropdown() {
    const state = this.ui.state;
    if (!state.searchQuery.trim()) {
      const container = document.getElementById('search-results-container');
      if (container) container.remove();
      return;
    }
    let container = document.getElementById('search-results-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'search-results-container';
      container.className = 'search-results-container';
      const searchBar = document.getElementById('search-bar');
      if (searchBar) searchBar.appendChild(container);
    }
    container.innerHTML = `<div class="search-loading"><div class="spinner"></div></div>`;
    container.classList.remove('hidden');
    setTimeout(() => {
      container.innerHTML = this.renderDropdown();
      this.attachCategoryCollapse();
      this.attachResultEvents();
    }, 300);
  }

  renderDropdown() {
    const state = this.ui.state;
    if (!state.searchQuery.trim()) return '';
    const lower = state.searchQuery.toLowerCase();
    const allSongs = state.getAllSongs();
    const songs = allSongs.filter(s =>
      s.title.toLowerCase().includes(lower) ||
      s.artist.toLowerCase().includes(lower) ||
      s.album.toLowerCase().includes(lower)
    ).slice(0, 10);
    const artists = state.enrichedLibrary.filter(a => a.artist.toLowerCase().includes(lower)).slice(0, 5);
    const albums = [];
    state.enrichedLibrary.forEach(a => a.albums.forEach(alb => {
      if (alb.album.toLowerCase().includes(lower)) albums.push({ artistId: a.id, albumId: alb.id, artistName: a.artist, albumName: alb.album, coverUrl: alb.coverUrl });
    }));
    if (!songs.length && !artists.length && !albums.length) {
      return `<div class="text-center py-8" style="color: hsl(var(--text-secondary));">No results for "${state.searchQuery}"</div>`;
    }
    const categoryBlock = (key, label, inner) => `
      <div class="search-category" data-category="${key}">
        <div class="search-category-header" data-category="${key}">
          <span>${label}</span>
          ${Icons.general.chevronDown()}
        </div>
        <div class="search-category-content" data-category="${key}">${inner}</div>
      </div>
    `;
    let html = '';
    if (artists.length) {
      html += categoryBlock('artists', `Artists (${artists.length})`, `
        <div class="flex flex-wrap gap-2 mt-2">
          ${artists.map(a => `
            <button class="flex items-center gap-2 px-3 py-2 rounded-xl transition-colors hover:bg-interactive"
                    style="background: hsl(var(--bg-elevated));" data-artist-id="${a.id}">
              <img src="${a.imageUrl}" class="w-8 h-8 rounded-full object-cover">
              <div class="text-left">
                <p class="font-semibold text-sm">${a.artist}</p>
                <p class="text-xs" style="color: hsl(var(--text-secondary));">${a.genre || 'Artist'}</p>
              </div>
            </button>
          `).join('')}
        </div>
      `);
    }
    if (albums.length) {
      html += categoryBlock('albums', `Albums (${albums.length})`, `
        <div class="flex flex-wrap gap-2 mt-2">
          ${albums.map(alb => `
            <button class="flex items-center gap-2 px-3 py-2 rounded-xl transition-colors hover:bg-interactive"
                    style="background: hsl(var(--bg-elevated));" data-artist-id="${alb.artistId}" data-album-id="${alb.albumId}">
              <img src="${alb.coverUrl}" class="w-8 h-8 rounded-md object-cover">
              <div class="text-left">
                <p class="font-semibold text-sm">${alb.albumName}</p>
                <p class="text-xs" style="color: hsl(var(--text-secondary));">${alb.artistName}</p>
              </div>
            </button>
          `).join('')}
        </div>
      `);
    }
    if (songs.length) {
      html += categoryBlock('songs', `Songs (${songs.length})`, `
        <div class="space-y-1 mt-2">
          ${songs.map((s, i) => `
            <button class="song-row w-full" data-song-id="${s.id}" style="animation-delay: ${i * 30}ms">
              <img src="${s.coverUrl}" class="w-10 h-10 rounded-lg object-cover">
              <div class="flex-1 text-left min-w-0">
                <p class="font-semibold text-sm truncate">${s.title}</p>
                <p class="text-xs truncate" style="color: hsl(var(--text-secondary));">${s.artist} \u2022 ${s.album}</p>
              </div>
              <span class="text-xs" style="color: hsl(var(--text-tertiary));">${s.duration}</span>
            </button>
          `).join('')}
        </div>
      `);
    }
    return html;
  }

  attachCategoryCollapse() {
    document.querySelectorAll('.search-category-header').forEach(header => {
      header.addEventListener('click', () => {
        const cat = header.dataset.category;
        document.querySelector(`.search-category-content[data-category="${cat}"]`)?.classList.toggle('collapsed');
        header.classList.toggle('collapsed');
      });
    });
  }

  attachResultEvents() {
    document.querySelectorAll('[data-artist-id]').forEach(el => {
      if (el.closest('.search-results-container')) {
        el.addEventListener('click', () => { this.ui.navigate('artist', el.dataset.artistId); this.closeSearch(); });
      }
    });
    document.querySelectorAll('[data-album-id]').forEach(el => {
      if (el.closest('.search-results-container')) {
        el.addEventListener('click', () => { this.ui.navigate('artist', el.dataset.artistId, el.dataset.albumId); this.closeSearch(); });
      }
    });
    document.querySelectorAll('[data-song-id]').forEach(el => {
      if (el.closest('.search-results-container')) {
        el.addEventListener('click', () => {
          const song = this.ui.state.getSongById(el.dataset.songId);
          if (song) this.ui.audioPlayer.playSong(song, null, true);
          this.closeSearch();
        });
      }
    });
  }

  attachSearchDropdownEvents() {
    document.querySelectorAll('[data-artist-id]').forEach(el => {
      if (el.closest('.search-dropdown-fixed')) {
        el.addEventListener('click', () => { this.ui.navigate('artist', el.dataset.artistId); this.closeSearch(); });
      }
    });
    document.querySelectorAll('[data-album-id]').forEach(el => {
      if (el.closest('.search-dropdown-fixed')) {
        el.addEventListener('click', () => { this.ui.navigate('artist', el.dataset.artistId, el.dataset.albumId); this.closeSearch(); });
      }
    });
    document.querySelectorAll('[data-song-id]').forEach(el => {
      if (el.closest('.search-dropdown-fixed')) {
        el.addEventListener('click', () => {
          const song = this.ui.state.getSongById(el.dataset.songId);
          if (song) this.ui.audioPlayer.playSong(song, null, true);
          this.closeSearch();
        });
      }
    });
  }
}
