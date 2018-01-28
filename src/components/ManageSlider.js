import React, {Component} from "react";
import {Form, Panel} from "muicss/react";

export default class ManageSlider extends Component {
	render() {
		return (
				<Panel className="panelMargin formElementWrapper">
					<Form encType="multipart/form-data" id="sliderForm" method="post">
						<legend className="legendStyle mui-row">
							<span className="mui-col-md-12"
							      style={{margin: "10px 0", fontWeight: "bold"}}>
								Manage Slider
							</span>
						</legend>
						<p>
							Still pending
						</p>
					</Form>
				</Panel>
		)
	}
}
