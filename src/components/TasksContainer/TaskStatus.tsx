import React, { memo, useMemo } from "react";
import IconButton from "../IconButton";

import doneStatusIcon from "../../assets/img/done.svg";
import noDoneStatusIcon from "../../assets/img/noDone.svg";

interface Props {
    isAdmin: boolean,
    taskStatus: boolean,
    onChangeStatus: (v?: any) => () => void,
}

function TaskStatus(props: Props) {
    const {
        isAdmin,
        taskStatus,
        onChangeStatus,
    } = props;

    const buttonProps = useMemo(() => {
        if (isAdmin) {
            return { icon: taskStatus ? doneStatusIcon : noDoneStatusIcon };
        }
        return {
            disabled: true,
            icon: taskStatus ? doneStatusIcon : noDoneStatusIcon,
        };
    }, [isAdmin, taskStatus]);

    return (
        <IconButton
            {...buttonProps}
            onClick={onChangeStatus(true)}
            className="status-icon-button no-hover"
            alt="status-icon" />
    );
}

export default memo(TaskStatus);
