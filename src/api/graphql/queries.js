import { gql } from 'apollo-boost';

export const SIGN_IN_QUERY = gql`
	query($username: String!, $password: String!) {
		signIn(username: $username, password: $password) {
			apikey
			userId
		}
	}
`;

export const GET_CHAT_LIST = gql`
	query($userId: String!) {
		chatList(userId: $userId) {
			fromId {
				id
				username
			}
			toId {
				id
				username
			}
			message
			createdAt
			lastRead
			unreadCount
		}
	}
`;

export const GET_MESSAGES = gql`
	query userChat($userId: String!, $otherUserId: String!) {
		userChat(userId: $userId, otherUserId: $otherUserId) {
			fromId {
				id
				username
			}
			toId {
				id
				username
			}
			message
			createdAt
		}
	}
`;

export const GET_USER_LIST = gql`
	query userList {
		userList {
			id
			username
		}
	}
`;
