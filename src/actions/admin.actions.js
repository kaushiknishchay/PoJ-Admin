import {actionConstants} from "../constant/user.constants";
import {fileUpload} from "../service/fileUpload";
import {userActions} from "./userActions";
export const adminActions = {
	getCollectionList,
	getCollectionInfo,
	updateCollection,
	getAlbumList
};

function getAlbumList() {
	return dispatch => {
		fileUpload.getAlbum().then(res => {
			if (res.status === 200 && res.data) {
				dispatch(success(res.data))
			} else {
				dispatch(error(res));
			}
		}, err => {
			dispatch(error(err));
		}).catch(err => {
			// console.log(err);
			dispatch(error(err));
		});
	};

	function success(data) {
		return {type: actionConstants.GET_ALBUM_LIST_SUCCESS, data: data};
	}

	function error(data) {
		return {type: actionConstants.GET_ALBUM_LIST_ERROR, data: data};
	}
}

function getCollectionList() {
	return dispatch => {
		fileUpload.getCollection()
				.then(res => {
					if (res.status === 200 && res.data) {
						dispatch(success(res.data))
					} else {
						dispatch(error(res));
					}
				}, err => {
					dispatch(error(err));
				})
				.catch(err => {
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

		fileUpload.getCollection("/" + colKey).then(res => {
			if (res.status === 200 && res.data) {
				dispatch(success(res.data))
			} else {
				dispatch(error(res));
			}
		}, err => {
			dispatch(error(err));
		}).catch(err => {
			// if (err.response.status === 401) {
			// 	dispatch(userActions.logout());
			// }
			dispatch(error(err));
		});
	};

	function success(data) {
		return {type: actionConstants.GET_COLLECTIONS_INFO_SUCCESS, data: data};
	}

	function error(data) {
		return {type: actionConstants.GET_COLLECTIONS_INFO_ERROR, data: data};
	}
}
function updateCollection(val, idx) {

	return dispatch => {
		fileUpload.deleteCollection(val).then(res => {
			if (res.status === 200 && res.data && res.data.success) {
				dispatch(update(idx));
			} else {
				dispatch(error(res));
			}
		}).catch(err => {
			if (err.response.status === 401) {
				dispatch(userActions.logout());
			} else {
				dispatch(error(err));
			}
		});

	};
	function update(index) {
		return {
			type: actionConstants.UPDATE_COLLECTION_LIST,
			data: index
		};
	}

	function error(data) {
		return {
			type: actionConstants.UPDATE_COLLECTION_LIST,
			data: data
		};
	}
}