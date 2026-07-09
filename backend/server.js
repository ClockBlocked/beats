const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { spawn } = require('child_process');
const crypto = require('crypto');
const fs = require('fs');
const fsp = require('fs/promises');
const path = require('path');

const app = express();
const PORT = Number(process.env.PORT || 3000);
const HOST = process.env.HOST || '127.0.0.1'; // 0.0.0.0 exposes all interfaces; only use with strict firewall/proxy controls
const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN || '*';
const DOWNLOADS_DIR = path.join(__dirname, 'downloads');
const ttlHoursRaw = Number.parseFloat(process.env.FILE_TTL_HOURS || '6');
const FILE_TTL_HOURS = Number.isFinite(ttlHoursRaw) && ttlHoursRaw > 0 ? ttlHoursRaw : 6;
const FILE_TTL_MS = FILE_TTL_HOURS * 60 * 60 * 1000; // keep extracted files for ~6h by default
const CLEANUP_INTERVAL_MS = 30 * 60 * 1000;

const extractionState = new Map();

if (!fs.existsSync(DOWNLOADS_DIR)) {
  fs.mkdirSync(DOWNLOADS_DIR, { recursive: true });
}

const allowedOrigins = ALLOWED_ORIGIN.split(',').map(item => item.trim()).filter(Boolean);
app.use(cors({
  origin(origin, callback) {
    if (!origin || ALLOWED_ORIGIN === '*') return callback(null, true);
    if (allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error('Not allowed by CORS'));
  }
}));
app.use(helmet({ crossOriginResourcePolicy: false }));
app.use(express.json({ limit: '100kb' }));
app.use(rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  standardHeaders: true,
  legacyHeaders: false
}));

function sanitizeTitle(input = '') {
  return String(input).replace(/[\r\n\t]+/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 140);
}

function humanDuration(seconds) {
  const safe = Number(seconds);
  if (!Number.isFinite(safe) || safe <= 0) return 'Unknown';
  const total = Math.floor(safe);
  const hours = Math.floor(total / 3600);
  const minutes = Math.floor((total % 3600) / 60);
  const secs = total % 60;
  return hours
    ? `${hours}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
    : `${minutes}:${String(secs).padStart(2, '0')}`;
}

function safeFileName(name = '') {
  const raw = String(name);
  const base = path.basename(raw);
  if (!base || base !== raw) return null;
  if (base === '.' || base === '..' || base.startsWith('.')) return null;
  if (!/^[a-zA-Z0-9._-]+$/.test(base)) return null;
  return base;
}

function getState(filename) {
  return extractionState.get(filename) || { status: 'processing', progress: 0, updatedAt: Date.now() };
}

function parseProgress(chunk) {
  const text = chunk.toString();
  const match = text.match(/(\d+(?:\.\d+)?)%/);
  if (!match) return null;
  const val = Number(match[1]);
  return Number.isFinite(val) ? Math.max(0, Math.min(99, Math.round(val))) : null;
}

function searchYouTube(query) {
  return new Promise((resolve, reject) => {
    const args = [
      '--dump-json',
      '--skip-download',
      '--no-playlist',
      '--js-runtimes', 'node', // keeps YouTube JS extraction compatible on many VPS environments
      `ytsearch10:${query}`
    ];

    const child = spawn('yt-dlp', args, { stdio: ['ignore', 'pipe', 'pipe'] });
    let stdout = '';
    let stderr = '';

    child.stdout.on('data', chunk => {
      stdout += chunk.toString();
    });

    child.stderr.on('data', chunk => {
      stderr += chunk.toString();
    });

    child.on('error', reject);

    child.on('close', code => {
      if (code !== 0) {
        return reject(new Error(stderr || 'yt-dlp search failed'));
      }
      const lines = stdout.split(/\r?\n/).filter(Boolean);
      const results = [];
      for (const line of lines) {
        try {
          const entry = JSON.parse(line);
          if (!entry?.id || !entry?.title) continue;
          results.push({
            id: String(entry.id),
            title: sanitizeTitle(entry.title),
            uploader: sanitizeTitle(entry.uploader || entry.channel || 'Unknown channel'),
            duration: humanDuration(entry.duration),
            thumbnail: entry.thumbnail || (Array.isArray(entry.thumbnails) ? entry.thumbnails.at(-1)?.url : ''),
            url: entry.webpage_url || `https://www.youtube.com/watch?v=${entry.id}`
          });
        } catch {
          console.warn('[search] Skipping malformed yt-dlp line');
        }
      }
      resolve(results.slice(0, 10));
    });
  });
}

