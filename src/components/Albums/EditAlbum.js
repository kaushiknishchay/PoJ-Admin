import React, {Component} from "react";
import {fileUpload} from "../../service/fileUpload";
import CreateAlbum from "./CreateAlbum";
import AlertBox from "../Helpers/AlertBox";
import {Panel} from "muicss/react";
import {NavLink, withRouter} from "react-router-dom";

class EditAlbum extends Component {

	componentWillMount() {
		fileUpload.getAlbum().then(res => {
			if (res.status === 200) {
				this.setState({
					albumList: res.data
				});
			}
		}).catch(err => {
		});
	// }
	//
	// componentDidMount() {
		let urlParams = this.props.match.params;
		if (urlParams !== undefined && urlParams.albumId !== undefined && urlParams.albumId !== null) {

			fileUpload.getAlbum("/" + urlParams.albumId).then(res => {
				if (res.status === 200 && res.data !== "") {
					this.setState({
						editAlbum: res.data,
						isInEditMode: true
					});
				}
				// console.log(res);
			}).catch(err => {
				console.log(err);
			});

		}
	}

	constructor(props) {
		super(props);
		this.state = {
			albumList: [],
			isInEditMode: false,
			isDeleted: "",
			editAlbum: {}
		};
		this.handleDelete.bind(this);
	}


	handleDelete(val, idx) {
		fileUpload.deleteAlbum(val).then(res => {
			if (res.status === 200 && res.data.success) {
				let newCol = this.state.albumList;
				newCol.splice(idx, 1);
				this.setState({
					'albumList': newCol,
					isDeleted: true
				});
			}
		}).catch(err => {
			console.log(err);
			this.setState({
				isDeleted: false
			});
		});
	}

	render() {
		let {isInEditMode, isDeleted, editAlbum, albumList} = this.state;


		return (
				<div>
					{ !isInEditMode &&
					<Panel className="panelMargin">
						<h3 className="heading">Album List</h3>
						<div>
							{isDeleted === true && <AlertBox className="success" title="Collection Deleted."/>}
							{isDeleted === false &&
							<AlertBox className="danger" title="Collection NOT Deleted."/>}
							<ul className="colList">
								{
									albumList.map((value, idx) => {
										let editLink = "/albumEdit/" + value.albumkey;

										return (
												<li key={value.id}>
													<span>{value.name}</span>
													<span className="mui--pull-right">
											<NavLink to={editLink}
											         activeClassName="active">
												<i className="material-icons green-color">
													mode_edit
												</i>
											</NavLink>
											<button
													className="deleteBtn"
													onClick={() => this.handleDelete(value.albumkey, idx)}>
												<i className="material-icons red-color">
													delete
												</i>
											</button>
											</span>
												</li>)
									})
								}
							</ul>
						</div>
					</Panel>
					}
					{isInEditMode &&
					<CreateAlbum albumData={editAlbum}/>
					}
				</div>
		)
	}
}
export default withRouter(EditAlbum);