import React from "react";
import moment from "moment";
import "./Message.scss";

interface Props {
	content: string;
	type: string;
	name?: string | null;
	timestamp?: string;
	timestampHidden?: boolean;
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

	return (
		<div className={`message-container ${type}`}>
			<div className={`name ${type}`}>
				<span>{name}</span>
			</div>
			<div className={`wrapper ${type}`}>
				<div className={`container ${type}`}>
					<div className={`time ${timestampHidden ? "hidden" : ""} ${type}`}>
						<span>{time}</span>
					</div>
					<div className={`message ${type}`} onClick={e => showMessageTime(e)}>
						{content}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Message;
