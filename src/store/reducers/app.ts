import {
    SET_LOAD,
    LOGIN_TOGGLE,
    CHANGE_TASK_PROPERTY,
    LOAD_TASKS,
    SET_PAGINATION,
    SET_PAGE,
    RESET_TASK_PROPERTIES,
    SET_ORDER_TYPE,
    EDIT_TASK,
} from "../actions/app";
import { AppActions, IState } from "../types";
import { Task } from "../../types";

const initialState: IState = {
    load: true,
    isAdmin: false,
    tasks: [],
    taskUser: "",
    taskEmail: "",
    taskText: "",
    page: 1,
    orderCol: "id",
    order: "asc",
    pagination: null,
};

export default function appReducer(state: IState = initialState, action: AppActions) {
    switch (action.type) {
        case LOGIN_TOGGLE: {
            return { ...state, isAdmin: action.isAdmin };
        }
        case SET_LOAD: {
            return { ...state, load: action.load };
        }
        case SET_PAGE: {
            return { ...state, page: action.page };
        }
        case CHANGE_TASK_PROPERTY: {
            return { ...state, [action.property]: action.text };
        }
        case RESET_TASK_PROPERTIES: {
            return {
                ...state,
                taskUser: "",
                taskEmail: "",
                taskText: "",
            };
        }
        case SET_ORDER_TYPE: {
            const { orderCol, order } = action;
            return { ...state, orderCol, order };
        }
        case SET_PAGINATION: {
            return { ...state, pagination: action.pagination };
        }
        case LOAD_TASKS: {
            return { ...state, tasks: action.tasks };
        }
        case EDIT_TASK: {
            const { updatedTask } = action;
            const tasks: Task[] = [...state.tasks];
            const updatedIndex = tasks.findIndex((el) => el.id === updatedTask.id);
            tasks.splice(updatedIndex, 1, updatedTask);
            return { ...state, tasks };
        }
        default:
            return { ...state };
    }
}
