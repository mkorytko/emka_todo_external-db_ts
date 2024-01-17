import { all } from "redux-saga/effects";
import {
    watcherInitialSate,
    watcherChangePage,
    watcherAddTask,
    watcherChangeOrder,
    watcherUpdateTask,
} from "./appSaga";

import {
    watcherNotify,
    watcherLoginRequest,
    watcherLogout,
} from "./utilsSaga";

const watchers = [
    watcherInitialSate(),
    watcherChangePage(),
    watcherAddTask(),
    watcherChangeOrder(),
    watcherUpdateTask(),
    watcherNotify(),
    watcherLoginRequest(),
    watcherLogout(),
];

const rootSaga = function* rootSaga() {
    yield all(watchers);
};

export default rootSaga;
