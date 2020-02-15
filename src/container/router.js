import { BrowserRouter, Route, Switch } from 'react-router-dom';
import React, { Component, Fragment } from 'react';

import GeneralRoutes from './GeneralRoutes';
import WindowSizeListener from 'react-window-size-listener';
import { connect } from 'react-redux';
import generalActions from '../redux/variables/actions';

let timeoutVar;
const { setWidth } = generalActions;
const Routes = (props) => {
	const setReduxWidth = (size) => {
		if (timeoutVar) {
			clearTimeout(timeoutVar);
		}
		timeoutVar = setTimeout(() => {
			props.setWidth(size.windowWidth);
		}, 1000);
	};

	return (
		<Fragment>
			<WindowSizeListener onResize={setReduxWidth} />
			<BrowserRouter>
				<Switch>
					<Route path="/" component={GeneralRoutes} />
				</Switch>
			</BrowserRouter>
		</Fragment>
	);
};
export default connect(null, { setWidth })(Routes);
