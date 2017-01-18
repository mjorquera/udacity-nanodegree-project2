this.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('v1').then(function(cache) {
      return cache.addAll([
        '/index.html',
        '/styles/main.css',
        '/styles/font-awesome.min.css',
        '/scripts/app.js',
        '/scripts/controllers/train.js',
        '/scripts/services/stationfinder.js',
        '/views/train.html',
        '/bower_components/jquery/dist/jquery.js',
        '/bower_components/angular/angular.js',
        '/bower_components/bootstrap/dist/js/bootstrap.js',
        '/bower_components/angular-ui-router/release/angular-ui-router.js',
        '/bower_components/leaflet/dist/leaflet-src.js',
        '/bower_components/angular-leaflet-directive/dist/angular-leaflet-directive.js',
        '/bower_components/angular-ui-select/dist/select.js',
        '/bower_components/angular-fontawesome/dist/angular-fontawesome.js'
      ]);
    })
  );
});

this.addEventListener('fetch', function(event) {
  console.log(event);
  event.respondWith(
    caches.match(event.request).then(function(resp) {
      console.log(resp);
      return resp || fetch(event.request).then(function(response) {
        caches.open('v1').then(function(cache) {
          cache.put(event.request, response.clone());
        });
        return response;
      });
    }).catch(function() {
      return caches.match('/images/yeoman.png');
    })
  );
});

