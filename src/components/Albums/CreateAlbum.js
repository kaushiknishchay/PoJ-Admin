import React from "react";
import Panel from "muicss/lib/react/panel";
import Form from "muicss/lib/react/form";
import Input from "muicss/lib/react/input";
import Button from "muicss/lib/react/button";
import Option from "muicss/lib/react/option";
import Select from "muicss/lib/react/select";
import Textarea from "muicss/lib/react/textarea";
import Row from "muicss/lib/react/row";
import Col from "muicss/lib/react/col";
import Dropzone from "react-dropzone";
import {fileUpload} from "../../service/fileUpload";
import AlertBox from "../Helpers/AlertBox";
import {BASE_URL} from "../../constant/user.constants";

class CreateAlbum extends React.Component {

	componentWillMount() {

		let eAlbum = this.props.albumData;
		if (eAlbum !== undefined && eAlbum !== null && eAlbum.id !== undefined && !isNaN(eAlbum.id)) {
			this.setState({
				albumName: eAlbum.name,
				collectionName: eAlbum.collection_id,
				isEditForm: true,
				editAlbumValue: eAlbum,
				albumDesc: eAlbum.description,
			});
		}
		fileUpload.getCollection().then(res => {
			if (res.status === 200) {
				this.setState({
					collectionList: res.data
				});
			}
		}).catch(err => {
			console.log(err);
		});

	}

	constructor(props) {
		super(props);
		this.state = {
			albumName: "",
			collectionName: "",
			albumCover: "",
			isPosting: false,
			isEditForm: false,
			albumFiles: [],
			albumDesc: "",
			collectionList: [],
			isCreated: "",
			editAlbumValue: {},
			albumPhotoList: []
		};
		this.handleFileDelete.bind(this);
	}

	handleChange(e) {
		let target = e.target;
		this.setState({
			[target.name]: target.value
		});
	}

	// handleFileSelect(e) {
	// 	console.log(e.target.files);
	// 	this.setState({albumCover: e.target.files[0]});
	// }
	handleFileDelete(e, idx) {
		e.preventDefault();

		let photo_url = JSON.parse(this.props.albumData.photo_url);
		photo_url.splice(idx, 1);

		let newEditVal = this.state.editAlbumValue;
		newEditVal.photo_url = JSON.stringify(photo_url);

		this.setState({
			albumPhotoList: newEditVal.photo_url,
			editAlbumValue: newEditVal
		});
	}

	onDropCover(files) {
		this.setState({albumCover: files[0]});
	}

	onDrop(files) {
		this.setState({
			albumFiles: files
		});
	}

