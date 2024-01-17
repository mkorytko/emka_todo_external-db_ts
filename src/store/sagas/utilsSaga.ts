import {
    takeEvery, takeLatest, call, put, apply,
} from "redux-saga/effects";
import { toast } from "react-toastify";
import {
    LOGIN_REQUEST,
    SHOW_NOTIFY,
    LOGOUT,
    loginToggleAction,
    setPaginationAction,
    showNotifyAction,
} from "../actions/app";
import { callBackIsFn, clearStorage, loginSuccessStorage } from "../../helpers";
import {
    ADMIN_LOGIN,
    ADMIN_PWD,
    AUTHORISE_LOGOUT,
    AUTHORISE_SUCCESS,
    AUTHORISE_WRONG,
} from "../../constants";
import { Pagination } from "../../types";

export function* paginationWorker(pagination: Pagination): Generator {
    try {
        yield put(setPaginationAction(pagination));
    } catch (err) {
        console.warn("paginationWorker", err);
    }
}

function* notifyWorker({ toastType, text, callback }: any): Generator {
    yield apply(toast, toastType, [text]);
    if (callBackIsFn(callback)) {
        yield apply(toast, "onChange", [callback]);
    }
}

export function* watcherNotify(): Generator {
    try {
        yield takeEvery(SHOW_NOTIFY, notifyWorker);
    } catch (err) {
        console.warn("watcherNotify", err);
    }
}

function* loginRequestWorker({ login, pwd, callback }: any): Generator {
    try {
        if (ADMIN_LOGIN === login.trim() && ADMIN_PWD === pwd.trim()) {
            if (callBackIsFn(callback)) {
                callback();
            }
            yield call(loginSuccessStorage);
            yield put(loginToggleAction(true));
            yield put(showNotifyAction("success", AUTHORISE_SUCCESS));
        } else {
            yield put(showNotifyAction("error", AUTHORISE_WRONG));
        }
    } catch (err) {
        console.warn("loginRequestWorker", err);
    }
}

export function* watcherLoginRequest(): Generator {
    try {
        yield takeLatest(LOGIN_REQUEST, loginRequestWorker);
    } catch (err) {
        console.warn("watcherLoginRequest", err);
    }
}

function* logoutWorker(): Generator {
    try {
        yield call(clearStorage);
        yield put(loginToggleAction(false));
        yield put(showNotifyAction("success", AUTHORISE_LOGOUT));
    } catch (err) {
        console.warn("logoutWorker", err);
    }
}

export function* watcherLogout(): Generator {
    try {
        yield takeLatest(LOGOUT, logoutWorker);
    } catch (err) {
        console.warn("watcherLogout", err);
    }
}
