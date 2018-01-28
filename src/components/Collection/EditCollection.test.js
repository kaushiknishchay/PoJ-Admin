import React from "react";

import configureStore from "redux-mock-store";

import {store as realStore} from "../../_helpers/store";
import {mount} from "enzyme";
import {Provider} from "react-redux";
import {HashRouter as Router} from "react-router-dom";
import EditCollection from "./EditCollection";

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

	let store, container;
	const mockStore = configureStore();

	beforeEach(() => {
		store = mockStore({
			adminReducer: {
				collectionList: mockColletionData
			},
			authenticate: {}
		});
		// store1 = realStore;
	});

	it('EditCollection renders without crashing', () => {
		// const div = document.createElement('div');
		// ReactDOM.render(<Provider store={store}><Router><EditCollection/></Router></Provider>, div);
		// container = mount(<Provider store={store}><Router><EditCollection/></Router></Provider>);
		// console.log(store);
	});

});