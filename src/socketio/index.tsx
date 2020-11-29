import io from "socket.io-client";
import encrypt from "socket.io-encrypt";

const REMOTE = "https://chatter-xcxz.herokuapp.com/";
const LOCAL = "http://localhost:5001";

const ENDPOINT = process.env.PRODUCTION ? REMOTE : LOCAL;
const socket = io(ENDPOINT);
encrypt("someStrongSecret")(socket);

export default socket;
