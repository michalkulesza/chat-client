import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.scss";

import Join from "./components/Join/Join";
import Chat from "./components/Chat/Chat";

interface Props {}

const App: React.FC<Props> = () => {
	const [name, setName] = useState(`user${Math.floor(Math.random() * 10000)}`);
	const [isUsernameTaken, setIsUsernameTaken] = useState(false);

	return (
		<div className="App">
			<Router basename="/chatter">
				<Route
					path="/"
					exact
					render={props => (
						<Join
							{...props}
							name={name}
							setName={setName}
							isUsernameTaken={isUsernameTaken}
						/>
					)}
				></Route>
				<Route
					path="/chat"
					exact
					render={props => {
						return name !== "" ? (
							<Chat
								{...props}
								name={name}
								setIsUsernameTaken={setIsUsernameTaken}
							/>
						) : (
							<Join
								{...props}
								name={name}
								setName={setName}
								isUsernameTaken={isUsernameTaken}
							/>
						);
					}}
				></Route>
			</Router>
		</div>
	);
};

export default App;
