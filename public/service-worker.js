// service-worker.js
self.addEventListener('push', function (event) {
    const data = event.data.json();
    self.registration.showNotification(data.title, {
        body: data.body,
        icon: data.icon
    });
});

self.addEventListener('sync', function (event) {
    if (event.tag === 'sync-data') {
        event.waitUntil(fetchDataAndNotify());
    }
});

function fetchDataAndNotify() {
    return fetch('/api/check-for-updates')
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            if (data.hasUpdates) {
                self.registration.showNotification('Update Available', {
                    body: 'There are new updates available.',
                    icon: '/images/icon.png'
                });
            }
        });
}