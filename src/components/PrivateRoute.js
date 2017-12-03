import React from 'react';
import {Redirect, Route, withRouter} from "react-router-dom";
import {connect} from "react-redux";

class PrivateRoute extends React.Component {
	render() {
		const {component: Component, loggedIn, ...rest} = this.props;

		const renderRoute = props => {

			if (loggedIn) {
				return (<Component {...props} />);
			} else {
				return (<Redirect to={{
					pathname: '/login',
					state: { from: props.location }
				}}/>);
			}
		};

		return (
				<Route {...rest} render={renderRoute}/>
		);
	}
}

function mapStateToProps(state) {
	const {loggedIn, ApiToken} = state.authenticate;

	return {
		loggedIn,
		ApiToken
	};
}

export default withRouter(connect(mapStateToProps)(PrivateRoute));
