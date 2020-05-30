import React, { useState } from "react";
import "./UsersList.scss";

import Search from "./Search/Search";
import User from "./User/User";

interface Props {
	users: {
		idT?: string;
		name?: string;
	}[];
}

const UsersList: React.FC<Props> = ({ users }) => {
	const [sortedUsers, setSortedUsers] = useState<
		{ id?: string; name?: string }[]
	>([{}]);
	return (
		<div className="usersList">
			<Search users={users} setSortedUsers={setSortedUsers} />
			<div className="usersContainer">
				<User name="Main" type="room"></User>
				{sortedUsers.length !== 0 ? (
					sortedUsers.map((user, i) => {
						return (
							<User
								key={i * Math.random()}
								userId={user.id}
								name={user.name}
								type="user"
							/>
						);
					})
				) : (
					<div className="info">No users found.</div>
				)}
			</div>
		</div>
	);
};

export default UsersList;
