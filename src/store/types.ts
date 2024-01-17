import {
    SET_LOAD,
    GET_INITIAL_STATE,
    LOGOUT,
    SET_PAGE,
    CHANGE_TASK_PROPERTY,
    LOGIN_TOGGLE,
    RESET_TASK_PROPERTIES,
    SET_ORDER_TYPE,
    SET_PAGINATION,
    LOAD_TASKS,
    EDIT_TASK,
    CHANGE_PAGE,
    ADD_TASK,
    SHOW_NOTIFY, CHANGE_ORDER, UPDATE_TASK, LOGIN_REQUEST,
} from "./actions/app";
import {
    LoginRequest,
    Task,
    Pagination,
    NewTask,
} from "../types";

export interface IState {
    load: boolean,
    isAdmin: false,
    tasks: any[],
    taskUser: string,
    taskEmail: string,
    taskText: string,
    page: number,
    orderCol: string,
    order: string,
    pagination: any,
}

export type ShowNotifyAction = {
    type: typeof SHOW_NOTIFY,
    toastType: string,
    text: string,
    callback?: any,
}

export type LoginRequestAction = {
    type: typeof LOGIN_REQUEST,
    values: LoginRequest,
    callback?: any,
}

export type LogoutAction = {
    type: typeof LOGOUT,
};

export type GetInitialState = {
    type: typeof GET_INITIAL_STATE,
};

export type ChangePageAction = {
    type: typeof CHANGE_PAGE,
    page: string | number,
};

export type LoginToggleAction = {
    type: typeof LOGIN_TOGGLE,
    isAdmin: boolean,
}

export type SetLoadAction = {
    type: typeof SET_LOAD,
    load: boolean
}

export type SetPageAction = {
    type: typeof SET_PAGE,
    page: number,
};

export type SetTaskPropertiesAction = {
    type: typeof CHANGE_TASK_PROPERTY,
    property: string | number,
    text: string,
};

export type ResetTaskPropertiesAction = {
    type: typeof RESET_TASK_PROPERTIES,
};

export type ChangeOrderAction = {
    type: typeof CHANGE_ORDER,
    orderCol: string,
    order: string,
};

export type UpdateTaskAction = {
    type: typeof UPDATE_TASK,
    body: {
        id: number,
        done: number,
        task: string,
    },
    callback: () => void,
};

export type AddNewTaskAction = {
    type: typeof ADD_TASK,
    body: NewTask,
};

export type SetOrderTypeAction = {
    type: typeof SET_ORDER_TYPE,
    orderCol: string,
    order: string,
};

export type SetPaginationAction = {
    type: typeof SET_PAGINATION,
    pagination: Pagination,
};

export type LoadTasksAction = {
    type: typeof LOAD_TASKS,
    tasks: Task[],
};

export type EditTaskAction = {
    type: typeof EDIT_TASK,
    updatedTask: Task,
};

export type AppActions =
    | UpdateTaskAction
    | ChangeOrderAction
    | LoginToggleAction
    | SetLoadAction
    | SetPageAction
    | SetTaskPropertiesAction
    | ResetTaskPropertiesAction
    | SetOrderTypeAction
    | SetPaginationAction
    | LoadTasksAction
    | AddNewTaskAction
    | EditTaskAction
    | ShowNotifyAction
    | LoginRequestAction
    | LogoutAction
    | GetInitialState
    | ChangePageAction;
