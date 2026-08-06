/* =============================================================================
   CodeVault — Snippet Manager
   snippets.js — Full application logic (vanilla ES6+, no frameworks)
   ============================================================================= */
'use strict';

/* =============================================================================
   SECTION 1: CONSTANTS & CONFIGURATION
   ============================================================================= */

const STORAGE_KEY = 'codevault_data_v1';
const DRAFT_KEY = 'codevault_draft_v1';
const AUTOSAVE_INTERVAL_MS = 30000;
const SEARCH_DEBOUNCE_MS = 300;
const MAX_RECENT_SEARCHES = 8;
const MAX_RECENTLY_VIEWED = 24;
const MAX_VERSION_HISTORY = 5;
const TOAST_DURATION_MS = 3000;

/** Supported languages: value -> { label, cmMode, ext, badgeClass } (40+ languages) */
const LANGUAGES = [
  { value: 'javascript', label: 'JavaScript', cmMode: 'javascript', ext: 'js', badge: 'lang-javascript' },
  { value: 'typescript', label: 'TypeScript', cmMode: 'text/typescript', ext: 'ts', badge: 'lang-typescript' },
  { value: 'jsx', label: 'JSX', cmMode: 'jsx', ext: 'jsx', badge: 'lang-jsx' },
  { value: 'tsx', label: 'TSX', cmMode: 'jsx', ext: 'tsx', badge: 'lang-tsx' },
  { value: 'python', label: 'Python', cmMode: 'python', ext: 'py', badge: 'lang-python' },
  { value: 'html', label: 'HTML', cmMode: 'htmlmixed', ext: 'html', badge: 'lang-html' },
  { value: 'css', label: 'CSS', cmMode: 'css', ext: 'css', badge: 'lang-css' },
  { value: 'json', label: 'JSON', cmMode: { name: 'javascript', json: true }, ext: 'json', badge: 'lang-json' },
  { value: 'java', label: 'Java', cmMode: 'text/x-java', ext: 'java', badge: 'lang-java' },
  { value: 'c', label: 'C', cmMode: 'text/x-csrc', ext: 'c', badge: 'lang-c' },
  { value: 'cpp', label: 'C++', cmMode: 'text/x-c++src', ext: 'cpp', badge: 'lang-cpp' },
  { value: 'csharp', label: 'C#', cmMode: 'text/x-csharp', ext: 'cs', badge: 'lang-csharp' },
  { value: 'php', label: 'PHP', cmMode: 'php', ext: 'php', badge: 'lang-php' },
  { value: 'ruby', label: 'Ruby', cmMode: 'ruby', ext: 'rb', badge: 'lang-ruby' },
  { value: 'go', label: 'Go', cmMode: 'go', ext: 'go', badge: 'lang-go' },
  { value: 'rust', label: 'Rust', cmMode: 'rust', ext: 'rs', badge: 'lang-rust' },
  { value: 'swift', label: 'Swift', cmMode: 'swift', ext: 'swift', badge: 'lang-swift' },
  { value: 'kotlin', label: 'Kotlin', cmMode: 'text/x-kotlin', ext: 'kt', badge: 'lang-kotlin' },
  { value: 'shell', label: 'Shell / Bash', cmMode: 'shell', ext: 'sh', badge: 'lang-shell' },
  { value: 'sql', label: 'SQL', cmMode: 'sql', ext: 'sql', badge: 'lang-sql' },
  { value: 'yaml', label: 'YAML', cmMode: 'yaml', ext: 'yml', badge: 'lang-yaml' },
  { value: 'markdown', label: 'Markdown', cmMode: 'markdown', ext: 'md', badge: 'lang-markdown' },
  { value: 'dockerfile', label: 'Dockerfile', cmMode: 'dockerfile', ext: 'dockerfile', badge: 'lang-dockerfile' },
  { value: 'lua', label: 'Lua', cmMode: 'lua', ext: 'lua', badge: 'lang-lua' },
  { value: 'perl', label: 'Perl', cmMode: 'perl', ext: 'pl', badge: 'lang-perl' },
  { value: 'r', label: 'R', cmMode: 'r', ext: 'r', badge: 'lang-r' },
  { value: 'scala', label: 'Scala', cmMode: 'text/x-scala', ext: 'scala', badge: 'lang-scala' },
  { value: 'haskell', label: 'Haskell', cmMode: 'haskell', ext: 'hs', badge: 'lang-haskell' },
  { value: 'clojure', label: 'Clojure', cmMode: 'clojure', ext: 'clj', badge: 'lang-clojure' },
  { value: 'elixir', label: 'Elixir', cmMode: 'ruby', ext: 'ex', badge: 'lang-elixir' },
  { value: 'vue', label: 'Vue', cmMode: 'vue', ext: 'vue', badge: 'lang-vue' },
  { value: 'dart', label: 'Dart', cmMode: 'dart', ext: 'dart', badge: 'lang-dart' },
  { value: 'objectivec', label: 'Objective-C', cmMode: 'text/x-objectivec', ext: 'm', badge: 'lang-objectivec' },
  { value: 'powershell', label: 'PowerShell', cmMode: 'powershell', ext: 'ps1', badge: 'lang-powershell' },
  { value: 'groovy', label: 'Groovy', cmMode: 'groovy', ext: 'groovy', badge: 'lang-groovy' },
  { value: 'coffeescript', label: 'CoffeeScript', cmMode: 'coffeescript', ext: 'coffee', badge: 'lang-coffeescript' },
  { value: 'toml', label: 'TOML', cmMode: 'toml', ext: 'toml', badge: 'lang-toml' },
  { value: 'ini', label: 'INI', cmMode: 'properties', ext: 'ini', badge: 'lang-ini' },
  { value: 'graphql', label: 'GraphQL', cmMode: 'javascript', ext: 'graphql', badge: 'lang-graphql' },
  { value: 'nginx', label: 'Nginx Conf', cmMode: 'nginx', ext: 'conf', badge: 'lang-nginx' },
  { value: 'vb', label: 'Visual Basic', cmMode: 'vb', ext: 'vb', badge: 'lang-vb' },
  { value: 'fortran', label: 'Fortran', cmMode: 'fortran', ext: 'f90', badge: 'lang-fortran' },
  { value: 'erlang', label: 'Erlang', cmMode: 'erlang', ext: 'erl', badge: 'lang-erlang' },
  { value: 'julia', label: 'Julia', cmMode: 'julia', ext: 'jl', badge: 'lang-julia' },
  { value: 'elm', label: 'Elm', cmMode: 'elm', ext: 'elm', badge: 'lang-elm' },
  { value: 'cmake', label: 'CMake', cmMode: 'cmake', ext: 'cmake', badge: 'lang-cmake' },
  { value: 'diff', label: 'Diff / Patch', cmMode: 'diff', ext: 'diff', badge: 'lang-diff' },
  { value: 'protobuf', label: 'Protocol Buffers', cmMode: 'protobuf', ext: 'proto', badge: 'lang-protobuf' },
  { value: 'tcl', label: 'Tcl', cmMode: 'tcl', ext: 'tcl', badge: 'lang-tcl' },
  { value: 'pascal', label: 'Pascal', cmMode: 'pascal', ext: 'pas', badge: 'lang-pascal' },
  { value: 'plaintext', label: 'Plain Text', cmMode: null, ext: 'txt', badge: 'lang-plaintext' }
];

const LANGUAGE_MAP = Object.fromEntries(LANGUAGES.map(l => [l.value, l]));

const FOLDER_COLORS = ['#539bf5', '#57ab5a', '#c69026', '#e5534b', '#986ee2', '#e370c6', '#39c5cf', '#768390'];

const LICENSE_LABELS = {
  none: 'No License', mit: 'MIT', 'apache-2.0': 'Apache 2.0', 'gpl-3.0': 'GPL v3.0',
  'bsd-3': 'BSD 3-Clause', 'mpl-2.0': 'MPL 2.0', unlicense: 'Unlicense', 'cc0-1.0': 'CC0 1.0'
};

const SAMPLE_COMMENT_AUTHORS = ['You'];

/* =============================================================================
   SECTION 2: UTILITY FUNCTIONS
   ============================================================================= */

