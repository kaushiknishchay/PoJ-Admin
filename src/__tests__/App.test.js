import React from "react";
import App from "../App";
import {HashRouter as Router} from "react-router-dom";
import {Provider} from "react-redux";
import {store} from "../_helpers/store";
import {mount, shallow} from "enzyme";

describe('App base tests', () => {
	//
	// it('renders without crashing', () => {
	// 	const div = document.createElement('div');
	// 	ReactDOM.render(
	// 			<Provider store={store}>
	// 				<Router >
	// 					<App />
	// 				</Router>
	// 			</Provider>, div);
	// });


	it('App Components renders', () => {
		// const wrapper = mount(
		// 		<Provider store={store}>
		// 			<Router >
		// 				<App />
		// 			</Router>
		// 		</Provider>
		// );
		// expect(wrapper.find('#AppBase').length).toBe(1);

	});


});