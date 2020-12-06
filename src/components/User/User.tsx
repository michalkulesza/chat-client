import React from "react";
import "./User.scss";

type Props = {
	user: {
		id: string;
		username: string;
	};
	currentUsername?: string;
	type: "user" | "room";
	handleChatListClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
};

const User: React.FC<Props> = ({ user, type, handleChatListClick, currentUsername }) => {
	return currentUsername !== user.username ? (
		<div
			className="user"
			onClick={e => {
				handleChatListClick(e);
			}}
		>
			<div className="status">
				{type === "room" || currentUsername === user.username ? (
					<div className="user-icon"></div>
				) : (
					<div className="status-icon"></div>
				)}
			</div>
			<div className="name">
				{currentUsername === user.username ? <span>You</span> : user.username} {type === "room" && "room"}
			</div>
		</div>
	) : null;
};

export default User;
