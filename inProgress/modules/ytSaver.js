// ytSaver.js - Complete with Save button functionality


/**
class SaveToLibraryDrawer {
  static extractTimeoutMs = 75000;
  static pollIntervalMs = 1800;
  static fetchTimeoutMs = 30000;
  static skeletonCount = 5;
  static storageKey = "mybeats.savedSongs.v1";

  constructor(deps = {}) {
    this.apiBase = deps.apiBase ?? "";
    this.onNotify = deps.onNotify ?? null;
    this.onSaved = deps.onSaved ?? null;
    this.getSongById = deps.getSongById ?? null;
    this.renderSavedBadge = deps.renderSavedBadge ?? null;

    this.isDrawerOpen = false;
    this.activeSongId = null;
    this.activeSongTitle = "";
    this.activeQuery = "";
    this.results = [];
    this.cardStates = new Map();
    this.extractAbort = null;
    this.extractTimer = null;
    this.fakeProgressTimer = null;
    this.hasFetched = false;
    this.previouslyFocused = null;
    this.savedSongIds = this.loadSavedIds();

    this.handleContainerClick = this.handleContainerClick.bind(this);
    this.handleKeydown = this.handleKeydown.bind(this);
    this.handleFocusTrap = this.handleFocusTrap.bind(this);
    this.handleSaveButtonClick = this.handleSaveButtonClick.bind(this);

    this.shell = null;
    this.drawer = null;
    this.bodyEl = null;
    this.titleEl = null;
    this.closeBtn = null;
    this.backdrop = null;
    this.searchForm = null;
    this.searchInput = null;

    this.ensureDom();
    document.addEventListener("click", this.handleSaveButtonClick);
  }

  handleSaveButtonClick(event) {
    const btn = event.target.closest('[data-action="download-song"]');
    if (!btn) return;

    const songId = btn.dataset.songId;
    const songTitle = btn.dataset.songTitle;
    const songThumbnail = btn.dataset.songThumbnail || '';
    const songUploader = btn.dataset.songUploader || '';

    if (!songId || !songTitle) {
      this.notify("Song information missing");
      return;
    }

    const song = {
      id: songId,
      title: songTitle,
      thumbnail: songThumbnail,
      uploader: songUploader
    };

    this.openDrawer(song);
  }

  openDrawer(song) {
    if (!song?.id || !song.title) {
      this.notify("Song details unavailable");
      return;
    }

    this.activeSongId = String(song.id);
    this.activeSongTitle = song.title;
    this.activeQuery = song.title;
    this.results = [];
    this.cardStates.clear();
    this.hasFetched = false;
    this.cancelExtraction();

    this.ensureDom();
    this.titleEl.textContent = song.title;
    if (this.searchInput) this.searchInput.value = song.title;
    this.renderSkeleton();
    this.showDrawer();
    this.performSearch(song.title);
  }

  closeDrawer() {
    this.hideDrawer();
    this.cancelExtraction();
    this.activeSongId = null;
    this.activeSongTitle = "";
    this.results = [];
    this.cardStates.clear();
    this.hasFetched = false;
  }

  get isOpen() {
    return this.isDrawerOpen;
  }

  isSongSaved(songId) {
    return this.savedSongIds.has(String(songId));
  }

  markSongSaved(songId) {
    const id = String(songId);
    this.savedSongIds.add(id);
    this.persistSavedIds();
    this.applySavedBadge(id);
  }

  refreshSavedBadges() {
    this.savedSongIds.forEach((id) => this.applySavedBadge(id));
  }

  ensureDom() {
    const existing = document.getElementById("ytSaveShell");
    if (existing) {
      this.shell = existing;
      this.drawer = document.getElementById("ytSaveDrawer");
      this.bodyEl = document.getElementById("ytSaveBody");
      this.titleEl = document.getElementById("ytSaveTitle");
      this.closeBtn = document.getElementById("ytSaveClose");
      this.backdrop = document.getElementById("ytSaveBackdrop");
      this.searchForm = document.getElementById("ytSaveSearchForm");
      this.searchInput = document.getElementById("ytSaveSearchInput");
      if (!existing._ytsdBound) {
        existing._ytsdBound = true;
        this.bindShellEvents();
      }
      return;
    }

    const shell = document.createElement("div");
    shell.id = "ytSaveShell";
    shell.setAttribute("data-mode", "closed");
    shell.setAttribute("aria-hidden", "true");
    shell.innerHTML = `
      <div id="ytSaveBackdrop" aria-hidden="true"></div>
      <section
        id="ytSaveDrawer"
        role="dialog"
        aria-modal="true"
        aria-labelledby="ytSaveTitle"
        aria-hidden="true"
      >
        <div class="ytsdFocusSentinel" tabindex="0" data-sentinel="start"></div>
        <header id="ytSaveHeader">
          <div class="ytsdHeaderTop">
            <div>
              <p id="ytSaveKicker">Save to Library</p>
              <h3 id="ytSaveTitle">Pick a video</h3>
            </div>
            <button
              id="ytSaveClose"
              type="button"
              aria-label="Close save drawer"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M18 6L6 18M6 6l12 12"/>
              </svg>
            </button>
          </div>
          <form id="ytSaveSearchForm" role="search">
            <input
              id="ytSaveSearchInput"
              type="search"
              placeholder="Search YouTube for this song"
              aria-label="Search query"
              autocomplete="off"
            >
            <button id="ytSaveSearchBtn" type="submit">Search</button>
          </form>
        </header>
        <div id="ytSaveBody"></div>
        <div class="ytsdFocusSentinel" tabindex="0" data-sentinel="end"></div>
      </section>
    `;
    document.body.appendChild(shell);

    this.shell = document.getElementById("ytSaveShell");
    this.drawer = document.getElementById("ytSaveDrawer");
    this.bodyEl = document.getElementById("ytSaveBody");
    this.titleEl = document.getElementById("ytSaveTitle");
    this.closeBtn = document.getElementById("ytSaveClose");
    this.backdrop = document.getElementById("ytSaveBackdrop");
    this.searchForm = document.getElementById("ytSaveSearchForm");
    this.searchInput = document.getElementById("ytSaveSearchInput");

    this.shell._ytsdBound = true;
    this.bindShellEvents();
  }

  bindShellEvents() {
    this.closeBtn.addEventListener("click", () => this.closeDrawer());
    this.backdrop.addEventListener("click", () => this.closeDrawer());

    this.shell.querySelectorAll("[data-sentinel]").forEach((s) => {
      s.addEventListener("focus", this.handleFocusTrap);
    });

    this.bodyEl.addEventListener("click", this.handleContainerClick);

    if (this.searchForm) {
      this.searchForm.addEventListener("submit", (e) => this.handleSearchSubmit(e));
    }
  }

  handleSearchSubmit(event) {
    event.preventDefault();
    const query = this.searchInput ? this.searchInput.value.trim() : "";
    if (!query) return;
    this.cancelExtraction();
    this.results = [];
    this.cardStates.clear();
    this.hasFetched = false;
    this.renderSkeleton();
    this.performSearch(query);
  }

  showDrawer() {
    if (!this.shell) return;
    this.isDrawerOpen = true;

    this.previouslyFocused = document.activeElement;
    this.toggleAriaHidden(true);
    document.body.classList.add("ytsdScrollLocked");

    this.shell.setAttribute("data-mode", "open");
    this.shell.setAttribute("aria-hidden", "false");
    this.drawer.setAttribute("aria-hidden", "false");

    requestAnimationFrame(() => {
      if (this.searchInput) {
        this.searchInput.focus();
        this.searchInput.select();
      } else {
        this.closeBtn.focus();
      }
    });

    document.addEventListener("keydown", this.handleKeydown);
  }

  hideDrawer() {
    if (!this.shell) return;
    this.isDrawerOpen = false;

    this.shell.setAttribute("data-mode", "closed");
    this.shell.setAttribute("aria-hidden", "true");
    this.drawer.setAttribute("aria-hidden", "true");
    document.body.classList.remove("ytsdScrollLocked");

    this.toggleAriaHidden(false);
    document.removeEventListener("keydown", this.handleKeydown);

    const restoreEl = this.previouslyFocused;
    this.previouslyFocused = null;
    setTimeout(() => {
      if (restoreEl && typeof restoreEl.focus === "function") {
        restoreEl.focus();
      }
    }, 350);
  }

  toggleAriaHidden(hideSiblings) {
    const siblings = document.body.children;
    for (let i = 0; i < siblings.length; i++) {
      const el = siblings[i];
      if (el === this.shell) continue;
      if (el.tagName === "SCRIPT" || el.tagName === "STYLE") continue;

      if (hideSiblings) {
        if (!el.hasAttribute("aria-hidden")) {
          el.dataset.ytsdWasHidden = "false";
          el.setAttribute("aria-hidden", "true");
        } else {
          el.dataset.ytsdWasHidden = "true";
        }
      } else {
        if (el.dataset.ytsdWasHidden === "false") {
          el.removeAttribute("aria-hidden");
        }
        delete el.dataset.ytsdWasHidden;
      }
    }
  }

  async performSearch(query) {
    if (this.hasFetched) return;
    this.hasFetched = true;
    this.activeQuery = query;

    const controller = new AbortController();
    const timeoutId = setTimeout(
      () => controller.abort(),
      SaveToLibraryDrawer.fetchTimeoutMs
    );

    try {
      const url = `${this.apiBase}/api/search/?q=${encodeURIComponent(query)}`;
      const response = await fetch(url, { signal: controller.signal });
      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`Search failed (${response.status})`);
      }

      const data = await response.json();
      if (!Array.isArray(data) || data.length === 0) {
        this.renderEmpty();
        return;
      }

      this.results = data;
      this.renderResults();
    } catch (err) {
      clearTimeout(timeoutId);
      console.error("[SaveToLibraryDrawer] Search error:", err);
      const isTimeout = err.name === "AbortError";
      this.renderError(
        isTimeout ? "Search timed out." : "Search failed.",
        isTimeout
          ? "The request took too long."
          : "Something went wrong on our end."
      );
    }
  }

  renderSkeleton() {
    const count = SaveToLibraryDrawer.skeletonCount;
    let html = '<div class="ytsdSkeletonList">';
    for (let i = 0; i < count; i++) {
      html += `
        <div class="ytsdSkeletonCard">
          <div class="ytsdSkeletonThumb">
            <div class="ytsdSkeletonShimmer"></div>
          </div>
          <div class="ytsdSkeletonLines">
            <div class="ytsdSkeletonLine"><div class="ytsdSkeletonShimmer"></div></div>
            <div class="ytsdSkeletonLine short"><div class="ytsdSkeletonShimmer"></div></div>
          </div>
        </div>
      `;
    }
    html += "</div>";
    this.bodyEl.innerHTML = html;
  }

  renderEmpty() {
    this.bodyEl.innerHTML = `
      <div class="ytsdStateMsg">
        <span class="ytsdStateIcon">&#128269;</span>
        <p class="ytsdStateTitle">No results found</p>
        <p class="ytsdStateDesc">Try a different search or check the song title.</p>
      </div>
    `;
  }

  renderError(title, description) {
    this.bodyEl.innerHTML = `
      <div class="ytsdStateMsg isError">
        <span class="ytsdStateIcon">&#9888;</span>
        <p class="ytsdStateTitle">${this.escapeHtml(title)}</p>
        <p class="ytsdStateDesc">${this.escapeHtml(description)}</p>
        <button class="ytsdRetryBtn" type="button" data-action="retry-search">Retry</button>
      </div>
    `;
  }

  renderResults() {
    if (!this.results.length) {
      this.renderEmpty();
      return;
    }

    let html = `<p class="ytsdQueryEcho">Results for "${this.escapeHtml(this.activeQuery || this.activeSongTitle)}"</p>`;
    html += '<div class="ytsdResultsGrid">';
    this.results.forEach((item, index) => {
      html += this.renderCard(index, item);
    });
    html += "</div>";
    this.bodyEl.innerHTML = html;
  }

  renderCard(index, item) {
    const state = this.cardStates.get(index) ?? { phase: "idle" };
    const isOverlayVisible =
      state.phase === "confirm" ||
      state.phase === "extracting" ||
      state.phase === "ready" ||
      state.phase === "error";

    return `
      <article class="ytsdResultCard" data-card-index="${index}">
        <button class="ytsdResultHit" type="button" data-action="select-card" data-index="${index}">
          <div class="ytsdThumbWrap">
            <img
              class="ytsdResultThumb"
              src="${this.escapeHtml(item.thumbnail || "")}"
              alt=""
              loading="lazy"
            >
          </div>
          <div class="ytsdResultCopy">
            <h4>${this.escapeHtml(item.title || "Untitled video")}</h4>
            <p class="ytsdChannel">${this.escapeHtml(item.uploader || item.channel || "Unknown channel")}</p>
          </div>
          <span class="ytsdResultTime">${this.escapeHtml(this.formatDuration(item.duration))}</span>
        </button>

        <div class="ytsdCardOverlay ${isOverlayVisible ? "isVisible" : ""}" data-overlay="${index}">
          ${this.renderOverlayContent(index, state, item)}
        </div>
      </article>
    `;
  }

  renderOverlayContent(index, state, item) {
    if (state.phase === "confirm") {
      return `
        <p class="ytsdOverlayTitle">Save audio from this video?</p>
        <div class="ytsdOverlayActions">
          <button class="ytsdBtn isPrimary" type="button" data-action="confirm-save" data-index="${index}">
            Continue
          </button>
          <button class="ytsdBtn" type="button" data-action="cancel-card" data-index="${index}">
            Cancel
          </button>
        </div>
      `;
    }

    if (state.phase === "extracting") {
      const progress = Number.isFinite(state.progress)
        ? Math.round(state.progress)
        : 0;
      return `
        <div class="ytsdSpinner" aria-hidden="true"></div>
        <p class="ytsdExtractMeta">${this.escapeHtml(state.statusText || "Extracting audio…")}</p>
        <div class="ytsdProgressWrap">
          <div class="ytsdProgressTrack">
            <div class="ytsdProgressFill" style="width:${progress}%" aria-hidden="true"></div>
          </div>
          <p class="ytsdStatusLine">${progress}%</p>
        </div>
        <button class="ytsdCancelLink" type="button" data-action="cancel-extract" data-index="${index}">
          Cancel
        </button>
      `;
    }

    if (state.phase === "ready") {
      return `
        <p class="ytsdOverlayTitle">Audio ready!</p>
        <button class="ytsdBtn isDownload" type="button" data-action="download" data-index="${index}">
          <svg class="ytsdDownloadIcon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
            <polyline points="7 10 12 15 17 10"/>
            <line x1="12" y1="15" x2="12" y2="3"/>
          </svg>
          Download
        </button>
      `;
    }

    if (state.phase === "error") {
      return `
        <p class="ytsdInlineError">${this.escapeHtml(state.errorText || "Something went wrong.")}</p>
        <div class="ytsdOverlayActions">
          <button class="ytsdBtn isPrimary" type="button" data-action="retry-card" data-index="${index}">
            Retry
          </button>
          <button class="ytsdBtn" type="button" data-action="cancel-card" data-index="${index}">
            Cancel
          </button>
        </div>
      `;
    }

    return "";
  }

  refreshCard(index) {
    const item = this.results[index];
    const state = this.cardStates.get(index) ?? { phase: "idle" };
    if (!item) return;

    const card = this.bodyEl.querySelector(`[data-card-index="${index}"]`);
    if (!card) return;

    const overlay = card.querySelector(`[data-overlay="${index}"]`);
    if (!overlay) return;

    const isVisible = state.phase !== "idle";
    overlay.classList.toggle("isVisible", isVisible);
    overlay.innerHTML = this.renderOverlayContent(index, state, item);
  }

  handleContainerClick(event) {
    const btn = event.target.closest("[data-action]");
    if (!btn) return;

    const action = btn.dataset.action;
    const index = parseInt(btn.dataset.index, 10);

    switch (action) {
      case "select-card": {
        if (!Number.isFinite(index)) return;
        this.resetAllCardsExcept(index);
        const state = this.cardStates.get(index) ?? { phase: "idle" };
        if (state.phase === "idle") {
          this.cardStates.set(index, { phase: "confirm" });
          this.refreshCard(index);
        }
        break;
      }

      case "confirm-save": {
        if (!Number.isFinite(index)) return;
        this.startExtraction(index);
        break;
      }

      case "cancel-card": {
        if (!Number.isFinite(index)) return;
        this.cancelExtraction();
        this.cardStates.set(index, { phase: "idle" });
        this.refreshCard(index);
        break;
      }

      case "retry-card": {
        if (!Number.isFinite(index)) return;
        this.startExtraction(index);
        break;
      }

      case "cancel-extract": {
        this.cancelExtraction();
        if (Number.isFinite(index)) {
          this.cardStates.set(index, { phase: "idle" });
          this.refreshCard(index);
        }
        break;
      }

      case "download": {
        if (!Number.isFinite(index)) return;
        this.doDownload(index);
        break;
      }

      case "retry-search": {
        this.hasFetched = false;
        this.renderSkeleton();
        this.performSearch(this.activeQuery || this.activeSongTitle);
        break;
      }
    }
  }

  handleKeydown(event) {
    if (!this.isDrawerOpen) return;

    if (event.key === "Escape") {
      let activeIndex = null;
      this.cardStates.forEach((state, idx) => {
        if (state.phase !== "idle") activeIndex = idx;
      });
      if (activeIndex !== null) {
        this.cancelExtraction();
        this.cardStates.set(activeIndex, { phase: "idle" });
        this.refreshCard(activeIndex);
      } else {
        this.closeDrawer();
      }
    }
  }

  handleFocusTrap(event) {
    if (!this.isDrawerOpen || !this.drawer) return;
    const sentinel = event.target.dataset.sentinel;
    const focusable = this.getFocusableElements();
    if (!focusable.length) return;

    if (sentinel === "end") {
      focusable[0].focus();
    } else if (sentinel === "start") {
      focusable[focusable.length - 1].focus();
    }
  }

  getFocusableElements() {
    if (!this.drawer) return [];
    const selector =
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    return Array.from(this.drawer.querySelectorAll(selector)).filter(
      (el) => !el.disabled && !el.classList.contains("ytsdFocusSentinel")
    );
  }

  resetAllCardsExcept(exceptIndex) {
    this.cardStates.forEach((state, idx) => {
      if (idx !== exceptIndex && state.phase !== "idle") {
        this.cardStates.set(idx, { phase: "idle" });
        this.refreshCard(idx);
      }
    });
  }

  async startExtraction(index) {
    const item = this.results[index];
    if (!item?.url) {
      this.notify("Video URL is unavailable");
      return;
    }

    this.resetAllCardsExcept(index);

    this.cardStates.set(index, {
      phase: "extracting",
      progress: 5,
      statusText: "Starting extraction…",
      errorText: null,
    });
    this.refreshCard(index);

    this.startFakeProgress(index);

    this.cancelExtraction();
    this.extractAbort = new AbortController();

    this.extractTimer = setTimeout(() => {
      this.extractAbort?.abort();
      this.setCardError(
        index,
        "Extraction timed out. Please try a different video."
      );
    }, SaveToLibraryDrawer.extractTimeoutMs);

    try {
      const response = await fetch(`${this.apiBase}/api/extract/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: item.url }),
        signal: this.extractAbort.signal,
      });

      if (!response.ok) {
        throw new Error(`Extraction request failed (${response.status})`);
      }

      const payload = await response.json();
      if (!payload?.filename && !payload?.statusUrl) {
        throw new Error("Invalid response from extraction server");
      }

      await this.pollStatus(index, payload);
    } catch (err) {
      if (err.name === "AbortError") {
        const state = this.cardStates.get(index);
        if (state?.phase === "extracting") {
          this.setCardError(index, "Extraction was cancelled or timed out.");
        }
      } else {
        console.error("[SaveToLibraryDrawer] Extraction error:", err);
        this.setCardError(
          index,
          "Could not extract audio. Try a different video."
        );
      }
    }
  }

  async pollStatus(index, payload) {
    const statusPath =
      payload.statusUrl ||
      `/api/status/${encodeURIComponent(payload.filename)}`;
    const statusUrl = this.resolveUrl(statusPath);
    const started = Date.now();

    while (Date.now() - started < SaveToLibraryDrawer.extractTimeoutMs) {
      await this.delay(SaveToLibraryDrawer.pollIntervalMs);

      const currentState = this.cardStates.get(index);
      if (!currentState || currentState.phase !== "extracting") return;

      try {
        const res = await fetch(statusUrl);
        if (!res.ok) throw new Error(`Status ${res.status}`);

        const data = await res.json();

        if (data.status === "failed") {
          throw new Error(data.error || "Processing failed on server");
        }

        if (data.status === "ready") {
          this.stopFakeProgress();
          clearTimeout(this.extractTimer);
          this.cardStates.set(index, {
            phase: "ready",
            payload,
            progress: 100,
          });
          this.refreshCard(index);
          this.notify("Audio extraction complete!");
          return;
        }

        const realProgress = Number(data.progress);
        if (Number.isFinite(realProgress) && realProgress > 0) {
          const merged = Math.min(realProgress, 92);
          this.cardStates.set(index, {
            ...currentState,
            progress: Math.max(currentState.progress ?? 0, merged),
            statusText: data.message || "Processing…",
          });
          this.refreshCard(index);
        }
      } catch (err) {
        console.error("[SaveToLibraryDrawer] Poll error:", err);
        this.setCardError(index, err.message || "Status check failed.");
        return;
      }
    }

    this.setCardError(
      index,
      "Extraction is taking too long. Please try again later."
    );
  }

  startFakeProgress(index) {
    this.stopFakeProgress();

    let elapsed = 0;
    const interval = 400;

    this.fakeProgressTimer = setInterval(() => {
      elapsed += interval;
      const state = this.cardStates.get(index);
      if (!state || state.phase !== "extracting") {
        this.stopFakeProgress();
        return;
      }

      const t = Math.min(elapsed / 12000, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      const fakeValue = Math.round(eased * 88);

      const currentProgress = state.progress ?? 0;
      if (fakeValue > currentProgress && currentProgress < 90) {
        const statusText =
          elapsed < 3000
            ? "Extracting audio…"
            : elapsed < 8000
              ? "Processing…"
              : "Almost there…";

        this.cardStates.set(index, {
          ...state,
          progress: fakeValue,
          statusText,
        });
        this.refreshCard(index);
      }
    }, interval);
  }

  stopFakeProgress() {
    if (this.fakeProgressTimer) {
      clearInterval(this.fakeProgressTimer);
      this.fakeProgressTimer = null;
    }
  }

  cancelExtraction() {
    this.stopFakeProgress();
    if (this.extractAbort) {
      this.extractAbort.abort();
      this.extractAbort = null;
    }
    if (this.extractTimer) {
      clearTimeout(this.extractTimer);
      this.extractTimer = null;
    }
  }

  setCardError(index, message) {
    this.stopFakeProgress();
    clearTimeout(this.extractTimer);
    this.cardStates.set(index, {
      phase: "error",
      errorText: message,
    });
    this.refreshCard(index);
  }

  doDownload(index) {
    const state = this.cardStates.get(index);
    const payload = state?.payload;
    if (!payload) {
      this.notify("Download information is missing");
      return;
    }

    const path =
      payload.downloadUrl ||
      `/api/download/${encodeURIComponent(payload.filename)}`;
    const href = this.resolveUrl(path);

    const a = document.createElement("a");
    a.href = href;
    a.download = payload.filename || "audio.mp3";
    a.style.display = "none";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    if (this.activeSongId) {
      this.markSongSaved(this.activeSongId);
      this.hideSaveButton(this.activeSongId);
    }

    if (typeof this.onSaved === "function") {
      try {
        this.onSaved(this.activeSongId);
      } catch (e) {}
    }

    this.notify("Download started");
    setTimeout(() => this.closeDrawer(), 350);
  }

  loadSavedIds() {
    try {
      const raw = localStorage.getItem(SaveToLibraryDrawer.storageKey);
      const parsed = raw ? JSON.parse(raw) : [];
      return new Set(
        Array.isArray(parsed) ? parsed.filter(Boolean).map(String) : []
      );
    } catch {
      return new Set();
    }
  }

  persistSavedIds() {
    try {
      localStorage.setItem(
        SaveToLibraryDrawer.storageKey,
        JSON.stringify(Array.from(this.savedSongIds))
      );
    } catch (e) {
      console.warn("[SaveToLibraryDrawer] Could not persist saved IDs:", e);
    }
  }

  applySavedBadge(songId) {
    if (typeof this.renderSavedBadge === "function") {
      try {
        this.renderSavedBadge(songId);
      } catch (e) {}
      return;
    }

    const selector = `[data-song-id="${CSS.escape(songId)}"]`;
    document.querySelectorAll(selector).forEach((el) => {
      if (el.classList.contains("downloadBtn")) {
        el.classList.add("is-saved");
        return;
      }
      el.querySelectorAll(".downloadBtn").forEach((btn) => {
        btn.classList.add("is-saved");
      });
      const img = el.querySelector("img");
      if (!img) return;
      const wrap = img.parentElement;
      if (!wrap || wrap.querySelector(".ytsdCheckmarkBadge")) return;
      wrap.style.position = "relative";
      const badge = document.createElement("span");
      badge.className = "ytsdCheckmarkBadge";
      badge.setAttribute("aria-label", "Saved to library");
      badge.textContent = "\u2713";
      wrap.appendChild(badge);
    });
  }

  hideSaveButton(songId) {
    document
      .querySelectorAll(`.downloadBtn[data-song-id="${CSS.escape(songId)}"]`)
      .forEach((btn) => {
        btn.classList.add("is-saved");
      });
  }

  revealAllSaveButtons() {
    document.querySelectorAll(".downloadBtn.is-saved").forEach((btn) => {
      btn.classList.remove("is-saved");
    });
    document.querySelectorAll(".ytsdCheckmarkBadge").forEach((badge) => {
      badge.remove();
    });
    this.savedSongIds.clear();
    this.persistSavedIds();
  }

  notify(message) {
    if (typeof this.onNotify === "function") {
      try {
        this.onNotify(message);
        return;
      } catch (e) {
        console.warn("[SaveToLibraryDrawer] Host notifier threw:", e);
      }
    }

    if (typeof window?.state?.showToast === "function") {
      try {
        window.state.showToast(message);
        return;
      } catch (e) {}
    }
    if (typeof window?.uiManager?.state?.showToast === "function") {
      try {
        window.uiManager.state.showToast(message);
        return;
      } catch (e) {}
    }

    const toastEl = document.getElementById("toast");
    if (toastEl) {
      toastEl.textContent = message;
      toastEl.classList.add("show");
      clearTimeout(toastEl._ytsdTimer);
      toastEl._ytsdTimer = setTimeout(
        () => toastEl.classList.remove("show"),
        2600
      );
      return;
    }

    console.log("[SaveToLibraryDrawer]", message);
  }

  resolveUrl(path) {
    if (!path) return "";
    if (/^https?:\/\//i.test(path)) return path;
    const base = this.apiBase;
    const separator = path.startsWith("/") || base.endsWith("/") ? "" : "/";
    return `${base}${separator}${path}`;
  }

  escapeHtml(text) {
    return Utils.escapeHtml(text ?? "");
  }

  formatDuration(raw) {
    return Utils.formatDuration(raw);
  }

  delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

function createSaveDrawer(ui = {}) {
  const drawer = new SaveToLibraryDrawer({
    apiBase: typeof YT_AUDIO_API_BASE !== "undefined" ? YT_AUDIO_API_BASE : "",
    onNotify: (msg) => {
      const state = ui?.state || window?.state;
      if (typeof state?.showToast === "function") {
        state.showToast(msg);
      } else {
        const el = document.getElementById("toast");
        if (el) {
          el.textContent = msg;
          el.classList.add("show");
          clearTimeout(el._ytsdTimer);
          el._ytsdTimer = setTimeout(() => el.classList.remove("show"), 2600);
        }
      }
    },
    onSaved: (songId) => {
      console.log("[SaveDrawer] Song saved:", songId);
    },
    getSongById: (id) => {
      const state = ui?.state || window?.state;
      return typeof state?.getSongById === "function"
        ? state.getSongById(id)
        : null;
    },
  });

  window.saveToLibraryDrawer = drawer;
  return drawer;
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    if (window.saveToLibraryDrawer) return;
    createSaveDrawer();
  });
} else {
  if (!window.saveToLibraryDrawer) {
    createSaveDrawer();
  }
}
**/






