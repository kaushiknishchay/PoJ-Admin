import {applyMiddleware, createStore} from "redux";
import thunkMiddleware from "redux-thunk";
// import { createLogger } from 'redux-logger';
import rootReducer from "../_reducers/index";

// const loggerMiddleware = createLogger();

export const store = createStore(
		rootReducer,
		applyMiddleware(
				thunkMiddleware,
				// loggerMiddleware
		)
);