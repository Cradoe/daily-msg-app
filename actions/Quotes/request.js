import { globalConstants, quotesAPI } from "../../constants";
import { catchApiRequestError, handleApiResponseError } from "../../helpers";

export const requestQuote = (category_slug, callback = {}) => {
  return fetch(quotesAPI.TODAY_QUOTE(category_slug), {
    ...globalConstants.GET_HEADER
  })
    .then((response) => response.json())
    .then((json) => {
      const { status, data, status_code } = json;
      if (status === true && status_code === 200) {
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
