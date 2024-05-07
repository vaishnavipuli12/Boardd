import { jsx as _jsx } from "react/jsx-runtime";
// import * as Constinfo from './ConstInfo';
// import * as ProgressAction from './../../store/Channel/Progress/actions';
import ReactDOM from "react-dom/client";
import DialogBox from '../../utils/DialogBox';
import { decrypt } from '../../services/EncryptDecrypt';
export const getUserInfo = () => {
    const userInfo = sessionStorage.getItem('userInfo');
    if (userInfo) {
        return decrypt(userInfo);
    }
};
export const isUser = () => {
    const { userType = '' } = getUserInfo();
    return (userType === 'user' || userType === 'admin') ? true : false;
};
export const showMessageBox = (options) => {
    /****
     * let option = {
       message: param.message,
       type: param.type,
       detail: (param.detail) ? "More... \n\n" + param.detail : "",
       title: Constinfo.version
     }*/
    /**** remote.dialog.showMessageBoxSync(remote.getCurrentWindow(), option);*/
    return new Promise((reslove, reject) => {
        const container = document.getElementById("dialog-cloud-popup");
        const root1 = ReactDOM.createRoot(container);
        root1.render(_jsx(DialogBox, { option: options, root1: root1, reslove: reslove, reject: reject }));
    });
};
