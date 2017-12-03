import axios from "axios";
import {fileUpload} from "./fileUpload";

export const loginService = {
	login,
	logout
};

let apiBaseUrl = "http://picturesofjoy/api/v1";

function login(username, password) {
	const requestOptions = {
		method: 'POST',
		headers: {'Content-Type': 'application/json'},
		// body: JSON.stringify({username, password})
	};

	let payload = {
		"username": username,
		"password": password
	};

	return axios.post(apiBaseUrl + '/login', payload, requestOptions)
			.then(function (response) {
				if (response.data.code === 200) {
					console.log("Login successfull");
					return response.data;
					//var uploadScreen = [];
					//uploadScreen.push(<UploadScreen appContext={self.props.appContext}/>)
					//self.props.appContext.setState({loginPage: [], uploadScreen: uploadScreen})
				}
				else if (response.data.code === 204) {
					console.log("Username password do not match");
					alert("username password do not match")
				}
				else {
					console.log("Username does not exists");
					alert("Username does not exist");
				}
			})
			.catch(function (error) {
				console.log(error);
			});
}

function logout() {
	const requestOptions = {
		method: 'GET',
		headers: {
			'Authorization': "Bearer " + localStorage.getItem("ApiToken"),
			'X-Auth-Token': localStorage.getItem("username")
		}
	};

	localStorage.removeItem('username');
	localStorage.removeItem('ApiToken');

	fileUpload.removeAuthToken();

	return axios.get(apiBaseUrl + '/logout', requestOptions)
			.then(function (response) {
				if (response.data.code === 200) {

				}
			});
}