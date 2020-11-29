import React, { useEffect, useState } from "react";
import "./Messages.scss";
import ScrollToBottom from "react-scroll-to-bottom";
import IosRefresh from "react-ionicons/lib/IosRefresh";
import uuid from "react-uuid";

import Message from "./Message/Message";

interface Props {
	name: string;
	socket: SocketIOClient.Socket;
}

const Messages: React.FC<Props> = ({ name, socket }) => {
	const [messages, setMessages] = useState<{ _id?: string; text: string; name: string; timestamp: string }[]>([
		{ text: "", name: "admin", timestamp: "" },
	]);
	const [componentLoading, setComponentLoading] = useState<boolean>(true);

	useEffect(() => {
		if (socket) {
			socket.on("getData", (roomName: string) => {
				setComponentLoading(true);
				const fetchData = async () => {
					await fetch("http://localhost:5001/api/getmessages", {
						method: "POST",
						headers: {
							"Content-Type": "application/json;charset=utf-8",
						},
						body: JSON.stringify({ roomName }),
					})
						.then(res => res.json())
						.then(data => {
							setMessages(data.messages);
							socket.emit("ready", name, roomName);
							setComponentLoading(false);
							console.log("HEY");
						})
						.catch(err => console.error(err));
				};
				fetchData();
			});

			socket.on("message", (message: { text: string; name: string; timestamp: string; room: string }) => {
				setMessages(prevMessages => [...prevMessages, message]);
			});
		}
	}, [socket, name]);

	return (
		<div className="messages">
			{componentLoading ? (
				<div className="loader-wrapper">
					<IosRefresh fontSize="2rem" rotate={true}></IosRefresh>
				</div>
			) : (
				<ScrollToBottom className="messages-wrapper">
					{messages.length === 0 ? (
						<Message type="admin" content="There is nothing here yet..."></Message>
					) : (
						messages.map((message, i) => {
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
									key={uuid()}
									content={message.text}
									type={type}
									name={i > 1 && messages[i - 1].name === message.name ? null : message.name}
									timestamp={message.timestamp}
									timestampHidden={
										i + 1 < messages.length && messages[i + 1].timestamp === message.timestamp ? true : false
									}
								></Message>
							);
						})
					)}
				</ScrollToBottom>
			)}
		</div>
	);
};

export default Messages;
