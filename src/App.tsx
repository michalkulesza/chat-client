import React, { useState } from "react";
import { Redirect, Route } from "react-router-dom";
import "./App.scss";

import { Join } from "./pages";
import { Chat } from "./pages";

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
			<Route path="/chat" exact>
				{user ? <Chat user={user} /> : <Redirect to="/" />}
			</Route>
		</div>
	);
};

export default App;
