import { combineReducers } from "redux";
import todoReducer from "./todo";
import usersReducer from "./users";

const store = combineReducers({
  todoReducer,
  usersReducer,
});

export default store;
