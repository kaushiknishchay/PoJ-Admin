export const loginService = {
	login: (username, password) => {
		console.log("lllaa");
		return new Promise((resolve, reject) => {
			resolve({"username": username, "api_key": "assjdg",});
		});
	},
	logout: () => {

	}
};