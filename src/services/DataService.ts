import axios from 'axios';
import * as Config from '../components/App/Config';
// import { showMessageBox } from '../components/Constant/ConstantFunction';
import { userLogout } from "../utils/globalUtility";

export const post = async (url: string, payload: any, type: string = "") => {
    /* let updatedApi = Config.backendUrl + url;
    if (type) updatedApi = Config.nodeUrl + url; */
    const updatedApi = Config.getBackendURL(type) + url;
    let headers: any = {
        "Content-Type": "application/json"
    };
    let token = sessionStorage.getItem("accessToken");
    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }

    const data = await axios.post(updatedApi, payload, {
        headers: headers
    }).catch((e) => {
        /**** if (e == "Error: Network Error") {
            log.info('Please restart netWork error')
            backendRestarFun()
            return

        } if (e.response?.data?.code === "9999") {
            log.info('Please restart with data code 9999')
            backendRestarFun()
            return
        } */
        if (e?.response?.status && (e?.response?.status === 403 || (type && e?.response?.status === 401))) {
            return getNewToken(url, post, payload, type);
        } else if (type && e?.response?.status && e?.response?.status === 401) {
            let options = {
                buttons: ["Login"],
                type: 'warning',
                message: `${e?.response?.data?.message}`,
                title: "Task Manager"
            }
            // showMessageBox(options).then((res: any) => {
            //     userLogout();
            // });
        } else {
            return e?.response;
        }
    });
    return data;
}

export const get = async (url: string, type: string = '') => {
    /* let updatedApi = Config.backendUrl + url;
    if (type) updatedApi = Config.nodeUrl + url; */
    const updatedApi = Config.getBackendURL(type) + url;

    const data = await axios.get(updatedApi, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
        }
    }).catch((e) => {
        if (e?.response?.status !== undefined) {
            if (e?.response?.status && (e?.response?.status === 403 || (type && e?.response?.status === 401))) {
                return getNewToken(url, get, '', type);
            } else if (type && e?.response?.status && e?.response?.status === 401) {
                let options = {
                    buttons: ["Login"],
                    type: 'warning',
                    message: `${e?.response?.data?.message}`,
                    title: "Task Manager NG"
                }
                // showMessageBox(options).then((res: any) => {
                //     userLogout();
                // });
            } else {
                return e.response;
            }
        }
    })
    return data;
}

export const patch = async (url: string, payload: any) => {
    /* let updatedApi = Config.backendUrl + url */
    const updatedApi = Config.getBackendURL() + url;

    const data = await axios.patch(updatedApi, payload, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
        }
    }).catch((e) => {
        console.log("patch>>>>>>>>>>", updatedApi, e);
        /**** if (e == "Error: Network Error") {
            log.info('Please restart netWork error')
            backendRestarFun()
            return

        } if (e.response?.data?.code === "9999") {
            log.info('Please restart with data code 9999')
            backendRestarFun()
            return
        } */
        if (e?.response?.status && e?.response?.status === 403) {
            return getNewToken(url, patch, payload);
        } else {
            return e.response;
        }
    })
    return data;
}

export const deleteAPI = async (url: string) => {
    /* let deleteApi = Config.backendUrl + url + payload.id; */
    const updatedApi = Config.getBackendURL() + url;
    const data = await axios.delete(updatedApi, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
        }
    }).catch((e) => {
        if (e?.response?.status && e?.response?.status === 403) {
            return getNewToken(url, deleteAPI);
        } else {
            return e.response;
        }
    })
    return data;
}


async function getNewToken(url: string, callback: Function, payload?: any, type?: any) {
    const data = await updateToken(url, callback, payload, type);
    return data;
}

async function updateToken(url: string, callback: Function, payload?: any, type?: any) {
    /* let updatedApi = Config.backendUrl; */
    const updatedApi = Config.getBackendURL();

    try {
        if (sessionStorage['refreshToken']) {
            const response = await axios.post(updatedApi + Config.refreshToken, {
                refresh_token: sessionStorage['refreshToken'],
            });

            if (response && response.data && response.data.access_token) {
                sessionStorage['accessToken'] = response.data.access_token;
                sessionStorage['refreshToken'] = response.data.refresh_token;
                /**** tokens.accessToken = response.data.access;
                    await updateTokenInRedis({ refresh: tokens.refreshToken, access: response.data.access }); */
                const data = await callback(url, payload, type);
                return data;
            }
        } else {
            /**** const data = await getToken(url, callback, payload, type);
              return data; */
        }
    } catch (e) {
        /**** const data = await getToken(url, callback, payload, type);
        return data; */
    }
}
