import { putData } from "./request";
import { callBackIsFn } from "../helpers";
import { UpdateTaskBodyRequest, UpdateTaskResponse } from "./types";

export default async function updateTask(
    body: UpdateTaskBodyRequest,
    callback: () => void,
): Promise<UpdateTaskResponse> {
    try {
        const { payload } = await putData({
            url: "/api/admin/updateTask",
            body,
        });
        if (callBackIsFn(callback)) {
            callback();
        }
        return payload;
    } catch (e: any) {
        throw new Error(e);
    }
}
