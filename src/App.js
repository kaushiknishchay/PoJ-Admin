import React, {Component} from "react";
import {Appbar, Container} from "muicss/react";
import ContentLayout from "./components/ContentLayout";
import {Link, withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {userActions} from "./actions/userActions";

class App extends Component {
	logout(e) {
		e.preventDefault();
		const {dispatch} = this.props;
		dispatch(userActions.logout());
		this.props.history.push("/");
	}

	render() {

		let appBarStyle = {
			margin: "0px auto",
			fontSize: "25px",
			padding: "12px 30px",
			minHeight: "100%",
			width: "70%",
			maxWidth: "70%",
			display: "inline-block"
		};

		let appLinkStyle = {
			maxWidth: "30%",
			width: "20%",
			minHeight: "100%",
			display: "inline-block"
		};

		let {isLogged} = this.props;

		return (
				<div style={{"background": "#eee"}}>
					<Appbar title="Login">
						<div style={appBarStyle}>
							Admin Panel
						</div>
						<div style={appLinkStyle}>
							<ul className="navLinks">
								{
									!isLogged &&
									<li>
										<Link to="/login">
											Login
										</Link>
									</li>
								}
								{
									isLogged &&
									<li>
										<Link to="/home">
											Home
										</Link>
									</li>
									&&
									<li>
										<a href="#logout" onClick={this.logout.bind(this)}>
											Logout
										</a>
									</li>
								}
							</ul>
						</div>
					</Appbar>
					<Container style={{minHeight: "90vh"}}>
						{/*<Route exact path="/" component={LoginPage}/>*/}
						{/*<Route exact path="/login" component={LoginPage}/>*/}
						{/*{routes.map((value, idx) => {*/}
						{/*return (<Route path={value.path} key={idx} component={ContentLayout}/>);*/}

						{/*})}*/}
						<ContentLayout/>
					</Container>
				</div>
		);
	}
}
function mapStateToProps(state, history) {
	let {loggedIn, ApiToken, username} = state.authenticate;

	let isLogged = (loggedIn && ApiToken !== undefined && ApiToken !== "" && username !== undefined && username !== "");

	return {
		isLogged
	}

}


export default withRouter(connect(mapStateToProps)(App));
//withRouter order matters,
// if outside it solves "url changes but content not rendered problem."
