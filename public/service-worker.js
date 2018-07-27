var dataCacheName = 'Olx-Pakistan';
var cacheName = 'OLX-Pakistan';
var filesToCache = [
  '/',
  '/index.html',
  '/script.js',
  '/style.css',
  '/images/back2.jpg',
  '/images/bar.png',
  '/images/bike.png',
  '/images/car.png',
  '/images/homeapp.png',
  '/images/jobs.png',
  '/images/mobile.png',
  '/images/olx.png',
  '/images/prop.png',
  '/images/property.png',
  '/images/services.png',
  '/adPage/page.html',
  '/adPage/page.css',
  '/adPage/page.js',
  '/bootstrap/bootstrap.bundle.js',
  '/bootstrap/bootstrap.bundle.min.js',
  '/bootstrap/bootstrap.min.js',
  '/bootstrap/bootstrap.min.css',
  '/catagoryages/bikes.html',
  '/catagoryages/cars.htm',
  '/catagoryages/homeApplinces.html',
  '/catagoryages/jobs.html',
  '/catagoryages/mobilePhone.html',
  '/catagoryages/propertyForBuy.html',
  '/catagoryages/propertyForRent.html',
  '/catagoryages/services.html',
  '/catagoryages/css/bike.css',
  '/catagoryages/css/buy.css',
  '/catagoryages/css/car.css',
  '/catagoryages/css/home.css',
  '/catagoryages/css/job.css',
  '/catagoryages/css/mobile.css',
  '/catagoryages/css/rent.css',
  '/catagoryages/css/ser.css',
  '/catagoryages/images/bike.png',
  '/catagoryages/images/buy.png',
  '/catagoryages/images/car.png',
  '/catagoryages/images/homeapp.png',
  '/catagoryages/images/job.png',
  '/catagoryages/images/mobiles.png',
  '/catagoryages/images/rent.png',
  '/catagoryages/images/ser.png',
  '/catagoryages/js/bikes.js',
  '/catagoryages/js/cars.js',
  '/catagoryages/js/homeApplinces.js',
  '/catagoryages/js/jobs.js',
  '/catagoryages/js/mobilePhone.js',
  '/catagoryages/js/propertyForBuy.js',
  '/catagoryages/js/propertyForRent.js',
  '/catagoryages/js/services.js',
  '/Dashbord/dashbord.html',
  '/Dashbord/dashbord.css',
  '/Dashbord/dashbord.js',
  '/login/login.html',
  '/login/login.css',
  '/login/login.js',
  '/messages/messages.html',
  '/messages/message.css',
  '/messages/mess.js',
  '/register/reg.html',
  '/register/reg.css',
  '/register/reg.js'
];

self.addEventListener('install', function(e) {
  console.log('[ServiceWorker] Install');
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log('[ServiceWorker] Caching app shell');
      return cache.addAll(filesToCache);
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
  /*
   * Fixes a corner case in which the app wasn't returning the latest data.
   * You can reproduce the corner case by commenting out the line below and
   * then doing the following steps: 1) load app for first time so that the
   * initial New York City data is shown 2) press the refresh button on the
   * app 3) go offline 4) reload the app. You expect to see the newer NYC
   * data, but you actually see the initial data. This happens because the
   * service worker is not yet activated. The code below essentially lets
   * you activate the service worker faster.
   */
  return self.clients.claim();
});

self.addEventListener('fetch', function(e) {
  console.log('[Service Worker] Fetch', e.request.url);
  var dataUrl = 'https://query.yahooapis.com/v1/public/yql';
  if (e.request.url.indexOf(dataUrl) > -1) {
    /*
     * When the request URL contains dataUrl, the app is asking for fresh
     * weather data. In this case, the service worker always goes to the
     * network and then caches the response. This is called the "Cache then
     * network" strategy:
     * https://jakearchibald.com/2014/offline-cookbook/#cache-then-network
     */
    e.respondWith(
      caches.open(dataCacheName).then(function(cache) {
        return fetch(e.request).then(function(response){
          cache.put(e.request.url, response.clone());
          return response;
        });
      })
    );
  } else {
    /*
     * The app is asking for app shell files. In this scenario the app uses the
     * "Cache, falling back to the network" offline strategy:
     * https://jakearchibald.com/2014/offline-cookbook/#cache-falling-back-to-network
     */
    e.respondWith(
      caches.match(e.request).then(function(response) {
        return response || fetch(e.request);
      })
    );
  }
});
