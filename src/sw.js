function receivePushNotification(event) {
  const { tag, url, title, text } = event.data.json();

  const options = {
    data: url,
    body: text,
    vibrate: [200, 100, 200],
    tag,
    icon:
      'https://res.cloudinary.com/nghiemduong2000/image/upload/v1618368062/VMOflix%20Project/VMOflix%20-%20base/iconVMOFLIX-02_afsisx.webp',
    badge:
      'https://res.cloudinary.com/nghiemduong2000/image/upload/v1618368062/VMOflix%20Project/VMOflix%20-%20base/iconVMOFLIX-02_afsisx.webp',
    actions: [
      {
        action: 'Detail',
        title: 'View',
        icon:
          'https://res.cloudinary.com/nghiemduong2000/image/upload/v1620960184/VMOflix%20Project/VMOflix%20-%20base/preview_see_seen_view_icon-1320168711570288480_nuepvi.webp',
      },
    ],
  };
  event.waitUntil(self.registration.showNotification(title, options));
}

function openPushNotification(event) {
  event.notification.close();
  event.waitUntil(clients.openWindow(event.notification.data));
}

self.addEventListener('push', receivePushNotification);
self.addEventListener('notificationclick', openPushNotification);
