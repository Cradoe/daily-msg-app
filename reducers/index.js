import { combineReducers } from "redux";
import { bookmarkReducer } from "./bookmark";

export const rootReducer = combineReducers( {
  bookmark: bookmarkReducer
} );
