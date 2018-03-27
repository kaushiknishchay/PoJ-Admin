import React, {Component} from "react";
import PropTypes from "prop-types";

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

AlertBox.propTypes = {
	title: PropTypes.string.isRequired,
	class: PropTypes.string.isRequired
};