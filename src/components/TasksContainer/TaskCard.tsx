import React, {
    memo, useCallback, useState, ChangeEvent,
} from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { showNotifyAction, updateTaskAction } from "../../store/actions/app";
import TaskStatus from "./TaskStatus";
import IconButton from "../IconButton";

import { getIsAdmin } from "../../helpers";
import { AUTHORISE_FAILED, UPDATE_TASK_UNCHANGED } from "../../constants";
import editIcon from "../../assets/img/editIcon.svg";
import saveIcon from "../../assets/img/saveIcon.svg";
import resetIcon from "../../assets/img/resetIcon.svg";
import { Task } from "../../types";

function TaskCard({
    id, name, email, task, done, edited,
}: Task) {
    const dispatch = useAppDispatch();
    const { isAdmin } = useAppSelector((store) => store.app);
    const [taskField, setTaskField] = useState<string>(task);
    const [isEditable, setEditable] = useState<boolean>(false);

    const resetState = useCallback((newTask: string = "") => {
        setTaskField(newTask || task);
        setEditable(false);
    }, [task, taskField]);

    const onChangeTask = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setTaskField(e.target.value);
    }, []);

    const onChangeEditable = useCallback(() => {
        if (isEditable) {
            resetState();
        }
        setEditable(!isEditable);
    }, [isEditable, task]);

    const onUpdateTask = useCallback((isCheck: boolean = false) => () => {
        if (getIsAdmin()) {
            if (!isCheck) {
                if (task.trim() === taskField.trim()) {
                    return dispatch(showNotifyAction("info", UPDATE_TASK_UNCHANGED));
                }
            }
            const body = {
                id,
                done: isCheck ? +(!done) : +done,
                task: isCheck ? task : taskField,
            };
            return dispatch(updateTaskAction(body, () => resetState(body.task)));
        }
        resetState();
        return dispatch(showNotifyAction("error", AUTHORISE_FAILED));
    }, [resetState, taskField, task, done]);

    return (
        <tr>
            <td className="center">
                {id}
            </td>
            <td className="center">
                {name}
            </td>
            <td className="center">
                {email}
            </td>
            <td className="task">
                <div className="field">
                    {isEditable ? (
                        <label htmlFor={`task__${id}`}>
                            <input
                                onChange={onChangeTask}
                                id={`task__${id}`}
                                className="editable"
                                type="text"
                                value={taskField} />
                        </label>
                    ) : (
                        <span className="static">
                            {taskField}
                        </span>
                    )}
                    {isAdmin && (
                        <div className="edit__box">
                            <IconButton
                                className="sm"
                                alt="edit-icon"
                                onClick={onChangeEditable}
                                icon={isEditable ? resetIcon : editIcon} />
                            <IconButton
                                className="sm"
                                alt="save-icon"
                                icon={saveIcon}
                                onClick={onUpdateTask()} />
                        </div>
                    )}
                    {Boolean(edited) && (
                        <span className="edited-task">
                            Отредактировано администратором
                        </span>
                    )}
                </div>
            </td>
            <td className="task-status__wrapper center">
                <TaskStatus
                    isAdmin={isAdmin}
                    taskStatus={Boolean(done)}
                    onChangeStatus={onUpdateTask} />
            </td>
        </tr>
    );
}

export default memo(TaskCard);
