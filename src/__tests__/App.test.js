import React from "react";

import App from "../App";
import {Provider} from "react-redux";
import {store} from "../_helpers/store";
import {mount} from "enzyme";
import {MemoryRouter as Router} from "react-router-dom";
import LoginPage from "../components/LoginPage";
import ContentLayout from "../components/ContentLayout";
import SideNavBar from "../components/SideNavBar";
// import {setupIntegrationTest} from "../util";

describe('App base tests', () => {

	// let store;
	let dispatchSpy;
	let router;

	beforeEach(() => {
		router = {
			// params: {myParam: 'any-params-you-have'},
		};
		// ({store, dispatchSpy} = setupIntegrationTest({rootReducer}, router));
	});

	it('App Components renders', () => {
		const wrapper = mount(
				<Provider store={store}>
					<Router>
						<App />
					</Router>
				</Provider>
		);

		expect(wrapper.find('#AppBase').length).toBe(1);
		expect(wrapper.find(LoginPage).length).toBe(1);
		expect(wrapper.find(SideNavBar).length).toBe(0);

	});


});