import {actionConstants} from "../constant/user.constants";
let initialState = {
	collectionList: "",
	albumList: "",
	collectionListError: "",
	albumListError: "",
	editCollection: "",
	editCollectionError: "",
	isCollectionInEditMode: false,
	isAlbumInEditMode: false
};
export function adminReducer(state = initialState, action) {
	switch (action.type) {
		case actionConstants.GET_ALBUM_LIST_SUCCESS:
			return {
				...state,
				albumList: action.data,
				albumListError: "",
				isAlbumInEditMode: false
			};
		case actionConstants.GET_ALBUM_LIST_ERROR:
			return {
				...state,
				albumList: "",
				albumListError: action.data,
				isAlbumInEditMode: false
			};
		case actionConstants.GET_COLLECTIONS_LIST_SUCCESS:
			return {
				...state,
				collectionList: action.data,
				collectionListError: "",
				isCollectionInEditMode: false
			};
		case actionConstants.GET_COLLECTIONS_LIST_ERROR:
			return {
				...state,
				collectionList: "",
				collectionListError: action.data,
				isCollectionInEditMode: false
			};
		case actionConstants.UPDATE_COLLECTION_LIST:
			const newCol = state.collectionList;
			return {
				...state,
				collectionList: newCol.slice(0, action.data).concat(newCol.slice(action.data + 1)),
			};
		case actionConstants.GET_COLLECTIONS_INFO_SUCCESS:
			return {
				...state,
				editCollection: action.data,
				editCollectionError: "",
				isCollectionInEditMode: true
			};
		case actionConstants.GET_COLLECTIONS_INFO_ERROR:
			return {
				...state,
				editCollection: "",
				editCollectionError: action.data,
				isCollectionInEditMode: false
			};
		default:
			return state;
	}
}