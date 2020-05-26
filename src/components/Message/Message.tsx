import React from "react";
import "./Message.scss";

interface Props {
	content: string;
	type: "user" | "partner" | "admin";
}

const Message: React.FC<Props> = ({ content, type }) => {
	return (
		<div className="message-container">
			<div className={`message ${type}`}>{content}</div>
		</div>
	);
};

export default Message;
