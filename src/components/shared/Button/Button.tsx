import { ButtonProps, Button as ButtonAntd } from "antd";
import React from "react";
import { Link } from "react-router-dom";

interface IProps extends ButtonProps {}

const Button: React.FC<IProps> = (props) => {
    const btn = <ButtonAntd {...props}>{props.children}</ButtonAntd>;
    return props.href ? <Link to={props.href}>{btn}</Link> : btn;
};

export default Button;
