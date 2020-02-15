import React, { Fragment, useEffect } from 'react';
import { withRouter } from 'react-router';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import Chat from './Chat';
import Signin from './Chat/SignIn';
import Room from './Chat/room';
import TryThings from './TryThings';
import ParallaxElement from './parallax/ParallaxElement';
import CallScreen from './CallScreen/CallScreen';

const ProtectedRoute = (props) => {
	useEffect(() => {
		if (!props.userId) {
			props.history.push('/signin');
		}
	}, []);
	return (
		<Fragment>
			<CallScreen {...props.callScreenDetails} />
			<Switch>
				<Route path="/chat" component={Chat} exact={true} />
				<Route path="/room" component={Room} exact={true} />
			</Switch>
		</Fragment>
	);
};

const GeneralRoutes = (props) => {
	return (
		<Fragment>
			<Switch>
				<Route path="/signin" component={Signin} exact={true} />
				<Route path="/trythings" component={TryThings} exact={true} />
				<Route
					path="/parallax"
					component={ParallaxElement}
					exact={true}
				/>
				<Route
					render={(transferProps) => (
						<ProtectedRoute
							{...transferProps}
							userId={props.userId}
						/>
					)}
				/>
				<Route component={Signin} />
			</Switch>
		</Fragment>
	);
};

const mapStateToProps = (state) => ({
	userId: state.authReducer.userId
});

export default connect(mapStateToProps)(withRouter(GeneralRoutes));
