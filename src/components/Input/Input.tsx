import React from "react";
import "./Input.scss";

interface Props {}

const Input: React.FC<Props> = () => {
	return (
		<div className="input">
			<form>
				<input type="text" placeholder="Type something..." />
				<button>SEND</button>
			</form>
		</div>
	);
};

export default Input;
