import { bookmarkConstants } from "../constants";
import { bookmarkInitialState } from "./initialState";
export const bookmarkReducer = ( state = bookmarkInitialState, action ) => {
    switch ( action.type ) {
        case bookmarkConstants.UPDATE_BOOKMARK_STATE:
            return action.payload

        default:
            return state;
    }
};