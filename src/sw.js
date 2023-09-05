function receivePushNotification(event) {
  const { tag, url, title, text } = event.data.json();

  const options = {
    data: url,
    body: text,
    vibrate: [200, 100, 200],
    tag,
    icon:
      'https://res.cloudinary.com/dcrfjkvlm/image/upload/v1693886806/iconVMOFLIX-02_afsisx_pqf0zf.webp',
    badge:
      'https://res.cloudinary.com/dcrfjkvlm/image/upload/v1693886806/iconVMOFLIX-02_afsisx_pqf0zf.webp',
    actions: [
      {
        action: 'Detail',
        title: 'View',
        icon:
          'https://res.cloudinary.com/dcrfjkvlm/image/upload/v1693887029/preview_see_seen_view_icon_e0z4xm.webp',
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
