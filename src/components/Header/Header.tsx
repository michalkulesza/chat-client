import React from "react";
import "./Header.scss";

interface Props {
	menuHidden: boolean;
	setMenuHidden: React.Dispatch<React.SetStateAction<boolean>>;
}

const Header: React.FC<Props> = ({ menuHidden, setMenuHidden }) => {
	return (
		<div className="header">
			<div
				className="menu-icon-container"
				onClick={() => setMenuHidden(!menuHidden)}
			>
				<div className={`menu-icon ${!menuHidden ? "menu-toggle" : ""}`}>
					<span></span>
				</div>
			</div>
			<div className="chat-title"></div>
		</div>
	);
};

export default Header;
