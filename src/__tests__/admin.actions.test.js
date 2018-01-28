import {fileUpload} from "../service/fileUpload";
import {adminActions} from "../actions/admin.actions";
import {collectionData} from "../data/collection";
import {actionConstants} from "../constant/user.constants";

describe("Admin Actions", () => {

	let dispatch;

	beforeAll(() => {
		dispatch = jest.fn();
	});

	afterEach(() => {
		// fileUpload.getAlbum.mockClear();
		// fileUpload.getCollection.mockClear();
		dispatch.mockClear();
	});

	describe("GetAlbum List", () => {

		it("Response 200", async () => {

			fileUpload.getAlbum = jest.fn().mockImplementation(() => {
				return Promise.resolve({
					status: 200,
					data: [{
						'aa': 'aa'
					}]
				});
			});

			let aa = await adminActions.getAlbumList()(dispatch);
			// expect(adminActions.getAlbumList()).toBe("");
		});

		it("Network Response NOT 200", async () => {
			fileUpload.getAlbum = jest.fn().mockImplementation(() => {
				return Promise.resolve({
					status: 500, data: null
				});
			});

			await adminActions.getAlbumList()(dispatch);
			expect(dispatch.mock.calls[0][0].type).toBe(actionConstants.GET_ALBUM_LIST_ERROR);
		});

		it("Network Request Failed", async () => {
			fileUpload.getAlbum = jest.fn().mockImplementation(() => {
				return Promise.reject("Error");
			});

			await adminActions.getAlbumList()(dispatch);
			expect(dispatch.mock.calls[0][0])
					.toEqual({
						type: actionConstants.GET_ALBUM_LIST_ERROR,
						data: 'Error'
					});
		});
	});

	describe("GetCollection List", () => {

		it("Response 200", async () => {

			fileUpload.getCollection = jest.fn().mockImplementation(() => {
				return Promise.resolve({
					status: 200,
					data: collectionData
				});
			});

			let aa = await adminActions.getCollectionList()(dispatch);
			// console.log(dispatch.mock.calls[0][0]);

			expect(dispatch.mock.calls[0][0].type)
					.toEqual(actionConstants.GET_COLLECTIONS_LIST_SUCCESS);
			expect(dispatch.mock.calls[0][0].data.length).toBe(2);

		});

		it("Network Response NOT 200", async () => {

			fileUpload.getCollection.mockReset();

			fileUpload.getCollection = jest.fn().mockImplementation(() => {
				return Promise.resolve({
					status: 403,
					data: null
				});
			});

			await adminActions.getCollectionList()(dispatch);

			expect(dispatch.mock.calls[0][0].type)
					.toEqual(actionConstants.GET_COLLECTIONS_LIST_ERROR);

		});

		it("Network Request Failed", async () => {

			fileUpload.getCollection.mockReset();

			fileUpload.getCollection = jest.fn().mockImplementation(() => {
				return Promise.reject("CollectionList Fetch Failed");
			});

			await adminActions.getCollectionList()(dispatch);

			expect(dispatch.mock.calls[0][0].type)
					.toEqual(actionConstants.GET_COLLECTIONS_LIST_ERROR);

		});

	});

	describe("GetCollection INFO", () => {

		afterEach(() => {
			// dispatch.mockClear();
		});

		it("Response 200", async () => {

			fileUpload.getCollection.mockReset();
			fileUpload.getCollection = jest.fn()
					.mockImplementation((colKey) => {
						return Promise.resolve({
							status: 200,
							response: {
								status: 200
							},
							data: collectionData[1]
						});
					});

			await adminActions.getCollectionInfo(1)(dispatch);

			expect(dispatch.mock.calls[0][0].type)
					.toEqual(actionConstants.GET_COLLECTIONS_INFO_SUCCESS);
			expect(dispatch.mock.calls[0][0].data.name)
					.toEqual("Wedding Photography");

		});

		it("Network Response NOT 200", async () => {

			fileUpload.getCollection.mockReset();

			fileUpload.getCollection = jest.fn()
					.mockImplementation((colKey) => {
						return Promise.resolve({status: 403});
					});

			await adminActions.getCollectionInfo(2)(dispatch);

			expect(dispatch.mock.calls[0][0].type)
					.toEqual(actionConstants.GET_COLLECTIONS_INFO_ERROR);

		});

		it("Network Request Failed", async () => {

			fileUpload.getCollection.mockReset();

			fileUpload.getCollection = jest.fn()
					.mockImplementation((colKey) => {
						return Promise.reject("CollectionInfo Fetch Failed");
					});

			await adminActions.getCollectionInfo()(dispatch);

			expect(dispatch.mock.calls[0][0].type)
					.toEqual(actionConstants.GET_COLLECTIONS_INFO_ERROR);
			expect(dispatch.mock.calls[0][0].data)
					.toEqual("CollectionInfo Fetch Failed");

		});

	});
















							// TEST REDUCERS NEXT






















});