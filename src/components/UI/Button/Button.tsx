import React, {FC} from "react";
import cl from './Button.module.scss'

interface ButtonProps {
    children: React.ReactNode;
    onClick?: (event) => void;
    disabled?: boolean;
}

const Button:FC<ButtonProps> = ({children, onClick, disabled}) => {
    return (
        <button disabled={disabled} className={disabled ? cl.disabled : cl.button} onClick={onClick}>
            {children}
        </button>
    );
};

export default Button;