const Utils = {
  uid(prefix = 'id') {
    return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 9)}`;
  },
  nowISO() {
    return new Date().toISOString();
  },
  formatDate(iso) {
    if (!iso) return '—';
    const d = new Date(iso);
    const now = new Date();
    const diffMs = now - d;
    const diffMin = Math.floor(diffMs / 60000);
    const diffHr = Math.floor(diffMin / 60);
    const diffDay = Math.floor(diffHr / 24);
    if (diffMin < 1) return 'just now';
    if (diffMin < 60) return `${diffMin}m ago`;
    if (diffHr < 24) return `${diffHr}h ago`;
    if (diffDay < 7) return `${diffDay}d ago`;
    return d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
  },
  formatFullDate(iso) {
    if (!iso) return '—';
    return new Date(iso).toLocaleString(undefined, {
      year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
    });
  },
  escapeHtml(str) {
    if (str == null) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  },
  debounce(fn, wait) {
    let t = null;
    return function debounced(...args) {
      clearTimeout(t);
      t = setTimeout(() => fn.apply(this, args), wait);
    };
  },
  throttle(fn, wait) {
    let last = 0;
    return function throttled(...args) {
      const now = Date.now();
      if (now - last >= wait) { last = now; fn.apply(this, args); }
    };
  },
  parseTags(raw) {
    if (!raw) return [];
    return [...new Set(raw.split(',').map(t => t.trim().toLowerCase()).filter(Boolean))];
  },
  downloadTextFile(filename, content) {
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = filename;
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  },
  downloadJSON(filename, obj) {
    this.downloadTextFile(filename, JSON.stringify(obj, null, 2));
  },
  async copyToClipboard(text) {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        return true;
      }
    } catch (e) { /* fall through to legacy */ }
    try {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.focus(); ta.select();
      const ok = document.execCommand('copy');
      document.body.removeChild(ta);
      return ok;
    } catch (e) { return false; }
  },
  firstNLines(code, n) {
    return (code || '').split('\n').slice(0, n).join('\n');
  },
  langMeta(value) {
    return LANGUAGE_MAP[value] || { value, label: value || 'Text', cmMode: null, ext: 'txt', badge: 'lang-default' };
  },
  slugify(str) {
    return (str || 'untitled').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || 'untitled';
  },
  highlightMatches(text, query) {
    if (!query) return this.escapeHtml(text);
    const escaped = this.escapeHtml(text);
    const escQuery = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    try {
      return escaped.replace(new RegExp(`(${escQuery})`, 'ig'), '<mark class="search-highlight">$1</mark>');
    } catch (e) { return escaped; }
  },
  clamp(val, min, max) { return Math.max(min, Math.min(max, val)); },
  isMac() { return /Mac|iPod|iPhone|iPad/.test(navigator.platform); },

  /**
   * CDN resources (CodeMirror, highlight.js, Sortable.js) may occasionally fail to load
   * (offline usage, ad-blockers, restricted networks). This factory produces a minimal
   * CodeMirror-compatible facade backed by a plain <textarea> so the rest of the app
   * (save/load/copy/word-wrap/fullscreen) keeps working without syntax highlighting.
   */
  makeFallbackEditor(textarea, opts = {}) {
    textarea.classList.add('plain-code-fallback');
    textarea.style.display = 'block';
    if (opts.readOnly) textarea.setAttribute('readonly', 'readonly');
    const listeners = { change: [] };
    textarea.addEventListener('input', () => listeners.change.forEach(fn => fn()));
    const wrapperDiv = document.createElement('div');
    wrapperDiv.className = 'plain-code-fallback-wrapper';
    textarea.parentNode.insertBefore(wrapperDiv, textarea);
    wrapperDiv.appendChild(textarea);
    return {
      _isFallback: true,
      _textarea: textarea,
      getValue: () => textarea.value,
      setValue: (v) => { textarea.value = v || ''; listeners.change.forEach(fn => fn()); },
      setOption: (name, value) => {
        if (name === 'lineWrapping') textarea.style.whiteSpace = value ? 'pre-wrap' : 'pre';
        if (name === 'theme') textarea.style.background = value === 'eclipse' ? '#f6f8fa' : '';
      },
      on: (evt, fn) => { if (listeners[evt]) listeners[evt].push(fn); },
      refresh: () => {},
      focus: () => textarea.focus(),
      lineCount: () => textarea.value.split('\n').length,
      operation: (fn) => fn(),
      indentLine: () => {},
      getWrapperElement: () => wrapperDiv
    };
  }
};

/* =============================================================================
   SECTION 3: DATA STORE (localStorage backed)
   ============================================================================= */

class Store {
  constructor() {
    this.data = this.load();
  }

  defaultData() {
    return {
      snippets: [],
      folders: [],
      tags: [],
      collections: [],
      trash: [],
      settings: {
        editorTheme: 'dark',
        wordWrap: true,
        lineNumbers: true,
        viewMode: 'grid',
        recentlyViewed: [],
        recentSearches: [],
        starredCollapsed: false
      }
    };
  }

  load() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        const seeded = this.seedData();
        localStorage.setItem(STORAGE_KEY, JSON.stringify(seeded));
        return seeded;
      }
      const parsed = JSON.parse(raw);
      // Defensive merge in case of older schema versions
      const base = this.defaultData();
      return {
        snippets: parsed.snippets || base.snippets,
        folders: parsed.folders || base.folders,
        tags: parsed.tags || base.tags,
        collections: parsed.collections || base.collections,
        trash: parsed.trash || base.trash,
        settings: { ...base.settings, ...(parsed.settings || {}) }
      };
    } catch (e) {
      console.error('CodeVault: failed to load data, resetting.', e);
      const seeded = this.seedData();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(seeded));
      return seeded;
    }
  }

  save() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.data));
    } catch (e) {
      console.error('CodeVault: failed to persist data', e);
      if (window.ToastManager) ToastManager.show('error', 'Storage error', 'Could not save changes to localStorage.');
    }
  }

  seedData() {
    const base = this.defaultData();
    const now = Date.now();
    const iso = (offsetDays) => new Date(now - offsetDays * 86400000).toISOString();

    const folders = [
      { id: 'fld_utils', name: 'Utility Functions', parentId: null, color: FOLDER_COLORS[0], createdAt: iso(40) },
      { id: 'fld_react', name: 'React Hooks', parentId: null, color: FOLDER_COLORS[4], createdAt: iso(35) },
      { id: 'fld_react_forms', name: 'Forms', parentId: 'fld_react', color: FOLDER_COLORS[2], createdAt: iso(20) },
      { id: 'fld_backend', name: 'Backend Recipes', parentId: null, color: FOLDER_COLORS[1], createdAt: iso(30) },
      { id: 'fld_devops', name: 'DevOps', parentId: null, color: FOLDER_COLORS[5], createdAt: iso(15) }
    ];

    const snippets = [
      {
        id: 'snp_debounce', title: 'Debounce Function', language: 'javascript',
        description: 'A classic debounce utility to limit how often a function can fire. Useful for search inputs, resize handlers, and scroll listeners.',
        code: `function debounce(fn, wait = 250) {\n  let timeoutId = null;\n  return function debounced(...args) {\n    clearTimeout(timeoutId);\n    timeoutId = setTimeout(() => fn.apply(this, args), wait);\n  };\n}\n\n// Usage\nconst onResize = debounce(() => {\n  console.log('resized!');\n}, 200);\nwindow.addEventListener('resize', onResize);`,
        tags: ['utility', 'performance', 'dom'], folderId: 'fld_utils', visibility: 'public', license: 'mit',
        starred: true, pinned: true, views: 128, copies: 34, createdAt: iso(38), updatedAt: iso(2),
        versions: [], order: 0
      },
      {
        id: 'snp_throttle', title: 'Throttle Function', language: 'javascript',
        description: 'Throttle ensures a function is invoked at most once per interval, great for scroll or mousemove handlers.',
        code: `function throttle(fn, limit = 200) {\n  let inThrottle = false;\n  return function throttled(...args) {\n    if (!inThrottle) {\n      fn.apply(this, args);\n      inThrottle = true;\n      setTimeout(() => (inThrottle = false), limit);\n    }\n  };\n}`,
        tags: ['utility', 'performance'], folderId: 'fld_utils', visibility: 'public', license: 'mit',
        starred: false, pinned: false, views: 76, copies: 20, createdAt: iso(33), updatedAt: iso(10),
        versions: [], order: 1
      },
      {
        id: 'snp_usefetch', title: 'useFetch Hook', language: 'typescript',
        description: 'A reusable React hook that fetches data with loading and error state handling built-in.',
        code: `import { useState, useEffect } from 'react';\n\nfunction useFetch<T>(url: string) {\n  const [data, setData] = useState<T | null>(null);\n  const [loading, setLoading] = useState(true);\n  const [error, setError] = useState<Error | null>(null);\n\n  useEffect(() => {\n    let cancelled = false;\n    setLoading(true);\n    fetch(url)\n      .then((res) => res.json())\n      .then((json) => { if (!cancelled) setData(json); })\n      .catch((err) => { if (!cancelled) setError(err); })\n      .finally(() => { if (!cancelled) setLoading(false); });\n    return () => { cancelled = true; };\n  }, [url]);\n\n  return { data, loading, error };\n}\n\nexport default useFetch;`,
        tags: ['react', 'hooks', 'typescript'], folderId: 'fld_react', visibility: 'public', license: 'mit',
        starred: true, pinned: false, views: 210, copies: 58, createdAt: iso(28), updatedAt: iso(1),
        versions: [], order: 0
      },
      {
        id: 'snp_formvalidation', title: 'React Form Validation Hook', language: 'jsx',
        description: 'Lightweight custom hook for controlled form state and validation without external dependencies.',
        code: `import { useState } from 'react';\n\nfunction useForm(initialValues, validate) {\n  const [values, setValues] = useState(initialValues);\n  const [errors, setErrors] = useState({});\n\n  function handleChange(e) {\n    const { name, value } = e.target;\n    setValues((prev) => ({ ...prev, [name]: value }));\n  }\n\n  function handleSubmit(onSubmit) {\n    return (e) => {\n      e.preventDefault();\n      const validationErrors = validate(values);\n      setErrors(validationErrors);\n      if (Object.keys(validationErrors).length === 0) onSubmit(values);\n    };\n  }\n\n  return { values, errors, handleChange, handleSubmit };\n}\n\nexport default useForm;`,
        tags: ['react', 'forms', 'validation'], folderId: 'fld_react_forms', visibility: 'public', license: 'mit',
        starred: false, pinned: false, views: 64, copies: 12, createdAt: iso(18), updatedAt: iso(4),
        versions: [], order: 0
      },
      {
        id: 'snp_flaskapi', title: 'Flask REST Endpoint', language: 'python',
        description: 'A minimal Flask endpoint demonstrating JSON responses and basic error handling.',
        code: `from flask import Flask, jsonify, request\n\napp = Flask(__name__)\nitems = []\n\n@app.route('/items', methods=['GET', 'POST'])\ndef items_endpoint():\n    if request.method == 'POST':\n        data = request.get_json()\n        items.append(data)\n        return jsonify(data), 201\n    return jsonify(items)\n\nif __name__ == '__main__':\n    app.run(debug=True)`,
        tags: ['python', 'flask', 'api'], folderId: 'fld_backend', visibility: 'public', license: 'apache-2.0',
        starred: true, pinned: false, views: 189, copies: 41, createdAt: iso(29), updatedAt: iso(6),
        versions: [], order: 0
      },
      {
        id: 'snp_dockerfile_node', title: 'Node.js Dockerfile', language: 'dockerfile',
        description: 'Production-ready multi-stage Dockerfile for a Node.js application.',
        code: `FROM node:20-alpine AS builder\nWORKDIR /app\nCOPY package*.json ./\nRUN npm ci\nCOPY . .\nRUN npm run build\n\nFROM node:20-alpine\nWORKDIR /app\nCOPY --from=builder /app/dist ./dist\nCOPY --from=builder /app/node_modules ./node_modules\nCOPY package.json .\nEXPOSE 3000\nCMD ["node", "dist/index.js"]`,
        tags: ['docker', 'devops', 'node'], folderId: 'fld_devops', visibility: 'public', license: 'none',
        starred: false, pinned: false, views: 143, copies: 37, createdAt: iso(14), updatedAt: iso(3),
        versions: [], order: 0
      },
      {
        id: 'snp_gha_ci', title: 'GitHub Actions CI Workflow', language: 'yaml',
        description: 'A CI workflow that installs dependencies, lints, and runs tests on every push.',
        code: `name: CI\non: [push, pull_request]\njobs:\n  build:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - uses: actions/setup-node@v4\n        with:\n          node-version: 20\n      - run: npm ci\n      - run: npm run lint\n      - run: npm test`,
        tags: ['ci', 'github-actions', 'devops'], folderId: 'fld_devops', visibility: 'public', license: 'none',
        starred: false, pinned: false, views: 97, copies: 22, createdAt: iso(12), updatedAt: iso(12),
        versions: [], order: 1
      },
      {
        id: 'snp_binarysearch', title: 'Binary Search Algorithm', language: 'cpp',
        description: 'Iterative binary search implementation with O(log n) time complexity.',
        code: `#include <vector>\nusing namespace std;\n\nint binarySearch(const vector<int>& arr, int target) {\n    int lo = 0, hi = (int)arr.size() - 1;\n    while (lo <= hi) {\n        int mid = lo + (hi - lo) / 2;\n        if (arr[mid] == target) return mid;\n        if (arr[mid] < target) lo = mid + 1;\n        else hi = mid - 1;\n    }\n    return -1;\n}`,
        tags: ['algorithms', 'cpp', 'search'], folderId: null, visibility: 'public', license: 'mit',
        starred: true, pinned: false, views: 301, copies: 89, createdAt: iso(50), updatedAt: iso(20),
        versions: [], order: 0
      },
      {
        id: 'snp_gorest', title: 'Go HTTP Server', language: 'go',
        description: 'Minimal net/http server with a JSON health check endpoint.',
        code: `package main\n\nimport (\n\t"encoding/json"\n\t"net/http"\n)\n\nfunc healthHandler(w http.ResponseWriter, r *http.Request) {\n\tw.Header().Set("Content-Type", "application/json")\n\tjson.NewEncoder(w).Encode(map[string]string{"status": "ok"})\n}\n\nfunc main() {\n\thttp.HandleFunc("/health", healthHandler)\n\thttp.ListenAndServe(":8080", nil)\n}`,
        tags: ['go', 'http', 'backend'], folderId: 'fld_backend', visibility: 'private', license: 'mit',
        starred: false, pinned: false, views: 54, copies: 9, createdAt: iso(9), updatedAt: iso(9),
        versions: [], order: 1
      },
      {
        id: 'snp_cssgrid', title: 'Responsive CSS Grid Layout', language: 'css',
        description: 'A responsive auto-fill grid pattern that adapts to container width without media queries.',
        code: `.grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));\n  gap: 16px;\n}\n\n.grid > * {\n  min-width: 0;\n}`,
        tags: ['css', 'layout', 'responsive'], folderId: null, visibility: 'public', license: 'cc0-1.0',
        starred: false, pinned: false, views: 220, copies: 65, createdAt: iso(45), updatedAt: iso(45),
        versions: [], order: 1
      },
      {
        id: 'snp_rustfib', title: 'Fibonacci in Rust', language: 'rust',
        description: 'Memoized fibonacci sequence generator using a HashMap cache.',
        code: `use std::collections::HashMap;\n\nfn fib(n: u64, memo: &mut HashMap<u64, u64>) -> u64 {\n    if n <= 1 { return n; }\n    if let Some(&v) = memo.get(&n) { return v; }\n    let result = fib(n - 1, memo) + fib(n - 2, memo);\n    memo.insert(n, result);\n    result\n}\n\nfn main() {\n    let mut memo = HashMap::new();\n    println!("{}", fib(30, &mut memo));\n}`,
        tags: ['rust', 'algorithms'], folderId: null, visibility: 'public', license: 'mit',
        starred: false, pinned: false, views: 38, copies: 6, createdAt: iso(7), updatedAt: iso(7),
        versions: [], order: 2
      },
      {
        id: 'snp_sqljoin', title: 'SQL Multi-table Join', language: 'sql',
        description: 'An example query joining orders, customers, and products tables with aggregation.',
        code: `SELECT c.name, COUNT(o.id) AS order_count, SUM(oi.quantity * p.price) AS total_spent\nFROM customers c\nJOIN orders o ON o.customer_id = c.id\nJOIN order_items oi ON oi.order_id = o.id\nJOIN products p ON p.id = oi.product_id\nGROUP BY c.name\nORDER BY total_spent DESC;`,
        tags: ['sql', 'database'], folderId: 'fld_backend', visibility: 'public', license: 'none',
        starred: false, pinned: false, views: 112, copies: 27, createdAt: iso(22), updatedAt: iso(5),
        versions: [], order: 2
      }
    ];

    const tags = [...new Set(snippets.flatMap(s => s.tags))].map(name => ({ name }));

    const collections = [
      { id: 'col_interview', name: 'Interview Prep', description: 'Algorithms and data structure snippets for interviews.', snippetIds: ['snp_binarysearch', 'snp_rustfib'], createdAt: iso(10) }
    ];

    return { ...base, snippets, folders, tags, collections, trash: [] };
  }

  /* ---------- Generic getters ---------- */
  getSnippets() { return this.data.snippets; }
  getFolders() { return this.data.folders; }
  getTags() { return this.data.tags; }
  getCollections() { return this.data.collections; }
  getTrash() { return this.data.trash; }
  getSettings() { return this.data.settings; }

  getSnippetById(id) { return this.data.snippets.find(s => s.id === id) || null; }
  getFolderById(id) { return this.data.folders.find(f => f.id === id) || null; }

  getFolderChildren(parentId) {
    return this.data.folders.filter(f => (f.parentId || null) === (parentId || null));
  }
  getSnippetsInFolder(parentId) {
    return this.data.snippets.filter(s => (s.folderId || null) === (parentId || null));
  }
  getFolderPath(folderId) {
    const path = [];
    let cur = folderId ? this.getFolderById(folderId) : null;
    while (cur) {
      path.unshift(cur);
      cur = cur.parentId ? this.getFolderById(cur.parentId) : null;
    }
    return path;
  }
  /** Returns true if targetId is folderId or a descendant of folderId (prevents illegal nesting) */
  isDescendantFolder(folderId, targetId) {
    let cur = this.getFolderById(targetId);
    while (cur) {
      if (cur.id === folderId) return true;
      cur = cur.parentId ? this.getFolderById(cur.parentId) : null;
    }
    return false;
  }

  /* ---------- Snippet CRUD ---------- */
  createSnippet(payload) {
    const now = Utils.nowISO();
    const snippet = {
      id: Utils.uid('snp'),
      title: payload.title || 'Untitled Snippet',
      language: payload.language || 'plaintext',
      description: payload.description || '',
      code: payload.code || '',
      tags: payload.tags || [],
      folderId: payload.folderId || null,
      visibility: payload.visibility || 'public',
      license: payload.license || 'none',
      starred: false,
      pinned: false,
      views: 0,
      copies: 0,
      createdAt: now,
      updatedAt: now,
      versions: [],
      order: this.data.snippets.length
    };
    this.data.snippets.push(snippet);
    this.registerTags(snippet.tags);
    this.save();
    return snippet;
  }

  updateSnippet(id, patch, { trackVersion = true } = {}) {
    const snippet = this.getSnippetById(id);
    if (!snippet) return null;
    if (trackVersion && patch.code !== undefined && patch.code !== snippet.code) {
      snippet.versions = snippet.versions || [];
      snippet.versions.unshift({ code: snippet.code, savedAt: snippet.updatedAt });
      snippet.versions = snippet.versions.slice(0, MAX_VERSION_HISTORY);
    }
    Object.assign(snippet, patch, { updatedAt: Utils.nowISO() });
    if (patch.tags) this.registerTags(patch.tags);
    this.save();
    return snippet;
  }

  deleteSnippet(id, { toTrash = true } = {}) {
    const idx = this.data.snippets.findIndex(s => s.id === id);
    if (idx === -1) return false;
    const [removed] = this.data.snippets.splice(idx, 1);
    if (toTrash) {
      this.data.trash.push({ type: 'snippet', item: removed, deletedAt: Utils.nowISO() });
    }
    this.save();
    return true;
  }

  duplicateSnippet(id) {
    const snippet = this.getSnippetById(id);
    if (!snippet) return null;
    const copy = {
      ...JSON.parse(JSON.stringify(snippet)),
      id: Utils.uid('snp'),
      title: `${snippet.title} (copy)`,
      starred: false,
      pinned: false,
      views: 0,
      copies: 0,
      createdAt: Utils.nowISO(),
      updatedAt: Utils.nowISO(),
      versions: []
    };
    this.data.snippets.push(copy);
    this.save();
    return copy;
  }

  toggleStar(id) {
    const s = this.getSnippetById(id);
    if (!s) return null;
    s.starred = !s.starred;
    this.save();
    return s;
  }
  togglePin(id) {
    const s = this.getSnippetById(id);
    if (!s) return null;
    s.pinned = !s.pinned;
    this.save();
    return s;
  }
  incrementViews(id) {
    const s = this.getSnippetById(id);
    if (!s) return;
    s.views = (s.views || 0) + 1;
    this.save();
  }
  incrementCopies(id) {
    const s = this.getSnippetById(id);
    if (!s) return;
    s.copies = (s.copies || 0) + 1;
    this.save();
  }
  moveSnippetToFolder(id, folderId) {
    const s = this.getSnippetById(id);
    if (!s) return null;
    s.folderId = folderId || null;
    s.updatedAt = Utils.nowISO();
    this.save();
    return s;
  }
  reorderSnippets(orderedIds) {
    orderedIds.forEach((id, i) => {
      const s = this.getSnippetById(id);
      if (s) s.order = i;
    });
    this.save();
  }

  /* ---------- Folder CRUD ---------- */
  createFolder(name, parentId = null, color = FOLDER_COLORS[0]) {
    const folder = { id: Utils.uid('fld'), name, parentId: parentId || null, color, createdAt: Utils.nowISO() };
    this.data.folders.push(folder);
    this.save();
    return folder;
  }
  renameFolder(id, name) {
    const f = this.getFolderById(id);
    if (!f) return null;
    f.name = name;
    this.save();
    return f;
  }
  deleteFolder(id, { toTrash = true } = {}) {
    const f = this.getFolderById(id);
    if (!f) return false;
    // Recursively collect descendant folders
    const allFolderIds = [id, ...this.collectDescendantFolderIds(id)];
    const affectedSnippets = this.data.snippets.filter(s => allFolderIds.includes(s.folderId));
    affectedSnippets.forEach(s => { s.folderId = null; });
    this.data.folders = this.data.folders.filter(fo => !allFolderIds.includes(fo.id));
    if (toTrash) this.data.trash.push({ type: 'folder', item: f, deletedAt: Utils.nowISO() });
    this.save();
    return true;
  }
  collectDescendantFolderIds(id) {
    const children = this.data.folders.filter(f => f.parentId === id);
    return children.flatMap(c => [c.id, ...this.collectDescendantFolderIds(c.id)]);
  }
  moveFolderToFolder(id, parentId) {
    const f = this.getFolderById(id);
    if (!f) return null;
    if (id === parentId || this.isDescendantFolder(id, parentId)) return null; // prevent circular nesting
    f.parentId = parentId || null;
    this.save();
    return f;
  }

  /* ---------- Collections ---------- */
  createCollection(name, description = '') {
    const col = { id: Utils.uid('col'), name, description, snippetIds: [], createdAt: Utils.nowISO() };
    this.data.collections.push(col);
    this.save();
    return col;
  }
  addToCollection(collectionId, snippetId) {
    const col = this.data.collections.find(c => c.id === collectionId);
    if (!col) return;
    if (!col.snippetIds.includes(snippetId)) col.snippetIds.push(snippetId);
    this.save();
  }

  /* ---------- Trash ---------- */
  restoreFromTrash(trashEntryIndex) {
    const entry = this.data.trash[trashEntryIndex];
    if (!entry) return false;
    if (entry.type === 'snippet') this.data.snippets.push(entry.item);
    if (entry.type === 'folder') this.data.folders.push(entry.item);
    this.data.trash.splice(trashEntryIndex, 1);
    this.save();
    return true;
  }
  removeFromTrashPermanently(trashEntryIndex) {
    this.data.trash.splice(trashEntryIndex, 1);
    this.save();
  }
  emptyTrash() {
    this.data.trash = [];
    this.save();
  }

  /* ---------- Tags ---------- */
  registerTags(tagNames) {
    tagNames.forEach(name => {
      if (!this.data.tags.some(t => t.name === name)) this.data.tags.push({ name });
    });
    this.save();
  }
  allTagNames() {
    const fromSnippets = new Set(this.data.snippets.flatMap(s => s.tags || []));
    this.data.tags.forEach(t => fromSnippets.add(t.name));
    return [...fromSnippets].sort();
  }

  /* ---------- Settings & recents ---------- */
  updateSettings(patch) {
    Object.assign(this.data.settings, patch);
    this.save();
  }
  addRecentlyViewed(id) {
    let list = this.data.settings.recentlyViewed || [];
    list = [id, ...list.filter(x => x !== id)].slice(0, MAX_RECENTLY_VIEWED);
    this.data.settings.recentlyViewed = list;
    this.save();
  }
  clearRecentlyViewed() {
    this.data.settings.recentlyViewed = [];
    this.save();
  }
  addRecentSearch(query) {
    if (!query || !query.trim()) return;
    let list = this.data.settings.recentSearches || [];
    list = [query, ...list.filter(x => x.toLowerCase() !== query.toLowerCase())].slice(0, MAX_RECENT_SEARCHES);
    this.data.settings.recentSearches = list;
    this.save();
  }

  /* ---------- Stats ---------- */
  computeStats() {
    const snippets = this.data.snippets;
    const languages = new Set(snippets.map(s => s.language));
    const totalCopies = snippets.reduce((sum, s) => sum + (s.copies || 0), 0);
    return {
      totalSnippets: snippets.length,
      totalFolders: this.data.folders.length,
      totalLanguages: languages.size,
      totalStarred: snippets.filter(s => s.starred).length,
      totalCopies
    };
  }
  languageBreakdown() {
    const counts = {};
    this.data.snippets.forEach(s => { counts[s.language] = (counts[s.language] || 0) + 1; });
    return Object.entries(counts)
      .map(([lang, count]) => ({ lang, count }))
      .sort((a, b) => b.count - a.count);
  }

  /* ---------- Import / Export ---------- */
  exportAll() {
    return {
      exportedAt: Utils.nowISO(),
      app: 'CodeVault',
      version: 1,
      ...this.data
    };
  }
  importData(json) {
    let imported = 0;
    if (Array.isArray(json.folders)) {
      json.folders.forEach(f => {
        if (!this.getFolderById(f.id)) { this.data.folders.push(f); }
      });
    }
    if (Array.isArray(json.snippets)) {
      json.snippets.forEach(s => {
        const clone = { ...s, id: Utils.uid('snp') };
        this.data.snippets.push(clone);
        imported++;
      });
    }
    this.save();
    return imported;
  }

  /* ---------- Comments (per-snippet, localStorage) ---------- */
  getComments(snippetId) {
    try {
      const raw = localStorage.getItem(`codevault_comments_${snippetId}`);
      return raw ? JSON.parse(raw) : [];
    } catch (e) { return []; }
  }
  addComment(snippetId, text) {
    const comments = this.getComments(snippetId);
    comments.push({ id: Utils.uid('cmt'), author: 'You', text, createdAt: Utils.nowISO() });
    localStorage.setItem(`codevault_comments_${snippetId}`, JSON.stringify(comments));
    return comments;
  }
  deleteComment(snippetId, commentId) {
    let comments = this.getComments(snippetId);
    comments = comments.filter(c => c.id !== commentId);
    localStorage.setItem(`codevault_comments_${snippetId}`, JSON.stringify(comments));
    return comments;
  }
}

