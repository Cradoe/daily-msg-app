import { globalConstants, quotesAPI } from "../../constants";
import {
  catchApiRequestError,
  handleApiResponseError,
  saveDataToLocalStorage
} from "../../helpers";

const calculateRemainingTimeBeforeMidnight = () => {
  let nextMidnight = new Date();
  nextMidnight.setHours(24, 0, 0, 0);

  let now = new Date();

  let remainingTimeInSeconds = (nextMidnight.getTime() - now.getTime()) / 1000;
  return remainingTimeInSeconds;
};

export const requestAllQuotes = (callback = {}, returnResponse = false) => {
  return fetch(quotesAPI.TODAY_QUOTES(), {
    ...globalConstants.GET_HEADER
  })
    .then((response) => response.json())
    .then((json) => {
      const { status, data, status_code } = json;
      if (status === true && status_code === 200) {
        if (callback.success) {
          const timeout = calculateRemainingTimeBeforeMidnight();
          saveDataToLocalStorage(
            {
              title: "todayQuotes",
              data
            },
            timeout
          );
          return callback.success(returnResponse ? data : null);
        }
      } else {
        callback.error(handleApiResponseError(json));
      }
    })
    .catch((error) => {
      callback.error(catchApiRequestError(error));
    });
};
