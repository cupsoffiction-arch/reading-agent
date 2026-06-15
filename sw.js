// Cups of Fiction — Service Worker for Push Notifications
self.addEventListener('push', event => {
  const data = event.data ? event.data.json() : {};
  const title = data.title || 'Cups of Fiction';
  const options = {
    body: data.body || 'You have a reading update!',
    icon: '/icon-192.png',
    badge: '/icon-192.png',
    tag: 'cof-notification',
    renotify: true,
    data: { url: data.url || '/' }
  };
  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', event => {
  event.notification.close();
  event.waitUntil(clients.openWindow(event.notification.data.url));
});
