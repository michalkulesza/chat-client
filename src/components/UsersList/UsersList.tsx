import React from "react";
import "./UsersList.scss";

import Search from "./Search/Search";
import User from "./User/User";

interface Props {
	users: {
		id?: string;
		name?: string;
	}[];
}

const UsersList: React.FC<Props> = ({ users }) => {
	return (
		<div className="usersList">
			<Search />
			<div className="usersContainer">
				{users
					? users.map((user, i) => {
							return (
								<User
									key={i * Math.random()}
									userId={user.id}
									name={user.name}
								/>
							);
					  })
					: null}
			</div>
		</div>
	);
};

export default UsersList;
