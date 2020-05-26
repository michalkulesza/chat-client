import React from "react";
import "./Messages.scss";

import Message from "../Message/Message";

interface Props {
	messages: { text: string; name: string }[];
	name: string;
}

const Messages: React.FC<Props> = ({ messages, name }) => {
	return (
		<div className="messages">
			{messages.map((message, i) => {
				let type: string;

				if (message.name === "admin") {
					type = "admin";
				} else if (message.name === name) {
					type = "user";
				} else {
					type = "partner";
				}

				return (
					<Message
						key={i * Math.random()}
						content={message.text}
						type={type}
					></Message>
				);
			})}
		</div>
	);
};

export default Messages;
