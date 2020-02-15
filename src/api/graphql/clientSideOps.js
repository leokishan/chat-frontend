import { GET_MESSAGES, GET_CHAT_LIST } from './queries';

export const appendMessage = (_, args, { cache }) => {
	let newMessage = {
		fromId: {
			id: args.fromId,
			username: args.fromName,
			__typename: 'UserResponse'
		},
		toId: {
			id: args.toId,
			username: args.toName,
			__typename: 'UserResponse'
		},
		message: args.message,
		createdAt: args.createdAt
	};
	let cachedData = cache.readQuery({
		query: GET_MESSAGES,
		variables: {
			userId: args.userId,
			otherUserId: args.otherUserId
		}
	});
	cachedData.userChat.push({
		...newMessage,
		__typename: 'MessageOutput'
	});
	cache.writeQuery({
		query: GET_MESSAGES,
		variables: {
			userId: args.userId,
			otherUserId: args.otherUserId
		},
		data: cachedData
	});
	try {
		let chatList = cache.readQuery({
			query: GET_CHAT_LIST,
			variables: { userId: args.userId }
		});
		let userIndex = chatList.chatList.findIndex(
			(ele) =>
				(ele.fromId.id == args.userId &&
					ele.toId.id == args.otherUserId) ||
				(ele.toId.id == args.userId &&
					ele.fromId.id == args.otherUserId)
		);
		chatList.chatList.splice(userIndex, 1, {
			...chatList.chatList[userIndex],
			...newMessage,
			lastRead: newMessage.createdAt,
			unreadCount: 0,
			__typename: 'ChatHead'
		});
		cache.writeQuery({
			query: GET_CHAT_LIST,
			variables: { userId: args.userId },
			data: chatList
		});
	} catch (e) {}
};

export const getNewMessage = (_, args, { cache }) => {
	let newMessage = {
		fromId: {
			id: args.fromId,
			username: args.fromName,
			__typename: 'UserResponse'
		},
		toId: {
			id: args.toId,
			username: args.toName,
			__typename: 'UserResponse'
		},
		message: args.message,
		createdAt: args.createdAt
	};

	try {
		let chatList = cache.readQuery({
			query: GET_CHAT_LIST,
			variables: { userId: args.userId }
		});
		let userIndex = chatList.chatList.findIndex(
			(ele) =>
				(ele.fromId.id == args.userId && ele.toId.id == args.fromId) ||
				(ele.toId.id == args.userId && ele.fromId.id == args.fromId)
		);
		if (userIndex > -1) {
			chatList.chatList.splice(userIndex, 1, {
				...chatList.chatList[userIndex],
				...newMessage,
				__typename: 'ChatHead',
				unreadCount: chatList.chatList[userIndex].unreadCount + 1
			});
		} else {
			chatList.chatList.unshift({
				...newMessage,
				__typename: 'ChatHead',
				lastRead: 0,
				unreadCount: 1
			});
		}
		cache.writeQuery({
			query: GET_CHAT_LIST,
			variables: { userId: args.userId },
			data: chatList
		});
	} catch (e) {}
	try {
		let cachedData = cache.readQuery({
			query: GET_MESSAGES,
			variables: {
				userId: args.userId,
				otherUserId: args.fromId
			}
		});
		cachedData.userChat.push({
			...newMessage,
			__typename: 'MessageOutput'
		});
		cache.writeQuery({
			query: GET_MESSAGES,
			variables: {
				userId: args.userId,
				otherUserId: args.otherUserId
			},
			data: cachedData
		});
	} catch (e) {}
};
