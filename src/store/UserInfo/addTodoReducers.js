import * as types from "./actionTypes";
const initialState = {
  todoData: [],
  addTodoDataError: "",
  getTodoDataError: "",
  boardData: [],
  getBoardError: "",
  addBoarError: "",
  isCreatedBoard: false,
  updateTodoStatusError: "",
  getAllTasksData: [],
  getAllTasksError: "",
};

const AddToDoReducers = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_TODO_SUCCESS:
      return {
        ...state,
        todoData: action.data,
      };

    case types.GET_TODO_ERROR:
      return {
        ...state,
        getTodoDataError: action.error,
      };

    case types.GET_TODO_USING_BOARD_ID_SUCCESS:
      return {
        ...state,
        todoData: action.data,
      };

    case types.GET_TODO_USING_BOARD_ID_ERROR:
      return {
        ...state,
        getTodoDataError: action.error,
      };

    case types.ADD_TODO_SUCCESS:
      const addedData = action.data;
      const newData = state.todoData;
      newData.push(addedData);
      return {
        ...state,
        todoData: newData,
      };

    case types.ADD_TODO_ERROR:
      return {
        ...state,
        addTodoDataError: action.error,
      };

    case types.UPDATE_TODO_STATUS_SUCCESS:
      return {
        ...state,
      };

    case types.UPDATE_TODO_STATUS_ERROR:
      return {
        ...state,
        updateTodoStatusError: action.error,
      };

    case types.GET_BOARD_NAME_SUCCESS:
      return {
        ...state,
        boardData: action.data,
      };

    case types.GET_BOARD_NAME_ERROR:
      return {
        ...state,
        getBoardError: action.error,
      };

    case types.ADD_BOARD_NAME_SUCCESS:
      return {
        ...state,
        isCreatedBoard: true,
      };

    case types.ADD_BOARD_NAME_ERROR:
      return {
        ...state,
        addBoarError: action.error,
        isCreatedBoard: false,
      };

    case types.GET_ALL_TASKS_SUCCESS:
      return {
        ...state,
        getAllTasksData: action.data,
      };

    case types.GET_ALL_TASKS_ERROR:
      return {
        ...state,
        getAllTasksError: action.error,
      };

    default:
      return state;
  }
};

export default AddToDoReducers;
