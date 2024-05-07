import * as types from "./actionTypes";
import { encrypt } from "../../services/EncryptDecrypt";
/**** import {getSystemHostName} from '../../utils/globalUtility' */
const initialState = {
    // userName: '', /***** getSystemHostName(), */,
    //   isClearLog: false,
    //   contactsUserName: '',
    //   registrationNumber: '',
    userTodoData: {},
    userInfo: {},
    isSuccessFullRegister: false,
    registerUserError: "",
    loggedinError: "",
    isLoggedin: false,
    isChangedPassed: false,
};
const UserInfoReducer = (state = initialState, action) => {
    var _a, _b, _c;
    switch (action.type) {
        case types.USERTODO_DATA:
            const newState = {
                ...state,
                userTodoData: { ...action.message },
            };
            return { ...newState };
        // case types.ISCLEARLOG:
        //   const newClearLogState = {
        //     ...state,
        //     isClearLog: action.message,
        //   };
        //   return { ...newClearLogState };
        // case types.USERNAME:
        //   state.contactsUserName = action.message;
        //   return { ...state };
        // case types.REGISTRATIONNUMBER:
        //   state.registrationNumber = action.message;
        //   return { ...state };
        case types.CREATE_USER_SUCCESS:
            return {
                ...state,
                userInfo: action.data,
                isSuccessFullRegister: true,
            };
        case types.CREATE_USER_ERROR:
            return {
                ...state,
                registerUserError: action.error,
                isSuccessFullRegister: false,
            };
        case types.USER_LOGIN_SUCCESS:
            sessionStorage.setItem("userInfo", JSON.stringify(encrypt(action.data)));
            return {
                ...state,
                userInfo: action.data,
                isLoggedin: true,
            };
        case types.USER_LOGIN_ERROR:
            return {
                ...state,
                loggedinError: (_c = (_b = (_a = action === null || action === void 0 ? void 0 : action.error) === null || _a === void 0 ? void 0 : _a.response) === null || _b === void 0 ? void 0 : _b.data) === null || _c === void 0 ? void 0 : _c.message,
                isLoggedin: false,
            };
        case types.CHANGE_PASSWORD_SUCCESS:
            return {
                ...state,
                isChangedPassed: true,
            };
        case types.CHANGE_PASSWORD_ERROR:
            return {
                ...state,
                isChangedPassed: false,
            };
        default:
            return state;
    }
};
export default UserInfoReducer;
