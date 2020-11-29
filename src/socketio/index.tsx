import io from "socket.io-client";

const ENDPOINT = "https://chatter-xcxz.herokuapp.com/";
const socket = io(ENDPOINT);

export default socket;
