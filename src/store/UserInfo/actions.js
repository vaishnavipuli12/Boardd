import axios from "axios";
import * as types from "./actionTypes";
import { BASE_URLS } from "./../../utils/Config";
import { toast } from "react-toastify";
import { getUserInfo } from "./../../components/Constant/ConstantFunction";

const userInfo = getUserInfo();
export const userTodoDataAction = (message) => {
  return (dispatch) => {
    dispatch(userTodoDataMessage(message));
  };
};

const userTodoDataMessage = (message) => ({
  type: types.USERTODO_DATA,
  message,
});

//User Login
const userLoginSuccess = (data) => ({
  type: types.USER_LOGIN_SUCCESS,
  data,
});

const userLoginError = (error) => ({
  type: types.USER_LOGIN_ERROR,
  error,
});

export const userLogin = (payload) => {
  return (dispatch) => {
    axios
      .post(`${BASE_URLS}/user/login`, payload)
      .then((response) => {
        if (response && response.data) {
          dispatch(userLoginSuccess(response.data));
        } else {
          dispatch(userLoginError("Somthing went wrong"));
          toast.error("Something went wrong");
        }
      })
      .catch((error) => {
        dispatch(userLoginError(error));
        toast.error(error.message);
      });
  };
};

//Create User
const createUserSuccess = (data) => ({
  type: types.CREATE_USER_SUCCESS,
  data,
});

const createUserError = (error) => ({
  type: types.CREATE_USER_ERROR,
  error,
});

export const createUser = (requestData) => {
  return (dispatch) => {
    axios
      .post(`${BASE_URLS}/user/add`, requestData)
      .then((response) => {
        if (response && response.data) {
          dispatch(createUserSuccess(response.data));
          toast.success("User registered successfully ...!");
        } else {
          dispatch(createUserError("Something went wrong"));
          toast.error("Something went wrong");
        }
      })
      .catch((error) => {
        dispatch(createUserError(error));
        toast.error(error.message);
      });
  };
};

//Change password methds
const changePasswordSuccess = (data) => ({
  type: types.CHANGE_PASSWORD_SUCCESS,
  data,
});

const changePasswordError = (error) => ({
  type: types.CHANGE_PASSWORD_ERROR,
  error,
});

export const changePasswordActions = (requestData) => {
  return (dispatch) => {
    axios
      .post(`${BASE_URLS}/user/changepassword`, requestData)
      .then((response) => {
        if (response && response.data) {
          dispatch(changePasswordSuccess(response.data));
          toast.success("Password change successfully ...!");
        } else {
          dispatch(changePasswordError("Something went wrong"));
          toast.error("Something went wrong");
        }
      })
      .catch((error) => {
        dispatch(changePasswordError(error));
        toast.error(error.message);
      });
  };
};

// Get board name api calls
const getBoardNameSuccess = (data) => ({
  type: types.GET_BOARD_NAME_SUCCESS,
  data,
});

const getBoardNameError = (error) => ({
  type: types.GET_BOARD_NAME_ERROR,
  error,
});

export const getBoardName = (id) => {
  return (dispatch) => {
    axios
      .get(`${BASE_URLS}/dashboard/getallboards?userId=${id}`)
      .then((response) => {
        if (response && response.data) {
          dispatch(getBoardNameSuccess(response.data));
        } else {
          dispatch(getBoardNameError("Something went wrong"));
          toast.error("Something went wrong");
        }
      })
      .catch((error) => {
        dispatch(getBoardNameError(error));
        toast.error(error.message);
      });
  };
};

// Add board name api calls
const addBoardNameSuccess = (data) => ({
  type: types.ADD_BOARD_NAME_SUCCESS,
  data,
});

const addBoardNameError = (error) => ({
  type: types.ADD_BOARD_NAME_ERROR,
  error,
});

export const addBoardName = (data) => {
  return (dispatch, getState) => {
    axios
      .post(`${BASE_URLS}/dashboard/addboard`, data)
      .then((response) => {
        if (response && response.data) {
          dispatch(addBoardNameSuccess(response.data));
          toast.success("Board created ..!");
          dispatch(getBoardName(userInfo?.id));
        } else {
          dispatch(addBoardNameError("Something went wrong"));
          toast.error("Something went wrong");
        }
      })
      .catch((error) => {
        dispatch(addBoardNameError(error));
        toast.error(error.message);
      });
  };
};

//GET  Todo
const getTodoSuccess = (data) => ({
  type: types.GET_TODO_SUCCESS,
  data: data,
});

const getTodoError = (data) => ({
  type: types.GET_TODO_ERROR,
  data: data,
});

