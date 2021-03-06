import React, {Component} from "react";
import {connect} from "react-redux";
import Panel from "muicss/lib/react/panel";
import Form from "muicss/lib/react/form";
import Input from "muicss/lib/react/input";
import Button from "muicss/lib/react/button";
import {bindActionCreators} from "redux";
import {userActions} from "../actions/userActions";
import {Redirect, withRouter} from "react-router-dom";
export class Login extends Component {

	constructor(props) {
		super(props);
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.state = {
			username: "",
			password: ""
		};
	}

	handleChange(e) {
		const {name, value} = e.target;
		// console.log(name, "["+value+"]");
		this.setState({[name]: value});
	}

	handleSubmit(e) {
		console.log(e);
		e.preventDefault();

		let {username, password} = this.state;
		if (username && password) {
			console.log(this.props);
			this.props.userLogin(username, password);
		}else {
			console.log("a");
		}
	}

	render() {

		// const {from} = this.props.location.state || {from: {pathname: '/home'}};
		const {loggingIn, loggedIn, loginError} = this.props;

		if (loggedIn) {
			return (<Redirect to={'/home'}/>)
		}

		return (
				<Panel className="login-panel">
					<Form className="login-form">
						<legend>Login</legend>
						{
							loginError &&
							<div className="mui--bg-danger loginError">
								{loginError}. Try again.
							</div>
						}
						<Input hint="username" required
						       name="username"
						       onChange={this.handleChange}/>
						<Input hint="password"
						       name="password"
						       type="password" required
						       onChange={this.handleChange}/>
						<Button color="primary"
						        disabled={loggingIn}
						        ref="submitLogin"
						        variant="raised" type="submit"
						        onClick={this.handleSubmit}>
							Login
						</Button>
					</Form>
				</Panel>
		)
	}
}

function mapStateToProps(state) {
	const {loggingIn, loggedIn, loginError} = state.authenticate;
	return {
		loggingIn,
		loggedIn,
		loginError
	};
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		userLogin: userActions.login
	}, dispatch);
}

//fire the action => action will make API Call => API returns data in action
// => action stores data in `localStorage` => fires `dispatch` to update `store`
// => this dispatch goes to `reducers` it makes the object with the values and updates store

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
