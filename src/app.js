import React, { Component } from 'react';
import { history, persistedStore, store } from './redux/store';

import { ApolloProvider } from '@apollo/react-hooks';
import { ConnectedRouter } from 'connected-react-router';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { Provider } from 'react-redux';
import Routes from './container/router';
import client from './api/graphql/graphql-config';

export default class App extends Component {
	render() {
		return (
			<React.Fragment>
				<Provider store={store}>
					<PersistGate persistor={persistedStore} loading={null}>
						<ConnectedRouter history={history}>
							<ApolloProvider client={client}>
								<Routes />
							</ApolloProvider>
						</ConnectedRouter>
					</PersistGate>
				</Provider>
			</React.Fragment>
		);
	}
}
