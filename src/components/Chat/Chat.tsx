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
	const [message, setMessage] = useState<string>("");
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
		socket.on("message", (message: { text: string; name: string }) => {
			let type: "user" | "partner" | "admin";
			if (message.name === name) {
				type = "user";
			} else if (message.name === "admin") {
				type = "admin";
			} else {
				type = "partner";
			}

			let newMessage = { text: message.text, type };
			let newMessages = [...messages, newMessage];
			setMessages(newMessages);
		});
	});

	const sendMessage = (
		e:
			| React.FormEvent<HTMLButtonElement>
			| React.KeyboardEvent<HTMLInputElement>
	) => {
		e.preventDefault();

		if (message && message !== "") {
			socket.emit("sendMessage", message, name, () => setMessage(""));
		}
	};

	return (
		<div className="chat">
			<div className="left"></div>
			<div className="middle"></div>
			<div className="right">
				<Messages messages={messages} />
				<Input
					message={message}
					setMessage={setMessage}
					sendMessage={sendMessage}
				/>
			</div>
		</div>
	);
};

export default Chat;
