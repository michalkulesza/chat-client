import React, { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Join.scss";

interface Props {
	name: string;
	setName: React.Dispatch<React.SetStateAction<string>>;
	isUsernameTaken: boolean;
}

const Join: React.FC<Props> = ({ name, setName, isUsernameTaken }) => {
	const errorDiv = useRef<HTMLDivElement>(null!);

	useEffect(() => {
		isUsernameTaken && throwError(errorDiv, "⛔ Username is taken.");
	}, [isUsernameTaken]);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setName(e.target.value);
	};

	const handleSumbit = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
		if (name === "" || name.length < 3) {
			e.preventDefault();
			throwError(errorDiv, "⛔ Name is too short.");
		} else {
			return null;
		}
	};

	const throwError = (
		errorDiv: React.MutableRefObject<HTMLDivElement>,
		errorContent: string
	) => {
		errorDiv.current.innerHTML = errorContent;
		errorDiv.current.style.opacity = "1";

		setTimeout(() => {
			errorDiv.current.style.opacity = "0";
		}, 2000);
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
