const API_HOST = "http://192.168.43.148/project2021/api.botsurance.ng/advice";

export const quotesAPI = {
  TODAY_QUOTES: () => {
    return `${API_HOST}/quotes/today`;
  },
  TODAY_QUOTE: (category_slug) => {
    return `${API_HOST}/quotes/request/${category_slug}`;
  }
};

export const categoriesAPI = {
  FETCH_ALL: `${API_HOST}/categories`
};

export const pushNotificationAPI = {
  REGISTER_TOKEN: `${API_HOST}/notifications/token/register`
};
