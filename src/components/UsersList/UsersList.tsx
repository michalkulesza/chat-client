import React, { useState } from "react";
import "./UsersList.scss";

import Search from "./Search/Search";
import User from "./User/User";

interface Props {
	users: {
		idT?: string;
		name?: string;
	}[];
	handleChatListClick: (
		e: React.MouseEvent<HTMLDivElement, MouseEvent>
	) => void;
	currentUsername: string;
}

const UsersList: React.FC<Props> = ({
	users,
	handleChatListClick,
	currentUsername,
}) => {
	const [sortedUsers, setSortedUsers] = useState<
		{ id?: string; name?: string }[]
	>([{}]);

	return (
		<div className="usersList">
			<Search users={users} setSortedUsers={setSortedUsers} />
			<div className="usersContainer">
				<User
					name="Main"
					type="room"
					handleChatListClick={handleChatListClick}
				></User>
				{sortedUsers.length !== 0 ? (
					sortedUsers.map((user, i) => {
						return (
							<User
								key={i * Math.random()}
								name={user.name}
								type="user"
								handleChatListClick={handleChatListClick}
								currentUsername={currentUsername}
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
