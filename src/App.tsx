import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Join from "./components/Join/Join";
import Chat from "./components/Chat/Chat";

interface Props {}

const App: React.FC<Props> = () => (
	<Router>
		<Route path="/" exact component={Join}></Route>
		<Route path="/chat" component={Chat}></Route>
	</Router>
);

export default App;
