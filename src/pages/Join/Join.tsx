import React, { useState } from "react";
import socket from "../../socketio";
import { Button } from "../../components";
import { User } from "../../App";

import "./Join.scss";

interface Props {
	setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const Join: React.FC<Props> = ({ setUser }) => {
	const [username, setUsername] = useState("");
	const [error, setError] = useState<string | null>(null);
	const [loadingState, setLoadingState] = useState(false);
	const [checkbox, setCheckbox] = useState(false);

	const throwError = (error: string) => {
		setError(error);
		setTimeout(() => setError(null), 3000);
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setUsername(e.target.value);
	};

	const validateName = (name: string | null) => {
		return name && name.length >= 3;
	};

	const handleJoin = () => {
		if (!validateName(username)) {
			throwError("⛔ Name is too short.");
		} else {
			setLoadingState(true);
			socket.emit("join", {
				username,
			});
		}
	};

	socket.on("authSuccessfull", () => {
		setLoadingState(false);
		setUser({
			username,
			registered: checkbox,
		});
	});

	socket.on("authUsernameTaken", () => {
		setLoadingState(false);
	});

	socket.on("authIncorrectPassword", () => {
		setLoadingState(false);
	});

	return (
		<div className="join">
			<div className="container">
				<span>Chatter</span>
				<div className="form">
					<input type="text" placeholder="Name" value={username} onChange={e => handleInputChange(e)} maxLength={30} />
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
