const BASE_PATH = new URL("./", self.location.href).pathname;
const CACHE_PREFIX = `hse-fieldlog:${BASE_PATH}:`;
const CACHE_NAME = `${CACHE_PREFIX}v1.9.1`;
const RELATIVE_FILES = ["", "assets/index-H9Rqb9TA.css", "assets/index-pages-b05ac4a8bef9.js", "assets/web-BvS6VZG3.js", "assets/web-DFVxhFvK.js", "assets/web-DxHnq0fF.js", "favicon.svg", "file.svg", "globe.svg", "index.html", "manifest.webmanifest", "window.svg"];
const APP_SHELL = RELATIVE_FILES.map((path) => `${BASE_PATH}${path}`);
self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE_NAME)
    .then((cache) => cache.addAll(APP_SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", (event) => {
  event.waitUntil(caches.keys().then((keys) => Promise.all(
    keys.filter((key) => key.startsWith(CACHE_PREFIX) && key !== CACHE_NAME)
      .map((key) => caches.delete(key)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", (event) => {
  const request = event.request;
  if (request.method !== "GET") return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin || url.search) return;
  const appDocument = url.pathname === BASE_PATH || url.pathname === `${BASE_PATH}index.html`;
  const staticAsset = APP_SHELL.includes(url.pathname);
  if (!appDocument && !staticAsset) return;
  event.respondWith(fetch(request).then((response) => {
    if (response.ok) {
      const copy = response.clone();
      event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.put(request, copy)).catch(() => {}));
    }
    return response;
  }).catch(async () => {
    const cached = await caches.match(request);
    if (cached) return cached;
    if (request.mode === "navigate") {
      const shell = await caches.match(BASE_PATH);
      if (shell) return shell;
    }
    return new Response("Offline", { status: 503, headers: { "Content-Type": "text/plain; charset=utf-8" } });
  }));
});
