/**
 * Created by SHolmes on 06-Jan-18.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import LoadingBar from "./LoadingBar";

describe("LoadingBar Rendering", ()=>{


	it('LoadingBar renders without crashing', () => {
		const div = document.createElement('div');
		ReactDOM.render(<LoadingBar/>, div);
	});


});

