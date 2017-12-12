// main React dependencies
import React from "react";
import ReactDOM from "react-dom";

// simple routing for single-page app
import { BrowserRouter, Route } from "react-router-dom";

// nnclude main Main component
import Main from "./components/Main";

// render main route
ReactDOM.render(
	(
		<BrowserRouter>
			<Route path="/" component={Main} />
		</BrowserRouter>
	),
	document.getElementById("app")
);
