import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import "./index.css";
import {Provider} from "react-redux";
import {store} from "./_helpers/store";
import {HashRouter as Router} from "react-router-dom";
/*
 var config = {
 headers: {'X-My-Custom-Header': 'Header-Value'}
 };

 axios.get('https://api.github.com/users/codeheaven-io', config);
 axios.post('/save', { firstName: 'Marlon' }, config)
 */

ReactDOM.render(
		<Provider store={store}>
			<Router >
				<App/>
			</Router>
		</Provider>
		, document.getElementById('root'));
registerServiceWorker();
