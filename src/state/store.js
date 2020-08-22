import thunkMiddleware from "redux-thunk";
import { createLogger } from "redux-logger";
import { createStore, applyMiddleware } from "redux";
import apiMiddleware from "./apiMiddleware";
import reducer from "./reducers";

const store = createStore(
  reducer,
  applyMiddleware(apiMiddleware, thunkMiddleware, createLogger())
);
export default store;
