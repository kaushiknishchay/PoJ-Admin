import React, {Component} from "react";

// import "../css/switchStyle.css";

class PreviewSwitch extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isChecked: true
		};
	}

	render() {
		return (
				<span className={this.props.className}>
        <input
		        type="checkbox"
		        id={"prev_" + this.props.id}
		        name={"prev_" + this.props.name}
		        onChange={() => {
			        this.setState({
				        isChecked: !this.state.isChecked
			        });
			        console.log(this.state.isChecked);
		        }}
		        className="switch-input"
        />
        <label htmlFor={"prev_" + this.props.id} className="switch-label">
          {this.props.title + " "}
        </label>
      </span>
		);
	}
}

export default PreviewSwitch;
