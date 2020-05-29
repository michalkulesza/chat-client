import React from "react";
import moment from "moment";
import "./Message.scss";

interface Props {
	content: string;
	type: string;
	name: string | null;
	timestamp: string;
	timestampHidden: boolean;
}

const Message: React.FC<Props> = ({
	content,
	type,
	name,
	timestamp,
	timestampHidden,
}) => {
	const time = moment(timestamp).format("HH:mm");

	const showMessageTime = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		const container = e.currentTarget.parentElement;
		const time = container?.querySelector(".time");
		const hidden = time?.classList.contains("hidden");

		if (hidden && time) {
			time.classList.remove("hidden");
			setTimeout(() => {
				time.classList.add("hidden");
			}, 2000);
		}
	};

	if (type === "user") {
		return (
			<div className="message-container user">
				<div className="name user">
					<span>{name}</span>
				</div>
				<div className="wrapper user">
					<div className={`time ${timestampHidden ? "hidden" : ""}`}>
						<span>{time}</span>
					</div>
					<div className="message user" onClick={e => showMessageTime(e)}>
						{content}
					</div>
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
