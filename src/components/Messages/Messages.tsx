import React from "react";
import "./Messages.scss";

import Message from "../Message/Message";

interface Props {
	messages: object[];
}

const Messages: React.FC<Props> = ({ messages }) => {
	return (
		<div className="messages">
			<Message content="User xxcuzzme has joined." type="admin"></Message>
			{messages.map((message, i) => {
				console.log(message);
				return (
					<Message
						key={i * Math.random()}
						content="sdas"
						type="admin"
					></Message>
				);
			})}
		</div>
	);
};

export default Messages;
