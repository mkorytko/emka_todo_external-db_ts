import React, { memo } from "react";
import "./style.scss";

interface Props extends React.HTMLAttributes<HTMLButtonElement> {
    type: "submit" | "reset" | "button",
    children: React.ReactNode,
    disabled?: boolean,
    onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => any
}

function Button(props: Props) {
    const {
        type,
        disabled,
        children,
        onClick,
    } = props;

    return (
        <button
            disabled={disabled}
            onClick={onClick}
            type={type}
            className="custom-button">
            {children}
        </button>
    );
}

export default memo(Button);
