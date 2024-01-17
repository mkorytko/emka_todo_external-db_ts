import axios, { AxiosStatic } from "axios";
import {
    REQUEST_INTERNET_ERROR, REQUEST_SERVER_ERROR, REQUEST_UNKNOWN, REQUEST_UNKNOWN_ERROR,
} from "../constants";
import {
    RequestData,
    RequestDataBase,
} from "./types";

function queryBuilder(params: any = {}) {
    if (
        typeof params !== "object"
        || params instanceof Array
        || Object.is(params, null)
        || Object.keys(params).length === 0
    ) {
        return "";
    }
    let query: Array<any> = Object.keys(params)
        .filter((key: string) => {
            const empty = params[key] === "";
            return !empty;
        });
    query = query.map((k: string) => `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`);
    return `?${query.join("&")}`;
}

type Methods = "get" | "post" | "put";

export function fetchData({
    url,
    method = "get",
    body = {},
}: {
    url: string,
    method: string,
    body?: any,
}): Promise<any> {
    return axios[method as Methods](url, body)
        .then((res: any) => {
            return res.data;
        })
        .catch((e: any) => {
            if (e.response) {
                let errorMsg = e.response?.data?.error || REQUEST_INTERNET_ERROR;
                const status = +e.response.status;
                if (status >= 400 && status < 500) {
                    errorMsg = e.response?.data?.error || REQUEST_UNKNOWN;
                } else if (status >= 500) {
                    errorMsg = e.response?.data?.error || REQUEST_SERVER_ERROR;
                } else {
                    errorMsg = e.response?.data?.error || REQUEST_UNKNOWN_ERROR;
                }
                e.message = errorMsg;
                throw new Error(errorMsg);
            }
        });
}

export function getData({
    url,
    params = {},
}: RequestData): Promise<any> {
    const mainUrl = url + queryBuilder(params);
    return fetchData({
        url: mainUrl,
        method: "get",
    });
}

export function postData({
    url,
    body = {},
    params = {},
}: RequestData): Promise<any> {
    return fetchData({
        url: url + queryBuilder(params),
        method: "post",
        body,
    });
}

export function putData({
    url,
    body,
}: RequestData): Promise<any> {
    return fetchData({
        url,
        method: "put",
        body,
    });
}
