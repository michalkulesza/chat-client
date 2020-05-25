import React from "react";
import "./Join.scss";

interface Props {}

const Join: React.FC<Props> = () => {
	return (
		<div className="join">
			<div className="container">
				<span>Chatter</span>
				<form>
					<input type="text" placeholder="Name" />
					<button type="submit">Join</button>
				</form>
			</div>
		</div>
	);
};

export default Join;
