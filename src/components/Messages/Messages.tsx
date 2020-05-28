import React, { useEffect, useState } from "react";
import "./Messages.scss";
import ScrollToBottom from "react-scroll-to-bottom";

import Message from "./Message/Message";

interface Props {
	name: string;
	socket: SocketIOClient.Socket;
	room: string;
}

const Messages: React.FC<Props> = ({ name, socket, room }) => {
	const [messages, setMessages] = useState<
		{ text: string; name: string; timestamp: string }[]
	>([{ text: "", name: "admin", timestamp: "" }]);

	useEffect(() => {
		if (socket) {
			socket.on(
				"message",
				(message: { text: string; name: string; timestamp: string }) => {
					setMessages(prevMessages => [...prevMessages, message]);
				}
			);
			socket.emit("ready", { name, room });
		}
	}, [socket, name, room]);

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
							name={
								i > 1 && messages[i - 1].name === message.name
									? null
									: message.name
							}
							timestamp={message.timestamp}
						></Message>
					);
				})}
			</ScrollToBottom>
		</div>
	);
};

export default Messages;
