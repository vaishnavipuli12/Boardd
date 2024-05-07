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
        loggedinError: action?.error?.response?.data?.message,
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
