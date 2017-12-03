import React, {Component} from 'react';

export default class AlertBox extends Component {
	render() {
		let classStyle = "alert-" + this.props.className;
		return (
				<div className={classStyle}>
					{this.props.title}
				</div>
		)
	}
}
