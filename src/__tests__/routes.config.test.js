/**
 * Created by SHolmes on 21-Jan-18.
 */
import routes from "../constant/routes.config";
import React from "react";
import EditAlbum from "../components/Albums/EditAlbum";
import LoginPage from "../components/LoginPage";
import HomeLayout from "../components/HomeLayout";
import EditCollection from "../components/Collection/EditCollection";
import CreateCollection from "../components/Collection/CreateCollection";
import CreateAlbum from "../components/Albums/CreateAlbum";
import ManageSlider from "../components/ManageSlider";
import Error404 from "../components/Helpers/Error404";
describe("Route Config test", () => {

	it("LoginPage Return", () => {
		let idx = 0;
		expect(routes[idx].path).toEqual("/");
		expect(routes[idx].main()).toEqual(<LoginPage/>);
	});

	it("Route 1 LoginPage Return", () => {
		let idx = 1;
		expect(routes[idx].path).toEqual("/login");
		expect(routes[idx].main()).toEqual(<LoginPage/>);
	});

	it("HomeLayout Return", () => {
		let idx = 2;
		expect(routes[idx].path).toEqual("/home");
		expect(routes[idx].main()).toEqual(<HomeLayout/>);
	});

	it("CreateCollection Return", () => {
		let idx = 3;
		expect(routes[idx].path).toEqual("/collection");
		expect(routes[idx].main()).toEqual(<CreateCollection/>);
	});

	it("EditCollection Return", () => {
		let idx = 4;
		expect(routes[idx].path).toEqual("/collectionEdit");
		expect(routes[idx].main()).toEqual(<EditCollection/>);
	});

	it("EditCollection with value Return", () => {
		let idx = 5;
		expect(routes[idx].path).toEqual("/collectionEdit/:colId");
		expect(routes[idx].main()).toEqual(<EditCollection/>);
	});

	it("CreateAlbum Return", () => {
		let idx = 6;
		expect(routes[idx].path).toEqual("/album");
		expect(routes[idx].main()).toEqual(<CreateAlbum/>);
	});

	it("EditAlbum Return", () => {
		let idx = 7;
		expect(routes[idx].path).toEqual("/albumEdit");
		expect(routes[idx].main()).toEqual(<EditAlbum/>);
	});

	it("ManageSlider Return", () => {
		let idx = 8;
		expect(routes[idx].path).toEqual("/manageSlider");
		expect(routes[idx].main()).toEqual(<ManageSlider/>);
	});


	it("EditAlbum Return", () => {
		let idx = 9;
		expect(routes[idx].path).toEqual("/albumEdit/:albumId");
		expect(routes[idx].main()).toEqual(<EditAlbum/>);
	});


	it("Error 404 Return", () => {
		let idx = 10;
		expect(routes[idx].path).toEqual("*");
		expect(routes[idx].main()).toEqual(<Error404/>);
	});

});