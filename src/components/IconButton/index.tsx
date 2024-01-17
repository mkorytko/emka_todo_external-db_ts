import React, { memo, ReactNode, MouseEvent } from "react";
import classnames from "classnames";

import "./style.scss";

interface Props {
    alt: string,
    icon: string | undefined,
    onClick: (() => () => void) | ((e: MouseEvent<HTMLButtonElement>) => void) | ((a?: any) => any),
    className: string,
    disabled?: boolean,
    children?: ReactNode,
}

function IconButton(props: Props) {
    const {
        onClick,
        alt,
        icon,
        children,
        disabled,
        className = "",
    } = props;

    return (
        <button
            disabled={disabled}
            tabIndex={-1}
            type="button"
            onClick={onClick}
            className={classnames("icon-button", className)}>
            {icon ? (
                <img
                    className="icon"
                    src={icon}
                    alt={alt} />
            ) : children}
        </button>
    );
}

export default memo(IconButton);
