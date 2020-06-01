import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import "./Chat.scss";

import Messages from "../Messages/Messages";
import Input from "../Input/Input";
import UsersList from "../UsersList/UsersList";
import Header from "./Header/Header";

const ENDPOINT = "localhost:5000";
let socket: SocketIOClient.Socket;

interface Props {
	name: string;
	history: any;
	setIsUsernameTaken: React.Dispatch<React.SetStateAction<boolean>>;
}

const Chat: React.FC<Props> = ({ name, history, setIsUsernameTaken }) => {
	const [users, setUsers] = useState<{ id?: string; name?: string }[]>([{}]);
	const [currentRoom, setCurrentRoom] = useState<string>("main");
	const [menuHidden, setMenuHidden] = useState<boolean>(false);
	const initRoom = "main";

	useEffect(() => {
		socket = io(ENDPOINT);
		socket.emit("initJoin", { name, initRoom }, async (error: any) => {
			if (error) {
				setIsUsernameTaken(true);
				history.push("/");
			}
		});

		setIsUsernameTaken(false);
		socket.emit("readyForInitData", initRoom);

		return () => {
			socket.emit("disconnect");
			socket.off("");
		};
	}, [name, history, setIsUsernameTaken]);

	useEffect(() => {
		socket.on("roomData", (roomData: { users: object[] }) => {
			setUsers(roomData.users);
		});
	}, []);

	const handleChatListClick = (
		e: React.MouseEvent<HTMLDivElement, MouseEvent>
	) => {
		let partnersName = e.currentTarget.getAttribute("data-user");
		let roomName = [name, partnersName].sort().join().replace(",", "");

		if (partnersName === "Main" && currentRoom !== partnersName) {
			setCurrentRoom(partnersName);
			socket.emit("leaveChat");
			socket.emit("joinChat", { roomName: partnersName });
		}
		if (
			partnersName !== name &&
			partnersName !== "Main" &&
			currentRoom !== roomName
		) {
			socket.emit("leaveChat");
			setCurrentRoom(roomName);
			socket.emit("joinChat", { roomName, partnersName });
		}
	};

	const sendMessage = (message: string) => {
		const trimmedMessage = message.trim();
		if (trimmedMessage !== "") {
			socket.emit("sendMessage", trimmedMessage, name, currentRoom, () => {});
		}
	};

	return (
		<div className="chat">
			<div className={`left ${menuHidden ? "menu-toggle" : ""}`}>
				<UsersList
					users={users}
					handleChatListClick={handleChatListClick}
					currentUsername={name}
				/>
			</div>
			<div className={`right ${menuHidden ? "menu-toggle" : ""}`}>
				<Header menuHidden={menuHidden} setMenuHidden={setMenuHidden} />
				<Messages name={name} socket={socket} />
				<Input sendMessage={sendMessage} />
			</div>
		</div>
	);
};

export default Chat;
