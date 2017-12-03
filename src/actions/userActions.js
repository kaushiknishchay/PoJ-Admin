import {actionConstants} from "../constant/user.constants";
import {loginService as userService} from "../service/login.service";
export const userActions = {
	login,
	logout
};
function login(username, password) {

	return dispatch => {

		dispatch(request({username}));

		userService.login(username, password)
				.then(
						user => {
							user = {...user, "username": username};
							console.log(user);
							if (user && user.api_key && user.username) {
								// store user details and jwt token in local storage to keep user logged in between page refreshes
								localStorage.setItem('username', user.username);
								localStorage.setItem('ApiToken', user.api_key);
								if (localStorage.getItem("ApiToken") !== "") {
									dispatch(success(user));
								}
							} else {
								dispatch(failure("Login Failed"));
							}
						},
						error => {
							dispatch(failure(error));
							dispatch(errorSend(error));
						}
				);
	};

	function errorSend(message) {
		return {type: actionConstants.ERROR, message};
	}

	function request(user) {
		return {type: actionConstants.LOGIN_REQUEST, user}
	}

	function success(user) {
		return {type: actionConstants.LOGIN_SUCCESS, user}
	}

	function failure(error) {
		return {type: actionConstants.LOGIN_FAILURE, error}
	}
}

function logout() {
	console.log("Logout Action Fired.");
	userService.logout();
	return {type: actionConstants.LOGOUT};
}