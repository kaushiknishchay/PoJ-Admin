/**
 * Created by SHolmes on 06-Jan-18.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import Error404 from "./Error404";

describe("Error 404 Rendering", ()=>{


	it('Error Page renders without crashing', () => {
		const div = document.createElement('div');
		ReactDOM.render(<Error404/>, div);
	});


});

