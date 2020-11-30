import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import socket from "../../socketio";
import { Button } from "../../components";
import { User } from "../../App";

import "./Join.scss";
import PATH from "../../constants/path";

interface Props {
	setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const Join: React.FC<Props> = ({ setUser }) => {
	const history = useHistory();
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [passwordRequired, setPasswordRequired] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [loadingState, setLoadingState] = useState(false);
	const [checkbox, setCheckbox] = useState(false);

	useEffect(() => {
		socket.on("authSuccessfull", ({ registered }: { registered: boolean }) => {
			setLoadingState(false);
			setUser({
				username,
				registered,
			});
			history.push("/chat");
		});

		socket.on("authUserExists", () => {});

		socket.on("authIncorrectPassword", () => {});

		return () => {
			socket.off("authSuccessfull");
			socket.off("authUserExists");
			socket.off("authIncorrectPassword");
		};
	}, [history, setUser, username]);

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

	const handleAuthSuccessfull = ({ username, registered }: { username: string; registered: boolean }) => {
		setLoadingState(false);
		setUser({
			username,
			registered,
		});
		history.push("/chat");
	};

	const handleUserExists = () => {
		setLoadingState(false);
		setPasswordRequired(true);
		throwError("⛔ Username taken");
		setCheckbox(false);
	};

	const handleIncorrectPassword = () => {
		setLoadingState(false);
		setPassword("");
		throwError("⛔ Password incorrect");
	};

	const validateUsername = (name: string) => {
		return name && name.length >= 3;
	};

	const validatePassword = (password: string) => {
		return password && password.length >= 4;
	};

	const handleJoin = () => {
		if (!validateUsername(username)) {
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
			axios
				.post(`${PATH}/auth/register`, {
					username,
					password,
				})
				.then(res => {
					res.status === 200 && handleAuthSuccessfull({ username, registered: true });
				})
				.catch(err => throwError(err.message));
		}

		setPasswordRequired(false);
		setLoadingState(true);
		axios
			.post(`${PATH}/auth/join`, {
				username,
				password,
			})
			.then(res => {
				const registered = password ? true : false;
				res.status === 200 && handleAuthSuccessfull({ username, registered });
				res.status === 401 && handleIncorrectPassword();
				res.status === 422 && handleUserExists();

				return;
			})
			.catch(err => throwError(err.message));
	};

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
