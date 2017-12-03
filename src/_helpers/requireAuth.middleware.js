import React from 'react';
import {connect} from 'react-redux';

export function requireAuth(Component) {

	class AuthenticatedComponent extends React.Component {

		componentWillMount() {
			this.checkAuth();
		}

		componentWillReceiveProps(nextProps) {
			this.checkAuth();
		}

		checkAuth() {
			if (!this.props.isAuthenticated && !this.props.username && !this.props.ApiToken) {
				let redirectAfterLogin = this.props.location.pathname;
				this.props.history.push(`/login?next=${redirectAfterLogin}`);
			}
		}

		render() {
			return (
					<div>
						{this.props.isAuthenticated === true
								? <Component {...this.props}/>
								: null
						}
					</div>
			)

		}
	}

	const mapStateToProps = (state) => ({
		token: state.authenticate.ApiToken,
		userName: state.authenticate.username,
		isAuthenticated: state.authenticate.loggedIn
	});

	return connect(mapStateToProps)(AuthenticatedComponent);

}