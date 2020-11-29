import React, { useState, useEffect } from "react";
import { Button } from "../../components";
import socket from "../../socketio";

import "./Join.scss";

interface Props {
	name: string | null;
	setName: React.Dispatch<React.SetStateAction<string | null>>;
	isUsernameTaken: boolean;
}

const Join: React.FC<Props> = ({ name, setName, isUsernameTaken }) => {
	const [error, setError] = useState<string | null>(null);
	const [loadingState, setLoadingState] = useState(false);
	const [checkbox, setCheckbox] = useState(false);

	const throwError = (error: string) => {
		setError(error);
		setTimeout(() => setError(null), 3000);
	};

	useEffect(() => {
		isUsernameTaken && throwError("⛔ Username is taken.");
	}, [isUsernameTaken]);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setName(e.target.value);
	};

	const validateName = (name: string | null) => {
		return name && name.length >= 3;
	};

	const handleJoin = () => {
		if (!validateName(name)) {
			throwError("⛔ Name is too short.");
		} else {
			setLoadingState(true);
			socket.emit("join", {
				name,
				password: 
			})
		}
	};

	return (
		<div className="join">
			<div className="container">
				<span>Chatter</span>
				<div className="form">
					<input
						type="text"
						placeholder="Name"
						value={name ? name : ""}
						onChange={e => handleInputChange(e)}
						maxLength={30}
					/>
					<div className="errors">{error}</div>
					{!loadingState ? (
						<div className="buttons">
							<Button onMouseDown={handleJoin}>Join</Button>
							<div className="checkboxContainer">
								<input type="checkbox" checked={checkbox} onChange={() => setCheckbox(!checkbox)} />
								<span>Register username</span>
							</div>
						</div>
					) : (
						<Button disabled>Loading...</Button>
					)}
				</div>
			</div>
			<span>Initial loading times may take a little longer due to heroku limitations.</span>
		</div>
	);
};

export default Join;
