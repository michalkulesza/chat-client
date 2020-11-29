import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import socket from "../../socketio";
import { Button } from "../../components";
import { User } from "../../App";

import "./Join.scss";

interface Props {
	setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const Join: React.FC<Props> = ({ setUser }) => {
	const history = useHistory();
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [passwordRequired, setPasswordRequired] = useState(false);
	const [userRegistered, setUserRegistered] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [loadingState, setLoadingState] = useState(false);
	const [checkbox, setCheckbox] = useState(false);

	const throwError = (error: string) => {
		setError(error);
		setTimeout(() => setError(null), 3000);
	};

	const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setUsername(e.target.value);
	};

	const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPassword(e.target.value);
	};

	const validateName = (name: string) => {
		return name && name.length >= 3;
	};

	const validatePassword = (password: string) => {
		return password && password.length >= 4;
	};

	const handleJoin = () => {
		if (!validateName(username)) {
			throwError("⛔ Name is too short.");
			return;
		}

		if (checkbox || (passwordRequired && password.length > 0)) {
			if (!validatePassword(password)) {
				throwError("⛔ Password is too short.");
				return;
			}
		}

		if (checkbox) {
			setLoadingState(true);
			socket.emit("register", {
				username,
				password,
			});
		}

		setPasswordRequired(false);
		setLoadingState(true);
		socket.emit("join", {
			username,
			password,
		});
	};

	socket.on("userAuthenticated", () => {
		setUserRegistered(true);
	});

	socket.on("authSuccessfull", () => {
		setLoadingState(false);
		setUser({
			username,
			registered: userRegistered,
		});
		history.push("/chat");
	});

	socket.on("authUserExists", () => {
		setLoadingState(false);
		setPasswordRequired(true);
		throwError("⛔ Username taken");
		setCheckbox(false);
	});

	socket.on("authIncorrectPassword", () => {
		setLoadingState(false);
		setPassword("");
		throwError("⛔ Password incorrect");
	});

	socket.on("error", ({ error }: { error: string }) => {
		setLoadingState(false);
		setUsername("");
		setPassword("");
		throwError(error);
	});

	return (
		<div className="join">
			<div className="container">
				<span>Chatter</span>
				<div className="form">
					<input
						type="text"
						placeholder="Name"
						value={username}
						onChange={e => handleUsernameChange(e)}
						maxLength={15}
					/>
					{(passwordRequired || checkbox) && (
						<input type="password" placeholder="Password" value={password} onChange={e => handlePasswordChange(e)} />
					)}
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
