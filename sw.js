const CACHE = "retro-__BUILD_SHA__";
const FONTS = "retro-fonts";
const CORE = ["./", "index.html", "manifest.webmanifest", "icon.svg", "icon-192.png", "icon-512.png", "icon-maskable-512.png"];

self.addEventListener("install", event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(CORE)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k.startsWith("retro-") && k !== CACHE && k !== FONTS).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", event => {
  const req = event.request;
  if(req.method !== "GET") return;
  const url = new URL(req.url);

  if(url.origin === "https://fonts.googleapis.com" || url.origin === "https://fonts.gstatic.com"){
    event.respondWith(caches.open(FONTS).then(async cache => {
      const hit = await cache.match(req);
      const net = fetch(req).then(res => {
        if(res.ok || res.type === "opaque") cache.put(req, res.clone());
        return res;
      }).catch(() => hit);
      return hit || net;
    }));
    return;
  }

  if(url.origin !== self.location.origin) return;

  if(req.mode === "navigate"){
    event.respondWith(
      fetch(req).then(res => {
        if(res.ok){
          const copy = res.clone();
          caches.open(CACHE).then(cache => cache.put("index.html", copy));
        }
        return res;
      }).catch(() => caches.match("index.html"))
    );
    return;
  }

  event.respondWith(
    caches.match(req).then(hit => hit || fetch(req).then(res => {
      if(res.ok){
        const copy = res.clone();
        caches.open(CACHE).then(cache => cache.put(req, copy));
      }
      return res;
    }))
  );
});
