import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.scss";

import Join from "./components/Join/Join";
import Chat from "./components/Chat/Chat";

interface Props {}

const App: React.FC<Props> = () => {
	const [name, setName] = useState("");

	return (
		<div className="App">
			<Router>
				<Route
					path="/"
					exact
					render={props => <Join {...props} name={name} setName={setName} />}
				></Route>
				<Route
					path="/chat"
					render={props => {
						return name !== "" ? (
							<Chat {...props} name={name} />
						) : (
							<Join {...props} name={name} setName={setName} />
						);
					}}
				></Route>
			</Router>
		</div>
	);
};

export default App;
