import axios from 'axios';
import * as Config from '../components/App/Config';
export const post = async (url, payload, type = "") => {
    /* let updatedApi = Config.backendUrl + url;
    if (type) updatedApi = Config.nodeUrl + url; */
    const updatedApi = Config.getBackendURL(type) + url;
    let headers = {
        "Content-Type": "application/json"
    };
    let token = sessionStorage.getItem("accessToken");
    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }
    const data = await axios.post(updatedApi, payload, {
        headers: headers
    }).catch((e) => {
        var _a, _b, _c, _d, _e, _f, _g;
        /**** if (e == "Error: Network Error") {
            log.info('Please restart netWork error')
            backendRestarFun()
            return

        } if (e.response?.data?.code === "9999") {
            log.info('Please restart with data code 9999')
            backendRestarFun()
            return
        } */
        if (((_a = e === null || e === void 0 ? void 0 : e.response) === null || _a === void 0 ? void 0 : _a.status) && (((_b = e === null || e === void 0 ? void 0 : e.response) === null || _b === void 0 ? void 0 : _b.status) === 403 || (type && ((_c = e === null || e === void 0 ? void 0 : e.response) === null || _c === void 0 ? void 0 : _c.status) === 401))) {
            return getNewToken(url, post, payload, type);
        }
        else if (type && ((_d = e === null || e === void 0 ? void 0 : e.response) === null || _d === void 0 ? void 0 : _d.status) && ((_e = e === null || e === void 0 ? void 0 : e.response) === null || _e === void 0 ? void 0 : _e.status) === 401) {
            let options = {
                buttons: ["Login"],
                type: 'warning',
                message: `${(_g = (_f = e === null || e === void 0 ? void 0 : e.response) === null || _f === void 0 ? void 0 : _f.data) === null || _g === void 0 ? void 0 : _g.message}`,
                title: "Task Manager"
            };
            // showMessageBox(options).then((res: any) => {
            //     userLogout();
            // });
        }
        else {
            return e === null || e === void 0 ? void 0 : e.response;
        }
    });
    return data;
};
export const get = async (url, type = '') => {
    /* let updatedApi = Config.backendUrl + url;
    if (type) updatedApi = Config.nodeUrl + url; */
    const updatedApi = Config.getBackendURL(type) + url;
    const data = await axios.get(updatedApi, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
        }
    }).catch((e) => {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        if (((_a = e === null || e === void 0 ? void 0 : e.response) === null || _a === void 0 ? void 0 : _a.status) !== undefined) {
            if (((_b = e === null || e === void 0 ? void 0 : e.response) === null || _b === void 0 ? void 0 : _b.status) && (((_c = e === null || e === void 0 ? void 0 : e.response) === null || _c === void 0 ? void 0 : _c.status) === 403 || (type && ((_d = e === null || e === void 0 ? void 0 : e.response) === null || _d === void 0 ? void 0 : _d.status) === 401))) {
                return getNewToken(url, get, '', type);
            }
            else if (type && ((_e = e === null || e === void 0 ? void 0 : e.response) === null || _e === void 0 ? void 0 : _e.status) && ((_f = e === null || e === void 0 ? void 0 : e.response) === null || _f === void 0 ? void 0 : _f.status) === 401) {
                let options = {
                    buttons: ["Login"],
                    type: 'warning',
                    message: `${(_h = (_g = e === null || e === void 0 ? void 0 : e.response) === null || _g === void 0 ? void 0 : _g.data) === null || _h === void 0 ? void 0 : _h.message}`,
                    title: "Task Manager NG"
                };
                // showMessageBox(options).then((res: any) => {
                //     userLogout();
                // });
            }
            else {
                return e.response;
            }
        }
    });
    return data;
};
export const patch = async (url, payload) => {
    /* let updatedApi = Config.backendUrl + url */
    const updatedApi = Config.getBackendURL() + url;
    const data = await axios.patch(updatedApi, payload, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
        }
    }).catch((e) => {
        var _a, _b;
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
        if (((_a = e === null || e === void 0 ? void 0 : e.response) === null || _a === void 0 ? void 0 : _a.status) && ((_b = e === null || e === void 0 ? void 0 : e.response) === null || _b === void 0 ? void 0 : _b.status) === 403) {
            return getNewToken(url, patch, payload);
        }
        else {
            return e.response;
        }
    });
    return data;
};
export const deleteAPI = async (url) => {
    /* let deleteApi = Config.backendUrl + url + payload.id; */
    const updatedApi = Config.getBackendURL() + url;
    const data = await axios.delete(updatedApi, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
        }
    }).catch((e) => {
        var _a, _b;
        if (((_a = e === null || e === void 0 ? void 0 : e.response) === null || _a === void 0 ? void 0 : _a.status) && ((_b = e === null || e === void 0 ? void 0 : e.response) === null || _b === void 0 ? void 0 : _b.status) === 403) {
            return getNewToken(url, deleteAPI);
        }
        else {
            return e.response;
        }
    });
    return data;
};
async function getNewToken(url, callback, payload, type) {
    const data = await updateToken(url, callback, payload, type);
    return data;
}
async function updateToken(url, callback, payload, type) {
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
        }
        else {
            /**** const data = await getToken(url, callback, payload, type);
              return data; */
        }
    }
    catch (e) {
        /**** const data = await getToken(url, callback, payload, type);
        return data; */
    }
}
