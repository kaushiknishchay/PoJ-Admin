import axios from "axios";

export const fileUpload = {
	setAuthToken,
	removeAuthToken,
	getCollection,
	createCollection,
	updateCollection,
	deleteCollection,
	getAlbum,
	createAlbum,
	updateAlbum,
	deleteAlbum
};

let serverUrl = "http://picturesofjoy/api/v1";

let sConfig = {
	onUploadProgress: function (progressEvent) {
		let percentCompleted = Math.round(
				progressEvent.loaded * 100 / progressEvent.total
		);
		console.log("Uploaded: " + percentCompleted + "%");
	},
	headers: {
		"X-Auth-Token": localStorage.getItem("username"),
		"Authorization": "Bearer " + localStorage.getItem("ApiToken"),
		"Content-Type": "multipart/form-data"
	}
};

function setAuthToken() {
	sConfig.headers.Authorization = "Bearer " + localStorage.getItem("ApiToken");
}
function removeAuthToken() {
	sConfig.headers.Authorization = "Bearer -";
}

function getCollection(colId = "") {
	return axios.get(serverUrl + '/getCollection' + colId, sConfig);
}

function createCollection(payload) {
	return axios.post(serverUrl + '/createCollection', payload, sConfig);
}

function updateCollection(payload, colId, colKey) {
	return axios.post(serverUrl + '/updateCollection/' + colId + '/' + colKey, payload, sConfig);
}

function deleteCollection(colId) {
	return axios.delete(serverUrl + '/deleteCollection/' + colId, sConfig);
}

function getAlbum(albumId = "") {
	return axios.get(serverUrl + '/getAlbum' + albumId, sConfig);
}

function createAlbum(payload) {
	return axios.post(serverUrl + '/createAlbum', payload, sConfig);
}

function updateAlbum(payload, albumId, albumKey) {
	return axios.post(serverUrl + '/updateAlbum/' + albumId + '/' + albumKey, payload, sConfig);
}

function deleteAlbum(colId) {
	return axios.delete(serverUrl + '/deleteAlbum/' + colId, sConfig);
}
