/**
 * Created by SHolmes on 06-Jan-18.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import AlertBox from "./AlertBox";

describe("AlertBox Rendering", ()=>{


	it('Success message renders without crashing', () => {
		const div = document.createElement('div');
		ReactDOM.render(<AlertBox class="success" title="Success Alert Message"/>, div);
	});

	it('Error message renders without crashing', () => {
		const div = document.createElement('div');
		ReactDOM.render(<AlertBox class="danger" title="Error Alert Message"/>, div);
	});

});

