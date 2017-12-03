import React, {Component} from "react";

export default class Error404 extends Component {
	render() {
		return (
				<div className="error404">
					<h1>404</h1>
					<div>
						<p>Error! Page Not Found.</p>
						<p><a href="/">Go Back to Home Page.</a></p>
					</div>
				</div>
		)
	}
}
