import React, {FC} from "react";
import cl from './Button.module.scss'

interface ButtonProps {
    children: React.ReactNode;
    onClick?: (event) => void;
    disabled?: boolean;
    style?: React.CSSProperties
}

const Button:FC<ButtonProps> = (
    {children,
        onClick,
        disabled,
        style
    }) => {
    return (
        <button style={style} disabled={disabled} className={disabled ? cl.disabled : cl.button} onClick={onClick}>
            {children}
        </button>
    );
};

export default Button;