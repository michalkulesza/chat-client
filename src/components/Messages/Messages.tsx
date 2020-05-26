import React from "react";
import "./Messages.scss";
import ScrollToBottom from "react-scroll-to-bottom";

import Message from "./Message/Message";

interface Props {
	messages: { text: string; name: string }[];
	name: string;
}

const Messages: React.FC<Props> = ({ messages, name }) => {
	return (
		<div className="messages">
			<ScrollToBottom className="messages-wrapper">
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
							name={message.name}
						></Message>
					);
				})}
			</ScrollToBottom>
		</div>
	);
};

export default Messages;
