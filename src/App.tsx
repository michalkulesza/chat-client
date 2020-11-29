import React, { useState } from "react";
import { Route } from "react-router-dom";
import "./App.scss";

import { Join } from "./pages";

interface Props {}

const App: React.FC<Props> = () => {
	const [name, setName] = useState<null | string>(null);
	const [isUsernameTaken] = useState(false);

	return (
		<div className="App">
			<Route path="/" exact>
				<Join name={name} setName={setName} isUsernameTaken={isUsernameTaken} />
			</Route>
			{/* <Route
				path="/chat"
				exact
				render={props => {
					return name !== "" ? (
						<Chat {...props} name={name} setIsUsernameTaken={setIsUsernameTaken} />
					) : (
						<Join {...props} name={name} setName={setName} isUsernameTaken={isUsernameTaken} />
					);
				}}
			></Route> */}
		</div>
	);
};

export default App;
