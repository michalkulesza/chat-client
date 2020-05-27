import React from "react";
import moment from "moment";
import "./Message.scss";

interface Props {
	content: string;
	type: string;
	name: string | null;
	timestamp: string;
}

const Message: React.FC<Props> = ({ content, type, name, timestamp }) => {
	const date = moment(timestamp).format("hh:mm");

	if (type === "user") {
		return (
			<div className="message-container user">
				<div className="name user">
					<span>{name}</span>
				</div>
				<div className="wrapper user">
					<div className="time">
						<span>{date}</span>
					</div>
					<div className="message user">{content}</div>
				</div>
			</div>
		);
	} else if (type === "admin") {
		if (content !== "") {
			return (
				<div className="message-container admin">
					<div className="message admin">{content}</div>
				</div>
			);
		} else {
			return null;
		}
	} else {
		return (
			<div className="message-container partner">
				<div className="name partner">
					<span>{name}</span>
				</div>
				<div className="wrapper partner">
					<div className="message partner">{content}</div>
					<div className="time">
						<span>{date}</span>
					</div>
				</div>
			</div>
		);
	}
};

export default Message;
