/**
 * Created by SHolmes on 25-Nov-17.
 */
import React from "react";
import HomeLayout from "../components/HomeLayout";
import CreateCollection from "../components/Collection/CreateCollection";
import CreateAlbum from "../components/Albums/CreateAlbum";
import LoginPage from "../components/LoginPage";
import EditCollection from "../components/Collection/EditCollection";
import EditAlbum from "../components/Albums/EditAlbum";
import Error404 from "../components/Helpers/Error404";
import ManageSlider from "../components/ManageSlider";
const routes = [
	{
		path: "/",
		exact: true,
		private: false,
		main: () => <LoginPage/>
	},
	{
		path: "/login",
		exact: true,
		private: false,
		main: () => <LoginPage/>
	},
	{
		path: "/home",
		exact: true,
		private: true,
		main: () => <HomeLayout/>
	},
	{
		path: '/collection',
		exact: true,
		private: true,
		main: () => <CreateCollection/>
	},
	{
		path: '/collectionEdit',
		exact: true,
		private: true,
		main: () => <EditCollection/>
	},
	{
		path: '/collectionEdit/:colId',
		exact: true,
		private: true,
		main: () => <EditCollection/>
	},
	{
		path: '/album',
		private: true,
		exact: true,
		main: () => <CreateAlbum/>
	},
	{
		path: '/albumEdit',
		private: true,
		exact: true,
		main: () => <EditAlbum/>
	},
	{
		path: '/manageSlider',
		private: true,
		exact: true,
		main: () => <ManageSlider/>
	},
	{
		path: '/albumEdit/:albumId',
		private: true,
		exact: true,
		main: () => <EditAlbum/>
	}, {
		path: '*',
		exact: true,
		private: false,
		main: () => <Error404/>
	}
];

export default routes;
