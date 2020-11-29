import React, { useState } from "react";
import { Route } from "react-router-dom";
import "./App.scss";

import { Join } from "./pages";

interface Props {}

export type User = {
	username: string;
	registered: boolean;
};

const App: React.FC<Props> = () => {
	const [user, setUser] = useState<User | null>(null);

	return (
		<div className="App">
			<Route path="/" exact>
				<Join setUser={setUser} />
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
