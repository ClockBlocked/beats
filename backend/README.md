# beats backend (YouTube audio)

## Run
```bash
cd backend
npm install
npm start
```

- Default bind host is `127.0.0.1` (safe for reverse proxy use).
- Set `HOST=0.0.0.0` only when testing direct external access.
- Keep `ALLOWED_ORIGIN=*` for preview/dev, then set `ALLOWED_ORIGIN=https://your-domain` in production.

## Frontend API target
The frontend uses `YT_AUDIO_API_BASE` in `/home/runner/work/beats/beats/modules/core.js`.
Default is `http://185.27.135.91` and can be changed in that one place.
