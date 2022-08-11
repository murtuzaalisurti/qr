const qrcodes = "qrcodes";
const assets = [
    "/",
    "/index.html",
    "/css/output.css",
    "/js/app.js",
    "/js/scanner.js",
];

self.addEventListener("install", (installEvent) => {
    installEvent.waitUntil(
        caches.open(qrcodes).then((cache) => {
            cache.addAll(assets);
        })
    );
});

self.addEventListener("fetch", (fetchEvent) => {
    fetchEvent.respondWith(
        // network request first instead of cache
        fetch(fetchEvent.request).catch(function () {
            return caches.match(fetchEvent.request);
        })

        /*------------------------------------------*/

        // cache first instead of network request

        /* caches.match(fetchEvent.request).then(res => {
             return res || fetch(fetchEvent.request)
        }) */
    );
});
