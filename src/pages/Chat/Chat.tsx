import React, { useEffect, useState } from "react";
import { User } from "../../App";
import { socket, joinRoom } from "../../socketio";

import "./Chat.scss";

import { MessagesContainer, UsersListContainer, InputContainer } from "../../containers";
import Header from "../../components/Header/Header";

export type MessageType = { _id?: string; text: string; name: string; timestamp: string };
type Props = {
	user: User;
};

const INIT_ROOM = "main";

const Chat: React.FC<Props> = ({ user }) => {
	const [currentRoom, setCurrentRoom] = useState<string | null>(null);
	const [menuHidden, setMenuHidden] = useState<boolean>(false);
	const [username, setUsername] = useState<string | null>(null);
	const [users, setUsers] = useState<{ id: string; username: string }[]>([]);
	const [messages, setMessages] = useState<MessageType[]>([]);

	useEffect(() => {
		if (user) {
			joinRoom(INIT_ROOM, user.username);
		}
	}, [user]);

	useEffect(() => {
		socket.on("roomUserData", ({ name, users }: { name: string; users: { id: string; username: string }[] }) => {
			setUsers(users);
			setCurrentRoom(name);
		});

		socket.on("roomChatData", (data: MessageType[]) => {
			setMessages(data);
		});

		socket.on("message", (message: MessageType) => {
			setMessages([...messages, message]);
		});

		setUsername(user.username);

		return () => {
			socket.off("roomUserData");
			socket.off("roomChatData");
			socket.off("message");
			socket.emit("disconnect");
		};
	}, [messages, user.username]);

	const handleChatListClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {};

	const sendMessage = (message: string) => {
		console.log("senMessage");
		const trimmedMessage = message.trim();
		if (trimmedMessage !== "") {
			socket.emit("message", { text: trimmedMessage, name: username, room: currentRoom });
		}
	};

	return (
		<div className="chat">
			<div className={`left ${menuHidden ? "menu-toggle" : ""}`}>
				<UsersListContainer users={users} handleChatListClick={handleChatListClick} currentUsername={user.username} />
			</div>
			<div className={`right ${menuHidden ? "menu-toggle" : ""}`}>
				<Header menuHidden={menuHidden} setMenuHidden={setMenuHidden} currentRoom={currentRoom} />
				<MessagesContainer username={username} messages={messages} />
				<InputContainer sendMessage={sendMessage} />
			</div>
		</div>
	);
};

export default Chat;
