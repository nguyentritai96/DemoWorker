console.log('Active Service Worker');

importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');

if (workbox) {
    console.log(`Yay! Workbox is loaded 🎉`);
} else {
    console.log(`Boo! Workbox didn't load 😬`);
}


// Cache
const filesToCache = [
    '/',
    'style/main.css',
    'images/still_life_medium.jpg',
    'index.html',
    'pages/offline.html',
    'pages/404.html'
];

workbox.precaching.precacheAndRoute(filesToCache);


workbox.routing.registerRoute(
    new RegExp('/'),
    new workbox.strategies.NetworkFirst({
        cacheName: 'pages-cache',
        plugins: [
            new workbox.expiration.ExpirationPlugin({
                maxEntries: 1000,
                maxAgeSeconds: 30 * 24 * 60 * 60
            })
        ]
    })
);