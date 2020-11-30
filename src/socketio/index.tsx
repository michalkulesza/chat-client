import io from "socket.io-client";
import PATH from "../constants/path";

const socket = io(PATH);

export default socket;
