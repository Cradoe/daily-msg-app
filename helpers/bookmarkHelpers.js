
import { bookmarkConstants } from "../constants";
import {
    modifyLocalStorage,
    retrieveDataFromLocalStorage,
    saveDataToLocalStorage
} from "./storageHelpers";

const updateBookmarkState = ( payload = {} ) => {
    return {
        type: bookmarkConstants.UPDATE_BOOKMARK_STATE,
        payload
    };
};

export const bookmarkQuote = ( quote ) => {
    return ( dispatch ) => {

        var response = retrieveDataFromLocalStorage( "bookmark" );
        response.then( ( bookmark ) => {
            if ( Array.isArray( bookmark ) && bookmark.length > 0 ) {
                if ( !bookmark.some( ( item ) => item.id === quote.id ) ) {
                    let newState = bookmark;
                    newState.push( quote );
                    dispatch( updateBookmarkState( newState ) );
                    modifyLocalStorage( {
                        title: "bookmark",
                        data: quote
                    },
                        0,
                        false
                    );
                }
            } else {
                bookmark = [];
                bookmark[ 0 ] = quote;
                dispatch( updateBookmarkState( bookmark ) );
                saveDataToLocalStorage( {
                    title: "bookmark",
                    data: bookmark
                },
                    0,
                    false
                );
            }

        } );
    }

};
export const removeBookmarkedQuote = ( quote ) => {
    return ( dispatch ) => {
        var response = retrieveDataFromLocalStorage( "bookmark" );
        response.then( ( bookmark ) => {
            if ( Array.isArray( bookmark ) && bookmark.length > 0 ) {
                const newBookmark = bookmark.filter( ( item ) => item.id !== quote.id );
                dispatch( updateBookmarkState( newBookmark ) );
                saveDataToLocalStorage( {
                    title: "bookmark",
                    data: newBookmark
                },
                    0,
                    false
                );
            }
        } );
    };
};