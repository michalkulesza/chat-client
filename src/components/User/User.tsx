import React from "react";
import "./User.scss";

type Props = {
	name?: string;
	currentUsername?: string;
	type: "user" | "room";
	handleChatListClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
};

const User: React.FC<Props> = ({ name, type, handleChatListClick, currentUsername }) => {
	return (
		<div
			className="user"
			data-user={name}
			onClick={e => {
				handleChatListClick(e);
			}}
		>
			<div className="status">
				{type === "room" || currentUsername === name ? (
					<div className="user-icon"></div>
				) : (
					<div className="status-icon"></div>
				)}
			</div>
			<div className="name">
				{currentUsername === name ? <span>You</span> : name} {type === "room" && "room"}
			</div>
		</div>
	);
};

export default User;
