import {
    AddNewTaskAction,
    ChangeOrderAction,
    ChangePageAction,
    EditTaskAction,
    GetInitialState,
    LoadTasksAction,
    LoginRequestAction,
    LoginToggleAction,
    LogoutAction,
    ResetTaskPropertiesAction,
    SetLoadAction,
    SetOrderTypeAction,
    SetPageAction,
    SetPaginationAction,
    SetTaskPropertiesAction,
    ShowNotifyAction,
    UpdateTaskAction,
} from "../types";
import {
    NewTask, Pagination, Task,
} from "../../types";

export const GET_INITIAL_STATE = "GET_INITIAL_STATE";

export const SHOW_NOTIFY = "SHOW_NOTIFY";

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_TOGGLE = "LOGIN_TOGGLE";
export const LOGOUT = "LOGOUT";

export const SET_PAGE = "SET_PAGE";
export const CHANGE_PAGE = "CHANGE_PAGE";

export const SET_LOAD = "SET_LOAD";
export const SET_PAGINATION = "SET_PAGINATION";

export const LOAD_TASKS = "LOAD_TASKS";
export const CHANGE_TASK_PROPERTY = "CHANGE_TASK_PROPERTY";
export const RESET_TASK_PROPERTIES = "RESET_TASK_PROPERTIES";

export const ADD_TASK = "ADD_TASK";
export const UPDATE_TASK = "UPDATE_TASK";
export const EDIT_TASK = "EDIT_TASK";

export const CHANGE_ORDER = "CHANGE_ORDER";
export const SET_ORDER_TYPE = "SET_ORDER_TYPE";

export const setLoadAction = (load: boolean): SetLoadAction => ({
    type: SET_LOAD,
    load,
});

export const showNotifyAction = (toastType: string, text: string, callback = () => {}): ShowNotifyAction => ({
    type: SHOW_NOTIFY,
    toastType,
    text,
    callback,
});

export const loginRequestAction = (values: any, callback: () => void): LoginRequestAction => ({
    type: LOGIN_REQUEST,
    ...values,
    callback,
});

export const loginToggleAction = (isAdmin: boolean): LoginToggleAction => ({
    type: LOGIN_TOGGLE,
    isAdmin,
});

export const logoutAction = (): LogoutAction => ({
    type: LOGOUT,
});

export const getInitialState = (): GetInitialState => ({
    type: GET_INITIAL_STATE,
});

export const changePageAction = (page: number): ChangePageAction => ({
    type: CHANGE_PAGE,
    page,
});

export const setPageAction = (page: number): SetPageAction => ({
    type: SET_PAGE,
    page,
});

export const setPaginationAction = (pagination: Pagination): SetPaginationAction => ({
    type: SET_PAGINATION,
    pagination,
});

export const loadTasksAction = (tasks: Task[]): LoadTasksAction => ({
    type: LOAD_TASKS,
    tasks,
});

export const setTaskPropertiesAction = (property: string | number, text: string): SetTaskPropertiesAction => ({
    type: CHANGE_TASK_PROPERTY,
    property,
    text,
});

export const resetTaskPropertiesAction = (): ResetTaskPropertiesAction => ({
    type: RESET_TASK_PROPERTIES,
});

export const addNewTaskAction = (body: NewTask): AddNewTaskAction => ({
    type: ADD_TASK,
    body,
});

export const changeOrderAction = (orderCol: string, order: string): ChangeOrderAction => ({
    type: CHANGE_ORDER,
    orderCol,
    order,
});

export const setOrderTypeAction = (orderCol: string, order: string): SetOrderTypeAction => ({
    type: SET_ORDER_TYPE,
    orderCol,
    order,
});

export const updateTaskAction = (
    body: {id: number, done: number, task: string},
    callback: () => void,
): UpdateTaskAction => ({
    type: UPDATE_TASK,
    body,
    callback,
});

export const editTaskAction = (updatedTask: Task): EditTaskAction => ({
    type: EDIT_TASK,
    updatedTask,
});
