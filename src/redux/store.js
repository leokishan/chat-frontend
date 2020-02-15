import { applyMiddleware, combineReducers, createStore, compose } from 'redux';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMerge2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import { createBrowserHistory } from 'history';
import reducers from './reducers';
import authReducer from './auth/reducer';
const history = createBrowserHistory();
const routeMiddleware = routerMiddleware(history);

// const composeEnhancers =
//   env !== "prod" &&
//   typeof window === "object" &&
//   window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
//     ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
//         // Specify here name, actionsBlacklist, actionsCreators and other options
//       })
//     : compose;

const persistConfig = {
	key: 'root',
	storage,
	stateReconciler: autoMerge2
};

const persistedReducer = persistReducer(persistConfig, authReducer);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
	? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__(
			{
				// Specify here name, actionsBlacklist, actionsCreators and other options
			}
		)
	: compose;

const middlewares = [ routeMiddleware ];

const finalReducers = combineReducers({
	authReducer: persistedReducer,
	router: connectRouter(history),
	...reducers
});

const store = createStore(
	finalReducers,
	composeEnhancers(applyMiddleware(...middlewares))
);

const persistedStore = persistStore(store);

export { store, history, persistedStore };
