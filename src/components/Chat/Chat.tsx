import React from "react";
import "./Chat.scss";

interface Props {}

const Chat: React.FC<Props> = () => {
	return (
		<div className="chat">
			<div className="left"></div>
			<div className="middle"></div>
			<div className="right"></div>
		</div>
	);
};

export default Chat;
