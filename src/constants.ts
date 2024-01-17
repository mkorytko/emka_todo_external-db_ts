import { OrderCols } from "./types";

export const TOAST_AUTO_CLOSE_TIME: number = 1500;
export const AUTH_ERROR_AUTO_CLEAR_TIME: number = 2000;
export const MODAL_AUTO_CLOSE_TIME: number = 500;

export const REQUEST_UNKNOWN: string = "Неизвестный запрос";
export const REQUEST_SERVER_ERROR: string = "Ошибка сервера. Попробуйте позже";
export const REQUEST_UNKNOWN_ERROR: string = "Неизвестная ошибка";
export const REQUEST_INTERNET_ERROR: string = "Проблемы подключения к интернету";

export const AUTHORISE_FAILED_RULES: string = "Не все поля заполнены";
export const AUTHORISE_SUCCESS: string = "Авторизация выполнена";
export const AUTHORISE_FAILED: string = "Авторизация не выполнена";
export const AUTHORISE_WRONG: string = "Не верные данные";
export const AUTHORISE_LOGOUT: string = "Вы вышли из админки";

export const UPDATE_TASK_UNCHANGED: string = "Изменения не внесены";

export const FIELD_EMAIL_FAILED: string = "Почта указана некорректно";
export const TASK_ADD_SUCCESS: string = "Задача успешно добавлена";

export const ADMIN_LOGIN: string = "admin";
export const ADMIN_PWD: string = "123";

export const DEFAULT_TASK_USER: string = "Name";
export const DEFAULT_TASK_EMAIL: string = "Email@example.box";
export const DEFAULT_TASK_TEXT: string = "Task";

export const ORDER_COLS: Array<OrderCols> = [
    {
        title: "#",
        orderCol: "id",
        order: "asc",
        name: "id",
    },
    {
        title: "Имя",
        orderCol: "name",
        order: "asc",
        name: "name",
    },
    {
        title: "Почта",
        orderCol: "email",
        order: "asc",
        name: "email",
    },
    {
        title: "Задача",
        orderCol: null,
        order: null,
        name: "task",
    },
    {
        title: "Статус",
        orderCol: "done",
        order: "asc",
        name: "done",
    },
];
