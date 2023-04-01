import { sessionInfoConst } from "./consts";

export const setSessionInfo = (data) => {
    sessionStorage.setItem(sessionInfoConst, JSON.stringify(data));
}

export const getSessionInfo = () => {
    return JSON.parse(sessionStorage.getItem(sessionInfoConst));
}

export const deleteSessionInfo = () => {
    sessionStorage.clear();
}