import React from "react";
import "./Button.scss";

type Props = {
	children?: any;
	disabled?: boolean;
	onMouseDown?: () => void;
};

const Button: React.FC<Props> = ({ children, ...restProps }) => {
	return <button {...restProps}>{children}</button>;
};

export default Button;
