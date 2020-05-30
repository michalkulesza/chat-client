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
	const [users, setUsers] = useState<{ id?: string; name?: string }[]>([{}]);
	const [joinedRooms, setJoinedRooms] = useState<[string]>(["Main"]);

	useEffect(() => {
		socket = io(ENDPOINT);
		socket.emit("join", { name, room }, async (error: any) => {
			if (error) {
				setIsUsernameTaken(true);
				history.push("/");
			}
		});

		setIsUsernameTaken(false);

		return () => {
			socket.emit("disconnect");
			socket.off("");
		};
	}, [name, history, setIsUsernameTaken]);

	useEffect(() => {
		socket.on("roomData", (roomData: { users: [{}] }) => {
			setUsers(roomData.users);
		});
	}, []);

	const sendMessage = (message: string) => {
		message.trim();
		if (message !== "" || !message.startsWith(" ")) {
			socket.emit("sendMessage", message, name, () => {});
		}
	};

	return (
		<div className="chat">
			<div className="left"></div>
			<div className="middle">
				<UsersList users={users} />
			</div>
			<div className="right">
				<Messages name={name} socket={socket} room={room} />
				<Input sendMessage={sendMessage} />
			</div>
		</div>
	);
};

export default Chat;
