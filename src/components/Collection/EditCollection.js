import React, {Component} from "react";
import {Panel} from "muicss/react";
import {fileUpload} from "../../service/fileUpload";
import {NavLink, Redirect, withRouter} from "react-router-dom";
import AlertBox from "../Helpers/AlertBox";
import CreateCollection from "./CreateCollection";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {adminActions} from "../../actions/admin.actions";

class EditCollection extends Component {

	componentWillMount() {
		this.props.getCollectionList();
		//
		//
		// if (this.props.collectionList === []) {
		// 	fileUpload.getCollection().then(res => {
		// 		if (res.status === 200) {
		// 			// console.log(res.data);
		// 			this.setState({
		// 				collectionList: res.data
		// 			});
		// 		}
		// 	}).catch(err => {
		// 	});
		// }

		let urlParmas = this.props.match.params;

		if (urlParmas !== undefined && urlParmas.colId !== undefined && urlParmas.colId !== null) {

			// fileUpload.getCollection("/" + urlParmas.colId).then(res => {
			// 	if (res.status === 200 && res.data !== "") {
			// 		this.setState({
			// 			editCollection: res.data,
			// 			isInEditMode: true
			// 		});
			// 	} else {
			// 		this.setState({
			// 			editCollection: {},
			// 			isInEditMode: false
			// 		});
			// 	}
			// }).catch(err => {
			// 	// console.log(err);
			// 	this.setState({
			// 		editCollection: {},
			// 		isInEditMode: false
			// 	});
			// 	this.props.history.push("/collectionEdit");
			// });

		}
	}

	constructor(props) {
		super(props);
		this.state = {
			collectionList: [],
			isInEditMode: false,
			isDeleted: "",
			editCollection: {}
		};

		this.handleDelete.bind(this);
	}

	handleDelete(val, idx) {
		fileUpload.deleteCollection(val).then(res => {
			if (res.status === 200 && res.data.success) {
				let newCol = this.state.collectionList;
				newCol.splice(idx, 1);
				this.setState({
					'collectionList': newCol,
					isDeleted: true
				});
			}
		}).catch(err => {
			this.setState({
				isDeleted: false
			});
		});
	}

	render() {
		let colList = this.state.collectionList;
		let {isInEditMode, isDeleted, editCollection} = this.state;

		if (!this.props.loggedIn) {
			return (<Redirect to="/"/>)
		}

		return (
				<div>
					{ !isInEditMode &&
					<Panel className="panelMargin">
						<h3 className="heading">Collection List</h3>
						<div>
							{isDeleted === true && <AlertBox className="success" title="Collection Deleted."/>}
							{isDeleted === false &&
							<AlertBox className="danger" title="Collection NOT Deleted."/>}
							<ul className="colList">
								{
									colList.map((value, idx) => {
										let editLink = "/collectionEdit/" + value.colkey;

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
													onClick={() => this.handleDelete(value.colkey, idx)}>
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
					<CreateCollection collection={editCollection}/>
					}
				</div>
		)
	}
}

function mapStateToProps(state) {
	const {loggedIn} = state.authenticate;
	const {collectionList, collectionListError} = state.adminReducer;
	return {
		loggedIn,
		collectionList,
		collectionListError
	};
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		getCollectionList: adminActions.getCollectionList
	}, dispatch);
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditCollection));