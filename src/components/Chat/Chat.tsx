import React, { useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";
import "./Chat.scss";

import Messages from "../Messages/Messages";
import Input from "../Input/Input";
import UsersList from "../UsersList/UsersList";

const ENDPOINT = "localhost:5000";
const initRoom = "Main";
let socket: SocketIOClient.Socket;

interface Props {
	name: string;
	history: any;
	setIsUsernameTaken: React.Dispatch<React.SetStateAction<boolean>>;
}

const Chat: React.FC<Props> = ({ name, history, setIsUsernameTaken }) => {
	const [users, setUsers] = useState<{ id?: string; name?: string }[]>([{}]);
	const [joinedRooms, setJoinedRooms] = useState<string[]>(["Main"]);
	const [currentRoom, setCurrentRoom] = useState<string>("Main");

	//ALL GOOD
	useEffect(() => {
		socket = io(ENDPOINT);
		socket.emit("initJoin", { name, initRoom }, async (error: any) => {
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

	//ALL GOOD
	useEffect(() => {
		socket.on("roomData", (roomData: { users: [{}] }) => {
			setUsers(roomData.users);
		});
	}, []);

	//JOIN SPECIFIC CHAT
	const handleChatListClick = (
		e: React.MouseEvent<HTMLDivElement, MouseEvent>
	) => {
		const partnersName = e.currentTarget.getAttribute("data-user");
		let roomName = [name, partnersName].sort().join().replace(",", "");
		if (partnersName !== name) {
			joinedRooms.includes(roomName)
				? socket.emit("joinChat", roomName)
				: socket.emit("joinNewChat", roomName);
		}
	};

	//ALL GOOD
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
				<UsersList
					users={users}
					handleChatListClick={handleChatListClick}
					currentUsername={name}
				/>
			</div>
			<div className="right">
				<Messages name={name} socket={socket} room={currentRoom} />
				<Input sendMessage={sendMessage} />
			</div>
		</div>
	);
};

export default Chat;
