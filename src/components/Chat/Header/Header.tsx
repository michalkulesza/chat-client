import React from "react";
import "./Header.scss";

import MdMenu from "react-ionicons/lib/MdMenu";

interface Props {
	menuHidden: boolean;
	setMenuHidden: React.Dispatch<React.SetStateAction<boolean>>;
}

const Header: React.FC<Props> = ({ menuHidden, setMenuHidden }) => {
	return (
		<div className="header">
			<div className="menu-icon" onClick={() => setMenuHidden(!menuHidden)}>
				<MdMenu />
			</div>
			<div className="chat-title"></div>
		</div>
	);
};

export default Header;
