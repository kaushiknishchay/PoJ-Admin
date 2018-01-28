let userLogin = {
	"username": "admin",
	"api_key": "UGYkbKfeui4jk==="
};

export const userService = {
	login: (username, password) => {

		return new Promise((resolve, reject) => {
			if (username === 'admin' && password === 'admin')
				resolve(userLogin);
			else if (password === 'network failure') {
				reject("Network Failure");
			}
			else {
				reject("Login Failed");
			}
		});
	},

	logout: () => {
		return Promise.resolve(userLogin);
	}
};