	render() {
		let {
			isPosting, albumName, albumCover, collectionName,
			albumFiles, collectionList, albumDesc, isCreated, isEditForm,
			editAlbumValue
		} = this.state;

		let name = albumName, desc = albumDesc, collection_id = collectionName, cover = "", alertText = "",
				albumPhotos = "";
		if (editAlbumValue.thumb_url) {
			cover = BASE_URL + editAlbumValue.thumb_url;
		}
		if (editAlbumValue.photo_url) {
			albumPhotos = JSON.parse(editAlbumValue.photo_url);
		}

		if (isEditForm) {
			alertText = " Updated ";
		} else {
			alertText = " Created ";
		}

		return (
				<Panel className="panelMargin formElementWrapper">
					<Form encType="multipart/form-data" id="albumForm" method="post">
						<legend className="legendStyle mui-row">
							<span className="mui-col-md-12"
							      style={{margin: "10px 0"}}>
								{isEditForm && "Edit " }
								{!isEditForm && "Create New "}
								Album
							</span>
						</legend>
						<div className="formMarginWrapper">
							{isCreated === true &&
							<AlertBox className="success" title={"Album" + alertText + " Successfully."}/>
							}
							{isCreated === false &&
							<AlertBox className="danger" title={"Error!. Album not " + alertText + "."}/>
							}
							<Input required={true}
							       label="Enter Album Name"
							       hint="eg. Nilanchal's Wedding"
							       name="albumName"
							       defaultValue={name}
							       onChange={this.handleChange.bind(this)}/>
							<Textarea
									name="albumDesc"
									label="Enter Description"
									defaultValue={desc}
									hint="eg. Pre-Wedding shoot of Nilanchal's 2nd wedding in Hyderabad."
									onChange={this.handleChange.bind(this)}
									rows={3}/>

							<Select name="collectionName"
							        defaultValue={collection_id}
							        required={true}
							        onChange={this.handleChange.bind(this)}>

								{collection_id === "" && <Option value="" label="Select Collection"/>}
								{
									collectionList.map((value) => {
										return (<Option value={value.id} key={value.id} label={value.name}/>);
									})
								}
							</Select>
							{albumPhotos.length !== 0 &&
							<div className="albumPhotosWrap">
								{albumPhotos !== [] && albumPhotos.map((val, idx) => {
									let imgLink = BASE_URL + val;
									return (<div key={idx} className="imageWrap">
										<button data={idx} onClick={(e) => this.handleFileDelete(e, idx)}>×</button>
										<img className="albumPhotos" src={imgLink} width={100} height={100}
										     alt={idx}/></div>);
								})}
							</div>
							}
							<Row>
								<Col md="5" md-offset="1" xs="8" xs-offset="2">
									<Dropzone
											onDrop={this.onDropCover.bind(this)}
											accept="image/*"
											required={true}
											className="dropzoneBg albumDrop dropzoneBgInline" multiple={false}>
										{cover && <img src={cover} className="albumCoverPreview" alt={name}/>}
										{albumCover && (
												<img className="albumCoverPreview"
												     src={albumCover.preview}
												     alt={albumName}/>
										)}

										{cover === "" && !albumCover && (
												<p className="dropzoneInside" ref="albumCover">
													<b>Choose album cover</b> or drag it here.
												</p>
										)}
									</Dropzone>
								</Col>

								<Col md="5" md-offset="1" xs="8" xs-offset="2">
									<Dropzone
											onDrop={this.onDrop.bind(this)}
											accept="image/*"
											name="albumFiles"
											className="dropzoneBg dropzoneBgInline">
										{albumFiles.length !== 0 && (
												<p className="dropzoneInside">
													<b>{albumFiles.length}</b>
													{" "} file{albumFiles.length > 1 ? "s " : " "} selected.
												</p>
										)}

										{albumFiles.length === 0 && (
												<p className="dropzoneInside">
													<b>Choose files</b> or drag them here.
												</p>
										)}
									</Dropzone>
								</Col>
							</Row>
							<Button
									color="primary"
									variant="raised"
									className="mui--pull-right"
									disabled={isPosting}
									onClick={this.uploadAction.bind(this)}>
								{isEditForm && "Update"}
								{!isEditForm && "Create"}
							</Button>
						</div>
						<br />
					</Form>
				</Panel>
		);
	}

	uploadAction(event) {
		event.preventDefault();

		this.setState({
			isPosting: true
		});

		let data = new FormData();
		let {albumFiles, albumDesc, collectionName, albumPhotoList} = this.state;

		data.append("albumName", this.state.albumName);
		data.append("albumCover", this.state.albumCover);
		data.append("collectionName", collectionName);
		data.append("albumDesc", albumDesc);


		if (albumFiles.length !== 0) {
			albumFiles.map((val, idx) => {
				return data.append("albumFiles[" + idx + "]", val);
			});
		}
		if (albumPhotoList !== undefined && albumPhotoList.length > 0) {
			data.append("albumPhotoUpdate", albumPhotoList);
		}

		let apiResponse;
		if (this.state.isEditForm) {
			let albumId = this.props.albumData.id;
			let albumKey = this.props.albumData.albumkey;
			apiResponse = fileUpload.updateAlbum(data, albumId, albumKey);
		} else {
			apiResponse = fileUpload.createAlbum(data);
		}
		// let apiResponse = fileUpload.createAlbum(data);

		apiResponse
				.then(res => {
					if (res.status === 200 && res.data.success === true) {
						console.log(res.data);
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
						albumName: "",
						collectionName: "",
						albumCover: "",
						isPosting: false,
						albumFiles: [],
						albumDesc: ""
					});
					document.getElementById("albumForm").reset();
				});
	}
}
/*

 <PreviewSwitch
 className="mui--text-body1 mui-col-md-2"
 title="Preview"
 id="albumPrev"
 name="albumPrev"/>
 */
export default CreateAlbum;
