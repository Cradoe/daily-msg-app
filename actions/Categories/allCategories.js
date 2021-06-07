import { categoriesAPI, globalConstants } from "../../constants";
import {
  catchApiRequestError,
  handleApiResponseError,
  saveDataToLocalStorage
} from "../../helpers";

export const fetchAllCategories = (callback = {}) => {
  fetch(categoriesAPI.FETCH_ALL, {
    ...globalConstants.GET_HEADER
  })
    .then((response) => response.json())
    .then((json) => {
      const { status, data, status_code } = json;
      if (status === true && status_code === 200) {
        saveDataToLocalStorage(
          {
            title: globalConstants.CATEGORIES,
            data
          },
          0,
          false
        );
        if (callback.success) {
          return callback.success(data);
        }
      } else {
        callback.error(handleApiResponseError(json));
      }
    })
    .catch((error) => {
      callback.error(catchApiRequestError(error));
    });
};
