const CACHE_NAME = 'iron-crypt-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/style.css', // Assuming you have an external stylesheet
  '/script.js', // Assuming you have an external script
  '/Images/logo.png',
  // Add more assets here
  'https://res.cloudinary.com/dzhvdoifb/image/upload/v1756575574/image_2025-08-30_123932089_vs6rlz.png',
  'https://res.cloudinary.com/dzhvdoifb/image/upload/v1756592064/image_2025-08-30_171422415_ev3fj9.png',
  'https://res.cloudinary.com/dzhvdoifb/image/upload/v1756575686/image_2025-08-30_124109810_r72iyh.png',
  'https://res.cloudinary.com/dzhvdoifb/image/upload/v1756593390/image_2025-08-30_173628557_hyarvf.png',
  'https://res.cloudinary.com/dzhvdoifb/image/upload/v1756593248/image_2025-08-30_173357301_lffgkg.png',
  'https://res.cloudinary.com/dzhvdoifb/image/upload/v1756593312/image_2025-08-30_173510315_yc468n.png',
  'https://res.cloudinary.com/dzhvdoifb/image/upload/v1756575740/image_2025-08-30_124218986_omhs4g.png'
];

// Install event: Caches all listed assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch event: Serves cached assets when offline
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});

// Activate event: Deletes old caches
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
