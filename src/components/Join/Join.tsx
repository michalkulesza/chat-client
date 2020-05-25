import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./Join.scss";

interface Props {
	name: string;
	setName: React.Dispatch<React.SetStateAction<string>>;
}

const Join: React.FC<Props> = ({ name, setName }) => {
	const errorDiv = useRef<HTMLDivElement>(null!);
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setName(e.target.value);
	};

	const handleSumbit = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
		if (name === "" || name.length < 3) {
			e.preventDefault();
			errorDiv.current.innerHTML = "⛔ Name is too short.";
			errorDiv.current.style.opacity = "1";

			setTimeout(() => {
				errorDiv.current.style.opacity = "0";
			}, 2000);
		} else {
			return null;
		}
	};

	return (
		<div className="join">
			<div className="container">
				<span>Chatter</span>
				<form>
					<input
						type="text"
						placeholder="Name"
						value={name}
						onChange={e => handleChange(e)}
						maxLength={30}
					/>
					<div className="errors" ref={errorDiv}></div>
					<Link to={"/chat"} onClick={e => handleSumbit(e)}>
						<button type="submit">Join</button>
					</Link>
				</form>
			</div>
		</div>
	);
};

export default Join;
