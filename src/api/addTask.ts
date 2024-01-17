import { postData } from "./request";
import { GetTasksResponse, RequestParams, AddTaskBodyRequest } from "./types";

export default async function addTask(body: AddTaskBodyRequest, params: RequestParams): Promise<GetTasksResponse> {
    try {
        return await postData({
            url: "/api/user/addTask",
            body,
            params,
        });
    } catch (e: any) {
        throw new Error(e);
    }
}
