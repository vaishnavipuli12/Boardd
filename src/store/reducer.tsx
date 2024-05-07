//@ts-nocheck
import { combineReducers } from 'redux';

import UserInfoReducer from './UserInfo';
import AddToDoReducers from './UserInfo/addTodoReducers'

export default combineReducers({
    UserInfoReducer,
    AddToDoReducers
})
