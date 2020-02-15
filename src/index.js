import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import './stylus/global.css';
import App from './app';
import React from 'react';
import ReactDOM from 'react-dom';
import { registerToken } from './api/restApis';

// for PWA

// function urlB64ToUint8Array(base64String) {
// 	const padding = '='.repeat((4 - base64String.length % 4) % 4);
// 	const base64 = (base64String + padding)
// 		.replace(/\-/g, '+')
// 		.replace(/_/g, '/');

// 	const rawData = window.atob(base64);
// 	const outputArray = new Uint8Array(rawData.length);

// 	for (let i = 0; i < rawData.length; ++i) {
// 		outputArray[i] = rawData.charCodeAt(i);
// 	}
// 	return outputArray;
// }

// if ('serviceWorker' in navigator) {
// 	window.addEventListener('load', () => {
// 		navigator.serviceWorker
// 			.register('/service-worker.js')
// 			.then((registration) => {
// 				console.log('SW registered: ', registration);
// 				window.alert('sw registered');
// 				registration.pushManager
// 					.subscribe({
// 						userVisibleOnly: true,
// 						applicationServerKey: urlB64ToUint8Array(
// 							'BKDPELgpVvF1dpGp7kwsBB1U6z1sHBbcbz3p66ZX3MrC164DpD4BgjYCqqjrtRgsSutENbILj7rG7RMJuzzpVi0'
// 						)
// 					})
// 					.then((subs) => {
// 						window.alert('subscribed');
// 						console.log('In sub ', JSON.stringify(subs));
// 						registerToken({
// 							subscription: JSON.stringify(subs)
// 						});
// 					})
// 					.catch((subs) => {
// 						console.log('In catch ', subs.message);
// 						window.alert('not subscribed', subs.message);
// 					});
// 				// registration.pushManager
// 				// 	.getSubscription()
// 				// 	.then((subs) => console.log(' In getter ', subs));
// 			})
// 			.catch((registrationError) => {
// 				window.alert('not registered ', registrationError.message);
// 				console.log('SW registration failed: ', registrationError);
// 			});
// 	});
// } else {
// 	window.alert('No service worker');
// }

ReactDOM.render(<App />, document.getElementById('app'));
