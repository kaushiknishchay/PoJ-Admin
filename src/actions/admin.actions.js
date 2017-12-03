import {actionConstants} from "../constant/user.constants";
import {fileUpload} from "../service/fileUpload";
import {userActions} from "./userActions";
export const adminActions = {
	getCollectionList
};

function getCollectionList() {
	return dispatch => {
		fileUpload.getCollection().then(res => {
			if (res.status === 200 && res.data) {
				dispatch(success(res.data))
			} else if (res.status === 401) {
				dispatch(userActions.logout());
			} else {
				dispatch(error(res));
			}
		}).catch(err => {
			dispatch(error(err));
		});
	};

	function success(data) {
		return {type: actionConstants.GET_COLLECTIONS_LIST_SUCCESS, data: data};
	}

	function error(data) {
		return {type: actionConstants.GET_COLLECTIONS_LIST_ERROR, data: data};
	}
}
function getCollectionInfo(colKey) {
	return dispatch => {
		fileUpload.getCollection().then(res => {
			if (res.status === 200 && res.data) {
				dispatch(success(res.data))
			} else if (res.status === 401) {
				dispatch(userActions.logout());
			} else {
				dispatch(error(res));
			}
		}).catch(err => {
			dispatch(error(err));
		});


		fileUpload.getCollection("/" + colKey).then(res => {
			if (res.status === 200 && res.data) {
				dispatch(success(res.data))
			} else if (res.status === 401) {
				dispatch(userActions.logout());
			} else {
				dispatch(error(res));
			}
		}).catch(err => {
			dispatch(error(err));
			// this.props.history.push("/collectionEdit");
		});
	};

	function success(data) {
		return {type: actionConstants.GET_COLLECTIONS_INFO_SUCCESS, data: data};
	}

	function error(data) {
		return {type: actionConstants.GET_COLLECTIONS_INFO_ERROR, data: data};
	}
}