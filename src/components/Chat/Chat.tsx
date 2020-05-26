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
	const [message, setMessage] = useState<object>({});
	const [messages, setMessages] = useState<object[]>([]);

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
		socket.on("message", (message: object) => {
			setMessages([...messages, message]);
		});
	});

	console.log(messages);

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
