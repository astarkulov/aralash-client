import cl from './Input.module.scss'
import React, {FC} from "react";

interface InputProps {
    value: any,
    onChange?: (event) => void,
    style?: React.CSSProperties,
    placeHolder?: string
    type?: string
}

const Input: FC<InputProps> = (
    {
        value,
        onChange,
        style,
        placeHolder,
        type
    }) => {
    return (
        <input
            placeholder={placeHolder}
            style={style}
            value={value}
            type={type}
            onChange={onChange}
            className={cl.input}
        />
    );
};

export default Input;