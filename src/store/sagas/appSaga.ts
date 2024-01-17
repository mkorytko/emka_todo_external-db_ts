import {
    call, put, takeLatest, select,
} from "redux-saga/effects";
import {
    GET_INITIAL_STATE,
    CHANGE_PAGE,
    ADD_TASK,
    CHANGE_ORDER,
    UPDATE_TASK,
    loadTasksAction,
    setLoadAction,
    resetTaskPropertiesAction,
    setOrderTypeAction,
    setPageAction,
    editTaskAction,
    loginToggleAction,
    showNotifyAction,
} from "../actions/app";
import {
    paginationWorker,
} from "./utilsSaga";

import getTasksFetch from "../../api/getTasks";
import addTaskFetch from "../../api/addTask";
import updateTask from "../../api/updateTask";
import { getIsAdmin } from "../../helpers";
import { TASK_ADD_SUCCESS } from "../../constants";
import { RequestParams } from "../../api/types";
import { RootState } from "../index";

export function* addTaskWorker({ body }: any): Generator {
    try {
        yield put(setLoadAction(true));
        const { orderCol, order, page }: any = yield select((store: RootState) => store.app);
        const result: any = yield call(addTaskFetch, body, { orderCol, order, page });
        if (result.success) {
            yield put(loadTasksAction(result.payload));
            yield call(paginationWorker, result.pagination);
            yield put(resetTaskPropertiesAction());
            yield put(showNotifyAction("success", TASK_ADD_SUCCESS));
        }
    } catch (err: any) {
        yield put(showNotifyAction("error", err.message));
    } finally {
        yield put(setLoadAction(false));
    }
}

export function* watcherAddTask(): Generator {
    try {
        yield takeLatest(ADD_TASK, addTaskWorker);
    } catch (err: any) {
        console.warn("watcherAddTask", err);
    }
}

function* fetchTasks(param: RequestParams): Generator {
    try {
        const result: any = yield call(getTasksFetch, param);
        let tasks: any[] = [];
        let pagination = null;
        if (result.success) {
            tasks = [...result.payload];
            pagination = { ...result.pagination };
        }
        yield put(loadTasksAction(tasks));
        return pagination;
    } catch (err: any) {
        return yield put(showNotifyAction("error", err.message));
    }
}

function* getInitialSateWorker(): Generator {
    try {
        yield put(setLoadAction(true));
        if (getIsAdmin()) {
            yield put(loginToggleAction(true));
        }
        const pagination: any = yield call(fetchTasks, {});
        yield call(paginationWorker, pagination);
    } catch (err: any) {
        yield put(showNotifyAction("error", err.message));
        console.warn(err);
    } finally {
        yield put(setLoadAction(false));
    }
}

export function* watcherInitialSate(): Generator {
    try {
        yield takeLatest(GET_INITIAL_STATE, getInitialSateWorker);
    } catch (err: any) {
        console.warn("watcherInitialSate", err);
    }
}

function* changePageWorker({ page }: any): Generator {
    try {
        yield put(setLoadAction(true));
        const { order, orderCol }: any = yield select((store: RootState) => store.app);
        yield call(fetchTasks, { page, order, orderCol });
        yield put(setPageAction(page));
    } catch (err: any) {
        console.warn(err);
    } finally {
        yield put(setLoadAction(false));
    }
}

export function* watcherChangePage(): Generator {
    try {
        yield takeLatest(CHANGE_PAGE, changePageWorker);
    } catch (err: any) {
        console.warn("watcherChangePage", err);
    }
}

function* changeOrderWorker({ orderCol, order }: any): Generator {
    try {
        yield put(setLoadAction(true));
        const { page }: any = yield select((store: RootState) => store.app);
        yield put(setOrderTypeAction(orderCol, order));
        yield call(fetchTasks, { page, orderCol, order });
    } catch (err: any) {
        console.warn(err);
    } finally {
        yield put(setLoadAction(false));
    }
}

export function* watcherChangeOrder(): Generator {
    try {
        yield takeLatest(CHANGE_ORDER, changeOrderWorker);
    } catch (err: any) {
        console.warn("watcherChangeOrder", err);
    }
}

function* updateTaskOrderWorker(params: any): Generator {
    try {
        yield put(setLoadAction(true));
        const task: any = yield call(updateTask, params.body, params?.callback);
        yield put(editTaskAction(task));
    } catch (err: any) {
        yield put(showNotifyAction("error", err.message));
        console.warn(err);
    } finally {
        yield put(setLoadAction(false));
    }
}

export function* watcherUpdateTask(): Generator {
    try {
        yield takeLatest(UPDATE_TASK, updateTaskOrderWorker);
    } catch (err: any) {
        console.warn("watcherUpdateTask", err);
    }
}
