import React from "react";
import {store} from "../_helpers/store";
import {mount, shallow} from "enzyme";
import {Login} from "../components/LoginPage";
import {userActions} from "../actions/userActions";
// import SideNavBar from "../components/SideNavBar";
// const emptyStore = applyMiddleware(thunk)(createStore);

describe('LoginPage tests', () => {

	beforeEach(() => {

	});
	const shallowWithStore = (component, store) => {
		const context = {
			store,
		};
		return mount(component, {context});
	};


	it('Login Components renders', () => {

		store.dispatch = jest.fn();
		const handleChangeSpy = jest.spyOn(Login.prototype, "handleChange");
		const handleSubmitSpy = jest.spyOn(Login.prototype, "handleSubmit").mockImplementation((e) => {
			store.dispatch(userActions.login('username', 'adgjm'));
		});

		const wrapper = mount(<Login store={store}/>
		);
		// const wrapper = shallowWithStore(<LoginPage />, store);
		// const wrapper2 = mount(
		// 		<Provider store={store}>
		// 			<Router>
		// 				<LoginPage />
		// 			</Router>
		// 		</Provider>
		// );
		// expect(toJson(wrapper)).toMatchSnapshot();

		let username = wrapper.find('input[name="username"]');
		let password = wrapper.find('input[name="password"]');
		username.instance().value = 'username';
		username.simulate('change');
		password.instance().value = 'adgjm';
		password.simulate('change');

		wrapper.update();

		let submitBtn = wrapper.find('button[type="submit"]');

		submitBtn.simulate('click');

		expect(handleChangeSpy).toHaveBeenCalledTimes(2);
		expect(handleSubmitSpy).toHaveBeenCalledTimes(1);
		expect(store.dispatch).toHaveBeenCalled();

		// console.log();

	});


	it('Login Testttt', () => {

		// store.dispatch = jest.fn();
		jest.resetAllMocks();
		const handleChangeSpy = jest.spyOn(Login.prototype, "handleChange");
		const handleSubmitSpy = jest.spyOn(Login.prototype, "handleSubmit").mockImplementation((e) => {
			store.dispatch(userActions.login('username', 'adgjm'));
		});

		const wrapper = shallow(<Login store={store}/>);
		// const wrapper = shallowWithStore(<LoginPage />, store);
		// const wrapper2 = mount(
		// 		<Provider store={store}>
		// 			<Router>
		// 				<LoginPage />
		// 			</Router>
		// 		</Provider>
		// );
		// expect(toJson(wrapper)).toMatchSnapshot();
		wrapper.props = {
			userLogin: jest.fn()
		};
		wrapper.setProps({
			userLogin: jest.fn().mockImplementation(()=>{
				console.log('aa88');
			})
		});

		let username = wrapper.dive().find('[name="username"]');
		let password = wrapper.dive().find('[name="password"]');
		username.value = 'username';
		username.simulate('change', {
			target: {
				value: 'user'
			}
		});
		password.value = 'adgjm';
		password.simulate('change', {
			target: {
				value: 'user'
			}
		});

		wrapper.update();

		let submitBtn = wrapper.find('[type="submit"]');

		submitBtn.simulate('click');

		expect(handleChangeSpy).toHaveBeenCalledTimes(2);
		expect(handleSubmitSpy).toHaveBeenCalledTimes(1);
		expect(store.dispatch).toHaveBeenCalled();

		// console.log(wrapper.instance().props.userLogin.mock.calls);

	});


});