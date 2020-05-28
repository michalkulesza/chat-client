import React, { useState } from "react";
import "./UsersList.scss";

import Search from "./Search/Search";
import User from "./User/User";

interface Props {
	joinUser: (partnersName: string | undefined) => void;
	users: {
		idT?: string;
		name?: string;
	}[];
}

const UsersList: React.FC<Props> = ({ users, joinUser }) => {
	const [sortedUsers, setSortedUsers] = useState<
		{ id?: string; name?: string }[]
	>([{}]);
	return (
		<div className="usersList">
			<Search users={users} setSortedUsers={setSortedUsers} />
			<div className="usersContainer">
				{sortedUsers.length !== 0 ? (
					sortedUsers.map((user, i) => {
						return (
							<User
								key={i * Math.random()}
								userId={user.id}
								name={user.name}
								joinUser={joinUser}
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
