import React, {
    memo, useCallback, useMemo, FormEvent, ChangeEvent,
} from "react";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { setTaskPropertiesAction, addNewTaskAction, showNotifyAction } from "../../store/actions/app";
import ClearInputButton from "../ClearInputButton";
import SubmitButton from "../Button";
import { validField } from "../../helpers";
import {
    DEFAULT_TASK_USER,
    DEFAULT_TASK_EMAIL,
    DEFAULT_TASK_TEXT,
    FIELD_EMAIL_FAILED,
} from "../../constants";

import "./style.scss";

function TaskForm() {
    const dispatch = useAppDispatch();
    const { taskEmail, taskText, taskUser } = useAppSelector((store) => store.app);

    const _onChange = useCallback(({ target }: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        dispatch(setTaskPropertiesAction(target.name, target.value));
    }, []);

    const onClear = useCallback((targetName: string) => () => {
        dispatch(setTaskPropertiesAction(targetName, ""));
    }, []);

    const onSubmit = useCallback((e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (taskEmail && validField(taskEmail, "email")) {
            dispatch(addNewTaskAction({
                email: taskEmail, task: taskText, name: taskUser,
            }));
        } else {
            dispatch(showNotifyAction("error", FIELD_EMAIL_FAILED));
        }
    }, [taskEmail, taskText, taskUser]);

    const enableSubmitButton = useMemo(() => {
        return Boolean(taskEmail) && Boolean(taskText) && Boolean(taskUser);
    }, [taskEmail, taskText, taskUser]);

    return (
        <div className="task-form">
            <form
                onSubmit={onSubmit}
                className="task-form__fields">
                <div className="field__wrap">
                    <label htmlFor="taskUser">
                        <input
                            required
                            id="taskUser"
                            name="taskUser"
                            className="field name"
                            onChange={_onChange}
                            placeholder={DEFAULT_TASK_USER}
                            value={taskUser}
                            type="text" />
                        {taskUser && <ClearInputButton onClear={onClear("taskUser")} />}
                    </label>
                </div>
                <div className="field__wrap">
                    <label htmlFor="taskEmail">
                        <input
                            required
                            id="taskEmail"
                            name="taskEmail"
                            className="field email"
                            onChange={_onChange}
                            placeholder={DEFAULT_TASK_EMAIL}
                            value={taskEmail}
                            type="email" />
                    </label>
                    {taskEmail && <ClearInputButton onClear={onClear("taskEmail")} />}
                </div>
                <div className="field__wrap">
                    <label htmlFor="taskText">
                        <textarea
                            required
                            id="taskText"
                            name="taskText"
                            className="field task"
                            rows={4}
                            maxLength={255}
                            onChange={_onChange}
                            placeholder={DEFAULT_TASK_TEXT}
                            value={taskText} />
                    </label>
                    {taskText && (
                        <ClearInputButton
                            top
                            onClear={onClear("taskText")} />
                    )}
                </div>
                <SubmitButton
                    type="submit"
                    disabled={!enableSubmitButton}>
                    Добавить задачу
                </SubmitButton>
            </form>
        </div>
    );
}

export default memo(TaskForm);
