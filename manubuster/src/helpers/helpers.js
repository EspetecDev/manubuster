import { sessionInfoConst } from "./consts";

export const setSessionInfo = (newToken, newMail) => {
    // sessionStorage.setItem(sessionInfoConst, `{ "userToken": "${newToken}", "userMail": "${newMail}"`);
    sessionStorage.setItem(sessionInfoConst, JSON.stringify({userToken: newToken, userMail: newMail}));
}

export const getSessionInfo = () => {
    var info = sessionStorage.getItem(sessionInfoConst);
    console.log(info);
    return info;
}
