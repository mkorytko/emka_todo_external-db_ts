import React, { memo } from "react";
import classnames from "classnames";
import "./style.scss";

interface Props {
    top?: boolean,
    onClear?: () => void,
}

function ClearInputButton(props: Props) {
    const { onClear, top } = props;

    return (
        <button
            tabIndex={-1}
            type="button"
            onClick={onClear}
            className={classnames("clear-button", { top })}>
            &times;
        </button>
    );
}

export default memo(ClearInputButton);
