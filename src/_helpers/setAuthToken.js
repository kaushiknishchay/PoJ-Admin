import axios from "axios";

export default function setAuthenToken() {
	let token = localStorage.getItem("ApiToken");

	if (token) {
		axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
	} else {
		delete axios.defaults.headers.common['Authorization'];
	}
}