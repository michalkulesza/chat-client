import React, { useEffect, useState } from "react";
import { User } from "../../App";
import socket from "../../socketio";
import "./Chat.scss";

// import Messages from "../../components/Messages/Messages";
// import Input from "../../components/Input/Input";
import UsersList from "../../components/UsersList/UsersList";
import Header from "../../components/Header/Header";

interface Props {
	user: User;
}
const INIT_ROOM = "main";

const Chat: React.FC<Props> = ({ user }) => {
	const [users, setUsers] = useState<{ id: string; username: string }[]>([]);
	const [currentRoom, setCurrentRoom] = useState<string>(INIT_ROOM);
	const [menuHidden, setMenuHidden] = useState<boolean>(false);

	useEffect(() => {
		user && joinRoom(INIT_ROOM, user.username);
	}, [user]);

	useEffect(() => {
		socket.on("roomData", ({ name, users }: { name: string; users: { id: string; username: string }[] }) => {
			setCurrentRoom(name);
			setUsers(users);
			console.log(users);
		});

		return () => {
			socket.off("roomData");
		};
	}, []);

	const joinRoom = (room: string, user: string) => {
		socket.emit("joinRoom", { room, user });
	};

	// useEffect(() => {
	// 	socket = io(ENDPOINT);
	// 	socket.emit("initJoin", { name, initRoom }, async (error: any) => {
	// 		if (error) {
	// 			setIsUsernameTaken(true);
	// 			history.push("/");
	// 		}
	// 	});

	// 	setIsUsernameTaken(false);
	// 	socket.emit("readyForInitData", initRoom);

	// 	return () => {
	// 		socket.emit("disconnect");
	// 		socket.off("");
	// 	};
	// }, [name, history, setIsUsernameTaken]);

	// useEffect(() => {
	// 	socket.on("roomData", (roomData: { users: object[] }) => {
	// 		setUsers(roomData.users);
	// 	});
	// }, []);

	const handleChatListClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		// let partnersName = e.currentTarget.getAttribute("data-user");
		// let roomName = [name, partnersName].sort().join().replace(",", "");
		// if (partnersName === "Main" && currentRoom !== partnersName) {
		// 	setCurrentRoom("main");
		// 	socket.emit("leaveChat");
		// 	socket.emit("joinChat", { roomName: partnersName });
		// }
		// if (partnersName !== name && partnersName !== "Main" && currentRoom !== roomName) {
		// 	socket.emit("leaveChat");
		// 	setCurrentRoom(roomName);
		// 	socket.emit("joinChat", { roomName, partnersName });
		// }
	};

	// const sendMessage = (message: string) => {
	// 	const trimmedMessage = message.trim();
	// 	if (trimmedMessage !== "") {
	// 		socket.emit("sendMessage", trimmedMessage, name, currentRoom, () => {});
	// 	}
	// };

	return (
		<div className="chat">
			<div className={`left ${menuHidden ? "menu-toggle" : ""}`}>
				<UsersList users={users} handleChatListClick={handleChatListClick} currentUsername={"test"} />
			</div>
			<div className={`right ${menuHidden ? "menu-toggle" : ""}`}>
				<Header menuHidden={menuHidden} setMenuHidden={setMenuHidden} />
				{/* <Messages name={name} socket={socket} /> */}
				{/* <Input sendMessage={sendMessage} /> */}
			</div>
		</div>
	);
};

export default Chat;
