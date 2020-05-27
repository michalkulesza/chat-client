import React from "react";
import "./Input.scss";

interface Props {
	message: string;
	setMessage: React.Dispatch<React.SetStateAction<string>>;
	sendMessage: (
		e:
			| React.FormEvent<HTMLButtonElement>
			| React.KeyboardEvent<HTMLInputElement>
	) => void;
}

const Input: React.FC<Props> = ({ message, setMessage, sendMessage }) => {
	const handleSumbit = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter") {
			sendMessage(e);
		} else {
			return null;
		}
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
						e.preventDefault();
						sendMessage(e);
					}}
				>
					SEND
				</button>
			</div>
		</div>
	);
};

export default Input;
