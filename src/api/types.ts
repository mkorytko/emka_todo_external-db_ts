import { Pagination, Task, NewTask } from "../types";

export interface RequestDataBase {
    url: string,
    method: any,
    body?: any
}

export interface UpdateTaskBodyRequest {
    id: number,
    task: string,
    done: number
}

export interface RequestParams {
    order?: string,
    orderCol?: string,
    page?: number,
}

export interface AddTaskBodyRequest extends NewTask {}

export interface RequestData extends Omit<RequestDataBase, "method"> {
    params?: RequestParams
}

export interface BaseResponse {
    success: string,
}

export interface GetTasksResponse extends BaseResponse {
    payload: Task[],
    pagination: Pagination,
}

export interface UpdateTaskResponse {
    payload: Task,
}
