import {actionConstants} from "../constant/user.constants";
let initialState = {
	collectionList: "",
	collectionListError: "",
	editCollection: "",
	isCollectionInEditMode: false
};
export function adminReducer(state = initialState, action) {
	switch (action.type) {
		case actionConstants.GET_COLLECTIONS_LIST_SUCCESS:
			return {
				...state,
				collectionList: action.data,
				collectionListError: ""
			};
		case actionConstants.GET_COLLECTIONS_LIST_ERROR:
			return {
				...state,
				collectionList: "",
				collectionListError: action.data
			};
		case actionConstants.GET_COLLECTIONS_INFO_SUCCESS:
			return {
				...state,
				editCollection: action.data,
				isCollectionInEditMode: true
			};
		case actionConstants.GET_COLLECTIONS_INFO_ERROR:
			return {
				...state,
				editCollection: "",
				isCollectionInEditMode: false
			};
		default:
			return state;
	}
}