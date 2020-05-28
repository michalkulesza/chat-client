import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import "./Chat.scss";

import Messages from "../Messages/Messages";
import Input from "../Input/Input";
import UsersList from "../UsersList/UsersList";

const ENDPOINT = "localhost:5000";
const room = "Main";
let socket: SocketIOClient.Socket;

interface Props {
	name: string;
	history: any;
	setIsUsernameTaken: React.Dispatch<React.SetStateAction<boolean>>;
}

const Chat: React.FC<Props> = ({ name, history, setIsUsernameTaken }) => {
	const [message, setMessage] = useState<string>("");
	const [messages, setMessages] = useState<
		{ text: string; name: string; timestamp: string }[]
	>([{ text: "", name: "admin", timestamp: "" }]);
	const [users, setUsers] = useState<{ id?: string; name?: string }[]>([{}]);

	useEffect(() => {
		socket = io(ENDPOINT);
		let e: string;

		socket.emit("join", { name, room }, (error: any) => {
			if (error) {
				setIsUsernameTaken(true);
				history.push("/");
			}
		});

		setIsUsernameTaken(false);

		return () => {
			socket.emit("disconnect");
			socket.off(e);
		};
	}, [name, history, setIsUsernameTaken]);

	useEffect(() => {
		socket.on(
			"message",
			(message: { text: string; name: string; timestamp: string }) => {
				setMessages(prevMessages => [...prevMessages, message]);
			}
		);
	}, []);

	useEffect(() => {
		socket.on("roomData", (roomData: { users: [{}] }) => {
			setUsers(roomData.users);
		});
	}, []);

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
			<div className="middle">
				<UsersList users={users} />
			</div>
			<div className="right">
				<Messages messages={messages} name={name} />
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
