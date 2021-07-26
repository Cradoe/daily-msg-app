import { Alert } from "react-native";
import {
    appVersionAPI,
    globalConstants
} from "../../constants";

export const checkAppVersions = ( callbackFn ) => {
    fetch( appVersionAPI.CHECK_VERSIONS, {
        ...globalConstants.GET_HEADER
    } )
        .then( ( response ) => response.json() )
        .then( ( json ) => {
            const { status, data, status_code } = json;
            if ( status === true && status_code === 200 ) {
                if ( callbackFn ) {
                    callbackFn( data );
                }
            } else {
                Alert.alert( "Opps! Something went wrong, please close the app and re-launch." );
            }

        } )
        .catch( ( error ) => {
            console.log( error );
            Alert.alert( "Opps! Something went wrong, please close the app and re-launch." );
        } );
};