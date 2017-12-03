import {actionConstants} from "../constant/user.constants";

let user = localStorage.getItem('username');
let ApiToken = localStorage.getItem('ApiToken');
const initialState = (user && ApiToken.length > 10) ? {
	loggedIn: true,
	username: user,
	ApiToken: ApiToken
} : {loggedIn: false};

export function authenticate(state = initialState, action) {
	switch (action.type) {
		case actionConstants.LOGIN_REQUEST:
			return {
				loggingIn: true,
				loggedIn: false,
				username: action.username
			};
		case actionConstants.LOGIN_SUCCESS:
			return {
				loggedIn: true,
				ApiToken: action.user.api_key,
				username: action.user.username
			};
		case actionConstants.LOGIN_FAILURE:
			return {
				loggedIn: false,
				loginError: action.error
			};
		case actionConstants.LOGOUT:
			return {
				loggedIn: false,
				username: "",
				ApiToken: ""
			};
		default:
			return state
	}
}