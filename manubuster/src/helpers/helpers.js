import { sessionInfoConst } from "./consts";

export const setSessionInfo = (newToken, newMail) => {
    // sessionStorage.setItem(sessionInfoConst, `{ "userToken": "${newToken}", "userMail": "${newMail}"`);
    sessionStorage.setItem(sessionInfoConst, JSON.stringify({userToken: newToken, userMail: newMail}));
}

export const getSessionInfo = () => {
    return JSON.parse(sessionStorage.getItem(sessionInfoConst));
}

export const deleteSessionInfo = () => {
    sessionStorage.clear();
}