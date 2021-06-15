import {
    globalConstants,
    pushNotificationAPI
} from "../../constants";
import { convertObjToFormData } from "../../helpers";

export const registerPushTokenToServer = (token, callback = {}) => {
    fetch(pushNotificationAPI.REGISTER_TOKEN, {
            ...globalConstants.POST_HEADER,
            body: convertObjToFormData({ token })
        })
        .then((response) => response.json())
        .then((json) => {
            if (callback.success) {
                callback.success();
            }
        })
        .catch((error) => {
            console.log(error);
        });
};