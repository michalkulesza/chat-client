import React, { useState } from "react";
import "./UsersList.scss";

import Search from "../../components/Search/Search";
import User from "../../components/User/User";

interface Props {
	users: { id: string; username: string }[];
	handleChatListClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
	currentUsername: string;
}

const UsersList: React.FC<Props> = ({ users, handleChatListClick, currentUsername }) => {
	const [sortedUsers, setSortedUsers] = useState<{ id: string; username: string }[]>([]);

	return (
		<div className="usersList">
			<Search users={users} setSortedUsers={setSortedUsers} />
			<div className="usersContainer">
				<User user={{ id: "0", username: "Main" }} type="room" handleChatListClick={handleChatListClick}></User>
				{sortedUsers.length > 1 ? (
					sortedUsers.map(user => {
						return (
							<User
								key={user.id}
								user={user}
								type="user"
								handleChatListClick={handleChatListClick}
								currentUsername={currentUsername}
							/>
						);
					})
				) : (
					<div className="info">No users found.</div>
				)}
				<div className="info">Click on a user to start private chat.</div>
			</div>
		</div>
	);
};

export default UsersList;
