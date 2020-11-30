import io from "socket.io-client";
import encrypt from "socket.io-encrypt";

import PATH from "../constants/path";

const socket = io(PATH);
encrypt("someStrongSecret")(socket);

export default socket;
