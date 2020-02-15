import { gql } from 'apollo-boost';

export const SEND_MESSAGE = gql`
	mutation($fromId: String!, $toId: String!, $message: String!) {
		sendMessage(fromId: $fromId, toId: $toId, message: $message) {
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

export const APPEND_MESSAGE = gql`
	mutation appendMessage(
		$fromName: String
		$toName: String
		$fromId: String
		$toId: String
		$message: String
		$createdAt: String
		$userId: String
		$otherUserId: String
	) {
		appendMessage(
			fromId: $fromId
			toId: $toId
			fromName: $fromName
			toName: $toName
			message: $message
			createdAt: $createdAt
			userId: $userId
			otherUserId: $otherUserId
		) @client
	}
`;

export const UPDATE_CHAT_HEAD = gql`
	mutation getNewMessage(
		$fromId: String
		$toId: String
		$fromName: String
		$toName: String
		$message: String
		$createdAt: String
		$userId: String
	) {
		getNewMessage(
			fromId: $fromId
			toId: $toId
			fromName: $fromName
			toName: $toName
			message: $message
			createdAt: $createdAt
			userId: $userId
		) @client
	}
`;

export const UPDATE_LAST_READ = gql`
	mutation updateLastRead($fromId: String, $toId: String) {
		updateLastRead(fromId: $fromId, toId: $toId) {
			lastRead
		}
	}
`;
