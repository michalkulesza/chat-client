import React from "react";
import "./Header.scss";

type Props = {
	menuHidden: boolean;
	setMenuHidden: React.Dispatch<React.SetStateAction<boolean>>;
	currentRoom: string | null;
};

const Header: React.FC<Props> = ({ menuHidden, setMenuHidden, currentRoom }) => {
	return (
		<div className="header">
			<div className="menu-icon-container" onClick={() => setMenuHidden(!menuHidden)}>
				<div className={`menu-icon ${!menuHidden ? "menu-toggle" : ""}`}>
					<span></span>
				</div>
			</div>
			<div className="chat-title">{currentRoom && `${currentRoom[0].toUpperCase() + currentRoom.slice(1)} room`}</div>
		</div>
	);
};

export default Header;
