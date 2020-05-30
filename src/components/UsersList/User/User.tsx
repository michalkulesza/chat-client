import React from "react";
import "./User.scss";

interface Props {
	userId?: string;
	name?: string;
	currentUsername?: string;
	type: "user" | "room";
	handleChatListClick: (
		e: React.MouseEvent<HTMLDivElement, MouseEvent>
	) => void;
}

const User: React.FC<Props> = ({
	userId,
	name,
	type,
	handleChatListClick,
	currentUsername,
}) => {
	return (
		<div
			className="user"
			data-user={name}
			onClick={e => {
				handleChatListClick(e);
			}}
		>
			<div className="status">
				{type === "user" && currentUsername !== name ? (
					<div className="icon"></div>
				) : null}
			</div>
			<div className="name">
				{name} {type === "room" && "room"} {currentUsername === name && "(you)"}
			</div>
		</div>
	);
};

export default User;
