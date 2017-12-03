import React, {Component} from "react";
import Panel from "muicss/lib/react/panel";
import {fileUpload} from "../service/fileUpload";

export default class HomeLayout extends Component {

	componentWillMount() {
		document.title = 'Dashboard';
		fileUpload.setAuthToken();

		fileUpload.getCollection().then(res => {
			this.setState({
				"collectionCount": res.data.length
			});
		});
		fileUpload.getAlbum().then(res => {
			this.setState({
				"albumCount": res.data.length
			});
		});
	}

	constructor(props) {
		super(props);
		this.state = {
			collectionCount: "",
			albumCount: ""
		};
	}

	render() {

		return (
				<div>
					<Panel className="panelMargin">
						<h2 className="heading">
							Welcome,
							{" " + localStorage.getItem("username")}
						</h2>
						<br/>
						<ul className="colList">
							<li>
								<b>Total no. of collections: </b>
								{this.state.collectionCount}
							</li>
							<li>
								<b>Total no. of albums: </b>
								{this.state.albumCount}
							</li>
						</ul>
					</Panel>
				</div>
		)
	}
}

/*

 <Tabs defaultSelectedIndex={1} justified={true} className="TabsPanel">
 <Tab value="create-collection" label="Create Collection">
 <CreateCollection/>
 </Tab>
 <Tab value="create-album" label="Create Album">
 <CreateAlbum/>
 </Tab>
 </Tabs>
 */
