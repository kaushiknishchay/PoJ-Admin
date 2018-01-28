import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import {userActions} from "../actions/userActions";
import {actionConstants, apiBaseUrl} from "../constant/user.constants";

//Write this line so the mocked version gets called when Original is supposed to
jest.mock('../service/userService');

describe('Login Action tests', () => {

	let mockAdapter, dispatch;
	const errorMsg = "Login Failed", userNameObj = {'username': 'admin'};

	let userLogin = {
		"username": "admin",
		"api_key": "UGYkbKfeui4jk==="
	};

	beforeAll(() => {

		mockAdapter = new MockAdapter(axios);
		dispatch = jest.fn();

		// mockAdapter.onGet(apiBaseUrl + '/logout').reply(200, {
		// 	data: true
		// });

		localStorage.getItem = jest.fn().mockImplementation((api_key)=>{
			return api_key;
		});

	});

	beforeEach(() => {


	});

	afterEach(() => {
		jest.resetAllMocks();
	});

	it('login success Test', async () => {

		await (userActions.login('admin', 'admin'))(dispatch);

		expect(dispatch.mock.calls[0][0]).toEqual({type: actionConstants.LOGIN_REQUEST, 'user': userNameObj});
		expect(dispatch.mock.calls[1][0]).toEqual({type: actionConstants.LOGIN_SUCCESS, "user": userLogin});

	});

	describe('Login Fail Tests', ()=>{

		it('login success but LocalStorage Fail', async () => {

			localStorage.getItem = jest.fn().mockImplementation((api_key)=>{
				return "";
			});

			await (userActions.login('admin', 'admin'))(dispatch);

			expect(dispatch.mock.calls[0][0]).toEqual({type: actionConstants.LOGIN_REQUEST, 'user': userNameObj});
			expect(dispatch.mock.calls[1][0]).toEqual({type: actionConstants.LOGIN_FAILURE, "error": errorMsg});

		});

		it('invalid credentials', async () => {

			await (userActions.login('admin', 'wrongpassword'))(dispatch);

			expect(dispatch.mock.calls[0][0]).toEqual({type: actionConstants.LOGIN_REQUEST, 'user': userNameObj});

			expect(dispatch.mock.calls[1][0]).toEqual({type: actionConstants.LOGIN_FAILURE, "error": errorMsg});

		});

		it('network related failure', async () => {

			await (userActions.login('admin', 'network failure'))(dispatch);

			expect(dispatch.mock.calls[0][0]).toEqual({type: actionConstants.LOGIN_REQUEST, 'user': userNameObj});

			expect(dispatch.mock.calls[1][0]).toEqual({type: actionConstants.LOGIN_FAILURE, "error": "Network Failure"});

			expect(dispatch.mock.calls[2][0]).toEqual({type: actionConstants.ERROR, "message": "Network Failure"});

		});
	});

	it('logout test', () => {
		expect(userActions.logout()).toEqual({type: actionConstants.LOGOUT});
	});

});