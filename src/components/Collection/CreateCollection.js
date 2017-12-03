import React from "react";
import Panel from "muicss/lib/react/panel";
import Form from "muicss/lib/react/form";
import Input from "muicss/lib/react/input";
import Button from "muicss/lib/react/button";
import Textarea from "muicss/lib/react/textarea";
import Row from "muicss/lib/react/row";
import Col from "muicss/lib/react/col";

import Dropzone from "react-dropzone";
import "../../css/appStyle.css";
import {fileUpload} from "../../service/fileUpload";
import {connect} from "react-redux";
import AlertBox from "../Helpers/AlertBox";
import {BASE_URL} from "../../constant/routes.config";

class CreateCollection extends React.Component {

	componentWillMount() {
		let eCol = this.props.collection;
		if (eCol !== undefined && eCol !== null && eCol.id !== undefined && !isNaN(eCol.id)) {
			this.setState({
				isEditForm: true,
				collectionName: eCol.name,
				collectionDesc: eCol.description,
				collectionCover: BASE_URL + eCol.cover,
			});

		}

	}

	constructor(props) {
		super(props);
		this.state = {
			collectionName: "",
			isPosting: false,
			collectionCover: "",
			collectionDesc: "",
			isCreated: null,
			isEditForm: false
		};
	}

	handleChange(e) {
		this.setState({
			[e.target.name]: e.target.value
		});
	}

	onDropCover(files) {
		this.setState({collectionCover: files[0]});
	}

	render() {
		let {isPosting, collectionName, collectionCover, isCreated, isEditForm,collectionDesc} = this.state;
		let name = collectionName, desc = collectionDesc, cover = collectionCover, alertText = "";
		if (isEditForm) {
			alertText = " Updated ";
		} else {
			alertText = " Created ";
		}

		return (
				<Panel className="formElementWrapper panelMargin">
					<Form id="collectionForm">
						<legend className="legendStyle mui-row">
				            <span style={{margin: "10px 0px"}} className="mui-col-md-12">
					            {isEditForm && "Edit " }
					            {!isEditForm && "Create New "}
					            Collection
				            </span>

						</legend>
						<div className="formMarginWrapper">
							{isCreated === true &&
							<AlertBox className="success" title={"Collection" + alertText + "Successfully."}/>
							}
							{isCreated === false &&
							<AlertBox className="danger" title={"Error!. Collection not " + alertText + "."}/>
							}
							<br />
							<Input
									required={true}
									label="Enter Collection Name"
									hint="eg. Wedding Photography"
									style={{flex: 1}}
									name="collectionName"
									defaultValue={name}
									onChange={this.handleChange.bind(this)}
							/>
							<br />
							<Textarea
									name="collectionDesc"
									label="Enter Description"
									hint="eg. Pre-Wedding / Wedding Shoots."
									onChange={this.handleChange.bind(this)}
									defaultValue={desc}
									rows={3}
							/>
							<Row>
								<Col md="6" md-offset="3" xs="8" xs-offset="2">
									<Dropzone
											onDrop={this.onDropCover.bind(this)}
											accept="image/*"
											required={true}
											className="dropzoneBg albumDrop"
											multiple={false}>
										{cover && <img src={cover} className="albumCoverPreview" alt={name}/>}
										{collectionCover && (
												<img
														className="albumCoverPreview"
														src={collectionCover.preview}
														alt={collectionName}
												/>
										)}
										{cover === "" && !collectionCover && (
												<p className="dropzoneInside" ref="albumCover">
													<b>Choose Collection cover</b> or drag it here.
												</p>
										)}

									</Dropzone>
								</Col>
							</Row>
							<br />
							<Button
									color="primary"
									variant="raised"
									disabled={collectionName === "" || isPosting}
									className="mui--pull-right"
									onClick={this.handleSubmit.bind(this)}>
								{isEditForm && "Update"}
								{!isEditForm && "Create"}
							</Button>
						</div>
						<br />
					</Form>
				</Panel>
		);
	}

	handleSubmit(e) {
		e.preventDefault();

		console.log('this.state');
		console.log(this.state);

		const payload = new FormData();

		payload.append("collectionCover", this.state.collectionCover);
		payload.append("collectionName", this.state.collectionName);
		payload.append("collectionDesc", this.state.collectionDesc);

		this.setState({
			isPosting: true
		});

		let serverPromise;
		if (this.state.isEditForm) {
			let colId = this.props.collection.id;
			let colKey = this.props.collection.colkey;
			serverPromise = fileUpload.updateCollection(payload, colId, colKey);
		} else {
			serverPromise = fileUpload.createCollection(payload);
		}

		serverPromise
				.then(res => {
					// console.log(res);
					if (res.status === 200 && res.data.success === true) {
						// console.log(res.data);
						this.setState({
							isCreated: true
						});
						return res.data;
					} else {
						this.setState({
							isCreated: false
						});
						return {error: true};
					}
				})
				.catch(err => {
					this.setState({
						isCreated: false
					});
					console.log(err);
				})
				.then(() => {
					this.setState({
						isPosting: false,
						collectionCover: "",
						collectionDesc: "",
						collectionName: "",
					});
					document.getElementById("collectionForm").reset();

				});
	}
}
function mapStateToProps(state) {
	let {username} = state.authenticate;
	return {
		username
	};
}
export default connect(mapStateToProps)(CreateCollection);