/* =============================================================================
   SECTION 4: TOAST NOTIFICATION MANAGER
   ============================================================================= */

const ToastManager = {
  container: null,
  init() { this.container = document.getElementById('toast-container'); },
  icons: { success: 'fa-circle-check', error: 'fa-circle-xmark', warning: 'fa-triangle-exclamation', info: 'fa-circle-info' },
  show(type, title, message) {
    if (!this.container) this.init();
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.setAttribute('role', 'status');
    toast.innerHTML = `
      <i class="fa-solid ${this.icons[type] || this.icons.info} toast-icon"></i>
      <div class="toast-body">
        <div class="toast-title">${Utils.escapeHtml(title)}</div>
        ${message ? `<div class="toast-msg">${Utils.escapeHtml(message)}</div>` : ''}
      </div>
      <button class="toast-close" aria-label="Dismiss notification"><i class="fa-solid fa-xmark"></i></button>
    `;
    this.container.appendChild(toast);
    const remove = () => {
      toast.classList.add('leaving');
      setTimeout(() => toast.remove(), 250);
    };
    toast.querySelector('.toast-close').addEventListener('click', remove);
    const timer = setTimeout(remove, TOAST_DURATION_MS);
    toast.addEventListener('mouseenter', () => clearTimeout(timer));
    return toast;
  },
  success(title, msg) { return this.show('success', title, msg); },
  error(title, msg) { return this.show('error', title, msg); },
  warning(title, msg) { return this.show('warning', title, msg); },
  info(title, msg) { return this.show('info', title, msg); }
};

/* =============================================================================
   SECTION 5: MODAL MANAGER (generic confirm dialog + backdrop helpers)
   ============================================================================= */

const ModalManager = {
  openStack: [],

  open(backdropEl) {
    backdropEl.classList.remove('hidden');
    document.body.classList.add('no-scroll');
    this.openStack.push(backdropEl);
  },
  close(backdropEl) {
    backdropEl.classList.add('hidden');
    this.openStack = this.openStack.filter(el => el !== backdropEl);
    if (this.openStack.length === 0) document.body.classList.remove('no-scroll');
  },
  closeTop() {
    const top = this.openStack[this.openStack.length - 1];
    if (top) this.close(top);
  },

  confirm({ title = 'Are you sure?', message = 'This action cannot be undone.', okText = 'Confirm', danger = true } = {}) {
    return new Promise((resolve) => {
      const backdrop = document.getElementById('confirmModalBackdrop');
      document.getElementById('confirmModalHeading').textContent = title;
      document.getElementById('confirmModalMessage').textContent = message;
      const okBtn = document.getElementById('confirmOkBtn');
      const cancelBtn = document.getElementById('confirmCancelBtn');
      okBtn.textContent = okText;
      okBtn.className = danger ? 'btn btn-danger' : 'btn btn-primary';

      const cleanup = (result) => {
        okBtn.removeEventListener('click', onOk);
        cancelBtn.removeEventListener('click', onCancel);
        this.close(backdrop);
        resolve(result);
      };
      const onOk = () => cleanup(true);
      const onCancel = () => cleanup(false);
      okBtn.addEventListener('click', onOk);
      cancelBtn.addEventListener('click', onCancel);
      this.open(backdrop);
      okBtn.focus();
    });
  }
};

/* =============================================================================
   SECTION 6: HASH ROUTER
   ============================================================================= */

