import { ApolloClient, ApolloLink } from 'apollo-boost';

import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { appendMessage, getNewMessage } from './clientSideOps';

const typeDefs = `
	extend type mutation(
		$fromId : String,
		$toId : String,
		$fromName: String,
		$toName: String,
		$message : String,
		$createdAt : String,
		$otherUserId : String,
		$userId : String ) {
			appendMessage(
				fromId: $fromId,
				toId : $toId,
				fromName: $fromName,
				toName: $toName,
				message: $message,
				createdAt: $createdAt,
				otherUserId:$otherUserId,
				userId:$userID
			)
	}

	extend type mutation(
		$fromId: String
			$toId: String
			$fromName: String
			$toName: String
			$message: String
			$createdAt: String
			$userId: String ) {
				getNewMessage(
				fromId: $fromId
				toId: $toId
				fromName: $fromName
				toName: $toName
				message: $message
				createdAt: $createdAt
				userId: $userId
				userId:$userID
			)
	}
`;

const customLink = new ApolloLink((operation, forward) => {
	console.log('this is called');
	let observers = forward(operation);
	console.log(observers);
	return observers.map((data) => {
		console.log(data);
		return data;
	});
});

const httpLink = new HttpLink({
	uri: 'http://localhost:8085/graphql'
});

const apolloClient = new ApolloClient({
	link: ApolloLink.from([ httpLink ]),
	cache: new InMemoryCache(),
	resolvers: {
		Mutation: {
			appendMessage,
			getNewMessage
		}
	},
	typeDefs
});

export default apolloClient;
