this.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('v1').then(function(cache) {
      return cache.addAll([
        'offline.html'
      ]);
    })
  );
  console.log("SW installed :-)!");
});

this.addEventListener('fetch', (event) => {
  //TODO: Respond with cached resources, sometimes...
  if (event.request.mode === 'navigate' ||
  (event.request.method === 'GET' &&
  event.request.headers.get('accept').includes('text/html'))) {
    console.log('Handling fetch event for', event.request.url);
    event.respondWith(
      fetch(createCacheBustedRequest(event.request.url)).catch(error => {
        console.log('Fetch failed; returning offline page instead.', error);
        return caches.match("offline.html");
      })
    );
  }
});

function createCacheBustedRequest(url) {
  let request = new Request(url, {cache: 'reload'});
  if ('cache' in request) return request;

  let bustedUrl = new URL(url, self.location.href);
  bustedUrl.search += (bustedUrl.search ? '&' : '') + 'cachebust=' + Date.now();
  return new Request(bustedUrl);
}
