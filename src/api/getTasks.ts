import { getData } from "./request";
import { GetTasksResponse, RequestParams } from "./types";

export default async function getTasks(params: RequestParams): Promise<GetTasksResponse> {
    try {
        return await getData({
            url: "/api/user/getTasks",
            params,
        });
    } catch (e: any) {
        throw new Error(e);
    }
}
