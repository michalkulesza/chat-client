import React from "react";
import "./User.scss";

interface Props {
	userId?: string;
	name?: string;
	type: "user" | "room";
}

const User: React.FC<Props> = ({ userId, name, type }) => {
	return (
		<div className="user" onClick={() => {}}>
			<div className="status">
				{type === "user" ? <div className="icon"></div> : null}
			</div>
			<div className="name">
				{name} {type === "room" && "room"}
			</div>
		</div>
	);
};

export default User;
