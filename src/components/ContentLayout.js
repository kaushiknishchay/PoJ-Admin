import React, {Component} from "react";
import {Col, Container, Row} from "muicss/react";
import SideNavBar from "./SideNavBar";
import routes from "../constant/routes.config";
import PrivateRoute from "./PrivateRoute";
import {Route, Switch, withRouter} from "react-router-dom";

class ContentLayout extends Component {

	render() {
		let uLocal = this.props.location, colWidth = 8;
		let isValidRoute = routes.filter(r => {
					if (r.path === uLocal.pathname) {
						return true;
					} else {
						try {
							let ra = r.path.split("/");
							let pa = uLocal.pathname.split("/");
							ra.splice(0, 1);
							pa.splice(0, 1);
							return ra.indexOf(pa[0]) > -1;
						} catch (e) {
							return false;
						}
					}
				}).length > 0;

		if (!isValidRoute || uLocal.pathname === "/" || uLocal.pathname === "/login") {
			colWidth = 12
		}

		return (
				<div className="containerGrey">
					<Container fluid={true}>
						<Row>
							{ uLocal.pathname !== "/"
							&& uLocal.pathname !== "/login"
							&& isValidRoute
							&& <Col md="4" md-offset="0">
								<SideNavBar />
							</Col>
							}
							<Col md={colWidth} md-offset="0">
								<Switch>
									{routes.map((route, index) => {
										if (route.private) {
											return (<PrivateRoute
													key={index}
													path={route.path}
													exact={route.exact}
													component={route.main}
											/>);
										} else {
											return (<Route
													key={index}
													path={route.path}
													exact={route.exact}
													component={route.main}/>);
										}
									})}
								</Switch>
							</Col>
						</Row>
					</Container>
				</div>
		)
	}
}
export default withRouter(ContentLayout);
/*
 <div>
 <Route exact path="/" component={LoginPage}/>
 <Route exact path="/login" component={LoginPage}/>
 <PrivateRoute path="/home" component={HomeLayout}/>
 <PrivateRoute path="/collection" component={CreateCollection}/>
 <PrivateRoute path="/album" component={HomeLayout}/>
 </div>
 */