import React from "react";
import "./Messages.scss";

import Message from "../Message/Message";

interface Props {
	messages: { text: string; type: "user" | "partner" | "admin" }[];
}

const Messages: React.FC<Props> = ({ messages }) => {
	return (
		<div className="messages">
			{messages.map((message, i) => {
				return (
					<Message
						key={i * Math.random()}
						content={message.text}
						type={message.type}
					></Message>
				);
			})}
		</div>
	);
};

export default Messages;