class Router {
  constructor() {
    this.routes = {};
    this.currentRoute = 'home';
    window.addEventListener('hashchange', () => this.handleHashChange());
  }
  register(name, handler) { this.routes[name] = handler; }
  navigate(name, params = {}) {
    const query = Object.keys(params).length ? '?' + new URLSearchParams(params).toString() : '';
    window.location.hash = `/${name}${query}`;
  }
  handleHashChange() {
    const hash = window.location.hash.replace(/^#\/?/, '');
    // Deep-link support for shared snippet URLs: #/view/<snippetId>
    if (hash.startsWith('view/')) {
      const snippetId = hash.slice('view/'.length).split('?')[0];
      this.currentRoute = 'home';
      this.showView('home');
      if (this.routes['home']) this.routes['home']({});
      if (window.CodeVaultApp) window.CodeVaultApp.openViewer(snippetId);
      return;
    }
    const [routeName, queryStr] = hash.split('?');
    const VALID_ROUTES = ['home', 'explorer', 'starred', 'recents', 'trash', 'search'];
    const name = VALID_ROUTES.includes(routeName) ? routeName : 'home';
    const params = Object.fromEntries(new URLSearchParams(queryStr || ''));
    this.currentRoute = name;
    this.showView(name);
    if (this.routes[name]) this.routes[name](params);
    else if (this.routes['home']) this.routes['home'](params);
  }
  showView(name) {
    document.querySelectorAll('.view').forEach(v => v.classList.add('hidden'));
    const target = document.getElementById(`view-${name}`) || document.getElementById('view-home');
    target.classList.remove('hidden');
    document.querySelectorAll('.nav-link').forEach(link => {
      link.classList.toggle('active', link.dataset.route === name);
    });
  }
  init() {
    if (!window.location.hash) window.location.hash = '#/home';
    this.handleHashChange();
  }
}

/* =============================================================================
   SECTION 7: CARD RENDERING (snippet cards & folder cards)
   ============================================================================= */

const CardRenderer = {
  /** Renders a snippet card element. options: { selectable, highlightQuery, showFolderTag } */
  renderSnippetCard(snippet, options = {}) {
    const lang = Utils.langMeta(snippet.language);
    const el = document.createElement('div');
    el.className = 'snippet-card';
    el.dataset.id = snippet.id;
    el.dataset.type = 'snippet';
    if (snippet.pinned) el.classList.add('pinned');
    el.setAttribute('tabindex', '0');
    el.setAttribute('role', 'button');
    el.setAttribute('aria-label', `Open snippet ${snippet.title}`);

    const q = options.highlightQuery || '';
    const titleHtml = q ? Utils.highlightMatches(snippet.title, q) : Utils.escapeHtml(snippet.title);
    const descHtml = q ? Utils.highlightMatches(snippet.description || '', q) : Utils.escapeHtml(snippet.description || '');
    const previewCode = Utils.escapeHtml(Utils.firstNLines(snippet.code, 5));

    el.innerHTML = `
      <input type="checkbox" class="card-select-box" aria-label="Select ${Utils.escapeHtml(snippet.title)}">
      <div class="card-top-row">
        <span class="lang-badge ${lang.badge}">${Utils.escapeHtml(lang.label)}</span>
        <button class="card-copy-quick" title="Copy code" aria-label="Copy code"><i class="fa-solid fa-copy"></i></button>
      </div>
      <div class="card-title">${snippet.starred ? '<i class="fa-solid fa-star"></i>' : ''}${titleHtml}</div>
      <div class="card-desc">${descHtml || '<em>No description provided.</em>'}</div>
      <div class="card-tags">${(snippet.tags || []).slice(0, 5).map(t => `<span class="card-tag">#${Utils.escapeHtml(t)}</span>`).join('')}</div>
      <div class="card-expand-region">
        <div class="card-code-preview"><pre><code class="language-${lang.value}">${previewCode}</code></pre></div>
        <div class="card-actions">
          <button class="card-action-btn act-edit" title="Edit"><i class="fa-solid fa-pen"></i></button>
          <button class="card-action-btn act-star ${snippet.starred ? 'star-active' : ''}" title="${snippet.starred ? 'Unstar' : 'Star'}"><i class="fa-${snippet.starred ? 'solid' : 'regular'} fa-star"></i></button>
          <button class="card-action-btn act-copy" title="Copy"><i class="fa-solid fa-copy"></i></button>
          <button class="card-action-btn act-share" title="Share"><i class="fa-solid fa-share-nodes"></i></button>
          <button class="card-action-btn danger act-delete" title="Delete"><i class="fa-solid fa-trash"></i></button>
        </div>
      </div>
      <div class="card-meta-row">
        <span class="stat-inline"><i class="fa-regular fa-clock"></i> ${Utils.formatDate(snippet.updatedAt)}</span>
        <span class="stat-inline"><i class="fa-solid fa-copy"></i> ${snippet.copies || 0}</span>
      </div>
    `;

    // Highlight code preview with highlight.js if available
    requestAnimationFrame(() => {
      const codeEl = el.querySelector('.card-code-preview code');
      if (codeEl && window.hljs) { try { hljs.highlightElement(codeEl); } catch (e) {} }
    });

    this.wireSnippetCardEvents(el, snippet, options);
    return el;
  },

  wireSnippetCardEvents(el, snippet, options) {
    const app = window.CodeVaultApp;
    el.querySelector('.card-copy-quick').addEventListener('click', (e) => {
      e.stopPropagation();
      app.copySnippetCode(snippet.id);
    });
    el.querySelector('.act-edit').addEventListener('click', (e) => { e.stopPropagation(); app.openEditor(snippet.id); });
    el.querySelector('.act-star').addEventListener('click', (e) => { e.stopPropagation(); app.toggleStar(snippet.id); });
    el.querySelector('.act-copy').addEventListener('click', (e) => { e.stopPropagation(); app.copySnippetCode(snippet.id); });
    el.querySelector('.act-share').addEventListener('click', (e) => { e.stopPropagation(); app.openShareModal(snippet.id); });
    el.querySelector('.act-delete').addEventListener('click', (e) => { e.stopPropagation(); app.deleteSnippetWithConfirm(snippet.id); });

    const selectBox = el.querySelector('.card-select-box');
    selectBox.addEventListener('click', (e) => e.stopPropagation());
    selectBox.addEventListener('change', () => {
      app.explorerState.toggleSelect(snippet.id, 'snippet', selectBox.checked);
    });

    el.addEventListener('click', (e) => {
      if (e.shiftKey || e.ctrlKey || e.metaKey) {
        e.preventDefault();
        app.explorerState.handleClickSelect(snippet.id, 'snippet', e);
        return;
      }
      app.openViewer(snippet.id);
    });
    el.addEventListener('dblclick', () => app.openViewer(snippet.id));
    el.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') app.openViewer(snippet.id);
    });
    el.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      app.contextMenu.openFor(snippet.id, 'snippet', e.clientX, e.clientY);
    });
  },

  renderFolderCard(folder, options = {}) {
    const app = window.CodeVaultApp;
    const store = app.store;
    const snippetCount = store.getSnippetsInFolder(folder.id).length;
    const subfolderCount = store.getFolderChildren(folder.id).length;
    const el = document.createElement('div');
    el.className = 'folder-card';
    el.dataset.id = folder.id;
    el.dataset.type = 'folder';
    el.setAttribute('tabindex', '0');
    el.setAttribute('role', 'button');
    el.setAttribute('aria-label', `Open folder ${folder.name}`);
    el.innerHTML = `
      <input type="checkbox" class="card-select-box" aria-label="Select ${Utils.escapeHtml(folder.name)}">
      <button class="folder-card-menu" title="More options" aria-label="More options"><i class="fa-solid fa-ellipsis"></i></button>
      <div class="folder-icon-row">
        <div class="folder-icon" style="background:${folder.color}"><i class="fa-solid fa-folder"></i></div>
        <div>
          <div class="folder-name">${Utils.escapeHtml(folder.name)}</div>
          <div class="folder-count">${snippetCount} snippet${snippetCount === 1 ? '' : 's'}${subfolderCount ? `, ${subfolderCount} subfolder${subfolderCount === 1 ? '' : 's'}` : ''}</div>
        </div>
      </div>
    `;
    el.addEventListener('click', (e) => {
      if (e.shiftKey || e.ctrlKey || e.metaKey) {
        e.preventDefault();
        app.explorerState.handleClickSelect(folder.id, 'folder', e);
        return;
      }
      app.explorerState.navigateToFolder(folder.id);
    });
    el.addEventListener('dblclick', () => app.explorerState.navigateToFolder(folder.id));
    el.addEventListener('keydown', (e) => { if (e.key === 'Enter') app.explorerState.navigateToFolder(folder.id); });
    el.querySelector('.folder-card-menu').addEventListener('click', (e) => {
      e.stopPropagation();
      const rect = e.currentTarget.getBoundingClientRect();
      app.contextMenu.openFor(folder.id, 'folder', rect.right, rect.bottom);
    });
    const selectBox = el.querySelector('.card-select-box');
    selectBox.addEventListener('click', (e) => e.stopPropagation());
    selectBox.addEventListener('change', () => app.explorerState.toggleSelect(folder.id, 'folder', selectBox.checked));
    el.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      app.contextMenu.openFor(folder.id, 'folder', e.clientX, e.clientY);
    });
    return el;
  },

  renderSkeletonCards(container, count = 6) {
    container.innerHTML = '';
    for (let i = 0; i < count; i++) {
      const sk = document.createElement('div');
      sk.className = 'skeleton-card';
      sk.innerHTML = `<div class="skeleton-line" style="width:40%"></div><div class="skeleton-line" style="width:80%"></div><div class="skeleton-line" style="width:60%"></div><div class="skeleton-line" style="width:50%"></div>`;
      container.appendChild(sk);
    }
  },

  renderEmptyState(container, { icon = 'fa-folder-open', title = 'Nothing here yet', message = '', actionLabel = '', onAction = null } = {}) {
    container.innerHTML = '';
    const wrap = document.createElement('div');
    wrap.className = 'empty-state';
    wrap.innerHTML = `
      <svg viewBox="0 0 200 160" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="30" y="40" width="140" height="90" rx="10" fill="#2d333b" stroke="#444c56" stroke-width="2"/>
        <path d="M30 60 L70 60 L80 45 L170 45" stroke="#444c56" stroke-width="2" fill="none"/>
        <circle cx="100" cy="85" r="22" fill="#22272e" stroke="#539bf5" stroke-width="2"/>
        <path d="M92 85 L98 91 L110 77" stroke="#57ab5a" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
        <circle cx="150" cy="55" r="5" fill="#c69026"/>
        <circle cx="45" cy="115" r="4" fill="#986ee2"/>
      </svg>
      <h3>${Utils.escapeHtml(title)}</h3>
      <p>${Utils.escapeHtml(message)}</p>
      ${actionLabel ? `<button class="btn btn-primary" id="emptyStateActionBtn"><i class="fa-solid fa-plus"></i> ${Utils.escapeHtml(actionLabel)}</button>` : ''}
    `;
    container.appendChild(wrap);
    container.classList.remove('hidden');
    if (actionLabel && onAction) wrap.querySelector('#emptyStateActionBtn').addEventListener('click', onAction);
  }
};

/* =============================================================================
   SECTION 8: EXPLORER STATE (selection, navigation, sort/filter, view mode)
   ============================================================================= */

class ExplorerState {
  constructor(app) {
    this.app = app;
    this.currentFolderId = null;
    this.selected = new Map(); // id -> type
    this.lastClickedId = null;
    this.viewMode = app.store.getSettings().viewMode || 'grid';
    this.sortBy = 'name-asc';
    this.langFilter = '';
    this.searchQuery = '';
    this.focusedIndex = -1;
    this.itemOrder = []; // ordered list of { id, type } currently rendered
  }

  navigateToFolder(folderId) {
    this.currentFolderId = folderId;
    this.clearSelection();
    this.app.router.navigate('explorer', folderId ? { folder: folderId } : {});
    this.app.renderExplorer();
  }

  clearSelection() {
    this.selected.clear();
    this.lastClickedId = null;
    this.app.updateBulkToolbar();
  }

  toggleSelect(id, type, checked) {
    if (checked) this.selected.set(id, type); else this.selected.delete(id);
    this.lastClickedId = id;
    this.app.renderExplorer(true);
    this.app.updateBulkToolbar();
  }

  handleClickSelect(id, type, event) {
    if (event.shiftKey && this.lastClickedId) {
      const ids = this.itemOrder.map(i => i.id);
      const a = ids.indexOf(this.lastClickedId);
      const b = ids.indexOf(id);
      if (a !== -1 && b !== -1) {
        const [start, end] = a < b ? [a, b] : [b, a];
        for (let i = start; i <= end; i++) {
          const item = this.itemOrder[i];
          this.selected.set(item.id, item.type);
        }
      }
    } else if (event.ctrlKey || event.metaKey) {
      if (this.selected.has(id)) this.selected.delete(id); else this.selected.set(id, type);
      this.lastClickedId = id;
    } else {
      this.selected.clear();
      this.selected.set(id, type);
      this.lastClickedId = id;
    }
    this.app.renderExplorer(true);
    this.app.updateBulkToolbar();
  }

  selectAll() {
    this.itemOrder.forEach(item => this.selected.set(item.id, item.type));
    this.app.renderExplorer(true);
    this.app.updateBulkToolbar();
  }

  getSelectedSnippetIds() {
    return [...this.selected.entries()].filter(([, type]) => type === 'snippet').map(([id]) => id);
  }
  getSelectedFolderIds() {
    return [...this.selected.entries()].filter(([, type]) => type === 'folder').map(([id]) => id);
  }

  sortItems(folders, snippets) {
    const [key, dir] = this.sortBy.split('-');
    const dirMul = dir === 'desc' ? -1 : 1;
    const sortedFolders = [...folders].sort((a, b) => a.name.localeCompare(b.name));
    let sortedSnippets = [...snippets];
    switch (this.sortBy) {
      case 'name-asc': sortedSnippets.sort((a, b) => a.title.localeCompare(b.title)); break;
      case 'name-desc': sortedSnippets.sort((a, b) => b.title.localeCompare(a.title)); break;
      case 'date-desc': sortedSnippets.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)); break;
      case 'date-asc': sortedSnippets.sort((a, b) => new Date(a.updatedAt) - new Date(b.updatedAt)); break;
      case 'lang': sortedSnippets.sort((a, b) => a.language.localeCompare(b.language)); break;
      case 'copies': sortedSnippets.sort((a, b) => (b.copies || 0) - (a.copies || 0)); break;
      case 'starred': sortedSnippets.sort((a, b) => (b.starred ? 1 : 0) - (a.starred ? 1 : 0)); break;
      case 'pinned': sortedSnippets.sort((a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0)); break;
      default: sortedSnippets.sort((a, b) => a.order - b.order);
    }
    // Pinned always float to top regardless of chosen sort (except explicit 'pinned' sort already covers it)
    if (this.sortBy !== 'pinned') {
      sortedSnippets.sort((a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0));
    }
    return { folders: sortedFolders, snippets: sortedSnippets };
  }

  filterSnippets(snippets) {
    let result = snippets;
    if (this.langFilter) result = result.filter(s => s.language === this.langFilter);
    if (this.searchQuery) {
      const q = this.searchQuery.toLowerCase();
      result = result.filter(s =>
        s.title.toLowerCase().includes(q) ||
        (s.description || '').toLowerCase().includes(q) ||
        (s.tags || []).some(t => t.includes(q))
      );
    }
    return result;
  }

  moveFocus(delta) {
    if (this.itemOrder.length === 0) return;
    this.focusedIndex = Utils.clamp(this.focusedIndex + delta, 0, this.itemOrder.length - 1);
    this.applyFocusHighlight();
  }
  moveFocusGrid(deltaRow) {
    // Approximate columns based on container width; fallback to linear move
    const grid = document.getElementById('explorerGrid');
    if (!grid) return this.moveFocus(deltaRow);
    const firstCard = grid.querySelector('.snippet-card, .folder-card');
    if (!firstCard) return;
    const cardWidth = firstCard.getBoundingClientRect().width + 16;
    const cols = Math.max(1, Math.floor(grid.getBoundingClientRect().width / cardWidth));
    this.moveFocus(deltaRow * cols);
  }
  applyFocusHighlight() {
    const grid = document.getElementById('explorerGrid');
    if (!grid) return;
    grid.querySelectorAll('.keyboard-focus').forEach(el => el.classList.remove('keyboard-focus'));
    const item = this.itemOrder[this.focusedIndex];
    if (!item) return;
    const el = grid.querySelector(`[data-id="${item.id}"]`);
    if (el) { el.classList.add('keyboard-focus'); el.scrollIntoView({ block: 'nearest', behavior: 'smooth' }); }
  }
  getFocusedItem() { return this.itemOrder[this.focusedIndex] || null; }
}

/* =============================================================================
   SECTION 9: CONTEXT MENU (15+ options)
   ============================================================================= */

class ContextMenu {
  constructor(app) {
    this.app = app;
    this.el = document.getElementById('contextMenu');
    this.currentTarget = null;
    document.addEventListener('click', () => this.close());
    document.addEventListener('scroll', () => this.close(), true);
    window.addEventListener('resize', () => this.close());
  }

  buildSnippetMenu(snippet) {
    const app = this.app;
    return [
      { icon: 'fa-eye', label: 'Open', action: () => app.openViewer(snippet.id) },
      { icon: 'fa-up-right-from-square', label: 'Open in new tab', action: () => app.openInNewTab(snippet.id) },
      { icon: 'fa-pen', label: 'Edit', action: () => app.openEditor(snippet.id) },
      { icon: 'fa-i-cursor', label: 'Rename', action: () => app.renameSnippet(snippet.id) },
      { sep: true },
      { icon: 'fa-copy', label: 'Duplicate', action: () => app.duplicateSnippet(snippet.id) },
      { icon: snippet.starred ? 'fa-star' : 'fa-star', label: snippet.starred ? 'Unstar' : 'Star', action: () => app.toggleStar(snippet.id) },
      { icon: 'fa-thumbtack', label: snippet.pinned ? 'Unpin' : 'Pin to top', action: () => app.togglePin(snippet.id) },
      { icon: 'fa-right-left', label: 'Move to folder', action: () => app.openMoveModal([snippet.id]) },
      { icon: 'fa-tags', label: 'Add tags', action: () => app.openTagsModal(snippet.id) },
      { icon: 'fa-book-bookmark', label: 'Add to collection', action: () => app.addToDefaultCollection(snippet.id) },
      { sep: true },
      { icon: 'fa-link', label: 'Copy link', action: () => app.copyShareLink(snippet.id) },
      { icon: 'fa-code', label: 'Copy code', action: () => app.copySnippetCode(snippet.id) },
      { icon: 'fa-download', label: 'Download as file', action: () => app.downloadSnippet(snippet.id) },
      { icon: 'fa-share-nodes', label: 'Share', action: () => app.openShareModal(snippet.id) },
      { icon: 'fa-file-export', label: 'Export as Markdown', action: () => app.exportSnippetAsMarkdown(snippet.id) },
      { sep: true },
      { icon: 'fa-trash', label: 'Delete', danger: true, action: () => app.deleteSnippetWithConfirm(snippet.id) }
    ];
  }

  buildFolderMenu(folder) {
    const app = this.app;
    return [
      { icon: 'fa-folder-open', label: 'Open', action: () => app.explorerState.navigateToFolder(folder.id) },
      { icon: 'fa-i-cursor', label: 'Rename', action: () => app.renameFolder(folder.id) },
      { icon: 'fa-right-left', label: 'Move to folder', action: () => app.openMoveModal([], [folder.id]) },
      { icon: 'fa-palette', label: 'Change color', action: () => app.cycleFolderColor(folder.id) },
      { sep: true },
      { icon: 'fa-file-export', label: 'Export folder as JSON', action: () => app.exportFolder(folder.id) },
      { sep: true },
      { icon: 'fa-trash', label: 'Delete', danger: true, action: () => app.deleteFolderWithConfirm(folder.id) }
    ];
  }

  openFor(id, type, x, y) {
    const entity = type === 'snippet' ? this.app.store.getSnippetById(id) : this.app.store.getFolderById(id);
    if (!entity) return;
    const items = type === 'snippet' ? this.buildSnippetMenu(entity) : this.buildFolderMenu(entity);
    this.render(items, x, y);
    this.currentTarget = { id, type };
  }

  render(items, x, y) {
    this.el.innerHTML = items.map(item => {
      if (item.sep) return '<li class="context-menu-sep" role="separator"></li>';
      return `<li class="context-menu-item ${item.danger ? 'danger' : ''}" role="menuitem" data-action="${items.indexOf(item)}"><i class="fa-solid ${item.icon}"></i><span>${Utils.escapeHtml(item.label)}</span></li>`;
    }).join('');
    [...this.el.children].forEach((li, i) => {
      if (items[i].sep) return;
      li.addEventListener('click', (e) => { e.stopPropagation(); items[i].action(); this.close(); });
    });
    this.el.classList.remove('hidden');
    const menuWidth = 240, menuHeight = Math.min(items.length * 36 + 20, 500);
    const posX = Math.min(x, window.innerWidth - menuWidth - 10);
    const posY = Math.min(y, window.innerHeight - menuHeight - 10);
    this.el.style.left = `${Math.max(10, posX)}px`;
    this.el.style.top = `${Math.max(10, posY)}px`;
  }

  close() {
    this.el.classList.add('hidden');
    this.currentTarget = null;
  }
}

/* =============================================================================
   SECTION 10: SNIPPET EDITOR (OffCanvas with CodeMirror)
   ============================================================================= */

class SnippetEditor {
  constructor(app) {
    this.app = app;
    this.cm = null;
    this.editingId = null; // null = creating new
    this.autosaveTimer = null;
    this.wordWrap = app.store.getSettings().wordWrap;
    this.lineNumbers = app.store.getSettings().lineNumbers;
    this.theme = app.store.getSettings().editorTheme;
    this.isFullscreen = false;

    this.backdrop = document.getElementById('editorBackdrop');
    this.panel = document.getElementById('editorOffcanvas');
    this.initCodeMirror();
    this.bindStaticEvents();
    this.populateLanguageSelect();
  }

  initCodeMirror() {
    const textarea = document.getElementById('snippetCodeArea');
    if (typeof CodeMirror === 'undefined') {
      this.cm = Utils.makeFallbackEditor(textarea);
      ToastManager.warning('Editor running in basic mode', 'CodeMirror could not be loaded (offline?); syntax highlighting is disabled.');
    } else {
      this.cm = CodeMirror.fromTextArea(textarea, {
        lineNumbers: this.lineNumbers,
        lineWrapping: this.wordWrap,
        theme: this.theme === 'dark' ? 'dracula' : 'eclipse',
        matchBrackets: true,
        autoCloseBrackets: true,
        styleActiveLine: true,
        indentUnit: 2,
        tabSize: 2,
        mode: 'javascript',
        extraKeys: {
          'Ctrl-S': () => this.save(),
          'Cmd-S': () => this.save(),
          'Esc': () => { if (this.isFullscreen) this.toggleFullscreen(); }
        }
      });
    }
    this.cm.on('change', () => this.updateFooterCounts());
  }

  populateLanguageSelect() {
    const select = document.getElementById('snippetLangSelect');
    select.innerHTML = LANGUAGES.map(l => `<option value="${l.value}">${Utils.escapeHtml(l.label)}</option>`).join('');
  }

  populateFolderSelect(selectEl, excludeFolderId = null) {
    selectEl.innerHTML = '<option value="">— Root —</option>';
    const buildOptions = (parentId, depth) => {
      this.app.store.getFolderChildren(parentId).forEach(folder => {
        if (excludeFolderId && (folder.id === excludeFolderId || this.app.store.isDescendantFolder(excludeFolderId, folder.id))) return;
        const opt = document.createElement('option');
        opt.value = folder.id;
        opt.textContent = `${'—'.repeat(depth)} ${folder.name}`;
        selectEl.appendChild(opt);
        buildOptions(folder.id, depth + 1);
      });
    };
    buildOptions(null, 1);
  }

  bindStaticEvents() {
    document.getElementById('closeEditorBtn').addEventListener('click', () => this.close());
    document.getElementById('cancelEditorBtn').addEventListener('click', () => this.close());
    document.getElementById('saveSnippetBtn').addEventListener('click', () => this.save());
    this.backdrop.addEventListener('click', (e) => { if (e.target === this.backdrop) this.close(); });

    document.getElementById('formatCodeBtn').addEventListener('click', () => this.formatCode());
    document.getElementById('copyCodeBtn').addEventListener('click', async () => {
      const ok = await Utils.copyToClipboard(this.cm.getValue());
      if (ok) ToastManager.success('Copied', 'Code copied to clipboard.');
    });
    document.getElementById('clearCodeBtn').addEventListener('click', async () => {
      const confirmed = await ModalManager.confirm({ title: 'Clear code?', message: 'This will remove all code from the editor.', okText: 'Clear' });
      if (confirmed) { this.cm.setValue(''); this.cm.focus(); }
    });
    document.getElementById('wordWrapBtn').addEventListener('click', () => this.toggleWordWrap());
    document.getElementById('lineNumbersBtn').addEventListener('click', () => this.toggleLineNumbers());
    document.getElementById('editorThemeBtn').addEventListener('click', () => this.toggleTheme());
    document.getElementById('editorFullscreenBtn').addEventListener('click', () => this.toggleFullscreen());

    document.getElementById('snippetLangSelect').addEventListener('change', (e) => {
      this.applyLanguageMode(e.target.value);
    });
    document.getElementById('snippetTagsInput').addEventListener('input', Utils.debounce((e) => {
      this.renderTagSuggestions(e.target.value);
    }, 150));

    this.updateToggleButtonStates();
  }

  applyLanguageMode(langValue) {
    const meta = Utils.langMeta(langValue);
    this.cm.setOption('mode', meta.cmMode || null);
  }

  renderTagSuggestions(raw) {
    const container = document.getElementById('editorTagSuggestions');
    const lastFragment = raw.split(',').pop().trim().toLowerCase();
    if (!lastFragment) { container.innerHTML = ''; return; }
    const allTags = this.app.store.allTagNames();
    const matches = allTags.filter(t => t.includes(lastFragment) && !raw.toLowerCase().includes(t)).slice(0, 8);
    container.innerHTML = matches.map(t => `<span class="tag-suggestion-chip" data-tag="${Utils.escapeHtml(t)}">#${Utils.escapeHtml(t)}</span>`).join('');
    container.querySelectorAll('.tag-suggestion-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        const input = document.getElementById('snippetTagsInput');
        const parts = input.value.split(',').map(s => s.trim()).filter(Boolean);
        parts[parts.length - (raw.trim().endsWith(',') ? 0 : 1)] = chip.dataset.tag;
        input.value = parts.join(', ') + ', ';
        container.innerHTML = '';
        input.focus();
      });
    });
  }

  updateFooterCounts() {
    const code = this.cm.getValue();
    document.getElementById('editorLineCount').textContent = `${this.cm.lineCount()} lines`;
    document.getElementById('editorCharCount').textContent = `${code.length} characters`;
  }

  updateToggleButtonStates() {
    document.getElementById('wordWrapBtn').classList.toggle('active', this.wordWrap);
    document.getElementById('lineNumbersBtn').classList.toggle('active', this.lineNumbers);
    document.getElementById('editorThemeBtn').classList.toggle('active', this.theme === 'light');
    document.getElementById('editorThemeBtn').innerHTML = this.theme === 'dark'
      ? '<i class="fa-solid fa-moon"></i><span>Theme</span>' : '<i class="fa-solid fa-sun"></i><span>Theme</span>';
  }

  toggleWordWrap() {
    this.wordWrap = !this.wordWrap;
    this.cm.setOption('lineWrapping', this.wordWrap);
    this.app.store.updateSettings({ wordWrap: this.wordWrap });
    this.updateToggleButtonStates();
  }
  toggleLineNumbers() {
    this.lineNumbers = !this.lineNumbers;
    this.cm.setOption('lineNumbers', this.lineNumbers);
    this.app.store.updateSettings({ lineNumbers: this.lineNumbers });
    this.updateToggleButtonStates();
  }
  toggleTheme() {
    this.theme = this.theme === 'dark' ? 'light' : 'dark';
    this.cm.setOption('theme', this.theme === 'dark' ? 'dracula' : 'eclipse');
    this.app.store.updateSettings({ editorTheme: this.theme });
    this.updateToggleButtonStates();
  }
  toggleFullscreen() {
    this.isFullscreen = !this.isFullscreen;
    this.panel.classList.toggle('fullscreen-mode', this.isFullscreen);
    document.getElementById('editorFullscreenBtn').classList.toggle('active', this.isFullscreen);
    setTimeout(() => this.cm.refresh(), 260);
  }
  formatCode() {
    // Lightweight formatter: normalize indentation using CodeMirror's indent engine
    this.cm.operation(() => {
      for (let i = 0; i < this.cm.lineCount(); i++) this.cm.indentLine(i, 'smart');
    });
    ToastManager.info('Formatted', 'Indentation has been normalized.');
  }

  /* ---------- Open / Close ---------- */
  openForCreate(defaultFolderId = null) {
    this.editingId = null;
    document.getElementById('editorTitle').innerHTML = '<i class="fa-solid fa-file-circle-plus"></i> New Snippet';
    document.getElementById('snippetTitleInput').value = '';
    document.getElementById('snippetLangSelect').value = 'javascript';
    document.getElementById('snippetDescInput').value = '';
    document.getElementById('snippetTagsInput').value = '';
    document.getElementById('snippetVisibilitySelect').value = 'public';
    document.getElementById('snippetLicenseSelect').value = 'none';
    this.populateFolderSelect(document.getElementById('snippetFolderSelect'));
    document.getElementById('snippetFolderSelect').value = defaultFolderId || '';
    this.cm.setValue('');
    this.applyLanguageMode('javascript');
    this.loadDraftIfPresent();
    this.show();
    this.startAutosave();
  }

  openForEdit(snippetId) {
    const snippet = this.app.store.getSnippetById(snippetId);
    if (!snippet) return;
    this.editingId = snippetId;
    document.getElementById('editorTitle').innerHTML = '<i class="fa-solid fa-pen"></i> Edit Snippet';
    document.getElementById('snippetTitleInput').value = snippet.title;
    document.getElementById('snippetLangSelect').value = snippet.language;
    document.getElementById('snippetDescInput').value = snippet.description || '';
    document.getElementById('snippetTagsInput').value = (snippet.tags || []).join(', ');
    document.getElementById('snippetVisibilitySelect').value = snippet.visibility || 'public';
    document.getElementById('snippetLicenseSelect').value = snippet.license || 'none';
    this.populateFolderSelect(document.getElementById('snippetFolderSelect'));
    document.getElementById('snippetFolderSelect').value = snippet.folderId || '';
    this.cm.setValue(snippet.code || '');
    this.applyLanguageMode(snippet.language);
    this.show();
    this.startAutosave();
  }

  show() {
    ModalManager.open(this.backdrop);
    setTimeout(() => { this.cm.refresh(); this.cm.focus(); this.updateFooterCounts(); }, 50);
  }

  close() {
    if (this.isFullscreen) this.toggleFullscreen();
    ModalManager.close(this.backdrop);
    this.stopAutosave();
  }

  /* ---------- Autosave draft ---------- */
  startAutosave() {
    this.stopAutosave();
    this.autosaveTimer = setInterval(() => this.saveDraft(), AUTOSAVE_INTERVAL_MS);
  }
  stopAutosave() { if (this.autosaveTimer) clearInterval(this.autosaveTimer); }
  saveDraft() {
    const draft = this.collectFormData();
    draft.editingId = this.editingId;
    localStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
    const indicator = document.getElementById('autosaveIndicator');
    indicator.classList.remove('hidden');
    setTimeout(() => indicator.classList.add('hidden'), 2000);
  }
  loadDraftIfPresent() {
    try {
      const raw = localStorage.getItem(DRAFT_KEY);
      if (!raw) return;
      const draft = JSON.parse(raw);
      if (draft.editingId) return; // only restore drafts for "new" snippets
      if (!draft.code && !draft.title) return;
      document.getElementById('snippetTitleInput').value = draft.title || '';
      document.getElementById('snippetDescInput').value = draft.description || '';
      document.getElementById('snippetTagsInput').value = (draft.tags || []).join(', ');
      if (draft.language) { document.getElementById('snippetLangSelect').value = draft.language; this.applyLanguageMode(draft.language); }
      this.cm.setValue(draft.code || '');
    } catch (e) { /* ignore corrupt draft */ }
  }
  clearDraft() { localStorage.removeItem(DRAFT_KEY); }

  collectFormData() {
    return {
      title: document.getElementById('snippetTitleInput').value.trim(),
      language: document.getElementById('snippetLangSelect').value,
      description: document.getElementById('snippetDescInput').value.trim(),
      tags: Utils.parseTags(document.getElementById('snippetTagsInput').value),
      folderId: document.getElementById('snippetFolderSelect').value || null,
      visibility: document.getElementById('snippetVisibilitySelect').value,
      license: document.getElementById('snippetLicenseSelect').value,
      code: this.cm.getValue()
    };
  }

  save() {
    const data = this.collectFormData();
    if (!data.title) { ToastManager.warning('Title required', 'Please give your snippet a title.'); document.getElementById('snippetTitleInput').focus(); return; }
    if (!data.code.trim()) { ToastManager.warning('Code required', 'Please add some code before saving.'); this.cm.focus(); return; }

    if (this.editingId) {
      this.app.store.updateSnippet(this.editingId, data);
      ToastManager.success('Snippet updated', `"${data.title}" has been saved.`);
    } else {
      const created = this.app.store.createSnippet(data);
      ToastManager.success('Snippet created', `"${data.title}" has been added to your vault.`);
      this.editingId = created.id;
    }
    this.clearDraft();
    this.close();
    this.app.refreshCurrentView();
  }
}

