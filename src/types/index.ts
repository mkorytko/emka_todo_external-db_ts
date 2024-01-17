export interface Patterns {
    email: RegExp
}

export type Pagination = {
    total: number,
    limit: number,
    pages: number,
};

export interface NewTask {
    name: string,
    email: string,
    task: string,
}

export interface Task extends NewTask{
    id: number,
    edited: boolean,
    done: boolean,
}

export interface LoginRequest {
    login: string,
    pwd: string,
}

export interface OrderCols {
    title: string,
    order: string | null,
    orderCol: string | null,
    name: string,
}
