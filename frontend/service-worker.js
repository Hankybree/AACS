workbox.core.setCacheNameDetails({prefix: "frontend"});

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

self.addEventListener('push', (event) => {
  const { body, title } = event.data.json()
  self.registration.showNotification(title, {
    body
  })
})


self.__precacheManifest = [].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.routing.registerRoute(/^https:\/\/picnet.aviliax.com\/api\/fileuploads\/uploadedfiles\//, new workbox.strategies.NetworkFirst({ "cacheName":"images","networkTimeoutSeconds":3, plugins: [new workbox.cacheableResponse.Plugin({ statuses: [ 0, 200 ] })] }), 'GET');
