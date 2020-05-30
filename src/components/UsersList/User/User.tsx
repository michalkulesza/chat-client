import React from "react";
import "./User.scss";

interface Props {
	userId?: string;
	name?: string;
}

const User: React.FC<Props> = ({ userId, name }) => {
	return (
		<div className="user" onClick={() => {}}>
			<div className="status">
				<div className="icon"></div>
			</div>
			<div className="name">{name}</div>
		</div>
	);
};

export default User;
