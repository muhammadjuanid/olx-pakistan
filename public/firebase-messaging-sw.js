var dataCacheName = 'dynamic v4';
var cacheName = 'static v4';
var filesToCachefirst = [
  '/',
  '/index.html',
  '/script.js',
  '/style.css',
]
var filetocachelete = [
  '/adPage/page.html',
  '/adPage/css/style.css',
  '/adPage/js/script.js',
  '/fav/fav.css',
  '/fav/fav.html',
  '/fav/fav.js',
];

self.addEventListener('install', function(e) {
  console.log('[ServiceWorker] Install');
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log('[ServiceWorker] Caching app shell');
      cache.addAll(filetocachelete)
      return cache.addAll(filesToCachefirst);
    })
  );
});

self.addEventListener('activate', function(e) {
  console.log('[ServiceWorker] Activate');
  e.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if (key !== cacheName && key !== dataCacheName) {
          console.log('[ServiceWorker] Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })    
  );
   return self.clients.claim();
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
      caches.open(dataCacheName).then(function(cache){
          return fetch(event.request).then(function(responce){
              cache.put(event.request.url , responce.clone());
              return responce;
          }).catch(function(err){
              return cache.match(event.request).then(function(res){
                  return res;
              })
          })
      })
  )
});


self.addEventListener('push', function (event) {
    console.log('Received a push message', event);
  
    var notification = event.data.json().notification
    console.log(notification)
    var title = notification.title;
    var body = notification.body;
    var icon = notification.icon  
    event.waitUntil(
      self.registration.showNotification(title, {
        body: body,
        icon : "/images/icons/icon-144x144.png",
        vibrate: [200, 100, 200, 100, 200, 100, 200]
      })
    );
  
  });

