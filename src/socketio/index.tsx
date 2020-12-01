import io from "socket.io-client";
import PATH from "../constants/path";

export const socket = io(PATH);

export const joinRoom = (room: string, user: string) => {
	socket.emit("joinRoom", { room, user });
};
