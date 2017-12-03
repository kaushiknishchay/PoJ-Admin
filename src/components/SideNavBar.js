import React, {Component} from "react";
import Panel from "muicss/lib/react/panel";
import {NavLink, withRouter} from "react-router-dom";
import {userActions} from "../actions/userActions";
import {connect} from "react-redux";
import {Divider} from "muicss/react";

class SideNavBar extends Component {

	logout(e) {
		e.preventDefault();
		const {dispatch} = this.props;
		dispatch(userActions.logout());
		this.props.history.push("/");
	}

	render() {

		return (
				<Panel className="panelMargin">
					<ul className="sideNavBar">
						<li>
							<NavLink to="/home"
							         activeClassName="active"
							         className="mui-ripple-effect">
								<i className="material-icons">home</i>
								<b>Dashboard</b>
							</NavLink>
						</li>

						<li className="heading">
							<h4>Manage Collection(s)</h4>
						</li>

						<li>
							<NavLink to="/collectionEdit"
							         activeClassName="active"
							         className="mui-ripple-effect">
								<i className="material-icons">create</i>
								View/Edit Collection
							</NavLink>
						</li>

						<li>
							<NavLink to="/collection"
							         activeClassName="active"
							         className="mui-ripple-effect">
								<i className="material-icons">add</i>
								Add Collection
							</NavLink>
						</li>

						<li className="heading">
							<h4>Manage Album(s)</h4>
						</li>
						<li>
							<NavLink activeClassName="active"
							         to="/albumEdit"
							         className="mui-ripple-effect">
								<i className="material-icons">create</i>
								View/Edit Album
							</NavLink>
						</li>
						<li>
							<NavLink activeClassName="active"
							         to="/album"
							         className="mui-ripple-effect">
								<i className="material-icons">add</i>
								Add Album
							</NavLink>
						</li>
						<Divider />
						<li>
							<a href="#logout" className="mui-ripple-effect" onClick={this.logout.bind(this)}>
								<i className="material-icons">error</i>
								Logout
							</a>
						</li>
					</ul>
				</Panel>
		);
	}
}
function mapStateToProps(state, history) {
	return {}
}
export default withRouter(connect(mapStateToProps)(SideNavBar));
