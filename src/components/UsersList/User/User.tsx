import React from "react";
import "./User.scss";

interface Props {
	userId?: string;
	name?: string;
	joinUser: (partnersName: string | undefined) => void;
}

const User: React.FC<Props> = ({ userId, name, joinUser }) => {
	return (
		<div className="user" onClick={() => joinUser(name)}>
			<div className="status">
				<div className="icon"></div>
			</div>
			<div className="name">{name}</div>
		</div>
	);
};

export default User;
