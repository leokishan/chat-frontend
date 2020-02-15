import io from 'socket.io-client';

// const socketClient = io('https://chat.360reference.sg:3212', {
// 	// path: '/graphSocket',
// 	reconnectionAttempts: 5,
// 	reconnectionDelay: 15000,
// 	transports: [ 'websocket' ]
// });

const socketClient = io('localhost:8086', {
	path: '/graphSocket',
	reconnectionAttempts: 5
});

export const getSocket = () => {
	const connection = socketClient;
	// console.log('here');
	// try {
	// 	connection.on('connect', () => {
	// 		console.log('connected to socket');
	// 		console.log(connection.connected);
	// 		connection.emit('chat.start.typing', 1, 2, 'name');
	// 	});
	// } catch (e) {
	// 	console.log(e);
	// }
	// connection.on('error', (data) => console.log('error for ', data));
	// connection.on('chat.user.start.typing.1', (data) => {
	// 	console.log('got something');

	// 	console.log(data);
	// });

	connection.on('connect', () => {
		console.log('connected to socket');
		console.log(connection.connected);
	});

	const emitter = (eventName, eventData) => {
		connection.emit(eventName, eventData);
	};
	const subscriber = (eventName, callback) => {
		connection.on(eventName, callback);
	};
	const unSubscribe = (eventName) => {
		connection.off(eventName);
	};
	return { emitter, subscriber, unSubscribe };
};
