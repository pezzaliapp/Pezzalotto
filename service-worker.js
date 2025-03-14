self.addEventListener("install", event => {
    console.log("Service Worker installing.");
    event.waitUntil(
        caches.open("pezzalotto-cache").then(cache => {
            return cache.addAll([
                "index.html",
                "style.css",
                "app.js",
                "manifest.json",
                "icon/Pezzalotto-192.png",
                "icon/Pezzalotto-512.png"
            ]);
        })
    );
});

self.addEventListener("fetch", event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        })
    );
});
