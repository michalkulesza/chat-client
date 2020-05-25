import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import "./Chat.scss";

const ENDPOINT = "localhost:5000";
const defaultRoom = "Main";
let socket: SocketIOClient.Socket;

interface Props {
	name: string;
}

const Chat: React.FC<Props> = ({ name }) => {
	useEffect(() => {
		socket = io(ENDPOINT);
		let e: string;

		socket.emit("join", { name, defaultRoom }, () => {});

		return () => {
			socket.emit("disconnect");
			socket.off(e);
		};
	}, [name]);

	return (
		<div className="chat">
			<div className="left"></div>
			<div className="middle"></div>
			<div className="right"></div>
		</div>
	);
};

export default Chat;