/* =============================================================================
   SECTION 11: SNIPPET VIEWER (read-only, full-screen)
   ============================================================================= */

class SnippetViewer {
  constructor(app) {
    this.app = app;
    this.currentId = null;
    this.cm = null;
    this.rawMode = false;
    this.wordWrap = true;
    this.backdrop = document.getElementById('viewerBackdrop');
    this.bindEvents();
  }

  bindEvents() {
    document.getElementById('closeViewerBtn').addEventListener('click', () => this.close());
    this.backdrop.addEventListener('click', (e) => { if (e.target === this.backdrop) this.close(); });
    document.getElementById('viewerStarBtn').addEventListener('click', () => this.app.toggleStar(this.currentId, true));
    document.getElementById('viewerPinBtn').addEventListener('click', () => this.app.togglePin(this.currentId, true));
    document.getElementById('viewerCopyBtn').addEventListener('click', () => this.app.copySnippetCode(this.currentId));
    document.getElementById('viewerDownloadBtn').addEventListener('click', () => this.app.downloadSnippet(this.currentId));
    document.getElementById('viewerEditBtn').addEventListener('click', () => { this.close(); this.app.openEditor(this.currentId); });
    document.getElementById('viewerShareBtn').addEventListener('click', () => this.app.openShareModal(this.currentId));
    document.getElementById('viewerPrintBtn').addEventListener('click', () => window.print());
    document.getElementById('viewerHistoryBtn').addEventListener('click', () => this.toggleHistoryPanel());
    document.getElementById('viewerRawBtn').addEventListener('click', () => this.toggleRawMode());
    document.getElementById('viewerWrapBtn').addEventListener('click', () => this.toggleWordWrap());
    document.getElementById('commentForm').addEventListener('submit', (e) => {
      e.preventDefault();
      const input = document.getElementById('commentInput');
      if (!input.value.trim()) return;
      this.app.store.addComment(this.currentId, input.value.trim());
      input.value = '';
      this.renderComments();
      ToastManager.success('Comment added');
    });
  }

  open(snippetId) {
    const snippet = this.app.store.getSnippetById(snippetId);
    if (!snippet) return;
    this.currentId = snippetId;
    this.app.store.incrementViews(snippetId);
    this.app.store.addRecentlyViewed(snippetId);

    const lang = Utils.langMeta(snippet.language);
    document.getElementById('viewerLangBadge').textContent = lang.label;
    document.getElementById('viewerLangBadge').className = `lang-badge ${lang.badge}`;
    document.getElementById('viewerTitle').textContent = snippet.title;
    document.getElementById('viewerDesc').textContent = snippet.description || 'No description provided.';
    document.getElementById('viewerTags').innerHTML = (snippet.tags || []).map(t => `<span class="card-tag">#${Utils.escapeHtml(t)}</span>`).join('') || '<span class="muted small">No tags</span>';
    document.getElementById('viewerAuthor').textContent = 'You';
    document.getElementById('viewerCreated').textContent = Utils.formatFullDate(snippet.createdAt);
    document.getElementById('viewerModified').textContent = Utils.formatFullDate(snippet.updatedAt);
    document.getElementById('viewerViews').textContent = snippet.views || 0;
    document.getElementById('viewerCopies').textContent = snippet.copies || 0;
    const visBadge = document.getElementById('viewerVisibilityBadge');
    visBadge.textContent = snippet.visibility === 'private' ? '🔒 Private' : '🌐 Public';
    visBadge.className = `visibility-badge ${snippet.visibility}`;
    document.getElementById('viewerLicenseBadge').textContent = LICENSE_LABELS[snippet.license] || 'No License';

    document.getElementById('viewerStarBtn').classList.toggle('active', !!snippet.starred);
    document.getElementById('viewerStarBtn').innerHTML = `<i class="fa-${snippet.starred ? 'solid' : 'regular'} fa-star"></i>`;
    document.getElementById('viewerPinBtn').classList.toggle('active', !!snippet.pinned);

    document.getElementById('versionHistoryPanel').hidden = true;

    this.renderCode(snippet);
    this.renderSimilar(snippet);
    this.renderComments();
    this.renderVersionHistory(snippet);

    ModalManager.open(this.backdrop);
    setTimeout(() => { if (this.cm) this.cm.refresh(); }, 60);
  }

  renderCode(snippet) {
    const wrapper = document.getElementById('viewerCmWrapper');
    wrapper.innerHTML = '<textarea id="viewerCodeArea"></textarea>';
    const textarea = document.getElementById('viewerCodeArea');
    textarea.value = snippet.code || '';
    const lang = Utils.langMeta(snippet.language);
    if (typeof CodeMirror === 'undefined') {
      this.cm = Utils.makeFallbackEditor(textarea, { readOnly: true });
    } else {
      this.cm = CodeMirror.fromTextArea(textarea, {
        lineNumbers: true,
        lineWrapping: this.wordWrap,
        theme: 'dracula',
        readOnly: true,
        mode: lang.cmMode || null
      });
    }
  }

  toggleRawMode() {
    this.rawMode = !this.rawMode;
    document.getElementById('viewerRawBtn').classList.toggle('active', this.rawMode);
    const wrapper = document.getElementById('viewerCmWrapper');
    const snippet = this.app.store.getSnippetById(this.currentId);
    if (this.rawMode) {
      wrapper.innerHTML = `<pre style="margin:0;padding:14px;background:#22272e;color:#adbac7;font-family:'JetBrains Mono',monospace;font-size:13px;max-height:320px;overflow:auto;white-space:pre-wrap;">${Utils.escapeHtml(snippet.code)}</pre>`;
    } else {
      this.renderCode(snippet);
    }
  }

  toggleWordWrap() {
    this.wordWrap = !this.wordWrap;
    document.getElementById('viewerWrapBtn').classList.toggle('active', this.wordWrap);
    if (this.cm) this.cm.setOption('lineWrapping', this.wordWrap);
  }

  toggleHistoryPanel() {
    const panel = document.getElementById('versionHistoryPanel');
    panel.hidden = !panel.hidden;
  }

  renderVersionHistory(snippet) {
    const list = document.getElementById('versionHistoryList');
    const versions = snippet.versions || [];
    if (versions.length === 0) {
      list.innerHTML = '<p class="similar-empty-note">No previous versions yet. Versions are saved automatically each time you edit the code (up to 5 kept).</p>';
      return;
    }
    list.innerHTML = versions.map((v, i) => `
      <div class="version-item">
        <div class="version-meta"><i class="fa-solid fa-code-commit"></i> Version saved ${Utils.formatDate(v.savedAt)} <span class="muted">(${(v.code || '').split('\n').length} lines)</span></div>
        <button class="btn btn-ghost" data-version-index="${i}"><i class="fa-solid fa-clock-rotate-left"></i> Restore</button>
      </div>
    `).join('');
    list.querySelectorAll('[data-version-index]').forEach(btn => {
      btn.addEventListener('click', async () => {
        const idx = Number(btn.dataset.versionIndex);
        const confirmed = await ModalManager.confirm({ title: 'Restore version?', message: 'This will replace the current code with this older version.', okText: 'Restore', danger: false });
        if (!confirmed) return;
        const version = snippet.versions[idx];
        this.app.store.updateSnippet(snippet.id, { code: version.code });
        ToastManager.success('Version restored');
        this.open(snippet.id);
      });
    });
  }

  renderSimilar(snippet) {
    const grid = document.getElementById('similarGrid');
    grid.innerHTML = '';
    const all = this.app.store.getSnippets().filter(s => s.id !== snippet.id);
    const scored = all.map(s => {
      let score = 0;
      if (s.language === snippet.language) score += 2;
      const sharedTags = (s.tags || []).filter(t => (snippet.tags || []).includes(t));
      score += sharedTags.length;
      return { s, score };
    }).filter(x => x.score > 0).sort((a, b) => b.score - a.score).slice(0, 3);

    if (scored.length === 0) {
      grid.innerHTML = '<p class="similar-empty-note">No similar snippets found yet. Add matching tags or languages to see related snippets here.</p>';
      return;
    }
    scored.forEach(({ s }) => grid.appendChild(CardRenderer.renderSnippetCard(s)));
  }

  renderComments() {
    const list = document.getElementById('commentsList');
    const comments = this.app.store.getComments(this.currentId);
    if (comments.length === 0) {
      list.innerHTML = '<p class="comments-empty-note">No comments yet. Be the first to leave a note about this snippet.</p>';
      return;
    }
    list.innerHTML = comments.map(c => `
      <div class="comment-item" data-comment-id="${c.id}">
        <div class="comment-item-head">
          <span><strong>${Utils.escapeHtml(c.author)}</strong> · ${Utils.formatDate(c.createdAt)}</span>
          <button class="comment-delete-btn" data-comment-id="${c.id}"><i class="fa-solid fa-trash"></i></button>
        </div>
        <p>${Utils.escapeHtml(c.text)}</p>
      </div>
    `).join('');
    list.querySelectorAll('.comment-delete-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        this.app.store.deleteComment(this.currentId, btn.dataset.commentId);
        this.renderComments();
      });
    });
  }

  close() {
    ModalManager.close(this.backdrop);
    this.app.refreshCurrentView();
  }
}

/* =============================================================================
   SECTION 12: MAIN APPLICATION CLASS
   ============================================================================= */

class CodeVaultApp {
  constructor() {
    this.store = new Store();
    this.router = new Router();
    this.editor = new SnippetEditor(this);
    this.viewer = new SnippetViewer(this);
    this.explorerState = new ExplorerState(this);
    this.contextMenu = new ContextMenu(this);
    this.sortableInstances = [];
    this.shareTargetId = null;
    this.tagsModalTargetId = null;
    this.moveModalIds = { snippets: [], folders: [] };
    this.folderModalParentId = null;
    this.folderModalEditId = null;
    this.selectedFolderColor = FOLDER_COLORS[0];

    ToastManager.init();
    this.bindGlobalUI();
    this.bindKeyboardShortcuts();
    this.registerRoutes();
    if (window.hljs) hljs.configure({ ignoreUnescapedHTML: true });
    this.router.init();
  }

  refreshCurrentView() {
    this.router.handleHashChange();
  }

