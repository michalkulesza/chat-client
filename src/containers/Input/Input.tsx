import React, { useState } from "react";
import "./Input.scss";

type Props = {
	sendMessage: (message: string) => void;
};

const Input: React.FC<Props> = ({ sendMessage }) => {
	const [message, setMessage] = useState("");

	const handleSumbit = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter") {
			e.preventDefault();
			sendMessage(message);
			setMessage("");
		} else {
			return null;
		}
	};

	const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		e.preventDefault();
		sendMessage(message);
		setMessage("");
	};

	return (
		<div className="input">
			<div className="form">
				<input
					placeholder="Type something..."
					value={message}
					onChange={e => setMessage(e.target.value)}
					onKeyPress={e => handleSumbit(e)}
				/>
				<button
					onClick={e => {
						handleClick(e);
					}}
				>
					SEND
				</button>
			</div>
		</div>
	);
};

export default Input;
