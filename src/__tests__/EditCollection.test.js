import React from "react";

import configureStore from "redux-mock-store";
import {mount, shallow} from "enzyme";
import {Provider} from "react-redux";
import {store} from '../_helpers/store';
import {BrowserRouter as Router} from "react-router-dom";
import EditCollectionPage, {EditCollection} from "../components/Collection/EditCollection";

describe('EditCollection test suite', () => {

	let collectionData = [
		{
			"id": 1,
			"name": "Fashion Photography",
			"colkey": "t6aa",
			"slug": "fashion-photography",
			"albums": [
				{
					"name": "Fashion Album 1",
					"albumkey": "rJzd",
					"thumb_url": "http://lorempixel.com/400/400/fashion/1",
					"slug": "fashion-album-1"
				},
				{
					"name": "Fashion Album 2",
					"albumkey": "GfSV",
					"thumb_url": "http://lorempixel.com/400/400/fashion/2",
					"slug": "fashion-album-2"
				}
			]
		},
		{
			"id": 3,
			"name": "Wedding Photography",
			"colkey": "jg67",
			"slug": "wedding-photography",
			"albums": []
		}
	];
	const mockColletionData = collectionData;

	let container;
	const mockStore = configureStore();

	beforeEach(() => {
		// store = mockStore({
		// 	adminReducer: {
		// 		collectionList: mockColletionData
		// 	},
		// 	authenticate: {}
		// });
		// store.adminReducer.collectionList = mockColletionData;
		// store1 = realStore;
	});

	it('EditCollection renders without crashing', () => {

		// const div = document.createElement('div');
		// ReactDOM.render(<Provider store={store}><Router><EditCollection/></Router></Provider>, div);
		let wrapper = shallow(
				<Provider store={store}>
					<Router>
						<EditCollectionPage />
					</Router>
				</Provider>);
		wrapper.setProps({
			loggedIn: true,
			getCollectionList: jest.fn().mockImplementation(()=>{
				console.log('123');
			}),
			getCollectionInfo: jest.fn()
		});



		// wrapper.find(EditCollection)
		console.log(wrapper.instance().props.getCollectionList.mock);
	});

});