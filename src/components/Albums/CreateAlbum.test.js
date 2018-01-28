/**
 * Created by SHolmes on 06-Jan-18.
 */
import React from "react";
import ReactDOM from "react-dom";
import CreateAlbum from "./CreateAlbum";
import renderer from "react-test-renderer";

describe("CreateAlbum Rendering", () => {


	it('CreateAlbum renders without crashing', () => {
		// const div = document.createElement('div');
		// ReactDOM.render(<CreateAlbum/>, div);
	});

	it("Renderer Snapshot testing", () => {
		// const tree = renderer.create(<CreateAlbum />)
		// 		.toJSON();
		// expect(tree).toMatchSnapshot();
	});

});

