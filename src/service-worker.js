// importScripts(
// 	'https://storage.googleapis.com/workbox-cdn/releases/3.5.0/workbox-sw.js'
// );

const vendorBundle = /(.*)main(.*)\.js/;

const handleCH = new workbox.strategies.StaleWhileRevalidate({
	cacheName: 'vendorBundle',
	plugins: [
		new workbox.expiration.Plugin({
			maxEntries: 10,
			maxAgeSeconds: 1 * 24 * 60 * 60 // 30 Days
		})
	]
});

// if (workbox) {
// 	console.log('In worker file', workbox.core.cacheNames);
// 	workbox.routing.registerRoute(vendorBundle, (args) =>
// 		handleCH.handle(args).then((response) => {
// 			if (!response) {
// 				console.log('No response');
// 			}
// 			return response;
// 		})
// 	);
// }

self.addEventListener('push', (event) => {
	const title = 'Get Started With Workbox';
	const options = {
		body: event.data.text()
	};

	console.log(event.data, ' to ', event.data.text());
	event.waitUntil(self.registration.showNotification(title, options));
});

// workbox.precaching.precacheAndRoute(self.__precacheManifest);
