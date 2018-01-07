import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {HashRouter as Router} from "react-router-dom";
import {Provider} from "react-redux";
import {store} from "./_helpers/store";

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Provider store={store}>
	  <Router >
		  <App />
	  </Router></Provider>, div);
});
