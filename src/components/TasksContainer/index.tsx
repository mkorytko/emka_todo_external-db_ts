import React, { memo } from "react";
import { useAppSelector } from "../../store/hooks";
import { RootState } from "../../store";
import TaskHeaderTitle from "./TaskHeaderTitle";
import TaskCard from "./TaskCard";
import TaskForm from "../TaskForm";

import { ORDER_COLS } from "../../constants";
import "./style.scss";
import { Task } from "../../types";

function TasksContainer() {
    const { tasks }: any = useAppSelector((store: RootState) => store.app);
    return (
        <div className="tasks__wrapper">
            {tasks.length > 0 ? (
                <table className="table">
                    <thead>
                        <tr>
                            {ORDER_COLS.map((col: any, i: number) => (
                                <TaskHeaderTitle
                                    key={String(i)}
                                    {...col} />
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {tasks.map((taskProps: Task) => (
                            <TaskCard
                                key={String(taskProps.id)}
                                {...taskProps} />
                        ))}
                    </tbody>
                </table>
            ) : (
                <h3 className="empty-tasks">Список заданий пуст</h3>
            )}
            <TaskForm />
        </div>
    );
}

export default memo(TasksContainer);
