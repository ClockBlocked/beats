/**
 * UI Enhancements & Bug Fixes
 *
 * This file patches UIManager.prototype with:
 *
 *   1. Missing getArtistId / getAlbumId / getPlaylistId methods.
 *      These are called inside navigate() but were never defined on the
 *      UIManager class, causing album-tab clicks to throw silently.
 *
 *   2. FIXED: syncWithURL() — the original uses strict equality (===)
 *      when comparing metadata IDs (which may be NUMBERS) against
 *      URL path segments and dataset attributes (which are always STRINGS).
 *      123 === "123" is false in JS, so artist/album lookups fail silently.
 *
 *   3. FIXED: Album tab click handler — same strict-equality bug.
 *      Uses String() comparison now.
 *
 *   4. FIXED: renderQueueList() — when called it now forces a fresh render
 *      so the active-song indicator (animated bars) always matches the
 *      currently playing track.
 *
 *   5. Theme-aware visualizer with Web Audio API support.
 *   6. Drawer soft-update (no flicker when same song).
 *   7. Velocity-aware touch gestures.
 *
 * Load this file AFTER UIManager.js so the prototype extensions take effect.
 */

(function() {
  'use strict';

  // ═══════════════════════════════════════════════════════════════════════════
  //  UTIL: safe string-id compare (dataset attrs are strings, metadata may be numbers)
  // ═══════════════════════════════════════════════════════════════════════════

  function sid(v) { return v == null ? '' : String(v); }

  // ═══════════════════════════════════════════════════════════════════════════
  //  PATCH 1 — Missing ID-helper methods on UIManager.prototype
  // ═══════════════════════════════════════════════════════════════════════════

  UIManager.prototype.getArtistId = function(name) {
    return this.state.getArtistId(name);
  };

  UIManager.prototype.getAlbumId = function(artistName, albumName) {
    return this.state.getAlbumId(artistName, albumName);
  };

  UIManager.prototype.getPlaylistId = function(name) {
    return this.state.getPlaylistId(name);
  };

  // ═══════════════════════════════════════════════════════════════════════════
  //  PATCH 2 — Fix syncWithURL: strict equality breaks numeric IDs
  // ═══════════════════════════════════════════════════════════════════════════

  UIManager.prototype.syncWithURL = function() {
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
        const playlist = this.state.playlists.find(p => sid(p.id) === sid(parts[1]));
        this.state.currentPage          = 'playlists';
        this.state.selectedPlaylistName = playlist?.name || null;
        this.state.selectedPlaylistId   = playlist ? parts[1] : null;

      } else if (page === 'artist' && parts[1]) {
        // Use sid() for safe comparison: metadata IDs may be numbers,
        // but URL path segments are always strings.
        const artist = this.state.enrichedLibrary.find(a => sid(a.id) === sid(parts[1]));
        if (artist) {
          this.state.currentPage    = 'artist';
          this.state.artistPageName = artist.artist;
          this.state.artistId       = parts[1];

          if (parts[2] === 'album' && parts[3]) {
            const album = artist.albums.find(a => sid(a.id) === sid(parts[3]));
            this.state.selectedAlbumName = album?.album || null;
            this.state.selectedAlbumId   = album ? parts[3] : null;
          } else {
            this.state.selectedAlbumName = null;
            this.state.selectedAlbumId   = null;
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
    this.render();
  };

  // ═══════════════════════════════════════════════════════════════════════════
  //  PATCH 3 — Album-tab click handler (DEPRECATED: now handled in UIManager)
  // ═══════════════════════════════════════════════════════════════════════════
  /**
   * NOTE: Album tab navigation is now handled directly by UIManager via
   * a delegated click listener on #album-tabs-nav using artist/album NAMES
   * instead of IDs. This avoids silent failures when metadata IDs are
   * missing, numeric, or mismatched.
   *
   * The handler below is kept as a fallback for any album-tab elements
   * that might still use the old data-dynamic="true" attribute.
   */
  document.addEventListener('click', (e) => {
    const tab = e.target.closest('.album-tab[data-dynamic="true"]');
    if (!tab) return;

    const artistId = sid(tab.dataset.artistId);
    const albumId  = sid(tab.dataset.albumId);

    const lib    = window.state?.enrichedLibrary;
    if (!lib) return;

    const artist = lib.find(a => sid(a.id) === artistId);
    const album  = artist?.albums?.find(a => sid(a.id) === albumId);

    if (artist && album) {
      e.stopPropagation();
      const ui = window.uiManager;
      if (ui) ui.navigate('artist', artist.artist, album.album);
    }
  }, true);

  // ═══════════════════════════════════════════════════════════════════════════
  //  PATCH 4 — renderQueueList: force fresh render, fix active indicator
  // ═══════════════════════════════════════════════════════════════════════════

  /**
   * The original renderQueueList() creates DOM from scratch every time.
   * This override ensures that when the queue is open, a fresh render
   * always reflects the current queueIndex.
   */
  UIManager.prototype.renderQueueList = function() {
    const list = document.getElementById('queue-list');
    if (!list) return;

    list.innerHTML = '';

    if (!this.state.queue.length) {
      list.innerHTML = '<div style="text-align:center;padding:2rem;color:hsl(var(--text-secondary));">Queue is empty</div>';
      return;
    }

    this.state.queue.forEach((s, idx) => {
      const item     = document.createElement('div');
      const isActive = idx === this.state.queueIndex;

      item.className  = `queue-item ${isActive ? 'active' : ''}`;
      item.onclick    = () => {
        this.audioPlayer.playSong(s, this.state.queue);
        this.closeQueue();
      };

      const indicator = isActive
        ? `<div class="now-playing-indicator"><div class="bar-anim"></div><div class="bar-anim"></div><div class="bar-anim"></div></div>`
        : `<span class="text-slate-500 text-sm">${idx + 1}</span>`;

      item.innerHTML = `
        <img src="${s.coverUrl}" class="queue-item-thumb">
        <div class="queue-item-info">
          <div class="queue-item-title">${s.title}</div>
          <div class="queue-item-artist">${s.artist}</div>
        </div>
        ${indicator}
      `;
      list.appendChild(item);
    });
  };

  // ═══════════════════════════════════════════════════════════════════════════
  //  PATCH 5 — Theme-Aware Visualizer
  // ═══════════════════════════════════════════════════════════════════════════

  UIManager.prototype.setupVisualizer = function() {
    const canvas = document.getElementById('visualizer');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;

    let width, height;
    const resize = () => {
      width  = canvas.offsetWidth;
      height = canvas.offsetHeight;
      canvas.width  = width  * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);

    // Attempt to connect to the Web Audio API for real analysis.
    let analyser, dataArray, audioConnected = false;
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const source   = audioCtx.createMediaElementSource(this.audioPlayer.audio);
      analyser       = audioCtx.createAnalyser();
      analyser.fftSize = 64; // small = chunky bars, performant
      source.connect(analyser);
      analyser.connect(audioCtx.destination);
      dataArray = new Uint8Array(analyser.frequencyBinCount);
      audioConnected = true;
    } catch {
      // Web Audio not available — fall back to procedural animation.
    }

    // Smooth bar heights (lerp targets).
    let barCount   = 30;
    let barTargets = new Float32Array(barCount);
    let barCurrent = new Float32Array(barCount);

    // Listen for theme changes to update the gradient colour.
    let accentRGB = { r: 255, g: 107, b: 107 }; // default coral
    window.addEventListener('themechange', (e) => {
      accentRGB = hslToRgb(e.detail.accent);
    });

    let animFrame;
    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      if (this.state.isPlaying) {
        // ── Update bar targets ──────────────────────────────────────────
        if (audioConnected && analyser && dataArray) {
          analyser.getByteFrequencyData(dataArray);
          const step = dataArray.length / barCount;
          for (let i = 0; i < barCount; i++) {
            let sum = 0;
            const start = Math.floor(i * step);
            const end   = Math.floor((i + 1) * step);
            for (let j = start; j < end; j++) sum += dataArray[j];
            barTargets[i] = (sum / Math.max(1, (end - start))) / 255;
          }
        } else {
          // Procedural: smooth sine-based movement.
          const t = performance.now() / 1000;
          for (let i = 0; i < barCount; i++) {
            barTargets[i] =
              Math.sin(t * 2 + i * 0.4) * 0.3 +
              Math.sin(t * 3.5 + i * 0.7) * 0.2 +
              Math.sin(t * 1.2 + i * 0.2) * 0.15 +
              0.35;
          }
        }

        // ── Lerp current toward targets ─────────────────────────────────
        const lerpFactor = 0.12;
        for (let i = 0; i < barCount; i++) {
          barCurrent[i] += (barTargets[i] - barCurrent[i]) * lerpFactor;
        }

        // ── Draw mirrored bars (symmetrical visualizer) ─────────────────
        const halfBars = Math.floor(barCount / 2);
        const barWidth = width / barCount;
        const centerX  = width / 2;

        for (let i = 0; i < halfBars; i++) {
          const h = barCurrent[i] * height * 0.85;
          if (h < 1) continue;

          const xLeft  = centerX - (i + 1) * barWidth;
          const xRight = centerX + i * barWidth;
          const y      = height - h;

          const gradient = ctx.createLinearGradient(0, y, 0, height);
          gradient.addColorStop(0, `rgba(${accentRGB.r},${accentRGB.g},${accentRGB.b}, 0)`);
          gradient.addColorStop(0.5, `rgba(${accentRGB.r},${accentRGB.g},${accentRGB.b}, 0.25)`);
          gradient.addColorStop(1, `rgba(${accentRGB.r},${accentRGB.g},${accentRGB.b}, 0.55)`);

          ctx.fillStyle = gradient;
          const w = barWidth - 2;
          ctx.beginPath();
          // roundRect polyfill for older browsers
          drawRoundedRect(ctx, xLeft,  y, w, h, 3);
          drawRoundedRect(ctx, xRight, y, w, h, 3);
          ctx.fill();
        }
      }

      animFrame = requestAnimationFrame(draw);
    };

    draw();

    // Cleanup when drawer closes.
    const observer = new MutationObserver(() => {
      if (!document.getElementById('full-player-drawer')) {
        cancelAnimationFrame(animFrame);
        observer.disconnect();
      }
    });
    observer.observe(document.body, { childList: true, subtree: true });
  };

  function drawRoundedRect(ctx, x, y, w, h, r) {
    if (typeof ctx.roundRect === 'function') {
      ctx.roundRect(x, y, w, h, [r, r, 0, 0]);
    } else {
      ctx.moveTo(x + r, y);
      ctx.lineTo(x + w - r, y);
      ctx.quadraticCurveTo(x + w, y, x + w, y + r);
      ctx.lineTo(x + w, y + h);
      ctx.lineTo(x, y + h);
      ctx.lineTo(x, y + r);
      ctx.quadraticCurveTo(x, y, x + r, y);
    }
  }

  // ═══════════════════════════════════════════════════════════════════════════
  //  PATCH 6 — Drawer soft-update (no flicker when same song)
  // ═══════════════════════════════════════════════════════════════════════════

  const originalRenderFullPlayer = UIManager.prototype.renderFullPlayer;
  UIManager.prototype.renderFullPlayer = function() {
    const oldDrawer = document.getElementById('full-player-drawer');
    const oldImg    = oldDrawer?.querySelector('.album-art');

    // If the same song is already open, don't destroy / recreate — just update controls.
    if (oldDrawer && this.state.currentSong && oldImg) {
      const currentSrc = oldImg.getAttribute('src');
      const newSrc     = this.state.currentSong.coverUrl;
      if (currentSrc === newSrc) {
        this._softUpdateDrawer(oldDrawer);
        this.attachFullPlayerEvents();
        return;
      }
    }

    // Different song — full re-render with the original method.
    originalRenderFullPlayer.call(this);
  };

  /** Update progress, play/pause state, and control highlights without re-creating DOM. */
  UIManager.prototype._softUpdateDrawer = function(drawer) {
    const song = this.state.currentSong;
    if (!song) return;

    const progress = this.state.duration
      ? (this.state.currentTime / this.state.duration) * 100
      : 0;

    // Progress bar
    const fill = drawer.querySelector('#progress-fill');
    if (fill) fill.style.width = `${progress}%`;

    // Times
    const curTime = drawer.querySelector('#drawer-current-time');
    const totTime = drawer.querySelector('#total-time');
    if (curTime) curTime.textContent = this.state.formatTime(this.state.currentTime);
    if (totTime) totTime.textContent = this.state.formatTime(this.state.duration);

    // Play / pause icon swap
    const playBtn = drawer.querySelector('#play-pause-drawer');
    if (playBtn) {
      playBtn.classList.toggle('playing', this.state.isPlaying);
      playBtn.innerHTML = this.state.isPlaying
        ? this._svgPause(32)
        : this._svgPlay(32);
    }

    // Shuffle state
    const shuffleBtn = drawer.querySelector('#shuffle-btn');
    if (shuffleBtn) shuffleBtn.classList.toggle('active', this.state.isShuffled);

    // Like / heart state
    const likeBtn = drawer.querySelector('#like-btn');
    if (likeBtn) {
      const isFav = this.favorites.isSongFavorite(song.id);
      likeBtn.classList.toggle('favorited', isFav);
      likeBtn.innerHTML = this.getHeartSVG('song', isFav, false, null);
    }
  };

  // ═══════════════════════════════════════════════════════════════════════════
  //  PATCH 7 — SVG helpers
  // ═══════════════════════════════════════════════════════════════════════════

  UIManager.prototype._svgPlay = function(size) {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="${size}" height="${size}"><path opacity=".4" fill="currentColor" d="M91.2 36.9c-12.4-6.8-27.4-6.5-39.6.7S32 57.9 32 72v368c0 14.1 7.5 27.2 19.6 34.4s27.2 7.5 39.6.7l336-184c12.8-7 20.8-20.5 20.8-35.1s-8-28.1-20.8-35.1L91.2 36.9z"/><path fill="currentColor" d="M91.2 36.9c-12.4-6.8-27.4-6.5-39.6.7S32 57.9 32 72v368c0 14.1 7.5 27.2 19.6 34.4s27.2 7.5 39.6.7l336-184c12.8-7 20.8-20.5 20.8-35.1s-8-28.1-20.8-35.1L91.2 36.9z"/></svg>`;
  };

  UIManager.prototype._svgPause = function(size) {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" width="${size}" height="${size}"><path opacity=".4" fill="currentColor" d="M48 32C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h64c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48H48zm224 0c-26.5 0-48 21.5-48 48v352c0 26.5 21.5 48 48 48h64c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48h-64z"/><path fill="currentColor" d="M48 32C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h64c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48H48zm224 0c-26.5 0-48 21.5-48 48v352c0 26.5 21.5 48 48 48h64c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48h-64z"/></svg>`;
  };

  // ═══════════════════════════════════════════════════════════════════════════
  //  PATCH 8 — Velocity-aware touch gestures
  // ═══════════════════════════════════════════════════════════════════════════

  const originalAttachFullPlayerEvents = UIManager.prototype.attachFullPlayerEvents;
  UIManager.prototype.attachFullPlayerEvents = function() {
    originalAttachFullPlayerEvents.call(this);

    const drawer = document.getElementById('full-player-drawer');
    if (!drawer) return;

    let touchStartX = 0, touchStartY = 0, touchStartTime = 0;

    drawer.addEventListener('touchstart', (e) => {
      const t = e.changedTouches[0];
      touchStartX = t.screenX;
      touchStartY = t.screenY;
      touchStartTime = performance.now();
    }, { passive: true });

    drawer.addEventListener('touchend', (e) => {
      const t     = e.changedTouches[0];
      const dx    = t.screenX - touchStartX;
      const dy    = t.screenY - touchStartY;
      const dt    = performance.now() - touchStartTime;
      const absDx = Math.abs(dx);
      const absDy = Math.abs(dy);

      // Horizontal swipe: change track (velocity-aware for snappy feel).
      if (absDx > absDy && absDx > 50) {
        const velocity = absDx / dt;
        if (velocity > 0.4 || absDx > 120) {
          dx > 0 ? this.audioPlayer.skipBack() : this.audioPlayer.skipForward();
        }
        return;
      }

      // Vertical swipe up: open queue.
      if (dy < -80 && absDy > absDx) {
        this.openQueue();
        return;
      }

      // Vertical swipe down from top area: close drawer.
      if (dy > 80 && absDy > absDx && touchStartY < drawer.getBoundingClientRect().top + 120) {
        this.closePlayerDrawer();
      }
    }, { passive: true });
  };

  // ═══════════════════════════════════════════════════════════════════════════
  //  UTIL: HSL string → {r,g,b} object  (for canvas gradient tinting)
  // ═══════════════════════════════════════════════════════════════════════════

  function hslToRgb(hslStr) {
    const m = hslStr.match(/hsl\((\d+),\s*(\d+)%,\s*(\d+)%\)/);
    if (!m) return { r: 255, g: 107, b: 107 };

    let h = parseInt(m[1]) / 360;
    let s = parseInt(m[2]) / 100;
    let l = parseInt(m[3]) / 100;

    let r, g, b;
    if (s === 0) {
      r = g = b = l;
    } else {
      const hue2rgb = (p, q, t) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1/6) return p + (q - p) * 6 * t;
        if (t < 1/2) return q;
        if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
        return p;
      };
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = hue2rgb(p, q, h + 1/3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1/3);
    }
    return {
      r: Math.round(r * 255),
      g: Math.round(g * 255),
      b: Math.round(b * 255)
    };
  }

})();