async function pruneOldDownloads() {
  try {
    const files = await fsp.readdir(DOWNLOADS_DIR);
    const now = Date.now();
    await Promise.all(files.map(async (file) => {
      const fullPath = path.join(DOWNLOADS_DIR, file);
      const stat = await fsp.stat(fullPath);
      if (now - stat.mtimeMs > FILE_TTL_MS) {
        await fsp.unlink(fullPath);
        extractionState.delete(file);
      }
    }));
  } catch (error) {
    console.error('[cleanup]', error.message);
  }
}

app.get('/api/search', async (req, res) => {
  const q = String(req.query.q || '').trim();
  if (!q) {
    return res.status(400).json({ error: 'Missing search query' });
  }

  try {
    const results = await searchYouTube(q);
    return res.json(results);
  } catch (error) {
    console.error('[search]', error.message);
    return res.status(500).json({ error: 'Search failed. Try again shortly.' });
  }
});

app.post('/api/extract', async (req, res) => {
  const url = String(req.body?.url || '').trim();
  if (!url) {
    return res.status(400).json({ error: 'Missing url' });
  }
  let parsedUrl;
  try {
    parsedUrl = new URL(url);
  } catch {
    return res.status(400).json({ error: 'Invalid url' });
  }
  if (!/^https?:$/i.test(parsedUrl.protocol)) {
    return res.status(400).json({ error: 'Invalid url' });
  }

  const id = crypto.randomUUID();
  const filename = `${id}.mp3`;
  const outputPath = path.join(DOWNLOADS_DIR, filename);

  extractionState.set(filename, { status: 'processing', progress: 0, updatedAt: Date.now() });

  const args = [
    '--extract-audio',
    '--audio-format', 'mp3',
    '--audio-quality', '0',
    '--no-playlist',
    '--newline',
    '--progress',
    '--paths', DOWNLOADS_DIR,
    '--output', filename,
    '--js-runtimes', 'node',
    url
  ];

  const worker = spawn('yt-dlp', args, { stdio: ['ignore', 'pipe', 'pipe'] });
  const onProgress = (chunk) => {
    const pct = parseProgress(chunk);
    if (pct === null) return;
    extractionState.set(filename, {
      status: 'processing',
      progress: pct,
      updatedAt: Date.now()
    });
  };

  worker.stdout.on('data', onProgress);
  worker.stderr.on('data', onProgress);

  worker.on('error', (error) => {
    extractionState.set(filename, {
      status: 'failed',
      progress: 0,
      error: error.message,
      updatedAt: Date.now()
    });
  });

  worker.on('close', async (code) => {
    if (code !== 0) {
      extractionState.set(filename, {
        status: 'failed',
        progress: 0,
        error: `yt-dlp exited with code ${code}`,
        updatedAt: Date.now()
      });
      return;
    }

    try {
      await fsp.access(outputPath, fs.constants.R_OK);
      extractionState.set(filename, {
        status: 'ready',
        progress: 100,
        updatedAt: Date.now()
      });
    } catch {
      extractionState.set(filename, {
        status: 'failed',
        progress: 0,
        error: 'Audio file not created',
        updatedAt: Date.now()
      });
    }
  });

  return res.json({
    id,
    filename,
    status: 'processing',
    downloadUrl: `/api/download/${encodeURIComponent(filename)}`,
    statusUrl: `/api/status/${encodeURIComponent(filename)}`
  });
});

app.get('/api/status/:filename', (req, res) => {
  const filename = safeFileName(req.params.filename);
  if (!filename) {
    return res.status(400).json({ error: 'Invalid filename' });
  }

  const state = getState(filename);
  if (state.status === 'failed') {
    return res.status(500).json({ status: 'failed', error: state.error || 'Extraction failed' });
  }

  return res.json({ status: state.status, progress: state.progress ?? 0 });
});

app.get('/api/download/:filename', async (req, res) => {
  const filename = safeFileName(req.params.filename);
  if (!filename) {
    return res.status(400).json({ error: 'Invalid filename' });
  }

  const fullPath = path.join(DOWNLOADS_DIR, filename);
  try {
    await fsp.access(fullPath, fs.constants.R_OK);
    return res.download(fullPath, filename);
  } catch {
    return res.status(404).json({ error: 'File not found' });
  }
});

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, host: HOST, port: PORT });
});

setInterval(pruneOldDownloads, CLEANUP_INTERVAL_MS);
pruneOldDownloads().catch((error) => {
  console.error('[cleanup:init]', error.message);
});

app.listen(PORT, HOST, () => {
  console.log(`Backend listening on http://${HOST}:${PORT}`);
});