export const getTodoData = (userid) => {
  return (dispatch, getState) => {
    if (getState().AddToDoReducers?.boardData?.length > 0) {
      var boardId =
        getState().AddToDoReducers?.boardData &&
        getState().AddToDoReducers?.boardData[0].id;
      if (
        sessionStorage.getItem("board_id") === null ||
        sessionStorage.getItem("board_id") === undefined ||
        sessionStorage.getItem("board_id") === ""
      ) {
        sessionStorage.setItem("board_id", boardId);
      }
      axios
        .get(
          `${BASE_URLS}/dashboard/getalltasks?boardId=${boardId}&userId=${userid}`
        )
        .then((response) => {
          if (response && response.data) {
            dispatch(getTodoSuccess(response.data));
          } else {
            dispatch(getTodoError("Something went wrong ..!"));
            toast.error("Something went wrong");
          }
        })
        .catch((error) => {
          dispatch(getTodoError(error));
          toast.error(error.message);
        });
    }
  };
};

//Add Todo
const addTodoSuccess = (data) => ({
  type: types.ADD_TODO_SUCCESS,
  data: data,
});

const addTodoError = (data) => ({
  type: types.ADD_TODO_ERROR,
  data: data,
});

export const addTodoData = (data) => {
  return (dispatch, getState) => {
    axios
      .post(`${BASE_URLS}/dashboard/createtask`, data)
      .then((response) => {
        if (response && response.data) {
          dispatch(addTodoSuccess(response.data));
          toast.success("Todo created ..!");
          // dispatch(getTodoData(userInfo?.id));
        } else {
          dispatch(addTodoError("Something went wrong ..!"));
          toast.error("Something went wrong");
        }
      })
      .catch((error) => {
        dispatch(addTodoError(error));
        toast.error(error.message);
      });
  };
};

//GET  Todo through board id
const getTodoBoardIdSuccess = (data) => ({
  type: types.GET_TODO_USING_BOARD_ID_SUCCESS,
  data: data,
});

const getTodoBoardIdError = (data) => ({
  type: types.GET_TODO_USING_BOARD_ID_ERROR,
  data: data,
});

export const getTodoDataBoardId = (boardId, userid) => {
  return (dispatch, getState) => {
    axios
      .get(
        `${BASE_URLS}/dashboard/getalltasks?boardId=${boardId}&userId=${userid}`
      )
      .then((response) => {
        if (response && response.data) {
          dispatch(getTodoBoardIdSuccess(response.data));
        } else {
          dispatch(getTodoBoardIdError("Something went wrong ..!"));
          toast.error("Something went wrong");
        }
      })
      .catch((error) => {
        dispatch(getTodoBoardIdError(error));
        toast.error(error.message);
      });
  };
};

export const removeBoard = (boardId) => {
  return (dispatch, getState) => {
    axios
      .delete(
        `${BASE_URLS}/dashboard/removeBoard?boardId=${boardId}`
      )
      .then((response) => {
        console.log(response)
        if (response && response.status===200) {
          toast.success("Board Deleted ..!");
        } else {
          toast.error("Something went wrong");
        }
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };
};


//Update todo status
const updateTodoStatusSuccess = (data) => ({
  type: types.UPDATE_TODO_STATUS_SUCCESS,
  data: data,
});

const updateTodoStatusError = (data) => ({
  type: types.UPDATE_TODO_STATUS_ERROR,
  data: data,
});

export const updateTodoStatus = (data) => {
  return (dispatch, getState) => {
    axios
      .put(`${BASE_URLS}/dashboard/updatetask`, data)
      .then((response) => {
        if (response && response.data) {
          dispatch(updateTodoStatusSuccess(response.data));
          toast.success("Todo status updated ..!");
          // dispatch(getTodoData(userInfo?.id));
        } else {
          dispatch(updateTodoStatusError("Something went wrong ..!"));
          toast.error("Something went wrong");
        }
      })
      .catch((error) => {
        dispatch(updateTodoStatusError(error));
        toast.error(error.message);
      });
  };
};

const getAllTasksSuccess = (data) => ({
  type: types.GET_ALL_TASKS_SUCCESS,
  data: data,
});

const getAllTasksError = (data) => ({
  type: types.GET_ALL_TASKS_ERROR,
  data: data,
});

export const getAllTasks = (userid) => {
  return (dispatch, getState) => {
    axios
      .get(`${BASE_URLS}/dashboard/getalltasks?userId=${userid}`)
      .then((response) => {
        if (response && response.data) {
          dispatch(getAllTasksSuccess(response.data));
        } else {
          dispatch(getAllTasksError("Something went wrong ..!"));
          toast.error("Something went wrong");
        }
      })
      .catch((error) => {
        dispatch(getAllTasksError(error));
        toast.error(error.message);
      });
  };
};
