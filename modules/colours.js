class ColorExtractor {
  constructor(options = {}) {
    this.cache = new Map();
    this.defaultColors = {
      primary:   '#1a1a2e',
      secondary: '#16213e',
      accent:    '#e94560'
    };
    this.opts = {
      sampleRate:       10,   // pixels to skip (performance)
      skipThreshold:    30,   // skip near-black
      whiteThreshold:   225, // skip near-white
      colorQuantize:    10,  // bucket size for RGB
      dominantColorCount: 3,
      ...options
    };
  }

  //  Public API

  async extractColors(imageUrl) {
    if (!imageUrl) return { ...this.defaultColors };
    if (this.cache.has(imageUrl)) return this.cache.get(imageUrl);

    try {
      const img = await this._loadImage(imageUrl);
      const pixels = this._getPixels(img);
      const colors = this._dominantColors(pixels);
      this.cache.set(imageUrl, colors);
      return colors;
    } catch (err) {
      console.warn('[ColorExtractor] Extraction failed, using defaults.', err);
      return { ...this.defaultColors };
    }
  }

  /** Apply extracted palette to the player and surrounding UI. */
  applyThemeToPlayer(colors) {
    const root = document.documentElement;

    // Core trio
    root.style.setProperty('--player-primary',   colors.primary);
    root.style.setProperty('--player-secondary', colors.secondary);
    root.style.setProperty('--player-accent',    colors.accent);

    // Derived gradient used for drawer backgrounds
    const gradient = `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`;
    root.style.setProperty('--player-gradient', gradient);

    // Glow / shadow tints (subtle ambient glows around album art & play btn)
    root.style.setProperty('--player-glow', `${colors.accent}40`);        // 25% opacity
    root.style.setProperty('--player-glow-strong', `${colors.accent}80`); // 50% opacity

    // Soft background tint for control panel & overlays
    root.style.setProperty('--player-tint', this._mixWithBlack(colors.primary, 0.65));

    // Smooth CSS transitions for colour changes
    root.style.setProperty('--theme-transition', 'background 0.6s ease, color 0.35s ease, box-shadow 0.5s ease, border-color 0.4s ease');

    // Emit a custom event so other components can react to theme changes
    window.dispatchEvent(new CustomEvent('themechange', {
      detail: { ...colors }
    }));
  }

  //  Internals
  _loadImage(url) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'Anonymous';
      img.onload  = () => resolve(img);
      img.onerror = () => reject(new Error('Image load error'));
      img.src = url;
    });
  }

  _getPixels(img) {
    const canvas = document.createElement('canvas');
    const ctx    = canvas.getContext('2d', { willReadFrequently: true });

    // Resize for speed â€” we only need rough colour data.
    const maxSize = 100;
    let { width, height } = img;
    if (width > height) {
      height = (height / width) * maxSize;
      width  = maxSize;
    } else {
      width  = (width / height) * maxSize;
      height = maxSize;
    }
    canvas.width  = Math.max(1, Math.floor(width));
    canvas.height = Math.max(1, Math.floor(height));
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    return ctx.getImageData(0, 0, canvas.width, canvas.height).data;
  }

  _dominantColors(pixelData) {
    const colorMap = new Map();

    for (let i = 0; i < pixelData.length; i += this.opts.sampleRate * 4) {
      const r = pixelData[i];
      const g = pixelData[i + 1];
      const b = pixelData[i + 2];
      const a = pixelData[i + 3];
      if (a < 128) continue;

      const brightness = (r + g + b) / 3;
      if (brightness < this.opts.skipThreshold) continue;
      if (brightness > this.opts.whiteThreshold) continue;

      const key = `${Math.floor(r / this.opts.colorQuantize)},${Math.floor(g / this.opts.colorQuantize)},${Math.floor(b / this.opts.colorQuantize)}`;
      colorMap.set(key, (colorMap.get(key) || 0) + 1);
    }

    const sorted = [...colorMap.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, this.opts.dominantColorCount);

    const palette = sorted.map(([key]) => {
      const [r, g, b] = key.split(',').map(v => parseInt(v) * this.opts.colorQuantize);
      return { r, g, b };
    });

    return this._buildScheme(palette);
  }

  _buildScheme(palette) {
    if (!palette.length) return { ...this.defaultColors };

    const hslPalette = palette.map(c => this._rgbToHsl(c));

    // Primary: light, low-saturation â€” used for large background surfaces
    const primary = {
      h: hslPalette[0].h,
      s: Math.min(hslPalette[0].s, 40),
      l: Math.max(hslPalette[0].l, 80)
    };

    // Secondary: darker complement â€” used for secondary surfaces / SVG strokes
    const secondary = {
      h: hslPalette[0].h,
      s: Math.min(hslPalette[0].s, 30),
      l: Math.min(hslPalette[0].l, 70)
    };

    // Accent: most saturated colour â€” used for progress bars, active states, glows
    const vibrant = hslPalette.reduce((a, b) => (a.s > b.s ? a : b));
    const accent = {
      h: vibrant.h,
      s: Math.min(vibrant.s + 20, 100),
      l: Utils.clamp(vibrant.l, 45, 55)
    };

    return {
      primary:   `hsl(${primary.h}, ${primary.s}%, ${primary.l}%)`,
      secondary: `hsl(${secondary.h}, ${secondary.s}%, ${secondary.l}%)`,
      accent:    `hsl(${accent.h}, ${accent.s}%, ${accent.l}%)`
    };
  }

  _rgbToHsl({ r, g, b }) {
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
        case g: h = ((b - r) / d + 2) / 6; break;
        case b: h = ((r - g) / d + 4) / 6; break;
      }
    } else {
      h = s = 0;
    }
    return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
  }

  /** Blend a hex/HSL colour with black at a given ratio (0-1). */
  _mixWithBlack(color, ratio) {
    // Simple approach: parse HSL and darken the lightness
    const match = color.match(/hsl\((\d+),\s*(\d+)%,\s*(\d+)%\)/);
    if (!match) return color;
    const [, h, s, l] = match.map(Number);
    return `hsl(${h}, ${s}%, ${Math.round(l * (1 - ratio))}%)`;
  }
}
