import React, { useEffect, useState } from "react";
import "./Messages.scss";
import ScrollToBottom from "react-scroll-to-bottom";

import Message from "./Message/Message";
import IosRefresh from "react-ionicons/lib/IosRefresh";

interface Props {
	name: string;
	socket: SocketIOClient.Socket;
	room: string;
}

const Messages: React.FC<Props> = ({ name, socket, room }) => {
	const [messages, setMessages] = useState<
		{ _id?: string; text: string; name: string; timestamp: string }[]
	>([{ text: "", name: "admin", timestamp: "" }]);
	const [componentLoading, setComponentLoading] = useState<boolean>(true);

	useEffect(() => {
		if (socket) {
			const fetchData = async () => {
				await fetch("http://localhost:5000/api/getmessages")
					.then(res => res.text())
					.then(data => {
						setMessages(JSON.parse(data));
						setComponentLoading(false);
					})
					.catch(err => console.error(err));

				socket.emit("ready", { name, room });
			};
			fetchData();

			socket.on(
				"message",
				(message: { text: string; name: string; timestamp: string }) => {
					setMessages(prevMessages => [...prevMessages, message]);
				}
			);
		}
	}, [socket, name, room]);

	return (
		<div className="messages">
			{componentLoading ? (
				<div className="loader-wrapper">
					<IosRefresh fontSize="2rem" rotate={true}></IosRefresh>
				</div>
			) : (
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
			)}
		</div>
	);
};

export default Messages;
