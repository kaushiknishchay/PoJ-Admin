import React, {Component} from "react";
import {Panel} from "muicss/react";
import {NavLink, withRouter} from "react-router-dom";
import AlertBox from "../Helpers/AlertBox";
import CreateCollection from "./CreateCollection";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {adminActions} from "../../actions/admin.actions";
import LoadingBar from "../Helpers/LoadingBar";
import {actionConstants} from "../../constant/user.constants";
import {fileUpload} from "../../service/fileUpload";
import {userActions} from "../../actions/userActions";

class EditCollection extends Component {


	componentWillMount() {
		document.title = 'View/Edit Collections';

		this.props.getCollectionList();

		let urlParmas = this.props.match.params;

		if (urlParmas !== undefined && urlParmas.colId !== undefined && urlParmas.colId !== null) {
			this.props.getCollectionInfo(urlParmas.colId);
			this.setState({
				isInEditMode: true
			});
		}else{
			this.setState({
				isInEditMode: false
			});
		}
	}

	constructor(props) {
		super(props);
		this.state = {
			isDeleted: "",
			isInEditMode: ""
		};

		this.handleDelete.bind(this);
	}

	handleDelete(val, idx) {

		fileUpload.deleteCollection(val).then(res => {
			if (res.status === 200 && res.data && res.data.success) {
				this.props.dispatch(update(idx));
				this.setState({
					isDeleted: true
				});
			} else if (res.status === 401) {
				this.props.dispatch(userActions.logout());
			} else {
				this.setState({
					isDeleted: false
				});
			}
		}).catch(err => {
			this.setState({
				isDeleted: false
			});
		});

		function update(index) {
			return {
				type: actionConstants.UPDATE_COLLECTION_LIST,
				data: index
			};
		}
	}

	render() {

		let {isDeleted, isInEditMode} = this.state;

		if (!this.props.loggedIn) {
			this.props.history.push('/');
		}

		return (
				<div>
					{ !isInEditMode &&
					<Panel className="panelMargin">
						<h3 className="heading">Collection List</h3>
						{isDeleted === true && <AlertBox className="success" title="Collection Deleted."/>}
						{isDeleted === false &&
						<AlertBox className="danger" title="Collection NOT Deleted."/>}
						{this.renderList()}
					</Panel>
					}
					{this.renderEditForm()}
				</div>
		)
	}

	renderEditForm() {
		if (this.state.isInEditMode && this.props.editCollection) {
			return (<CreateCollection collection={this.props.editCollection}/>);
		}
	}

	renderList() {

		if (this.props.collectionList) {
			return (<ul className="colList">
				{this.props.collectionList.map((value, idx) => {
					let editLink = "/collectionEdit/" + value.colkey;

					return (
							<li key={value.id}>
								<span>{value.name}</span>
								<span className="mui--pull-right">
								<NavLink to={editLink} activeClassName="active">
									<i className="material-icons green-color">
										mode_edit
									</i>
								</NavLink>
								<button className="deleteBtn"
								        onClick={() => this.handleDelete(value.colkey, idx)}>
									<i className="material-icons red-color">
										delete
									</i>
								</button>
							</span>
							</li>)
				})
				} </ul>)
		} else {
			return (<LoadingBar />);
		}
	}
}

function mapStateToProps(state) {
	const {loggedIn} = state.authenticate;
	const {collectionList, collectionListError, editCollection, editCollectionError} = state.adminReducer;
	return {
		loggedIn,
		collectionList,
		collectionListError,
		editCollection,
		editCollectionError,
	};
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		getCollectionList: adminActions.getCollectionList,
		getCollectionInfo: adminActions.getCollectionInfo,
	}, dispatch);
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditCollection));
