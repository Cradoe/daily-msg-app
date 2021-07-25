import { Alert, PermissionsAndroid, Platform } from "react-native";
import * as Sharing from "expo-sharing";
import Clipboard from "expo-clipboard";
import * as MediaLibrary from "expo-media-library";
import * as FileSystem from "expo-file-system";
import { globalConstants } from "../constants";

const processsingFunc = () => {
    //default placeholder function
},
    captureDelay = 100;

export const hasAndroidPermission = async () => {
    const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;

    const hasPermission = await PermissionsAndroid.check( permission );
    const mediaPermission = await MediaLibrary.getPermissionsAsync();

    if ( hasPermission && mediaPermission.granted ) {
        return true;
    }

    const mediaStatus = MediaLibrary.requestPermissionsAsync();

    const status = await PermissionsAndroid.request( permission );
    return status === "granted" && mediaStatus.status === "granted";
};

export const savePicture = async ( localUri ) => {
    if ( Platform.OS === "android" && !( await hasAndroidPermission() ) ) {
        Alert.alert( "Grant permission and click on download button again." );
        return;
    }
    const timeStamp = new Date().getTime(),
        newFileName = `${FileSystem.documentDirectory}${timeStamp}.png`;

    FileSystem.copyAsync( { from: localUri, to: newFileName } )
        .then( async () => {
            const asset = await MediaLibrary.createAssetAsync( newFileName );
            const DCIM_id = asset.albumId;
            await MediaLibrary.createAlbumAsync(
                globalConstants.IMAGE_DOWNLOAD_DIRECTORY,
                asset,
                false
            );
            await MediaLibrary.removeAssetsFromAlbumAsync( [ asset ], DCIM_id );
        } )
        .catch( ( err ) => {
            console.log( err );
        } );
};
export const openShareDialogAsync = async ( localUrl ) => {
    if ( !( await Sharing.isAvailableAsync() ) ) {
        Alert.alert( "Your device does not allow sharing" );
        return;
    }
    await Sharing.shareAsync( localUrl );
};
export const captureAndShareScreenshot = (
    targetRef,
    processsing = processsingFunc
) => {
    processsing( true );
    setTimeout( () => {
        targetRef.current
            .capture()
            .then( ( uri ) => {
                openShareDialogAsync( uri );
                processsing( false );
            } )
            .catch( ( err ) => {
                err && console.log( err );
                processsing( false );
            } );
    }, captureDelay );
};
export const captureAndSaveScreenshot = (
    targetRef,
    processsing = processsingFunc
) => {
    processsing( true );

    setTimeout( () => {
        targetRef.current
            .capture()
            .then( ( uri ) => {
                savePicture( uri );
                processsing( false );
            } )
            .catch( ( err ) => {
                err && console.log( err );
                processsing( false );
            } );
    }, captureDelay );
};

export const copyToClipboard = ( text ) => {
    Clipboard.setString( text );
};

export const convertObjToFormData = ( object ) => {
    const formData = new FormData();
    for ( const key in object ) {
        if ( Object.hasOwnProperty.call( object, key ) ) {
            formData.append( key, object[ key ] );
        }
    }
    return formData;
};