// ytSaver.js - Complete with Save button functionality


/**
class SaveToLibraryDrawer {
  static extractTimeoutMs = 75000;
  static pollIntervalMs = 1800;
  static fetchTimeoutMs = 30000;
  static skeletonCount = 5;
  static storageKey = "mybeats.savedSongs.v1";

  constructor(deps = {}) {
    this.apiBase = deps.apiBase ?? "";
    this.onNotify = deps.onNotify ?? null;
    this.onSaved = deps.onSaved ?? null;
    this.getSongById = deps.getSongById ?? null;
    this.renderSavedBadge = deps.renderSavedBadge ?? null;

    this.isDrawerOpen = false;
    this.activeSongId = null;
    this.activeSongTitle = "";
    this.activeQuery = "";
    this.results = [];
    this.cardStates = new Map();
    this.extractAbort = null;
    this.extractTimer = null;
    this.fakeProgressTimer = null;
    this.hasFetched = false;
    this.previouslyFocused = null;
    this.savedSongIds = this.loadSavedIds();

    this.handleContainerClick = this.handleContainerClick.bind(this);
    this.handleKeydown = this.handleKeydown.bind(this);
    this.handleFocusTrap = this.handleFocusTrap.bind(this);
    this.handleSaveButtonClick = this.handleSaveButtonClick.bind(this);

    this.shell = null;
    this.drawer = null;
    this.bodyEl = null;
    this.titleEl = null;
    this.closeBtn = null;
    this.backdrop = null;
    this.searchForm = null;
    this.searchInput = null;

    this.ensureDom();
    document.addEventListener("click", this.handleSaveButtonClick);
  }

  handleSaveButtonClick(event) {
    const btn = event.target.closest('[data-action="download-song"]');
    if (!btn) return;

    const songId = btn.dataset.songId;
    const songTitle = btn.dataset.songTitle;
    const songThumbnail = btn.dataset.songThumbnail || '';
    const songUploader = btn.dataset.songUploader || '';

    if (!songId || !songTitle) {
      this.notify("Song information missing");
      return;
    }

    const song = {
      id: songId,
      title: songTitle,
      thumbnail: songThumbnail,
      uploader: songUploader
    };

    this.openDrawer(song);
  }

  openDrawer(song) {
    if (!song?.id || !song.title) {
      this.notify("Song details unavailable");
      return;
    }

    this.activeSongId = String(song.id);
    this.activeSongTitle = song.title;
    this.activeQuery = song.title;
    this.results = [];
    this.cardStates.clear();
    this.hasFetched = false;
    this.cancelExtraction();

    this.ensureDom();
    this.titleEl.textContent = song.title;
    if (this.searchInput) this.searchInput.value = song.title;
    this.renderSkeleton();
    this.showDrawer();
    this.performSearch(song.title);
  }

  closeDrawer() {
    this.hideDrawer();
    this.cancelExtraction();
    this.activeSongId = null;
    this.activeSongTitle = "";
    this.results = [];
    this.cardStates.clear();
    this.hasFetched = false;
  }

  get isOpen() {
    return this.isDrawerOpen;
  }

  isSongSaved(songId) {
    return this.savedSongIds.has(String(songId));
  }

  markSongSaved(songId) {
    const id = String(songId);
    this.savedSongIds.add(id);
    this.persistSavedIds();
    this.applySavedBadge(id);
  }

  refreshSavedBadges() {
    this.savedSongIds.forEach((id) => this.applySavedBadge(id));
  }

  ensureDom() {
    const existing = document.getElementById("ytSaveShell");
    if (existing) {
      this.shell = existing;
      this.drawer = document.getElementById("ytSaveDrawer");
      this.bodyEl = document.getElementById("ytSaveBody");
      this.titleEl = document.getElementById("ytSaveTitle");
      this.closeBtn = document.getElementById("ytSaveClose");
      this.backdrop = document.getElementById("ytSaveBackdrop");
      this.searchForm = document.getElementById("ytSaveSearchForm");
      this.searchInput = document.getElementById("ytSaveSearchInput");
      if (!existing._ytsdBound) {
        existing._ytsdBound = true;
        this.bindShellEvents();
      }
      return;
    }

    const shell = document.createElement("div");
    shell.id = "ytSaveShell";
    shell.setAttribute("data-mode", "closed");
    shell.setAttribute("aria-hidden", "true");
    shell.innerHTML = `
      <div id="ytSaveBackdrop" aria-hidden="true"></div>
      <section
        id="ytSaveDrawer"
        role="dialog"
        aria-modal="true"
        aria-labelledby="ytSaveTitle"
        aria-hidden="true"
      >
        <div class="ytsdFocusSentinel" tabindex="0" data-sentinel="start"></div>
        <header id="ytSaveHeader">
          <div class="ytsdHeaderTop">
            <div>
              <p id="ytSaveKicker">Save to Library</p>
              <h3 id="ytSaveTitle">Pick a video</h3>
            </div>
            <button
              id="ytSaveClose"
              type="button"
              aria-label="Close save drawer"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M18 6L6 18M6 6l12 12"/>
              </svg>
            </button>
          </div>
          <form id="ytSaveSearchForm" role="search">
            <input
              id="ytSaveSearchInput"
              type="search"
              placeholder="Search YouTube for this song"
              aria-label="Search query"
              autocomplete="off"
            >
            <button id="ytSaveSearchBtn" type="submit">Search</button>
          </form>
        </header>
        <div id="ytSaveBody"></div>
        <div class="ytsdFocusSentinel" tabindex="0" data-sentinel="end"></div>
      </section>
    `;
    document.body.appendChild(shell);

    this.shell = document.getElementById("ytSaveShell");
    this.drawer = document.getElementById("ytSaveDrawer");
    this.bodyEl = document.getElementById("ytSaveBody");
    this.titleEl = document.getElementById("ytSaveTitle");
    this.closeBtn = document.getElementById("ytSaveClose");
    this.backdrop = document.getElementById("ytSaveBackdrop");
    this.searchForm = document.getElementById("ytSaveSearchForm");
    this.searchInput = document.getElementById("ytSaveSearchInput");

    this.shell._ytsdBound = true;
    this.bindShellEvents();
  }

  bindShellEvents() {
    this.closeBtn.addEventListener("click", () => this.closeDrawer());
    this.backdrop.addEventListener("click", () => this.closeDrawer());

    this.shell.querySelectorAll("[data-sentinel]").forEach((s) => {
      s.addEventListener("focus", this.handleFocusTrap);
    });

    this.bodyEl.addEventListener("click", this.handleContainerClick);

    if (this.searchForm) {
      this.searchForm.addEventListener("submit", (e) => this.handleSearchSubmit(e));
    }
  }

  handleSearchSubmit(event) {
    event.preventDefault();
    const query = this.searchInput ? this.searchInput.value.trim() : "";
    if (!query) return;
    this.cancelExtraction();
    this.results = [];
    this.cardStates.clear();
    this.hasFetched = false;
    this.renderSkeleton();
    this.performSearch(query);
  }

  showDrawer() {
    if (!this.shell) return;
    this.isDrawerOpen = true;

    this.previouslyFocused = document.activeElement;
    this.toggleAriaHidden(true);
    document.body.classList.add("ytsdScrollLocked");

    this.shell.setAttribute("data-mode", "open");
    this.shell.setAttribute("aria-hidden", "false");
    this.drawer.setAttribute("aria-hidden", "false");

    requestAnimationFrame(() => {
      if (this.searchInput) {
        this.searchInput.focus();
        this.searchInput.select();
      } else {
        this.closeBtn.focus();
      }
    });

    document.addEventListener("keydown", this.handleKeydown);
  }

  hideDrawer() {
    if (!this.shell) return;
    this.isDrawerOpen = false;

    this.shell.setAttribute("data-mode", "closed");
    this.shell.setAttribute("aria-hidden", "true");
    this.drawer.setAttribute("aria-hidden", "true");
    document.body.classList.remove("ytsdScrollLocked");

    this.toggleAriaHidden(false);
    document.removeEventListener("keydown", this.handleKeydown);

    const restoreEl = this.previouslyFocused;
    this.previouslyFocused = null;
    setTimeout(() => {
      if (restoreEl && typeof restoreEl.focus === "function") {
        restoreEl.focus();
      }
    }, 350);
  }

  toggleAriaHidden(hideSiblings) {
    const siblings = document.body.children;
    for (let i = 0; i < siblings.length; i++) {
      const el = siblings[i];
      if (el === this.shell) continue;
      if (el.tagName === "SCRIPT" || el.tagName === "STYLE") continue;

      if (hideSiblings) {
        if (!el.hasAttribute("aria-hidden")) {
          el.dataset.ytsdWasHidden = "false";
          el.setAttribute("aria-hidden", "true");
        } else {
          el.dataset.ytsdWasHidden = "true";
        }
      } else {
        if (el.dataset.ytsdWasHidden === "false") {
          el.removeAttribute("aria-hidden");
        }
        delete el.dataset.ytsdWasHidden;
      }
    }
  }

  async performSearch(query) {
    if (this.hasFetched) return;
    this.hasFetched = true;
    this.activeQuery = query;

    const controller = new AbortController();
    const timeoutId = setTimeout(
      () => controller.abort(),
      SaveToLibraryDrawer.fetchTimeoutMs
    );

    try {
      const url = `${this.apiBase}/api/search/?q=${encodeURIComponent(query)}`;
      const response = await fetch(url, { signal: controller.signal });
      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`Search failed (${response.status})`);
      }

      const data = await response.json();
      if (!Array.isArray(data) || data.length === 0) {
        this.renderEmpty();
        return;
      }

      this.results = data;
      this.renderResults();
    } catch (err) {
      clearTimeout(timeoutId);
      console.error("[SaveToLibraryDrawer] Search error:", err);
      const isTimeout = err.name === "AbortError";
      this.renderError(
        isTimeout ? "Search timed out." : "Search failed.",
        isTimeout
          ? "The request took too long."
          : "Something went wrong on our end."
      );
    }
  }

  renderSkeleton() {
    const count = SaveToLibraryDrawer.skeletonCount;
    let html = '<div class="ytsdSkeletonList">';
    for (let i = 0; i < count; i++) {
      html += `
        <div class="ytsdSkeletonCard">
          <div class="ytsdSkeletonThumb">
            <div class="ytsdSkeletonShimmer"></div>
          </div>
          <div class="ytsdSkeletonLines">
            <div class="ytsdSkeletonLine"><div class="ytsdSkeletonShimmer"></div></div>
            <div class="ytsdSkeletonLine short"><div class="ytsdSkeletonShimmer"></div></div>
          </div>
        </div>
      `;
    }
    html += "</div>";
    this.bodyEl.innerHTML = html;
  }

  renderEmpty() {
    this.bodyEl.innerHTML = `
      <div class="ytsdStateMsg">
        <span class="ytsdStateIcon">&#128269;</span>
        <p class="ytsdStateTitle">No results found</p>
        <p class="ytsdStateDesc">Try a different search or check the song title.</p>
      </div>
    `;
  }

  renderError(title, description) {
    this.bodyEl.innerHTML = `
      <div class="ytsdStateMsg isError">
        <span class="ytsdStateIcon">&#9888;</span>
        <p class="ytsdStateTitle">${this.escapeHtml(title)}</p>
        <p class="ytsdStateDesc">${this.escapeHtml(description)}</p>
        <button class="ytsdRetryBtn" type="button" data-action="retry-search">Retry</button>
      </div>
    `;
  }

  renderResults() {
    if (!this.results.length) {
      this.renderEmpty();
      return;
    }

    let html = `<p class="ytsdQueryEcho">Results for "${this.escapeHtml(this.activeQuery || this.activeSongTitle)}"</p>`;
    html += '<div class="ytsdResultsGrid">';
    this.results.forEach((item, index) => {
      html += this.renderCard(index, item);
    });
    html += "</div>";
    this.bodyEl.innerHTML = html;
  }

  renderCard(index, item) {
    const state = this.cardStates.get(index) ?? { phase: "idle" };
    const isOverlayVisible =
      state.phase === "confirm" ||
      state.phase === "extracting" ||
      state.phase === "ready" ||
      state.phase === "error";

    return `
      <article class="ytsdResultCard" data-card-index="${index}">
        <button class="ytsdResultHit" type="button" data-action="select-card" data-index="${index}">
          <div class="ytsdThumbWrap">
            <img
              class="ytsdResultThumb"
              src="${this.escapeHtml(item.thumbnail || "")}"
              alt=""
              loading="lazy"
            >
          </div>
          <div class="ytsdResultCopy">
            <h4>${this.escapeHtml(item.title || "Untitled video")}</h4>
            <p class="ytsdChannel">${this.escapeHtml(item.uploader || item.channel || "Unknown channel")}</p>
          </div>
          <span class="ytsdResultTime">${this.escapeHtml(this.formatDuration(item.duration))}</span>
        </button>

        <div class="ytsdCardOverlay ${isOverlayVisible ? "isVisible" : ""}" data-overlay="${index}">
          ${this.renderOverlayContent(index, state, item)}
        </div>
      </article>
    `;
  }

  renderOverlayContent(index, state, item) {
    if (state.phase === "confirm") {
      return `
        <p class="ytsdOverlayTitle">Save audio from this video?</p>
        <div class="ytsdOverlayActions">
          <button class="ytsdBtn isPrimary" type="button" data-action="confirm-save" data-index="${index}">
            Continue
          </button>
          <button class="ytsdBtn" type="button" data-action="cancel-card" data-index="${index}">
            Cancel
          </button>
        </div>
      `;
    }

    if (state.phase === "extracting") {
      const progress = Number.isFinite(state.progress)
        ? Math.round(state.progress)
        : 0;
      return `
        <div class="ytsdSpinner" aria-hidden="true"></div>
        <p class="ytsdExtractMeta">${this.escapeHtml(state.statusText || "Extracting audio…")}</p>
        <div class="ytsdProgressWrap">
          <div class="ytsdProgressTrack">
            <div class="ytsdProgressFill" style="width:${progress}%" aria-hidden="true"></div>
          </div>
          <p class="ytsdStatusLine">${progress}%</p>
        </div>
        <button class="ytsdCancelLink" type="button" data-action="cancel-extract" data-index="${index}">
          Cancel
        </button>
      `;
    }

    if (state.phase === "ready") {
      return `
        <p class="ytsdOverlayTitle">Audio ready!</p>
        <button class="ytsdBtn isDownload" type="button" data-action="download" data-index="${index}">
          <svg class="ytsdDownloadIcon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
            <polyline points="7 10 12 15 17 10"/>
            <line x1="12" y1="15" x2="12" y2="3"/>
          </svg>
          Download
        </button>
      `;
    }

    if (state.phase === "error") {
      return `
        <p class="ytsdInlineError">${this.escapeHtml(state.errorText || "Something went wrong.")}</p>
        <div class="ytsdOverlayActions">
          <button class="ytsdBtn isPrimary" type="button" data-action="retry-card" data-index="${index}">
            Retry
          </button>
          <button class="ytsdBtn" type="button" data-action="cancel-card" data-index="${index}">
            Cancel
          </button>
        </div>
      `;
    }

    return "";
  }

  refreshCard(index) {
    const item = this.results[index];
    const state = this.cardStates.get(index) ?? { phase: "idle" };
    if (!item) return;

    const card = this.bodyEl.querySelector(`[data-card-index="${index}"]`);
    if (!card) return;

    const overlay = card.querySelector(`[data-overlay="${index}"]`);
    if (!overlay) return;

    const isVisible = state.phase !== "idle";
    overlay.classList.toggle("isVisible", isVisible);
    overlay.innerHTML = this.renderOverlayContent(index, state, item);
  }

  handleContainerClick(event) {
    const btn = event.target.closest("[data-action]");
    if (!btn) return;

    const action = btn.dataset.action;
    const index = parseInt(btn.dataset.index, 10);

    switch (action) {
      case "select-card": {
        if (!Number.isFinite(index)) return;
        this.resetAllCardsExcept(index);
        const state = this.cardStates.get(index) ?? { phase: "idle" };
        if (state.phase === "idle") {
          this.cardStates.set(index, { phase: "confirm" });
          this.refreshCard(index);
        }
        break;
      }

      case "confirm-save": {
        if (!Number.isFinite(index)) return;
        this.startExtraction(index);
        break;
      }

      case "cancel-card": {
        if (!Number.isFinite(index)) return;
        this.cancelExtraction();
        this.cardStates.set(index, { phase: "idle" });
        this.refreshCard(index);
        break;
      }

      case "retry-card": {
        if (!Number.isFinite(index)) return;
        this.startExtraction(index);
        break;
      }

      case "cancel-extract": {
        this.cancelExtraction();
        if (Number.isFinite(index)) {
          this.cardStates.set(index, { phase: "idle" });
          this.refreshCard(index);
        }
        break;
      }

      case "download": {
        if (!Number.isFinite(index)) return;
        this.doDownload(index);
        break;
      }

      case "retry-search": {
        this.hasFetched = false;
        this.renderSkeleton();
        this.performSearch(this.activeQuery || this.activeSongTitle);
        break;
      }
    }
  }

  handleKeydown(event) {
    if (!this.isDrawerOpen) return;

    if (event.key === "Escape") {
      let activeIndex = null;
      this.cardStates.forEach((state, idx) => {
        if (state.phase !== "idle") activeIndex = idx;
      });
      if (activeIndex !== null) {
        this.cancelExtraction();
        this.cardStates.set(activeIndex, { phase: "idle" });
        this.refreshCard(activeIndex);
      } else {
        this.closeDrawer();
      }
    }
  }

  handleFocusTrap(event) {
    if (!this.isDrawerOpen || !this.drawer) return;
    const sentinel = event.target.dataset.sentinel;
    const focusable = this.getFocusableElements();
    if (!focusable.length) return;

    if (sentinel === "end") {
      focusable[0].focus();
    } else if (sentinel === "start") {
      focusable[focusable.length - 1].focus();
    }
  }

  getFocusableElements() {
    if (!this.drawer) return [];
    const selector =
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    return Array.from(this.drawer.querySelectorAll(selector)).filter(
      (el) => !el.disabled && !el.classList.contains("ytsdFocusSentinel")
    );
  }

  resetAllCardsExcept(exceptIndex) {
    this.cardStates.forEach((state, idx) => {
      if (idx !== exceptIndex && state.phase !== "idle") {
        this.cardStates.set(idx, { phase: "idle" });
        this.refreshCard(idx);
      }
    });
  }

  async startExtraction(index) {
    const item = this.results[index];
    if (!item?.url) {
      this.notify("Video URL is unavailable");
      return;
    }

    this.resetAllCardsExcept(index);

    this.cardStates.set(index, {
      phase: "extracting",
      progress: 5,
      statusText: "Starting extraction…",
      errorText: null,
    });
    this.refreshCard(index);

    this.startFakeProgress(index);

    this.cancelExtraction();
    this.extractAbort = new AbortController();

    this.extractTimer = setTimeout(() => {
      this.extractAbort?.abort();
      this.setCardError(
        index,
        "Extraction timed out. Please try a different video."
      );
    }, SaveToLibraryDrawer.extractTimeoutMs);

    try {
      const response = await fetch(`${this.apiBase}/api/extract/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: item.url }),
        signal: this.extractAbort.signal,
      });

      if (!response.ok) {
        throw new Error(`Extraction request failed (${response.status})`);
      }

      const payload = await response.json();
      if (!payload?.filename && !payload?.statusUrl) {
        throw new Error("Invalid response from extraction server");
      }

      await this.pollStatus(index, payload);
    } catch (err) {
      if (err.name === "AbortError") {
        const state = this.cardStates.get(index);
        if (state?.phase === "extracting") {
          this.setCardError(index, "Extraction was cancelled or timed out.");
        }
      } else {
        console.error("[SaveToLibraryDrawer] Extraction error:", err);
        this.setCardError(
          index,
          "Could not extract audio. Try a different video."
        );
      }
    }
  }

  async pollStatus(index, payload) {
    const statusPath =
      payload.statusUrl ||
      `/api/status/${encodeURIComponent(payload.filename)}`;
    const statusUrl = this.resolveUrl(statusPath);
    const started = Date.now();

    while (Date.now() - started < SaveToLibraryDrawer.extractTimeoutMs) {
      await this.delay(SaveToLibraryDrawer.pollIntervalMs);

      const currentState = this.cardStates.get(index);
      if (!currentState || currentState.phase !== "extracting") return;

      try {
        const res = await fetch(statusUrl);
        if (!res.ok) throw new Error(`Status ${res.status}`);

        const data = await res.json();

        if (data.status === "failed") {
          throw new Error(data.error || "Processing failed on server");
        }

        if (data.status === "ready") {
          this.stopFakeProgress();
          clearTimeout(this.extractTimer);
          this.cardStates.set(index, {
            phase: "ready",
            payload,
            progress: 100,
          });
          this.refreshCard(index);
          this.notify("Audio extraction complete!");
          return;
        }

        const realProgress = Number(data.progress);
        if (Number.isFinite(realProgress) && realProgress > 0) {
          const merged = Math.min(realProgress, 92);
          this.cardStates.set(index, {
            ...currentState,
            progress: Math.max(currentState.progress ?? 0, merged),
            statusText: data.message || "Processing…",
          });
          this.refreshCard(index);
        }
      } catch (err) {
        console.error("[SaveToLibraryDrawer] Poll error:", err);
        this.setCardError(index, err.message || "Status check failed.");
        return;
      }
    }

    this.setCardError(
      index,
      "Extraction is taking too long. Please try again later."
    );
  }

  startFakeProgress(index) {
    this.stopFakeProgress();

    let elapsed = 0;
    const interval = 400;

    this.fakeProgressTimer = setInterval(() => {
      elapsed += interval;
      const state = this.cardStates.get(index);
      if (!state || state.phase !== "extracting") {
        this.stopFakeProgress();
        return;
      }

      const t = Math.min(elapsed / 12000, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      const fakeValue = Math.round(eased * 88);

      const currentProgress = state.progress ?? 0;
      if (fakeValue > currentProgress && currentProgress < 90) {
        const statusText =
          elapsed < 3000
            ? "Extracting audio…"
            : elapsed < 8000
              ? "Processing…"
              : "Almost there…";

        this.cardStates.set(index, {
          ...state,
          progress: fakeValue,
          statusText,
        });
        this.refreshCard(index);
      }
    }, interval);
  }

  stopFakeProgress() {
    if (this.fakeProgressTimer) {
      clearInterval(this.fakeProgressTimer);
      this.fakeProgressTimer = null;
    }
  }

  cancelExtraction() {
    this.stopFakeProgress();
    if (this.extractAbort) {
      this.extractAbort.abort();
      this.extractAbort = null;
    }
    if (this.extractTimer) {
      clearTimeout(this.extractTimer);
      this.extractTimer = null;
    }
  }

  setCardError(index, message) {
    this.stopFakeProgress();
    clearTimeout(this.extractTimer);
    this.cardStates.set(index, {
      phase: "error",
      errorText: message,
    });
    this.refreshCard(index);
  }

  doDownload(index) {
    const state = this.cardStates.get(index);
    const payload = state?.payload;
    if (!payload) {
      this.notify("Download information is missing");
      return;
    }

    const path =
      payload.downloadUrl ||
      `/api/download/${encodeURIComponent(payload.filename)}`;
    const href = this.resolveUrl(path);

    const a = document.createElement("a");
    a.href = href;
    a.download = payload.filename || "audio.mp3";
    a.style.display = "none";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    if (this.activeSongId) {
      this.markSongSaved(this.activeSongId);
      this.hideSaveButton(this.activeSongId);
    }

    if (typeof this.onSaved === "function") {
      try {
        this.onSaved(this.activeSongId);
      } catch (e) {}
    }

    this.notify("Download started");
    setTimeout(() => this.closeDrawer(), 350);
  }

  loadSavedIds() {
    try {
      const raw = localStorage.getItem(SaveToLibraryDrawer.storageKey);
      const parsed = raw ? JSON.parse(raw) : [];
      return new Set(
        Array.isArray(parsed) ? parsed.filter(Boolean).map(String) : []
      );
    } catch {
      return new Set();
    }
  }

  persistSavedIds() {
    try {
      localStorage.setItem(
        SaveToLibraryDrawer.storageKey,
        JSON.stringify(Array.from(this.savedSongIds))
      );
    } catch (e) {
      console.warn("[SaveToLibraryDrawer] Could not persist saved IDs:", e);
    }
  }

  applySavedBadge(songId) {
    if (typeof this.renderSavedBadge === "function") {
      try {
        this.renderSavedBadge(songId);
      } catch (e) {}
      return;
    }

    const selector = `[data-song-id="${CSS.escape(songId)}"]`;
    document.querySelectorAll(selector).forEach((el) => {
      if (el.classList.contains("downloadBtn")) {
        el.classList.add("is-saved");
        return;
      }
      el.querySelectorAll(".downloadBtn").forEach((btn) => {
        btn.classList.add("is-saved");
      });
      const img = el.querySelector("img");
      if (!img) return;
      const wrap = img.parentElement;
      if (!wrap || wrap.querySelector(".ytsdCheckmarkBadge")) return;
      wrap.style.position = "relative";
      const badge = document.createElement("span");
      badge.className = "ytsdCheckmarkBadge";
      badge.setAttribute("aria-label", "Saved to library");
      badge.textContent = "\u2713";
      wrap.appendChild(badge);
    });
  }

  hideSaveButton(songId) {
    document
      .querySelectorAll(`.downloadBtn[data-song-id="${CSS.escape(songId)}"]`)
      .forEach((btn) => {
        btn.classList.add("is-saved");
      });
  }

  revealAllSaveButtons() {
    document.querySelectorAll(".downloadBtn.is-saved").forEach((btn) => {
      btn.classList.remove("is-saved");
    });
    document.querySelectorAll(".ytsdCheckmarkBadge").forEach((badge) => {
      badge.remove();
    });
    this.savedSongIds.clear();
    this.persistSavedIds();
  }

  notify(message) {
    if (typeof this.onNotify === "function") {
      try {
        this.onNotify(message);
        return;
      } catch (e) {
        console.warn("[SaveToLibraryDrawer] Host notifier threw:", e);
      }
    }

    if (typeof window?.state?.showToast === "function") {
      try {
        window.state.showToast(message);
        return;
      } catch (e) {}
    }
    if (typeof window?.uiManager?.state?.showToast === "function") {
      try {
        window.uiManager.state.showToast(message);
        return;
      } catch (e) {}
    }

    const toastEl = document.getElementById("toast");
    if (toastEl) {
      toastEl.textContent = message;
      toastEl.classList.add("show");
      clearTimeout(toastEl._ytsdTimer);
      toastEl._ytsdTimer = setTimeout(
        () => toastEl.classList.remove("show"),
        2600
      );
      return;
    }

    console.log("[SaveToLibraryDrawer]", message);
  }

  resolveUrl(path) {
    if (!path) return "";
    if (/^https?:\/\//i.test(path)) return path;
    const base = this.apiBase;
    const separator = path.startsWith("/") || base.endsWith("/") ? "" : "/";
    return `${base}${separator}${path}`;
  }

  escapeHtml(text) {
    return YTUtils.escapeHtml(text ?? "");
  }

  formatDuration(raw) {
    return YTUtils.formatDuration(raw);
  }

  delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

function createSaveDrawer(ui = {}) {
  const drawer = new SaveToLibraryDrawer({
    apiBase: typeof YT_AUDIO_API_BASE !== "undefined" ? YT_AUDIO_API_BASE : "",
    onNotify: (msg) => {
      const state = ui?.state || window?.state;
      if (typeof state?.showToast === "function") {
        state.showToast(msg);
      } else {
        const el = document.getElementById("toast");
        if (el) {
          el.textContent = msg;
          el.classList.add("show");
          clearTimeout(el._ytsdTimer);
          el._ytsdTimer = setTimeout(() => el.classList.remove("show"), 2600);
        }
      }
    },
    onSaved: (songId) => {
      console.log("[SaveDrawer] Song saved:", songId);
    },
    getSongById: (id) => {
      const state = ui?.state || window?.state;
      return typeof state?.getSongById === "function"
        ? state.getSongById(id)
        : null;
    },
  });

  window.saveToLibraryDrawer = drawer;
  return drawer;
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    if (window.saveToLibraryDrawer) return;
    createSaveDrawer();
  });
} else {
  if (!window.saveToLibraryDrawer) {
    createSaveDrawer();
  }
}
**/






    const YTUtils = {
        escapeHtml: function(text) {
            if (!text) return '';
            const map = {
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                '"': '&quot;',
                "'": '&#039;'
            };
            return String(text).replace(/[&<>"']/g, function(m) { return map[m]; });
        },

        formatDuration: function(raw) {
            if (!raw) return '';
            const seconds = parseInt(raw, 10);
            if (isNaN(seconds) || seconds < 0) return '';
            const m = Math.floor(seconds / 60);
            const s = seconds % 60;
            if (m >= 60) {
                const h = Math.floor(m / 60);
                return `${h}:${String(m % 60).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
            }
            return `${m}:${String(s).padStart(2, '0')}`;
        },

        // Clean filename: remove spaces, remove parentheses and their contents
        cleanFilename: function(title) {
            if (!title) return 'audio';
            let cleaned = String(title);
            // Remove parentheses and everything inside them (including nested)
            cleaned = cleaned.replace(/\([^()]*\)/g, '');
            // Remove any remaining parentheses (just in case)
            cleaned = cleaned.replace(/[()]/g, '');
            // Remove spaces
            cleaned = cleaned.replace(/\s+/g, '');
            // Remove any other problematic characters (keep alphanumeric, dash, underscore)
            cleaned = cleaned.replace(/[^a-zA-Z0-9\-_]/g, '');
            return cleaned || 'audio';
        },

        // Build search query: title + artist if available
        buildSearchQuery: function(title, uploader) {
            let query = title || '';
            if (uploader) {
                query += ' ' + uploader;
            }
            return query.trim();
        }
    };

    // ================================================================
    // ytSaver.js — Main class
    // ================================================================
    class SaveToLibraryDrawer {
        static extractTimeoutMs = 75000;
        static pollIntervalMs = 1800;
        static fetchTimeoutMs = 30000;
        static skeletonCount = 5;
        static storageKey = "mybeats.savedSongs.v1";

        constructor(deps = {}) {
            this.apiBase = deps.apiBase ?? "";
            this.onNotify = deps.onNotify ?? null;
            this.onSaved = deps.onSaved ?? null;
            this.getSongById = deps.getSongById ?? null;
            this.renderSavedBadge = deps.renderSavedBadge ?? null;

            this.isDrawerOpen = false;
            this.activeSongId = null;
            this.activeSongTitle = "";
            this.activeSongUploader = "";
            this.activeQuery = "";
            this.results = [];
            this.cardStates = new Map();
            this.extractAbort = null;
            this.extractTimer = null;
            this.fakeProgressTimer = null;
            this.hasFetched = false;
            this.previouslyFocused = null;
            this.savedSongIds = this.loadSavedIds();
            this.expandedIndex = null; // track which card is expanded

            this.handleContainerClick = this.handleContainerClick.bind(this);
            this.handleKeydown = this.handleKeydown.bind(this);
            this.handleFocusTrap = this.handleFocusTrap.bind(this);
            this.handleSaveButtonClick = this.handleSaveButtonClick.bind(this);
            this.handleDragStart = this.handleDragStart.bind(this);
            this.handleDragMove = this.handleDragMove.bind(this);
            this.handleDragEnd = this.handleDragEnd.bind(this);

            this.shell = null;
            this.drawer = null;
            this.bodyEl = null;
            this.titleEl = null;
            this.closeBtn = null;
            this.backdrop = null;
            this.searchForm = null;
            this.searchInput = null;
            this.footerTryAgain = null;
            this.footerCancel = null;
            this.dragHandle = null;

            // Drag state
            this._dragStartY = 0;
            this._dragCurrentY = 0;
            this._dragging = false;
            this._dragOffset = 0;

            this.ensureDom();
            document.addEventListener("click", this.handleSaveButtonClick);
        }

        // ---------- Save button click handler (global) ----------
        handleSaveButtonClick(event) {
            const btn = event.target.closest('[data-action="download-song"]');
            if (!btn) return;

            const songId = btn.dataset.songId;
            const songTitle = btn.dataset.songTitle;
            const songThumbnail = btn.dataset.songThumbnail || '';
            const songUploader = btn.dataset.songUploader || '';

            if (!songId || !songTitle) {
                this.notify("Song information missing");
                return;
            }

            const song = {
                id: songId,
                title: songTitle,
                thumbnail: songThumbnail,
                uploader: songUploader
            };

            this.openDrawer(song);
        }

        // ---------- Open drawer ----------
        openDrawer(song) {
            if (!song?.id || !song.title) {
                this.notify("Song details unavailable");
                return;
            }

            this.activeSongId = String(song.id);
            this.activeSongTitle = song.title;
            this.activeSongUploader = song.uploader || '';
            // Build search query: title + artist
            this.activeQuery = YTUtils.buildSearchQuery(song.title, song.uploader);
            this.results = [];
            this.cardStates.clear();
            this.hasFetched = false;
            this.expandedIndex = null;
            this.cancelExtraction();

            this.ensureDom();
            this.titleEl.textContent = song.title;
            if (this.searchInput) this.searchInput.value = this.activeQuery;
            this.renderSkeleton();
            this.showDrawer();
            this.performSearch(this.activeQuery);
        }

        // ---------- Close drawer ----------
        closeDrawer() {
            this.hideDrawer();
            this.cancelExtraction();
            this.activeSongId = null;
            this.activeSongTitle = "";
            this.activeSongUploader = "";
            this.results = [];
            this.cardStates.clear();
            this.hasFetched = false;
            this.expandedIndex = null;
        }

        get isOpen() {
            return this.isDrawerOpen;
        }

        isSongSaved(songId) {
            return this.savedSongIds.has(String(songId));
        }

        markSongSaved(songId) {
            const id = String(songId);
            this.savedSongIds.add(id);
            this.persistSavedIds();
            this.applySavedBadge(id);
        }

        refreshSavedBadges() {
            this.savedSongIds.forEach((id) => this.applySavedBadge(id));
        }

        // ---------- DOM creation ----------
        ensureDom() {
            const existing = document.getElementById("ytSaveShell");
            if (existing) {
                this.shell = existing;
                this.drawer = document.getElementById("ytSaveDrawer");
                this.bodyEl = document.getElementById("ytSaveBody");
                this.titleEl = document.getElementById("ytSaveTitle");
                this.closeBtn = document.getElementById("ytSaveClose");
                this.backdrop = document.getElementById("ytSaveBackdrop");
                this.searchForm = document.getElementById("ytSaveSearchForm");
                this.searchInput = document.getElementById("ytSaveSearchInput");
                this.footerTryAgain = document.getElementById("ytsdFooterTryAgain");
                this.footerCancel = document.getElementById("ytsdFooterCancel");
                this.dragHandle = document.getElementById("ytsdDragHandle");
                if (!existing._ytsdBound) {
                    existing._ytsdBound = true;
                    this.bindShellEvents();
                }
                return;
            }

            const shell = document.createElement("div");
            shell.id = "ytSaveShell";
            shell.setAttribute("data-mode", "closed");
            shell.setAttribute("aria-hidden", "true");
            shell.innerHTML = `
                <div id="ytSaveBackdrop" aria-hidden="true"></div>
                <section
                    id="ytSaveDrawer"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="ytSaveTitle"
                    aria-hidden="true"
                >
                    <div class="ytsdFocusSentinel" tabindex="0" data-sentinel="start"></div>

                    <!-- Drag handle -->
                    <div id="ytsdDragHandle" class="ytsdDragHandle" aria-label="Drag to dismiss"></div>

                    <!-- Header (sticky) -->
                    <header id="ytSaveHeader">
                        <div class="ytsdHeaderTop">
                            <div>
                                <p id="ytSaveKicker">Save to Library</p>
                                <h3 id="ytSaveTitle">Pick a video</h3>
                            </div>
                            <button
                                id="ytSaveClose"
                                type="button"
                                aria-label="Close save drawer"
                            >
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M18 6L6 18M6 6l12 12"/>
                                </svg>
                            </button>
                        </div>
                        <form id="ytSaveSearchForm" role="search">
                            <input
                                id="ytSaveSearchInput"
                                type="search"
                                placeholder="Search YouTube for this song"
                                aria-label="Search query"
                                autocomplete="off"
                            >
                            <button id="ytSaveSearchBtn" type="submit">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                                    <circle cx="11" cy="11" r="8"/>
                                    <path d="m21 21-4.35-4.35"/>
                                </svg>
                                Search
                            </button>
                        </form>
                    </header>

                    <!-- Body (scrollable) -->
                    <div id="ytSaveBody"></div>

                    <!-- Footer (sticky) -->
                    <footer id="ytSaveFooter">
                        <div class="ytsdFooterActions">
                            <button id="ytsdFooterTryAgain" class="ytsdBtn isGhost" type="button" data-action="footer-retry">
                                Try Again
                            </button>
                            <button id="ytsdFooterCancel" class="ytsdBtn isSecondary" type="button" data-action="footer-cancel">
                                Cancel
                            </button>
                        </div>
                    </footer>

                    <div class="ytsdFocusSentinel" tabindex="0" data-sentinel="end"></div>
                </section>
            `;
            document.body.appendChild(shell);

            this.shell = document.getElementById("ytSaveShell");
            this.drawer = document.getElementById("ytSaveDrawer");
            this.bodyEl = document.getElementById("ytSaveBody");
            this.titleEl = document.getElementById("ytSaveTitle");
            this.closeBtn = document.getElementById("ytSaveClose");
            this.backdrop = document.getElementById("ytSaveBackdrop");
            this.searchForm = document.getElementById("ytSaveSearchForm");
            this.searchInput = document.getElementById("ytSaveSearchInput");
            this.footerTryAgain = document.getElementById("ytsdFooterTryAgain");
            this.footerCancel = document.getElementById("ytsdFooterCancel");
            this.dragHandle = document.getElementById("ytsdDragHandle");

            this.shell._ytsdBound = true;
            this.bindShellEvents();
        }

        bindShellEvents() {
            this.closeBtn.addEventListener("click", () => this.closeDrawer());
            this.backdrop.addEventListener("click", () => this.closeDrawer());

            this.shell.querySelectorAll("[data-sentinel]").forEach((s) => {
                s.addEventListener("focus", this.handleFocusTrap);
            });

            this.bodyEl.addEventListener("click", this.handleContainerClick);

            if (this.searchForm) {
                this.searchForm.addEventListener("submit", (e) => this.handleSearchSubmit(e));
            }

            // Footer buttons
            if (this.footerTryAgain) {
                this.footerTryAgain.addEventListener("click", () => this.handleFooterTryAgain());
            }
            if (this.footerCancel) {
                this.footerCancel.addEventListener("click", () => this.closeDrawer());
            }

            // Drag handle
            if (this.dragHandle) {
                this.dragHandle.addEventListener("mousedown", this.handleDragStart);
                this.dragHandle.addEventListener("touchstart", this.handleDragStart, { passive: true });
            }

            // Global drag listeners
            window.addEventListener("mousemove", this.handleDragMove);
            window.addEventListener("mouseup", this.handleDragEnd);
            window.addEventListener("touchmove", this.handleDragMove, { passive: true });
            window.addEventListener("touchend", this.handleDragEnd);
        }

        // ---------- Drag handling ----------
        handleDragStart(e) {
            if (!this.isDrawerOpen) return;
            this._dragging = true;
            const clientY = e.clientY ?? e.touches?.[0]?.clientY ?? 0;
            this._dragStartY = clientY;
            this._dragCurrentY = clientY;
            this._dragOffset = 0;
            this.drawer.style.transition = 'none';
            this.drawer.style.transform = 'translateY(0)';
        }

        handleDragMove(e) {
            if (!this._dragging) return;
            const clientY = e.clientY ?? e.touches?.[0]?.clientY ?? 0;
            this._dragCurrentY = clientY;
            const diff = this._dragCurrentY - this._dragStartY;
            if (diff > 0) {
                this._dragOffset = diff;
                this.drawer.style.transform = `translateY(${diff}px)`;
                // Fade backdrop proportionally
                const progress = Math.min(diff / 300, 1);
                if (this.backdrop) {
                    this.backdrop.style.background = `rgba(0,0,0,${0.8 * (1 - progress)})`;
                    this.backdrop.style.backdropFilter = `blur(${5 * (1 - progress)}px)`;
                }
            }
        }

        handleDragEnd(e) {
            if (!this._dragging) return;
            this._dragging = false;
            const diff = this._dragCurrentY - this._dragStartY;
            this.drawer.style.transition = '';
            this.drawer.style.transform = '';
            if (this.backdrop) {
                this.backdrop.style.background = '';
                this.backdrop.style.backdropFilter = '';
            }
            if (diff > 100) {
                this.closeDrawer();
            } else {
                // Snap back
                this.drawer.style.transform = '';
                this.drawer.classList.add('open');
                // Re-trigger the open state
                this.shell.setAttribute('data-mode', 'open');
                this.drawer.setAttribute('aria-hidden', 'false');
            }
            this._dragOffset = 0;
        }

        // ---------- Search ----------
        handleSearchSubmit(event) {
            event.preventDefault();
            const query = this.searchInput ? this.searchInput.value.trim() : "";
            if (!query) return;
            this.cancelExtraction();
            this.results = [];
            this.cardStates.clear();
            this.hasFetched = false;
            this.expandedIndex = null;
            this.renderSkeleton();
            this.performSearch(query);
        }

        // ---------- Footer actions ----------
        handleFooterTryAgain() {
            // If there's an expanded card with an error, retry that card
            if (this.expandedIndex !== null) {
                const state = this.cardStates.get(this.expandedIndex);
                if (state && state.phase === 'error') {
                    this.startExtraction(this.expandedIndex);
                    return;
                }
            }
            // Otherwise retry the search
            const query = this.searchInput ? this.searchInput.value.trim() : this.activeQuery;
            if (query) {
                this.cancelExtraction();
                this.results = [];
                this.cardStates.clear();
                this.hasFetched = false;
                this.expandedIndex = null;
                this.renderSkeleton();
                this.performSearch(query);
            } else {
                this.notify("No search query to retry");
            }
        }

        // ---------- Show / hide drawer ----------
        showDrawer() {
            if (!this.shell) return;
            this.isDrawerOpen = true;

            this.previouslyFocused = document.activeElement;
            this.toggleAriaHidden(true);
            document.body.classList.add("ytsdScrollLocked");

            this.shell.setAttribute("data-mode", "open");
            this.shell.setAttribute("aria-hidden", "false");
            this.drawer.setAttribute("aria-hidden", "false");

            // Reset drawer transform
            this.drawer.style.transform = '';
            this.drawer.style.transition = '';

            requestAnimationFrame(() => {
                if (this.searchInput) {
                    this.searchInput.focus();
                    this.searchInput.select();
                } else {
                    this.closeBtn.focus();
                }
            });

            document.addEventListener("keydown", this.handleKeydown);
        }

        hideDrawer() {
            if (!this.shell) return;
            this.isDrawerOpen = false;

            this.shell.setAttribute("data-mode", "closed");
            this.shell.setAttribute("aria-hidden", "true");
            this.drawer.setAttribute("aria-hidden", "true");
            document.body.classList.remove("ytsdScrollLocked");

            this.toggleAriaHidden(false);
            document.removeEventListener("keydown", this.handleKeydown);

            const restoreEl = this.previouslyFocused;
            this.previouslyFocused = null;
            setTimeout(() => {
                if (restoreEl && typeof restoreEl.focus === "function") {
                    restoreEl.focus();
                }
            }, 350);
        }

        toggleAriaHidden(hideSiblings) {
            const siblings = document.body.children;
            for (let i = 0; i < siblings.length; i++) {
                const el = siblings[i];
                if (el === this.shell) continue;
                if (el.tagName === "SCRIPT" || el.tagName === "STYLE") continue;

                if (hideSiblings) {
                    if (!el.hasAttribute("aria-hidden")) {
                        el.dataset.ytsdWasHidden = "false";
                        el.setAttribute("aria-hidden", "true");
                    } else {
                        el.dataset.ytsdWasHidden = "true";
                    }
                } else {
                    if (el.dataset.ytsdWasHidden === "false") {
                        el.removeAttribute("aria-hidden");
                    }
                    delete el.dataset.ytsdWasHidden;
                }
            }
        }

        // ---------- Perform search ----------
        async performSearch(query) {
            if (this.hasFetched) return;
            this.hasFetched = true;
            this.activeQuery = query;

            const controller = new AbortController();
            const timeoutId = setTimeout(
                () => controller.abort(),
                SaveToLibraryDrawer.fetchTimeoutMs
            );

            try {
                const url = `${this.apiBase}/api/search/?q=${encodeURIComponent(query)}`;
                const response = await fetch(url, { signal: controller.signal });
                clearTimeout(timeoutId);

                if (!response.ok) {
                    throw new Error(`Search failed (${response.status})`);
                }

                const data = await response.json();
                if (!Array.isArray(data) || data.length === 0) {
                    this.renderEmpty();
                    return;
                }

                this.results = data;
                this.renderResults();
            } catch (err) {
                clearTimeout(timeoutId);
                console.error("[SaveToLibraryDrawer] Search error:", err);
                const isTimeout = err.name === "AbortError";
                this.renderError(
                    isTimeout ? "Search timed out." : "Search failed.",
                    isTimeout ?
                    "The request took too long. Try again." :
                    "Something went wrong on our end."
                );
            }
        }

        // ---------- Render helpers ----------
        renderSkeleton() {
            const count = SaveToLibraryDrawer.skeletonCount;
            let html = '<div class="ytsdSkeletonList">';
            for (let i = 0; i < count; i++) {
                html += `
                        <div class="ytsdSkeletonCard">
                            <div class="ytsdSkeletonThumb">
                                <div class="ytsdSkeletonShimmer"></div>
                            </div>
                            <div class="ytsdSkeletonLines">
                                <div class="ytsdSkeletonLine"><div class="ytsdSkeletonShimmer"></div></div>
                                <div class="ytsdSkeletonLine short"><div class="ytsdSkeletonShimmer"></div></div>
                            </div>
                        </div>
                    `;
            }
            html += "</div>";
            this.bodyEl.innerHTML = html;
            // Reset expanded index
            this.expandedIndex = null;
        }

        renderEmpty() {
            this.bodyEl.innerHTML = `
                    <div class="ytsdStateMsg">
                        <span class="ytsdStateIcon">🔍</span>
                        <p class="ytsdStateTitle">No results found</p>
                        <p class="ytsdStateDesc">Try a different search or check the song title.</p>
                    </div>
                `;
            this.expandedIndex = null;
        }

        renderError(title, description) {
            this.bodyEl.innerHTML = `
                    <div class="ytsdStateMsg isError">
                        <span class="ytsdStateIcon">⚠️</span>
                        <p class="ytsdStateTitle">${this.escapeHtml(title)}</p>
                        <p class="ytsdStateDesc">${this.escapeHtml(description)}</p>
                        <button class="ytsdRetryBtn" type="button" data-action="retry-search">Retry</button>
                    </div>
                `;
            this.expandedIndex = null;
        }

        renderResults() {
            if (!this.results.length) {
                this.renderEmpty();
                return;
            }

            let html =
                `<p class="ytsdQueryEcho">Results for "${this.escapeHtml(this.activeQuery || this.activeSongTitle)}"</p>`;
            html += '<div class="ytsdResultsGrid">';
            this.results.forEach((item, index) => {
                html += this.renderCard(index, item);
            });
            html += "</div>";
            this.bodyEl.innerHTML = html;

            // Re-apply any saved badges
            this.savedSongIds.forEach((id) => this.applySavedBadge(id));

            // If there was an expanded card, re-expand it
            if (this.expandedIndex !== null) {
                const card = this.bodyEl.querySelector(`[data-card-index="${this.expandedIndex}"]`);
                if (card) {
                    card.classList.add('is-expanded');
                }
            }
        }

        renderCard(index, item) {
            const state = this.cardStates.get(index) ?? { phase: "idle" };
            const isExpanded = this.expandedIndex === index;
            const expandedClass = isExpanded ? 'is-expanded' : '';

            return `
                    <article class="ytsdResultCard ${expandedClass}" data-card-index="${index}">
                        <button class="ytsdResultHit" type="button" data-action="select-card" data-index="${index}">
                            <div class="ytsdThumbWrap">
                                <img
                                    class="ytsdResultThumb"
                                    src="${this.escapeHtml(item.thumbnail || '')}"
                                    alt=""
                                    loading="lazy"
                                >
                            </div>
                            <div class="ytsdResultCopy">
                                <h4>${this.escapeHtml(item.title || 'Untitled video')}</h4>
                                <p class="ytsdChannel">${this.escapeHtml(item.uploader || item.channel || 'Unknown channel')}</p>
                            </div>
                            <span class="ytsdResultTime">${this.escapeHtml(this.formatDuration(item.duration))}</span>
                        </button>

                        <div class="ytsdCardExpanded" data-expanded="${index}">
                            <div class="ytsdCardOverlay" data-overlay="${index}">
                                ${this.renderOverlayContent(index, state, item)}
                            </div>
                        </div>
                    </article>
                `;
        }

        renderOverlayContent(index, state, item) {
            if (state.phase === "confirm") {
                return `
                        <p class="ytsdOverlayTitle">Save audio from this video?</p>
                        <div class="ytsdOverlayActions">
                            <button class="ytsdBtn isPrimary" type="button" data-action="confirm-save" data-index="${index}">
                                Continue
                            </button>
                            <button class="ytsdBtn" type="button" data-action="cancel-card" data-index="${index}">
                                Cancel
                            </button>
                        </div>
                    `;
            }

            if (state.phase === "extracting") {
                const progress = Number.isFinite(state.progress) ? Math.round(state.progress) : 0;
                return `
                        <div class="ytsdSpinner" aria-hidden="true"></div>
                        <p class="ytsdExtractMeta">${this.escapeHtml(state.statusText || 'Extracting audio…')}</p>
                        <div class="ytsdProgressWrap">
                            <div class="ytsdProgressTrack">
                                <div class="ytsdProgressFill" style="width:${progress}%" aria-hidden="true"></div>
                            </div>
                            <p class="ytsdStatusLine">${progress}%</p>
                        </div>
                        <button class="ytsdCancelLink" type="button" data-action="cancel-extract" data-index="${index}">
                            Cancel
                        </button>
                    `;
            }

            if (state.phase === "ready") {
                return `
                        <p class="ytsdOverlayTitle">✅ Audio ready!</p>
                        <button class="ytsdBtn isDownload" type="button" data-action="download" data-index="${index}">
                            <svg class="ytsdDownloadIcon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                                <polyline points="7 10 12 15 17 10"/>
                                <line x1="12" y1="15" x2="12" y2="3"/>
                            </svg>
                            Download
                        </button>
                    `;
            }

            if (state.phase === "error") {
                return `
                        <p class="ytsdInlineError">⚠️ ${this.escapeHtml(state.errorText || 'Something went wrong.')}</p>
                        <div class="ytsdOverlayActions">
                            <button class="ytsdBtn isPrimary" type="button" data-action="retry-card" data-index="${index}">
                                Retry
                            </button>
                            <button class="ytsdBtn" type="button" data-action="cancel-card" data-index="${index}">
                                Cancel
                            </button>
                        </div>
                    `;
            }

            return '';
        }

        // ---------- Refresh a single card ----------
        refreshCard(index) {
            const item = this.results[index];
            const state = this.cardStates.get(index) ?? { phase: "idle" };
            if (!item) return;

            const card = this.bodyEl.querySelector(`[data-card-index="${index}"]`);
            if (!card) return;

            const expanded = card.querySelector(`[data-expanded="${index}"]`);
            if (!expanded) return;

            const overlay = expanded.querySelector(`[data-overlay="${index}"]`);
            if (!overlay) return;

            // Update the expanded state class
            const isExpanded = this.expandedIndex === index;
            card.classList.toggle('is-expanded', isExpanded);

            // Update overlay content
            overlay.innerHTML = this.renderOverlayContent(index, state, item);
        }

        // ---------- Container click handler ----------
        handleContainerClick(event) {
            const btn = event.target.closest("[data-action]");
            if (!btn) return;

            const action = btn.dataset.action;
            const index = parseInt(btn.dataset.index, 10);

            switch (action) {
                case "select-card": {
                    if (!Number.isFinite(index)) return;
                    // Toggle expansion
                    if (this.expandedIndex === index) {
                        // If already expanded, collapse
                        this.cancelExtraction();
                        this.cardStates.set(index, { phase: "idle" });
                        this.expandedIndex = null;
                        this.refreshCard(index);
                    } else {
                        // Collapse any other expanded card
                        if (this.expandedIndex !== null) {
                            const prev = this.expandedIndex;
                            this.cardStates.set(prev, { phase: "idle" });
                            this.expandedIndex = null;
                            this.refreshCard(prev);
                        }
                        // Expand this one
                        this.expandedIndex = index;
                        const state = this.cardStates.get(index) ?? { phase: "idle" };
                        if (state.phase === "idle") {
                            this.cardStates.set(index, { phase: "confirm" });
                        }
                        this.refreshCard(index);
                    }
                    break;
                }

                case "confirm-save": {
                    if (!Number.isFinite(index)) return;
                    this.startExtraction(index);
                    break;
                }

                case "cancel-card": {
                    if (!Number.isFinite(index)) return;
                    this.cancelExtraction();
                    this.cardStates.set(index, { phase: "idle" });
                    this.expandedIndex = null;
                    this.refreshCard(index);
                    break;
                }

                case "retry-card": {
                    if (!Number.isFinite(index)) return;
                    this.startExtraction(index);
                    break;
                }

                case "cancel-extract": {
                    this.cancelExtraction();
                    if (Number.isFinite(index)) {
                        this.cardStates.set(index, { phase: "idle" });
                        this.expandedIndex = null;
                        this.refreshCard(index);
                    }
                    break;
                }

                case "download": {
                    if (!Number.isFinite(index)) return;
                    this.doDownload(index);
                    break;
                }

                case "retry-search": {
                    this.hasFetched = false;
                    this.renderSkeleton();
                    this.performSearch(this.activeQuery || this.activeSongTitle);
                    break;
                }

                case "footer-retry": {
                    this.handleFooterTryAgain();
                    break;
                }

                case "footer-cancel": {
                    this.closeDrawer();
                    break;
                }
            }
        }

        // ---------- Keyboard ----------
        handleKeydown(event) {
            if (!this.isDrawerOpen) return;

            if (event.key === "Escape") {
                if (this.expandedIndex !== null) {
                    this.cancelExtraction();
                    this.cardStates.set(this.expandedIndex, { phase: "idle" });
                    const idx = this.expandedIndex;
                    this.expandedIndex = null;
                    this.refreshCard(idx);
                } else {
                    this.closeDrawer();
                }
                event.preventDefault();
            }
        }

        handleFocusTrap(event) {
            if (!this.isDrawerOpen || !this.drawer) return;
            const sentinel = event.target.dataset.sentinel;
            const focusable = this.getFocusableElements();
            if (!focusable.length) return;

            if (sentinel === "end") {
                focusable[0].focus();
            } else if (sentinel === "start") {
                focusable[focusable.length - 1].focus();
            }
        }

        getFocusableElements() {
            if (!this.drawer) return [];
            const selector =
                'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
            return Array.from(this.drawer.querySelectorAll(selector)).filter(
                (el) => !el.disabled && !el.classList.contains("ytsdFocusSentinel")
            );
        }

        // ---------- Extraction ----------
        async startExtraction(index) {
            const item = this.results[index];
            if (!item?.url) {
                this.notify("Video URL is unavailable");
                return;
            }

            // Ensure this card is expanded
            if (this.expandedIndex !== index) {
                if (this.expandedIndex !== null) {
                    const prev = this.expandedIndex;
                    this.cardStates.set(prev, { phase: "idle" });
                    this.expandedIndex = null;
                    this.refreshCard(prev);
                }
                this.expandedIndex = index;
            }

            this.cardStates.set(index, {
                phase: "extracting",
                progress: 5,
                statusText: "Starting extraction…",
                errorText: null,
            });
            this.refreshCard(index);

            this.startFakeProgress(index);

            this.cancelExtraction();
            this.extractAbort = new AbortController();

            this.extractTimer = setTimeout(() => {
                this.extractAbort?.abort();
                this.setCardError(
                    index,
                    "Extraction timed out. Please try a different video."
                );
            }, SaveToLibraryDrawer.extractTimeoutMs);

            try {
                const response = await fetch(`${this.apiBase}/api/extract/`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ url: item.url }),
                    signal: this.extractAbort.signal,
                });

                if (!response.ok) {
                    throw new Error(`Extraction request failed (${response.status})`);
                }

                const payload = await response.json();
                if (!payload?.filename && !payload?.statusUrl) {
                    throw new Error("Invalid response from extraction server");
                }

                await this.pollStatus(index, payload);
            } catch (err) {
                if (err.name === "AbortError") {
                    const state = this.cardStates.get(index);
                    if (state?.phase === "extracting") {
                        this.setCardError(index, "Extraction was cancelled or timed out.");
                    }
                } else {
                    console.error("[SaveToLibraryDrawer] Extraction error:", err);
                    this.setCardError(
                        index,
                        "Could not extract audio. Try a different video."
                    );
                }
            }
        }

        async pollStatus(index, payload) {
            const statusPath =
                payload.statusUrl ||
                `/api/status/${encodeURIComponent(payload.filename)}`;
            const statusUrl = this.resolveUrl(statusPath);
            const started = Date.now();

            while (Date.now() - started < SaveToLibraryDrawer.extractTimeoutMs) {
                await this.delay(SaveToLibraryDrawer.pollIntervalMs);

                const currentState = this.cardStates.get(index);
                if (!currentState || currentState.phase !== "extracting") return;

                try {
                    const res = await fetch(statusUrl);
                    if (!res.ok) throw new Error(`Status ${res.status}`);

                    const data = await res.json();

                    if (data.status === "failed") {
                        throw new Error(data.error || "Processing failed on server");
                    }

                    if (data.status === "ready") {
                        this.stopFakeProgress();
                        clearTimeout(this.extractTimer);
                        this.cardStates.set(index, {
                            phase: "ready",
                            payload,
                            progress: 100,
                        });
                        this.refreshCard(index);
                        this.notify("Audio extraction complete!");
                        return;
                    }

                    const realProgress = Number(data.progress);
                    if (Number.isFinite(realProgress) && realProgress > 0) {
                        const merged = Math.min(realProgress, 92);
                        this.cardStates.set(index, {
                            ...currentState,
                            progress: Math.max(currentState.progress ?? 0, merged),
                            statusText: data.message || "Processing…",
                        });
                        this.refreshCard(index);
                    }
                } catch (err) {
                    console.error("[SaveToLibraryDrawer] Poll error:", err);
                    this.setCardError(index, err.message || "Status check failed.");
                    return;
                }
            }

            this.setCardError(
                index,
                "Extraction is taking too long. Please try again later."
            );
        }

        startFakeProgress(index) {
            this.stopFakeProgress();

            let elapsed = 0;
            const interval = 400;

            this.fakeProgressTimer = setInterval(() => {
                elapsed += interval;
                const state = this.cardStates.get(index);
                if (!state || state.phase !== "extracting") {
                    this.stopFakeProgress();
                    return;
                }

                const t = Math.min(elapsed / 12000, 1);
                const eased = 1 - Math.pow(1 - t, 3);
                const fakeValue = Math.round(eased * 88);

                const currentProgress = state.progress ?? 0;
                if (fakeValue > currentProgress && currentProgress < 90) {
                    const statusText =
                        elapsed < 3000 ?
                        "Extracting audio…" :
                        elapsed < 8000 ?
                        "Processing…" :
                        "Almost there…";

                    this.cardStates.set(index, {
                        ...state,
                        progress: fakeValue,
                        statusText,
                    });
                    this.refreshCard(index);
                }
            }, interval);
        }

        stopFakeProgress() {
            if (this.fakeProgressTimer) {
                clearInterval(this.fakeProgressTimer);
                this.fakeProgressTimer = null;
            }
        }

        cancelExtraction() {
            this.stopFakeProgress();
            if (this.extractAbort) {
                this.extractAbort.abort();
                this.extractAbort = null;
            }
            if (this.extractTimer) {
                clearTimeout(this.extractTimer);
                this.extractTimer = null;
            }
        }

        setCardError(index, message) {
            this.stopFakeProgress();
            clearTimeout(this.extractTimer);
            this.cardStates.set(index, {
                phase: "error",
                errorText: message,
            });
            this.refreshCard(index);
        }

        // ---------- Download ----------
        doDownload(index) {
            const state = this.cardStates.get(index);
            const payload = state?.payload;
            if (!payload) {
                this.notify("Download information is missing");
                return;
            }

            // Build clean filename
            const item = this.results[index];
            const rawTitle = item?.title || this.activeSongTitle || 'audio';
            const cleanName = YTUtils.cleanFilename(rawTitle);
            const ext = payload.filename?.includes('.') ? payload.filename.split('.').pop() : 'mp3';
            const filename = `${cleanName}.${ext}`;

            const path =
                payload.downloadUrl ||
                `/api/download/${encodeURIComponent(payload.filename)}`;
            const href = this.resolveUrl(path);

            const a = document.createElement("a");
            a.href = href;
            a.download = filename;
            a.style.display = "none";
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);

            if (this.activeSongId) {
                this.markSongSaved(this.activeSongId);
                this.hideSaveButton(this.activeSongId);
            }

            if (typeof this.onSaved === "function") {
                try {
                    this.onSaved(this.activeSongId);
                } catch (e) {}
            }

            this.notify(`Download started: ${filename}`);
            setTimeout(() => this.closeDrawer(), 350);
        }

        // ---------- Saved IDs ----------
        loadSavedIds() {
            try {
                const raw = localStorage.getItem(SaveToLibraryDrawer.storageKey);
                const parsed = raw ? JSON.parse(raw) : [];
                return new Set(
                    Array.isArray(parsed) ? parsed.filter(Boolean).map(String) : []
                );
            } catch {
                return new Set();
            }
        }

        persistSavedIds() {
            try {
                localStorage.setItem(
                    SaveToLibraryDrawer.storageKey,
                    JSON.stringify(Array.from(this.savedSongIds))
                );
            } catch (e) {
                console.warn("[SaveToLibraryDrawer] Could not persist saved IDs:", e);
            }
        }

        // ---------- Badge: soft green checkmark ----------
        applySavedBadge(songId) {
            if (typeof this.renderSavedBadge === "function") {
                try {
                    this.renderSavedBadge(songId);
                } catch (e) {}
                return;
            }

            const selector = `[data-song-id="${CSS.escape(songId)}"]`;
            document.querySelectorAll(selector).forEach((el) => {
                if (el.classList.contains("downloadBtn")) {
                    el.classList.add("is-saved");
                    return;
                }
                el.querySelectorAll(".downloadBtn").forEach((btn) => {
                    btn.classList.add("is-saved");
                });
                const img = el.querySelector("img");
                if (!img) return;
                const wrap = img.parentElement;
                if (!wrap || wrap.querySelector(".ytsdCheckmarkBadge")) return;
                wrap.style.position = "relative";
                const badge = document.createElement("span");
                badge.className = "ytsdCheckmarkBadge";
                badge.setAttribute("aria-label", "Saved to library");
                // ✓ is added via ::after
                wrap.appendChild(badge);
            });
        }

        hideSaveButton(songId) {
            document
                .querySelectorAll(`.downloadBtn[data-song-id="${CSS.escape(songId)}"]`)
                .forEach((btn) => {
                    btn.classList.add("is-saved");
                });
        }

        revealAllSaveButtons() {
            document.querySelectorAll(".downloadBtn.is-saved").forEach((btn) => {
                btn.classList.remove("is-saved");
            });
            document.querySelectorAll(".ytsdCheckmarkBadge").forEach((badge) => {
                badge.remove();
            });
            this.savedSongIds.clear();
            this.persistSavedIds();
        }

        // ---------- Notify ----------
        notify(message) {
            if (typeof this.onNotify === "function") {
                try {
                    this.onNotify(message);
                    return;
                } catch (e) {
                    console.warn("[SaveToLibraryDrawer] Host notifier threw:", e);
                }
            }

            // Fallback toast
            const toastEl = document.getElementById("toast");
            if (toastEl) {
                toastEl.textContent = message;
                toastEl.classList.remove("opacity-0", "translate-y-4");
                toastEl.classList.add("opacity-100", "translate-y-0");
                clearTimeout(toastEl._ytsdTimer);
                toastEl._ytsdTimer = setTimeout(() => {
                    toastEl.classList.remove("opacity-100", "translate-y-0");
                    toastEl.classList.add("opacity-0", "translate-y-4");
                }, 2600);
                return;
            }

            console.log("[SaveToLibraryDrawer]", message);
        }

        // ---------- Utilities ----------
        resolveUrl(path) {
            if (!path) return "";
            if (/^https?:\/\//i.test(path)) return path;
            const base = this.apiBase;
            const separator = path.startsWith("/") || base.endsWith("/") ? "" : "/";
            return `${base}${separator}${path}`;
        }

        escapeHtml(text) {
            return YTUtils.escapeHtml(text ?? "");
        }

        formatDuration(raw) {
            return YTUtils.formatDuration(raw);
        }

        delay(ms) {
            return new Promise((resolve) => setTimeout(resolve, ms));
        }
    }

    // ================================================================
    // Factory function
    // ================================================================
    function createSaveDrawer(ui = {}) {
        const drawer = new SaveToLibraryDrawer({
            apiBase: typeof YT_AUDIO_API_BASE !== "undefined" ? YT_AUDIO_API_BASE : "",
            onNotify: (msg) => {
                const state = ui?.state || window?.state;
                if (typeof state?.showToast === "function") {
                    state.showToast(msg);
                } else {
                    const el = document.getElementById("toast");
                    if (el) {
                        el.textContent = msg;
                        el.classList.remove("opacity-0", "translate-y-4");
                        el.classList.add("opacity-100", "translate-y-0");
                        clearTimeout(el._ytsdTimer);
                        el._ytsdTimer = setTimeout(() => {
                            el.classList.remove("opacity-100", "translate-y-0");
                            el.classList.add("opacity-0", "translate-y-4");
                        }, 2600);
                    }
                }
            },
            onSaved: (songId) => {
                console.log("[SaveDrawer] Song saved:", songId);
            },
            getSongById: (id) => {
                const state = ui?.state || window?.state;
                return typeof state?.getSongById === "function" ?
                    state.getSongById(id) :
                    null;
            },
        });

        window.saveToLibraryDrawer = drawer;
        return drawer;
    }

    // ================================================================
    // Auto-init
    // ================================================================
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", () => {
            if (window.saveToLibraryDrawer) return;
            createSaveDrawer();
        });
    } else {
        if (!window.saveToLibraryDrawer) {
            createSaveDrawer();
        }
    }

