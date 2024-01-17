import React, { memo } from "react";
import TasksContainer from "../components/TasksContainer";
import Pagination from "../components/Pagination";

function Main() {
    return (
        <main className="main">
            <TasksContainer />
            <Pagination />
        </main>
    );
}

export default memo(Main);
