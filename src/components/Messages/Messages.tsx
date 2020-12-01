import React, { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import IosRefresh from "react-ionicons/lib/IosRefresh";
import uuid from "react-uuid";
import { MessageType } from "../../pages/Chat/Chat";

import Message from "./Message/Message";
import "./Messages.scss";

interface Props {
	username: string | null;
	messages: MessageType[];
}

const Messages: React.FC<Props> = ({ username, messages }) => {
	const [componentLoading, setComponentLoading] = useState<boolean>(true);

	useEffect(() => {
		messages && setComponentLoading(false);
	}, [messages]);

	return (
		<div className="messages">
			{componentLoading ? (
				<div className="loader-wrapper">
					<IosRefresh fontSize="2rem" rotate={true}></IosRefresh>
				</div>
			) : (
				<ScrollToBottom className="messages-wrapper">
					{messages.length === 0 ? (
						<Message type="admin" content="There is nothing here yet..."></Message>
					) : (
						messages.map((message, i) => {
							let type: string;

							if (message.name === "admin") {
								type = "admin";
							} else if (message.name === username) {
								type = "user";
							} else {
								type = "partner";
							}

							return (
								<Message
									key={uuid()}
									content={message.text}
									type={type}
									name={i > 1 && messages[i - 1].name === message.name ? null : message.name}
									timestamp={message.timestamp}
									timestampHidden={
										i + 1 < messages.length && messages[i + 1].timestamp === message.timestamp ? true : false
									}
								></Message>
							);
						})
					)}
				</ScrollToBottom>
			)}
		</div>
	);
};

export default Messages;
