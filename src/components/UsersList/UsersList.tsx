import React from "react";
import "./UsersList.scss";

import Search from "./Search/Search";

interface Props {}

const UsersList: React.FC<Props> = () => {
	return (
		<div className="usersList">
			<Search />
		</div>
	);
};

export default UsersList;
