import { Patterns } from "./types";

const patterns: Patterns = {
    email: /[^а-яА-ЯеЁ<>,?'"`#№$:;%^&*=+|\\~{}()[\] ][-_]*(\w)*(\d)*@(\d)*(\w)*[-_]*\.[a-z]{2,5}/gi,
};

export const validField = (str: string, fieldType: string): any => {
    if (str) {
        const match = str.match(patterns[fieldType as keyof Patterns]);
        return match && str === match.join("");
    }
    return false;
};

export const callBackIsFn = (cb: any) => typeof cb === "function";

export const getIsAdmin = (): boolean => {
    return Boolean(localStorage.getItem("isAdmin"));
};

export const loginSuccessStorage = (): void => {
    localStorage.setItem("isAdmin", "1");
};

export const clearStorage = (): void => {
    localStorage.removeItem("isAdmin");
};
