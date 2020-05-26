import React from "react";
import "./Message.scss";

interface Props {
	content: string;
	type: string;
	name: string;
}

const date = new Date();

const getTime = () => {
	let hours;
	let minutes;

	date.getHours() < 10
		? (hours = `0${date.getHours()}`)
		: (hours = date.getHours());

	date.getMinutes() < 10
		? (minutes = `0${date.getMinutes()}`)
		: (minutes = date.getMinutes());

	return `${hours}:${minutes}`;
};

const Message: React.FC<Props> = ({ content, type, name }) => {
	let time = getTime();
	if (type === "user") {
		return (
			<div className="message-container user">
				<div className="name user">
					<span>{name}</span>
				</div>
				<div className="wrapper user">
					<div className="time">
						<span>{time}</span>
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
						<span>{time}</span>
					</div>
				</div>
			</div>
		);
	}
};

export default Message;