  /* =========================================================================
     ROUTES
     ========================================================================= */
  registerRoutes() {
    this.router.register('home', () => this.renderHome());
    this.router.register('explorer', (params) => {
      this.explorerState.currentFolderId = params.folder || null;
      this.renderExplorer();
    });
    this.router.register('starred', () => this.renderStarredFull());
    this.router.register('recents', () => this.renderRecentsFull());
    this.router.register('trash', () => this.renderTrash());
    this.router.register('search', (params) => this.renderSearch(params.q || ''));
  }

  /* =========================================================================
     GLOBAL UI BINDINGS (navbar, popovers, modals)
     ========================================================================= */
  bindGlobalUI() {
    // Mobile nav
    document.getElementById('navMenuToggle').addEventListener('click', () => {
      document.getElementById('mobileDrawer').classList.toggle('hidden');
    });
    document.querySelectorAll('#mobileDrawer .nav-link').forEach(link => {
      link.addEventListener('click', () => document.getElementById('mobileDrawer').classList.add('hidden'));
    });

    // Create button popover
    const createBtn = document.getElementById('createBtn');
    const popover = document.getElementById('createPopover');
    createBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isHidden = popover.classList.contains('hidden');
      popover.classList.toggle('hidden');
      createBtn.setAttribute('aria-expanded', String(isHidden));
    });
    document.addEventListener('click', () => { popover.classList.add('hidden'); createBtn.setAttribute('aria-expanded', 'false'); });
    popover.addEventListener('click', (e) => e.stopPropagation());

    document.getElementById('newFolderOption').addEventListener('click', () => { popover.classList.add('hidden'); this.openFolderModal(); });
    document.getElementById('newSnippetOption').addEventListener('click', () => { popover.classList.add('hidden'); this.openEditor(null); });
    document.getElementById('newCollectionOption').addEventListener('click', () => { popover.classList.add('hidden'); this.openCollectionModal(); });

    document.getElementById('heroNewSnippetBtn').addEventListener('click', () => this.openEditor(null));
    document.getElementById('heroExploreBtn').addEventListener('click', () => this.router.navigate('explorer'));

    // Folder modal
    document.getElementById('closeFolderModal').addEventListener('click', () => ModalManager.close(document.getElementById('folderModalBackdrop')));
    document.getElementById('cancelFolderBtn').addEventListener('click', () => ModalManager.close(document.getElementById('folderModalBackdrop')));
    document.getElementById('saveFolderBtn').addEventListener('click', () => this.saveFolderModal());
    this.renderFolderColorSwatches();

    // Collection modal
    document.getElementById('closeCollectionModal').addEventListener('click', () => ModalManager.close(document.getElementById('collectionModalBackdrop')));
    document.getElementById('cancelCollectionBtn').addEventListener('click', () => ModalManager.close(document.getElementById('collectionModalBackdrop')));
    document.getElementById('saveCollectionBtn').addEventListener('click', () => this.saveCollectionModal());

    // Move modal
    document.getElementById('closeMoveModal').addEventListener('click', () => ModalManager.close(document.getElementById('moveModalBackdrop')));
    document.getElementById('cancelMoveBtn').addEventListener('click', () => ModalManager.close(document.getElementById('moveModalBackdrop')));
    document.getElementById('confirmMoveBtn').addEventListener('click', () => this.confirmMove());

    // Tags modal
    document.getElementById('closeTagsModal').addEventListener('click', () => ModalManager.close(document.getElementById('tagsModalBackdrop')));
    document.getElementById('cancelTagsBtn').addEventListener('click', () => ModalManager.close(document.getElementById('tagsModalBackdrop')));
    document.getElementById('saveTagsBtn').addEventListener('click', () => this.confirmAddTags());
    document.getElementById('tagsModalInput').addEventListener('input', Utils.debounce((e) => this.renderTagsModalSuggestions(e.target.value), 150));

    // Import modal
    document.getElementById('importBtn').addEventListener('click', () => ModalManager.open(document.getElementById('importModalBackdrop')));
    document.getElementById('closeImportModal').addEventListener('click', () => ModalManager.close(document.getElementById('importModalBackdrop')));
    document.getElementById('cancelImportBtn').addEventListener('click', () => ModalManager.close(document.getElementById('importModalBackdrop')));
    document.getElementById('confirmImportBtn').addEventListener('click', () => this.performImport());
    document.querySelectorAll('.import-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        document.querySelectorAll('.import-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        document.getElementById('importPanelJson').classList.toggle('hidden', tab.dataset.tab !== 'json');
        document.getElementById('importPanelGist').classList.toggle('hidden', tab.dataset.tab !== 'gist');
      });
    });
    document.getElementById('fetchGistBtn').addEventListener('click', () => this.fetchGistPreview());

    // Export all
    document.getElementById('exportAllBtn').addEventListener('click', () => this.exportAll());

    // Share modal
    document.getElementById('closeShareModal').addEventListener('click', () => ModalManager.close(document.getElementById('shareModalBackdrop')));
    document.getElementById('copyShareLinkBtn').addEventListener('click', async () => {
      const ok = await Utils.copyToClipboard(document.getElementById('shareLinkInput').value);
      if (ok) ToastManager.success('Link copied');
    });
    document.getElementById('shareAsMarkdownBtn').addEventListener('click', () => this.exportSnippetAsMarkdown(this.shareTargetId));
    document.getElementById('shareAsFileBtn').addEventListener('click', () => this.downloadSnippet(this.shareTargetId));
    document.getElementById('shareAsPrintBtn').addEventListener('click', () => { ModalManager.close(document.getElementById('shareModalBackdrop')); this.openViewer(this.shareTargetId); setTimeout(() => window.print(), 300); });

    // Shortcuts modal
    document.getElementById('shortcutsBtn').addEventListener('click', () => ModalManager.open(document.getElementById('shortcutsModalBackdrop')));
    document.getElementById('closeShortcutsModal').addEventListener('click', () => ModalManager.close(document.getElementById('shortcutsModalBackdrop')));

    // Generic backdrop click-to-close for simple modals
    ['folderModalBackdrop', 'collectionModalBackdrop', 'moveModalBackdrop', 'tagsModalBackdrop', 'importModalBackdrop', 'shareModalBackdrop', 'shortcutsModalBackdrop'].forEach(id => {
      const el = document.getElementById(id);
      el.addEventListener('click', (e) => { if (e.target === el) ModalManager.close(el); });
    });

    // Trash view
    document.getElementById('emptyTrashBtn').addEventListener('click', async () => {
      const confirmed = await ModalManager.confirm({ title: 'Empty trash?', message: 'All items in trash will be permanently deleted. This cannot be undone.', okText: 'Empty Trash' });
      if (confirmed) { this.store.emptyTrash(); this.renderTrash(); ToastManager.success('Trash emptied'); }
    });

    document.getElementById('clearRecentsBtn').addEventListener('click', () => {
      this.store.clearRecentlyViewed();
      this.renderRecentsFull();
      ToastManager.info('Recently viewed cleared');
    });

    // Explorer toolbar
    document.getElementById('langFilter').addEventListener('change', (e) => { this.explorerState.langFilter = e.target.value; this.renderExplorer(); });
    document.getElementById('sortSelect').addEventListener('change', (e) => { this.explorerState.sortBy = e.target.value; this.renderExplorer(); });
    document.getElementById('folderSearch').addEventListener('input', Utils.debounce((e) => { this.explorerState.searchQuery = e.target.value; this.renderExplorer(); }, 200));
    document.querySelectorAll('.view-toggle-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.view-toggle-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.explorerState.viewMode = btn.dataset.view;
        this.store.updateSettings({ viewMode: btn.dataset.view });
        this.renderExplorer();
      });
    });

    // Bulk toolbar
    document.getElementById('bulkStar').addEventListener('click', () => this.bulkStar());
    document.getElementById('bulkMove').addEventListener('click', () => this.openMoveModal(this.explorerState.getSelectedSnippetIds(), this.explorerState.getSelectedFolderIds()));
    document.getElementById('bulkExport').addEventListener('click', () => this.bulkExport());
    document.getElementById('bulkDelete').addEventListener('click', () => this.bulkDelete());
    document.getElementById('bulkCancel').addEventListener('click', () => this.explorerState.clearSelection());

    // Global search
    this.bindSearch();
  }

  renderFolderColorSwatches() {
    const container = document.getElementById('folderColorSwatches');
    container.innerHTML = FOLDER_COLORS.map((c, i) => `<span class="color-swatch ${i === 0 ? 'selected' : ''}" style="background:${c};color:${c}" data-color="${c}"></span>`).join('');
    container.querySelectorAll('.color-swatch').forEach(sw => {
      sw.addEventListener('click', () => {
        container.querySelectorAll('.color-swatch').forEach(s => s.classList.remove('selected'));
        sw.classList.add('selected');
        this.selectedFolderColor = sw.dataset.color;
      });
    });
  }

  /* =========================================================================
     KEYBOARD SHORTCUTS
     ========================================================================= */
  bindKeyboardShortcuts() {
    let gPressed = false;
    let gTimer = null;
    document.addEventListener('keydown', (e) => {
      const tag = (e.target.tagName || '').toLowerCase();
      const isTyping = tag === 'input' || tag === 'textarea' || e.target.isContentEditable || document.querySelector('.CodeMirror-focused');

      // Ctrl+S save when editor open
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 's' && !this.editor.backdrop.classList.contains('hidden')) {
        e.preventDefault();
        this.editor.save();
        return;
      }
      if (isTyping) return;

      if (e.key === '/') {
        e.preventDefault();
        document.getElementById('globalSearch').focus();
        return;
      }
      if (e.key === '?') {
        e.preventDefault();
        ModalManager.open(document.getElementById('shortcutsModalBackdrop'));
        return;
      }
      if (e.key.toLowerCase() === 'n') {
        e.preventDefault();
        this.openEditor(null);
        return;
      }
      if (e.key === 'Escape') {
        this.handleEscape();
        return;
      }
      if (e.key.toLowerCase() === 'g') {
        gPressed = true;
        clearTimeout(gTimer);
        gTimer = setTimeout(() => { gPressed = false; }, 800);
        return;
      }
      if (gPressed) {
        if (e.key.toLowerCase() === 'h') { this.router.navigate('home'); gPressed = false; }
        if (e.key.toLowerCase() === 'e') { this.router.navigate('explorer'); gPressed = false; }
        if (e.key.toLowerCase() === 's') { this.router.navigate('starred'); gPressed = false; }
        return;
      }
      if (this.router.currentRoute === 'explorer') {
        if (e.key === 'ArrowRight') { e.preventDefault(); this.explorerState.moveFocus(1); }
        if (e.key === 'ArrowLeft') { e.preventDefault(); this.explorerState.moveFocus(-1); }
        if (e.key === 'ArrowDown') { e.preventDefault(); this.explorerState.moveFocusGrid(1); }
        if (e.key === 'ArrowUp') { e.preventDefault(); this.explorerState.moveFocusGrid(-1); }
        if (e.key === 'Enter') {
          const item = this.explorerState.getFocusedItem();
          if (item) { item.type === 'folder' ? this.explorerState.navigateToFolder(item.id) : this.openViewer(item.id); }
        }
        if (e.key === 'Delete' || e.key === 'Backspace') {
          if (this.explorerState.selected.size > 0) { e.preventDefault(); this.bulkDelete(); }
        }
        if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'a') {
          e.preventDefault();
          this.explorerState.selectAll();
        }
      }
    });
  }

  handleEscape() {
    // Close topmost overlay in priority order
    if (!this.contextMenu.el.classList.contains('hidden')) { this.contextMenu.close(); return; }
    if (!document.getElementById('createPopover').classList.contains('hidden')) { document.getElementById('createPopover').classList.add('hidden'); return; }
    if (!this.viewer.backdrop.classList.contains('hidden')) { this.viewer.close(); return; }
    if (!this.editor.backdrop.classList.contains('hidden')) { this.editor.close(); return; }
    if (ModalManager.openStack.length) { ModalManager.closeTop(); return; }
    if (this.explorerState.selected.size > 0) { this.explorerState.clearSelection(); }
  }

  /* =========================================================================
     HOME VIEW RENDERING
     ========================================================================= */
  renderHome() {
    const stats = this.store.computeStats();
    document.getElementById('statTotalSnippets').textContent = stats.totalSnippets;
    document.getElementById('statTotalFolders').textContent = stats.totalFolders;
    document.getElementById('statTotalLanguages').textContent = stats.totalLanguages;
    document.getElementById('statTotalStarred').textContent = stats.totalStarred;
    document.getElementById('statTotalCopies').textContent = stats.totalCopies;

    const hour = new Date().getHours();
    const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';
    document.getElementById('heroGreeting').textContent = `${greeting}, Developer 👋`;

    this.renderLanguageBar();

    const starred = this.store.getSnippets().filter(s => s.starred).slice(0, 6);
    const starredGrid = document.getElementById('starredGrid');
    starredGrid.innerHTML = '';
    if (starred.length === 0) {
      CardRenderer.renderEmptyState(starredGrid, { title: 'No starred snippets yet', message: 'Star your favorite snippets to see them featured here.' });
    } else {
      starred.forEach(s => starredGrid.appendChild(CardRenderer.renderSnippetCard(s)));
    }

    const recentIds = (this.store.getSettings().recentlyViewed || []).slice(0, 6);
    const recentGrid = document.getElementById('recentGrid');
    recentGrid.innerHTML = '';
    const recentSnippets = recentIds.map(id => this.store.getSnippetById(id)).filter(Boolean);
    if (recentSnippets.length === 0) {
      CardRenderer.renderEmptyState(recentGrid, { title: 'No recent activity', message: 'Snippets you view will show up here for quick access.' });
    } else {
      recentSnippets.forEach(s => recentGrid.appendChild(CardRenderer.renderSnippetCard(s)));
    }

    const all = [...this.store.getSnippets()].sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
    document.getElementById('allCount').textContent = `${all.length} total`;
    const allGrid = document.getElementById('allGrid');
    allGrid.innerHTML = '';
    if (all.length === 0) {
      CardRenderer.renderEmptyState(allGrid, {
        title: 'Your vault is empty', message: 'Create your first snippet to get started.',
        actionLabel: 'New Snippet', onAction: () => this.openEditor(null)
      });
    } else {
      all.forEach(s => allGrid.appendChild(CardRenderer.renderSnippetCard(s)));
    }
  }

  renderLanguageBar() {
    const breakdown = this.store.languageBreakdown();
    const bar = document.getElementById('langBar');
    const legend = document.getElementById('langLegend');
    bar.innerHTML = '';
    legend.innerHTML = '';
    const total = breakdown.reduce((sum, b) => sum + b.count, 0) || 1;
    const colors = ['#539bf5', '#57ab5a', '#c69026', '#e5534b', '#986ee2', '#e370c6', '#39c5cf', '#768390', '#f1e05a', '#3572A5'];
    breakdown.forEach((entry, i) => {
      const meta = Utils.langMeta(entry.lang);
      const pct = (entry.count / total) * 100;
      const seg = document.createElement('div');
      seg.className = 'lang-bar-seg';
      seg.style.flexGrow = pct;
      seg.style.background = colors[i % colors.length];
      seg.title = `${meta.label}: ${entry.count} (${pct.toFixed(1)}%)`;
      bar.appendChild(seg);

      const legendItem = document.createElement('div');
      legendItem.className = 'lang-legend-item';
      legendItem.innerHTML = `<span class="lang-legend-dot" style="background:${colors[i % colors.length]}"></span> <strong>${Utils.escapeHtml(meta.label)}</strong> ${entry.count} (${pct.toFixed(0)}%)`;
      legend.appendChild(legendItem);
    });
    if (breakdown.length === 0) {
      bar.innerHTML = '<div class="lang-bar-seg" style="flex-grow:1;background:var(--border-muted)"></div>';
      legend.innerHTML = '<span class="muted small">No snippets yet — add one to see language stats.</span>';
    }
  }

  /* =========================================================================
     EXPLORER VIEW RENDERING
     ========================================================================= */
  populateLangFilterSelect() {
    const select = document.getElementById('langFilter');
    const used = new Set(this.store.getSnippets().map(s => s.language));
    select.innerHTML = '<option value="">All Languages</option>' +
      LANGUAGES.filter(l => used.has(l.value)).map(l => `<option value="${l.value}">${Utils.escapeHtml(l.label)}</option>`).join('');
  }

  renderBreadcrumb() {
    const breadcrumb = document.getElementById('breadcrumb');
    const path = this.store.getFolderPath(this.explorerState.currentFolderId);
    let html = `<span class="breadcrumb-item ${path.length === 0 ? 'current' : ''}" data-folder=""><i class="fa-solid fa-house"></i> Root</span>`;
    path.forEach((folder, i) => {
      html += `<span class="breadcrumb-sep"><i class="fa-solid fa-chevron-right"></i></span>`;
      html += `<span class="breadcrumb-item ${i === path.length - 1 ? 'current' : ''}" data-folder="${folder.id}">${Utils.escapeHtml(folder.name)}</span>`;
    });
    breadcrumb.innerHTML = html;
    breadcrumb.querySelectorAll('.breadcrumb-item').forEach(item => {
      item.addEventListener('click', () => this.explorerState.navigateToFolder(item.dataset.folder || null));
    });
  }

  renderExplorer(skipSelectSync = false) {
    this.populateLangFilterSelect();
    document.getElementById('langFilter').value = this.explorerState.langFilter;
    document.getElementById('sortSelect').value = this.explorerState.sortBy;
    this.renderBreadcrumb();

    const grid = document.getElementById('explorerGrid');
    const emptyState = document.getElementById('explorerEmpty');
    emptyState.classList.add('hidden');
    grid.className = `explorer-grid ${this.explorerState.viewMode === 'list' ? 'list-mode' : this.explorerState.viewMode === 'compact' ? 'compact' : ''}`;
    document.querySelectorAll('.view-toggle-btn').forEach(b => b.classList.toggle('active', b.dataset.view === this.explorerState.viewMode));

    let folders = this.store.getFolderChildren(this.explorerState.currentFolderId);
    let snippets = this.store.getSnippetsInFolder(this.explorerState.currentFolderId);
    snippets = this.explorerState.filterSnippets(snippets);
    if (this.explorerState.searchQuery) {
      const q = this.explorerState.searchQuery.toLowerCase();
      folders = folders.filter(f => f.name.toLowerCase().includes(q));
    }
    const sorted = this.explorerState.sortItems(folders, snippets);

    grid.innerHTML = '';
    this.explorerState.itemOrder = [
      ...sorted.folders.map(f => ({ id: f.id, type: 'folder' })),
      ...sorted.snippets.map(s => ({ id: s.id, type: 'snippet' }))
    ];

    if (sorted.folders.length === 0 && sorted.snippets.length === 0) {
      CardRenderer.renderEmptyState(emptyState, {
        title: 'This folder is empty', message: 'Create a snippet or folder here to get started.',
        actionLabel: 'New Snippet', onAction: () => this.openEditor(null, this.explorerState.currentFolderId)
      });
      grid.classList.add('hidden');
      return;
    }
    grid.classList.remove('hidden');

    sorted.folders.forEach(f => grid.appendChild(CardRenderer.renderFolderCard(f)));
    sorted.snippets.forEach(s => {
      const card = CardRenderer.renderSnippetCard(s, { highlightQuery: this.explorerState.searchQuery });
      if (this.explorerState.selected.has(s.id)) { card.classList.add('selected'); card.querySelector('.card-select-box').checked = true; }
      grid.appendChild(card);
    });
    sorted.folders.forEach((f, i) => {
      const el = grid.children[i];
      if (this.explorerState.selected.has(f.id)) { el.classList.add('selected'); el.querySelector('.card-select-box').checked = true; }
    });

    this.setupExplorerSortable();
  }

  setupExplorerSortable() {
    this.sortableInstances.forEach(inst => inst.destroy());
    this.sortableInstances = [];
    const grid = document.getElementById('explorerGrid');
    if (!window.Sortable || grid.classList.contains('hidden')) return;
    let hoveredFolderEl = null;

    const clearHover = () => { if (hoveredFolderEl) { hoveredFolderEl.classList.remove('drag-over-folder'); hoveredFolderEl = null; } };

    const sortable = Sortable.create(grid, {
      animation: 200,
      draggable: '.snippet-card, .folder-card',
      onMove: (evt) => {
        // Highlight folder card under the pointer while dragging (visual drop-target feedback)
        clearHover();
        const overEl = evt.related;
        if (overEl && overEl.classList.contains('folder-card') && overEl !== evt.dragged) {
          hoveredFolderEl = overEl;
          hoveredFolderEl.classList.add('drag-over-folder');
        }
        return true;
      },
      onEnd: (evt) => {
        const draggedEl = evt.item;
        const draggedId = draggedEl.dataset.id;
        const draggedType = draggedEl.dataset.type;
        const oe = evt.originalEvent;
        let dropTarget = null;
        if (oe && typeof oe.clientX === 'number') {
          const elAtPoint = document.elementFromPoint(oe.clientX, oe.clientY);
          dropTarget = elAtPoint ? elAtPoint.closest('.folder-card') : null;
        }
        clearHover();

        if (dropTarget && dropTarget.dataset.id !== draggedId) {
          const targetFolderId = dropTarget.dataset.id;
          if (draggedType === 'snippet') {
            this.store.moveSnippetToFolder(draggedId, targetFolderId);
            ToastManager.success('Moved into folder', dropTarget.querySelector('.folder-name')?.textContent || '');
          } else {
            const moved = this.store.moveFolderToFolder(draggedId, targetFolderId);
            if (moved) ToastManager.success('Moved into folder', dropTarget.querySelector('.folder-name')?.textContent || '');
            else ToastManager.warning('Cannot move folder', 'A folder cannot be moved into itself or its own subfolder.');
          }
          this.renderExplorer(true);
          return;
        }

        // Otherwise treat as a plain reorder within the current folder
        const orderedSnippetIds = [...grid.querySelectorAll('.snippet-card')].map(el => el.dataset.id);
        this.store.reorderSnippets(orderedSnippetIds);
        this.renderExplorer(true);
      }
    });
    this.sortableInstances.push(sortable);
  }


  updateBulkToolbar() {
    const count = this.explorerState.selected.size;
    const toolbar = document.getElementById('bulkToolbar');
    toolbar.classList.toggle('hidden', count === 0);
    document.getElementById('bulkCount').textContent = `${count} selected`;
  }

  /* =========================================================================
     STARRED / RECENTS / TRASH VIEWS
     ========================================================================= */
  renderStarredFull() {
    const grid = document.getElementById('starredFullGrid');
    const empty = document.getElementById('starredEmpty');
    const starred = this.store.getSnippets().filter(s => s.starred);
    grid.innerHTML = '';
    empty.classList.add('hidden');
    if (starred.length === 0) {
      CardRenderer.renderEmptyState(empty, { title: 'No starred snippets', message: 'Star snippets from any card to bookmark them here.' });
      grid.classList.add('hidden');
    } else {
      grid.classList.remove('hidden');
      starred.forEach(s => grid.appendChild(CardRenderer.renderSnippetCard(s)));
    }
  }

  renderRecentsFull() {
    const grid = document.getElementById('recentsFullGrid');
    const empty = document.getElementById('recentsEmpty');
    const ids = this.store.getSettings().recentlyViewed || [];
    const snippets = ids.map(id => this.store.getSnippetById(id)).filter(Boolean);
    grid.innerHTML = '';
    empty.classList.add('hidden');
    if (snippets.length === 0) {
      CardRenderer.renderEmptyState(empty, { title: 'Nothing viewed yet', message: 'Open a snippet to start building your recent history.' });
      grid.classList.add('hidden');
    } else {
      grid.classList.remove('hidden');
      snippets.forEach(s => grid.appendChild(CardRenderer.renderSnippetCard(s)));
    }
  }

  renderTrash() {
    const grid = document.getElementById('trashGrid');
    const empty = document.getElementById('trashEmpty');
    const trash = this.store.getTrash();
    grid.innerHTML = '';
    empty.classList.add('hidden');
    if (trash.length === 0) {
      CardRenderer.renderEmptyState(empty, { title: 'Trash is empty', message: 'Deleted snippets and folders will appear here for 30 days before being lost for good.' });
      grid.classList.add('hidden');
      return;
    }
    grid.classList.remove('hidden');
    trash.forEach((entry, index) => {
      const card = document.createElement('div');
      card.className = 'snippet-card';
      const isSnippet = entry.type === 'snippet';
      const title = isSnippet ? entry.item.title : entry.item.name;
      const icon = isSnippet ? 'fa-file-code' : 'fa-folder';
      card.innerHTML = `
        <div class="card-top-row">
          <span class="lang-badge lang-default"><i class="fa-solid ${icon}"></i> ${isSnippet ? Utils.langMeta(entry.item.language).label : 'Folder'}</span>
        </div>
        <div class="card-title">${Utils.escapeHtml(title)}</div>
        <div class="card-desc">Deleted ${Utils.formatDate(entry.deletedAt)}</div>
        <div class="card-actions">
          <button class="card-action-btn restore-btn"><i class="fa-solid fa-clock-rotate-left"></i> Restore</button>
          <button class="card-action-btn danger delete-forever-btn"><i class="fa-solid fa-fire"></i> Delete Forever</button>
        </div>
      `;
      card.querySelector('.restore-btn').addEventListener('click', () => {
        this.store.restoreFromTrash(index);
        ToastManager.success('Restored', `"${title}" has been restored.`);
        this.renderTrash();
      });
      card.querySelector('.delete-forever-btn').addEventListener('click', async () => {
        const confirmed = await ModalManager.confirm({ title: 'Delete forever?', message: `"${title}" will be permanently deleted.`, okText: 'Delete Forever' });
        if (confirmed) { this.store.removeFromTrashPermanently(index); this.renderTrash(); ToastManager.success('Permanently deleted'); }
      });
      grid.appendChild(card);
    });
  }

  /* =========================================================================
     SEARCH (global navbar search + dedicated search view)
     ========================================================================= */
  bindSearch() {
    const input = document.getElementById('globalSearch');
    const suggestions = document.getElementById('searchSuggestions');
    const debouncedSearch = Utils.debounce((val) => this.renderSearchSuggestions(val), SEARCH_DEBOUNCE_MS);

    input.addEventListener('input', (e) => debouncedSearch(e.target.value));
    input.addEventListener('focus', () => { if (input.value.trim()) this.renderSearchSuggestions(input.value); else this.renderSearchSuggestions(''); });
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        this.commitSearch(input.value);
        suggestions.classList.add('hidden');
      }
    });
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.navbar-search')) suggestions.classList.add('hidden');
    });

    ['searchLangFilter', 'searchTagFilter', 'searchFolderFilter', 'searchStarredOnly', 'searchDateFrom', 'searchDateTo', 'searchSort'].forEach(id => {
      document.getElementById(id).addEventListener('change', () => this.renderSearch(document.getElementById('globalSearch').value));
    });
  }

  renderSearchSuggestions(query) {
    const box = document.getElementById('searchSuggestions');
    const recents = this.store.getSettings().recentSearches || [];
    if (!query.trim()) {
      if (recents.length === 0) { box.classList.add('hidden'); return; }
      box.innerHTML = '<div class="search-suggestion-section">Recent Searches</div>' +
        recents.map(r => `<div class="search-suggestion-item search-suggestion-recent" data-query="${Utils.escapeHtml(r)}"><i class="fa-solid fa-clock-rotate-left"></i> ${Utils.escapeHtml(r)}</div>`).join('');
      box.classList.remove('hidden');
    } else {
      const q = query.toLowerCase();
      const matches = this.store.getSnippets().filter(s =>
        s.title.toLowerCase().includes(q) || (s.tags || []).some(t => t.includes(q)) || (s.description || '').toLowerCase().includes(q)
      ).slice(0, 8);
      if (matches.length === 0) {
        box.innerHTML = `<div class="search-suggestion-item"><i class="fa-solid fa-magnifying-glass"></i> No matches for "${Utils.escapeHtml(query)}"</div>`;
      } else {
        box.innerHTML = matches.map(s => {
          const lang = Utils.langMeta(s.language);
          return `<div class="search-suggestion-item" data-id="${s.id}"><span class="lang-badge ${lang.badge}" style="font-size:9px;">${Utils.escapeHtml(lang.label)}</span> ${Utils.highlightMatches(s.title, query)}</div>`;
        }).join('');
      }
      box.classList.remove('hidden');
    }
    box.querySelectorAll('[data-id]').forEach(el => {
      el.addEventListener('click', () => { box.classList.add('hidden'); document.getElementById('globalSearch').value = ''; this.openViewer(el.dataset.id); });
    });
    box.querySelectorAll('[data-query]').forEach(el => {
      el.addEventListener('click', () => {
        document.getElementById('globalSearch').value = el.dataset.query;
        this.commitSearch(el.dataset.query);
        box.classList.add('hidden');
      });
    });
  }

  commitSearch(query) {
    if (!query.trim()) return;
    this.store.addRecentSearch(query.trim());
    this.router.navigate('search', { q: query.trim() });
  }

  populateSearchFilterSelects() {
    const langSelect = document.getElementById('searchLangFilter');
    const used = new Set(this.store.getSnippets().map(s => s.language));
    langSelect.innerHTML = '<option value="">All Languages</option>' + LANGUAGES.filter(l => used.has(l.value)).map(l => `<option value="${l.value}">${Utils.escapeHtml(l.label)}</option>`).join('');

    const tagSelect = document.getElementById('searchTagFilter');
    tagSelect.innerHTML = '<option value="">All Tags</option>' + this.store.allTagNames().map(t => `<option value="${t}">#${Utils.escapeHtml(t)}</option>`).join('');

    const folderSelect = document.getElementById('searchFolderFilter');
    folderSelect.innerHTML = '<option value="">All Folders</option>' + this.store.getFolders().map(f => `<option value="${f.id}">${Utils.escapeHtml(f.name)}</option>`).join('');
  }

  renderSearch(query) {
    this.populateSearchFilterSelects();
    document.getElementById('globalSearch').value = query;
    const q = (query || '').toLowerCase();
    let results = this.store.getSnippets();
    if (q) {
      results = results.filter(s =>
        s.title.toLowerCase().includes(q) ||
        (s.description || '').toLowerCase().includes(q) ||
        (s.tags || []).some(t => t.includes(q)) ||
        s.language.toLowerCase().includes(q)
      );
    }
    const langFilter = document.getElementById('searchLangFilter').value;
    const tagFilter = document.getElementById('searchTagFilter').value;
    const folderFilter = document.getElementById('searchFolderFilter').value;
    const starredOnly = document.getElementById('searchStarredOnly').checked;
    const dateFrom = document.getElementById('searchDateFrom').value;
    const dateTo = document.getElementById('searchDateTo').value;
    const sortMode = document.getElementById('searchSort').value;

    if (langFilter) results = results.filter(s => s.language === langFilter);
    if (tagFilter) results = results.filter(s => (s.tags || []).includes(tagFilter));
    if (folderFilter) results = results.filter(s => s.folderId === folderFilter);
    if (starredOnly) results = results.filter(s => s.starred);
    if (dateFrom) results = results.filter(s => new Date(s.updatedAt) >= new Date(dateFrom));
    if (dateTo) results = results.filter(s => new Date(s.updatedAt) <= new Date(dateTo + 'T23:59:59'));

    switch (sortMode) {
      case 'date-desc': results.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)); break;
      case 'date-asc': results.sort((a, b) => new Date(a.updatedAt) - new Date(b.updatedAt)); break;
      case 'copies': results.sort((a, b) => (b.copies || 0) - (a.copies || 0)); break;
      default: break; // relevance = original filtered order
    }

    document.getElementById('searchResultCount').textContent = `(${results.length})`;
    const grid = document.getElementById('searchResultsGrid');
    const empty = document.getElementById('searchEmpty');
    grid.innerHTML = '';
    empty.classList.add('hidden');
    if (results.length === 0) {
      CardRenderer.renderEmptyState(empty, { title: 'No results found', message: `We couldn't find anything matching "${query}". Try different keywords or filters.` });
      grid.classList.add('hidden');
    } else {
      grid.classList.remove('hidden');
      results.forEach(s => grid.appendChild(CardRenderer.renderSnippetCard(s, { highlightQuery: query })));
    }

    const recentBox = document.getElementById('recentSearches');
    const recents = this.store.getSettings().recentSearches || [];
    recentBox.innerHTML = recents.map(r => `<span class="recent-search-chip" data-q="${Utils.escapeHtml(r)}"><i class="fa-solid fa-clock-rotate-left"></i> ${Utils.escapeHtml(r)}</span>`).join('');
    recentBox.querySelectorAll('.recent-search-chip').forEach(chip => {
      chip.addEventListener('click', () => this.router.navigate('search', { q: chip.dataset.q }));
    });
  }

  /* =========================================================================
     SNIPPET ACTIONS (open, copy, star, pin, delete, duplicate, rename, etc.)
     ========================================================================= */
  openEditor(snippetId, defaultFolderId) {
    if (snippetId) this.editor.openForEdit(snippetId);
    else this.editor.openForCreate(defaultFolderId || this.explorerState.currentFolderId);
  }

  openViewer(snippetId) {
    this.viewer.open(snippetId);
  }

  openInNewTab(snippetId) {
    const url = `${window.location.origin}${window.location.pathname}#/view/${snippetId}`;
    window.open(url, '_blank');
  }

  async copySnippetCode(snippetId) {
    const snippet = this.store.getSnippetById(snippetId);
    if (!snippet) return;
    const ok = await Utils.copyToClipboard(snippet.code);
    if (ok) {
      this.store.incrementCopies(snippetId);
      ToastManager.success('Copied to clipboard', `"${snippet.title}" code copied.`);
      this.refreshCurrentView();
    } else {
      ToastManager.error('Copy failed', 'Your browser blocked clipboard access.');
    }
  }

  toggleStar(snippetId, refreshViewer = false) {
    const snippet = this.store.toggleStar(snippetId);
    if (!snippet) return;
    ToastManager.info(snippet.starred ? 'Starred' : 'Unstarred', snippet.title);
    if (refreshViewer) this.viewer.open(snippetId); else this.refreshCurrentView();
  }

  togglePin(snippetId, refreshViewer = false) {
    const snippet = this.store.togglePin(snippetId);
    if (!snippet) return;
    ToastManager.info(snippet.pinned ? 'Pinned to top' : 'Unpinned', snippet.title);
    if (refreshViewer) this.viewer.open(snippetId); else this.refreshCurrentView();
  }

  async deleteSnippetWithConfirm(snippetId) {
    const snippet = this.store.getSnippetById(snippetId);
    if (!snippet) return;
    const confirmed = await ModalManager.confirm({ title: 'Delete snippet?', message: `"${snippet.title}" will be moved to Trash.`, okText: 'Delete' });
    if (!confirmed) return;
    this.store.deleteSnippet(snippetId);
    ToastManager.success('Moved to trash', `"${snippet.title}" can be restored from Trash.`);
    this.refreshCurrentView();
  }

  duplicateSnippet(snippetId) {
    const copy = this.store.duplicateSnippet(snippetId);
    if (copy) { ToastManager.success('Duplicated', `Created "${copy.title}".`); this.refreshCurrentView(); }
  }

  async renameSnippet(snippetId) {
    const snippet = this.store.getSnippetById(snippetId);
    if (!snippet) return;
    const newTitle = prompt('Rename snippet:', snippet.title);
    if (newTitle && newTitle.trim() && newTitle.trim() !== snippet.title) {
      this.store.updateSnippet(snippetId, { title: newTitle.trim() });
      ToastManager.success('Renamed', newTitle.trim());
      this.refreshCurrentView();
    }
  }

  async renameFolder(folderId) {
    const folder = this.store.getFolderById(folderId);
    if (!folder) return;
    const newName = prompt('Rename folder:', folder.name);
    if (newName && newName.trim() && newName.trim() !== folder.name) {
      this.store.renameFolder(folderId, newName.trim());
      ToastManager.success('Folder renamed', newName.trim());
      this.refreshCurrentView();
    }
  }

  cycleFolderColor(folderId) {
    const folder = this.store.getFolderById(folderId);
    if (!folder) return;
    const idx = FOLDER_COLORS.indexOf(folder.color);
    folder.color = FOLDER_COLORS[(idx + 1) % FOLDER_COLORS.length];
    this.store.save();
    ToastManager.info('Folder color updated');
    this.refreshCurrentView();
  }

  async deleteFolderWithConfirm(folderId) {
    const folder = this.store.getFolderById(folderId);
    if (!folder) return;
    const confirmed = await ModalManager.confirm({ title: 'Delete folder?', message: `"${folder.name}" and its subfolders will be removed. Snippets inside will move to Root.`, okText: 'Delete' });
    if (!confirmed) return;
    this.store.deleteFolder(folderId);
    ToastManager.success('Folder deleted', folder.name);
    this.refreshCurrentView();
  }

  downloadSnippet(snippetId) {
    const snippet = this.store.getSnippetById(snippetId);
    if (!snippet) return;
    const lang = Utils.langMeta(snippet.language);
    const filename = `${Utils.slugify(snippet.title)}.${lang.ext}`;
    Utils.downloadTextFile(filename, snippet.code);
    ToastManager.success('Downloaded', filename);
  }

  exportSnippetAsMarkdown(snippetId) {
    const snippet = this.store.getSnippetById(snippetId);
    if (!snippet) return;
    const lang = Utils.langMeta(snippet.language);
    const md = `# ${snippet.title}\n\n${snippet.description || ''}\n\n**Language:** ${lang.label}  \n**Tags:** ${(snippet.tags || []).map(t => '#' + t).join(', ')}  \n**License:** ${LICENSE_LABELS[snippet.license] || 'None'}\n\n\`\`\`${lang.value}\n${snippet.code}\n\`\`\`\n`;
    Utils.downloadTextFile(`${Utils.slugify(snippet.title)}.md`, md);
    ToastManager.success('Exported as Markdown');
  }

  exportFolder(folderId) {
    const folder = this.store.getFolderById(folderId);
    if (!folder) return;
    const descendantIds = [folderId, ...this.store.collectDescendantFolderIds(folderId)];
    const snippets = this.store.getSnippets().filter(s => descendantIds.includes(s.folderId));
    Utils.downloadJSON(`${Utils.slugify(folder.name)}-folder.json`, { folder, snippets, exportedAt: Utils.nowISO() });
    ToastManager.success('Folder exported', `${snippets.length} snippet(s) included.`);
  }

  exportAll() {
    const data = this.store.exportAll();
    Utils.downloadJSON(`codevault-export-${new Date().toISOString().slice(0, 10)}.json`, data);
    ToastManager.success('Export complete', 'All snippets, folders, and settings exported as JSON.');
  }

  copyShareLink(snippetId) {
    const url = `${window.location.origin}${window.location.pathname}#/view/${snippetId}`;
    Utils.copyToClipboard(url).then(ok => { if (ok) ToastManager.success('Link copied', url); });
  }

  openShareModal(snippetId) {
    const snippet = this.store.getSnippetById(snippetId);
    if (!snippet) return;
    this.shareTargetId = snippetId;
    const url = `${window.location.origin}${window.location.pathname}#/view/${snippetId}`;
    document.getElementById('shareLinkInput').value = url;
    ModalManager.open(document.getElementById('shareModalBackdrop'));
  }

  addToDefaultCollection(snippetId) {
    let collections = this.store.getCollections();
    if (collections.length === 0) {
      const col = this.store.createCollection('My Collection', 'Snippets I want to keep together.');
      collections = this.store.getCollections();
    }
    this.store.addToCollection(collections[0].id, snippetId);
    ToastManager.success('Added to collection', collections[0].name);
  }

  /* =========================================================================
     FOLDER MODAL (create)
     ========================================================================= */
  openFolderModal(parentId = null) {
    this.folderModalParentId = parentId;
    this.folderModalEditId = null;
    document.getElementById('folderModalHeading').textContent = 'New Folder';
    document.getElementById('folderNameInput').value = '';
    const parentSelect = document.getElementById('folderParentSelect');
    this.editor.populateFolderSelect(parentSelect);
    parentSelect.value = parentId || this.explorerState.currentFolderId || '';
    this.selectedFolderColor = FOLDER_COLORS[0];
    this.renderFolderColorSwatches();
    ModalManager.open(document.getElementById('folderModalBackdrop'));
    setTimeout(() => document.getElementById('folderNameInput').focus(), 60);
  }

  saveFolderModal() {
    const name = document.getElementById('folderNameInput').value.trim();
    if (!name) { ToastManager.warning('Name required', 'Please enter a folder name.'); return; }
    const parentId = document.getElementById('folderParentSelect').value || null;
    const folder = this.store.createFolder(name, parentId, this.selectedFolderColor);
    ToastManager.success('Folder created', name);
    ModalManager.close(document.getElementById('folderModalBackdrop'));
    this.refreshCurrentView();
  }

  /* =========================================================================
     COLLECTION MODAL (create)
     ========================================================================= */
  openCollectionModal() {
    document.getElementById('collectionNameInput').value = '';
    document.getElementById('collectionDescInput').value = '';
    ModalManager.open(document.getElementById('collectionModalBackdrop'));
    setTimeout(() => document.getElementById('collectionNameInput').focus(), 60);
  }

  saveCollectionModal() {
    const name = document.getElementById('collectionNameInput').value.trim();
    if (!name) { ToastManager.warning('Name required', 'Please enter a collection name.'); return; }
    const desc = document.getElementById('collectionDescInput').value.trim();
    this.store.createCollection(name, desc);
    ToastManager.success('Collection created', name);
    ModalManager.close(document.getElementById('collectionModalBackdrop'));
  }

  /* =========================================================================
     MOVE TO FOLDER MODAL
     ========================================================================= */
  openMoveModal(snippetIds = [], folderIds = []) {
    if (snippetIds.length === 0 && folderIds.length === 0) { ToastManager.warning('Nothing selected', 'Select items to move first.'); return; }
    this.moveModalIds = { snippets: snippetIds, folders: folderIds };
    const select = document.getElementById('moveFolderSelect');
    // Exclude the folder(s) being moved (and their descendants) from destination options to prevent circular nesting
    this.editor.populateFolderSelect(select, folderIds[0] || null);
    ModalManager.open(document.getElementById('moveModalBackdrop'));
  }

  confirmMove() {
    const destination = document.getElementById('moveFolderSelect').value || null;
    const { snippets, folders } = this.moveModalIds;
    snippets.forEach(id => this.store.moveSnippetToFolder(id, destination));
    let moveFailures = 0;
    folders.forEach(id => { if (!this.store.moveFolderToFolder(id, destination)) moveFailures++; });
    if (moveFailures > 0) ToastManager.warning('Some folders were not moved', 'Cannot move a folder into itself or its own subfolder.');
    ToastManager.success('Moved', `${snippets.length + folders.length - moveFailures} item(s) moved.`);
    ModalManager.close(document.getElementById('moveModalBackdrop'));
    this.explorerState.clearSelection();
    this.refreshCurrentView();
  }

  /* =========================================================================
     ADD TAGS MODAL
     ========================================================================= */
  openTagsModal(snippetId) {
    const snippet = this.store.getSnippetById(snippetId);
    if (!snippet) return;
    this.tagsModalTargetId = snippetId;
    document.getElementById('tagsModalInput').value = (snippet.tags || []).join(', ');
    document.getElementById('tagsModalSuggestions').innerHTML = '';
    ModalManager.open(document.getElementById('tagsModalBackdrop'));
    setTimeout(() => document.getElementById('tagsModalInput').focus(), 60);
  }

  renderTagsModalSuggestions(raw) {
    const container = document.getElementById('tagsModalSuggestions');
    const lastFragment = raw.split(',').pop().trim().toLowerCase();
    if (!lastFragment) { container.innerHTML = ''; return; }
    const allTags = this.store.allTagNames();
    const matches = allTags.filter(t => t.includes(lastFragment)).slice(0, 8);
    container.innerHTML = matches.map(t => `<span class="tag-suggestion-chip" data-tag="${Utils.escapeHtml(t)}">#${Utils.escapeHtml(t)}</span>`).join('');
    container.querySelectorAll('.tag-suggestion-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        const input = document.getElementById('tagsModalInput');
        const parts = input.value.split(',').map(s => s.trim()).filter(Boolean);
        parts[parts.length - 1] = chip.dataset.tag;
        input.value = parts.join(', ') + ', ';
        container.innerHTML = '';
        input.focus();
      });
    });
  }

  confirmAddTags() {
    const raw = document.getElementById('tagsModalInput').value;
    const tags = Utils.parseTags(raw);
    this.store.updateSnippet(this.tagsModalTargetId, { tags }, { trackVersion: false });
    ToastManager.success('Tags updated');
    ModalManager.close(document.getElementById('tagsModalBackdrop'));
    this.refreshCurrentView();
  }

  /* =========================================================================
     BULK ACTIONS (explorer multi-select toolbar)
     ========================================================================= */
  bulkStar() {
    const ids = this.explorerState.getSelectedSnippetIds();
    ids.forEach(id => {
      const s = this.store.getSnippetById(id);
      if (s && !s.starred) this.store.toggleStar(id);
    });
    ToastManager.success('Starred', `${ids.length} snippet(s) starred.`);
    this.refreshCurrentView();
  }

  async bulkDelete() {
    const snippetIds = this.explorerState.getSelectedSnippetIds();
    const folderIds = this.explorerState.getSelectedFolderIds();
    const total = snippetIds.length + folderIds.length;
    if (total === 0) return;
    const confirmed = await ModalManager.confirm({ title: `Delete ${total} item(s)?`, message: 'Snippets will move to Trash. Folders will be removed and their snippets moved to Root.', okText: 'Delete' });
    if (!confirmed) return;
    snippetIds.forEach(id => this.store.deleteSnippet(id));
    folderIds.forEach(id => this.store.deleteFolder(id));
    ToastManager.success('Deleted', `${total} item(s) removed.`);
    this.explorerState.clearSelection();
    this.refreshCurrentView();
  }

  bulkExport() {
    const snippetIds = this.explorerState.getSelectedSnippetIds();
    const snippets = snippetIds.map(id => this.store.getSnippetById(id)).filter(Boolean);
    if (snippets.length === 0) { ToastManager.warning('No snippets selected', 'Select at least one snippet to export.'); return; }
    Utils.downloadJSON(`codevault-selection-${Date.now()}.json`, { snippets, exportedAt: Utils.nowISO() });
    ToastManager.success('Exported', `${snippets.length} snippet(s) exported.`);
  }

  /* =========================================================================
     IMPORT (JSON file + GitHub Gist)
     ========================================================================= */
  performImport() {
    const activeTab = document.querySelector('.import-tab.active').dataset.tab;
    if (activeTab === 'json') {
      const fileInput = document.getElementById('importFileInput');
      const file = fileInput.files[0];
      if (!file) { ToastManager.warning('No file selected', 'Choose a JSON file to import.'); return; }
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const json = JSON.parse(e.target.result);
          const count = this.store.importData(json);
          ToastManager.success('Import complete', `${count} snippet(s) imported.`);
          ModalManager.close(document.getElementById('importModalBackdrop'));
          this.refreshCurrentView();
        } catch (err) {
          ToastManager.error('Invalid file', 'Could not parse the selected JSON file.');
        }
      };
      reader.readAsText(file);
    } else {
      if (!this._gistPreviewData) { ToastManager.warning('Fetch a gist first', 'Paste a Gist URL and click "Fetch Gist".'); return; }
      const count = this.store.importData(this._gistPreviewData);
      ToastManager.success('Gist imported', `${count} snippet(s) imported.`);
      ModalManager.close(document.getElementById('importModalBackdrop'));
      this.refreshCurrentView();
    }
  }

  async fetchGistPreview() {
    const url = document.getElementById('gistUrlInput').value.trim();
    const match = url.match(/gist\.github\.com\/[^/]+\/([a-f0-9]+)/i);
    if (!match) { ToastManager.warning('Invalid Gist URL', 'Please paste a valid GitHub Gist URL.'); return; }
    const gistId = match[1];
    try {
      const res = await fetch(`https://api.github.com/gists/${gistId}`);
      if (!res.ok) throw new Error('Gist not found');
      const data = await res.json();
      const files = Object.values(data.files || {});
      const snippets = files.map(f => {
        const ext = (f.filename.split('.').pop() || '').toLowerCase();
        const langEntry = LANGUAGES.find(l => l.ext === ext) || Utils.langMeta('plaintext');
        return {
          id: Utils.uid('snp'), title: f.filename, language: langEntry.value,
          description: data.description || `Imported from GitHub Gist ${gistId}`,
          code: f.content, tags: ['gist', 'imported'], folderId: null,
          visibility: data.public ? 'public' : 'private', license: 'none',
          starred: false, pinned: false, views: 0, copies: 0,
          createdAt: Utils.nowISO(), updatedAt: Utils.nowISO(), versions: [], order: 0
        };
      });
      this._gistPreviewData = { snippets, folders: [] };
      ToastManager.success('Gist fetched', `${snippets.length} file(s) ready to import. Click Import to confirm.`);
    } catch (err) {
      ToastManager.error('Failed to fetch gist', 'Check the URL and your network connection.');
    }
  }
}

/* =============================================================================
   SECTION 13: BOOTSTRAP
   ============================================================================= */

document.addEventListener('DOMContentLoaded', () => {
  try {
    window.CodeVaultApp = new CodeVaultApp();
  } catch (err) {
    console.error('CodeVault failed to initialize', err);
    const container = document.getElementById('toast-container');
    if (container) {
      const toast = document.createElement('div');
      toast.className = 'toast error';
      toast.innerHTML = '<i class="fa-solid fa-circle-xmark toast-icon"></i><div class="toast-body"><div class="toast-title">Failed to start CodeVault</div><div class="toast-msg">Please check the browser console for details and reload the page.</div></div>';
      container.appendChild(toast);
    }
  }
});








