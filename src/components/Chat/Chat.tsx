import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import "./Chat.scss";

import Messages from "../Messages/Messages";
import Input from "../Input/Input";

const ENDPOINT = "localhost:5000";
const room = "Main";
let socket: SocketIOClient.Socket;

interface Props {
	name: string;
}

const Chat: React.FC<Props> = ({ name }) => {
	const [message, setMessage] = useState({});
	const [messages, setMessages] = useState<
		{ text: string; type: "user" | "partner" | "admin" }[]
	>([{ text: "", type: "admin" }]);

	useEffect(() => {
		socket = io(ENDPOINT);
		let e: string;

		socket.emit("join", { name, room }, () => {});

		return () => {
			socket.emit("disconnect");
			socket.off(e);
		};
	}, [name]);

	useEffect(() => {
		socket.on(
			"message",
			(message: { text: string; type: "user" | "partner" | "admin" }) => {
				let newMessages = [...messages, message];
				setMessages(newMessages);
			}
		);
	});

	return (
		<div className="chat">
			<div className="left"></div>
			<div className="middle"></div>
			<div className="right">
				<Messages messages={messages} />
				<Input />
			</div>
		</div>
	);
};

export default Chat;
