import { Dimensions } from "react-native";

export const globalConstants = {
  PRIMARY_COLOR: "#0066ff",
  SECONDARY_COLOR: "#FFC107",
  SCREEN_BG: "#fff",
  SCREEN_HEIGHT: Dimensions.get("screen").height,
  SCREEN_WIDTH: Dimensions.get("screen").width,
  POST_HEADER: {
    method: "POST"
  },
  GET_HEADER: {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  },
  ATTRIBUTION: "Daily Bread",
  IMAGE_DOWNLOAD_DIRECTORY: "Daily Bread",
  INITIAL_CATEGORY: { id: 1, slug: "advice", category: "Advice" },
  CATEGORIES: "categories"
};

export const convertObjToFormData = (object) => {
  const formData = new FormData();
  for (const key in object) {
    if (Object.hasOwnProperty.call(object, key)) {
      formData.append(key, object[key]);
    }
  }
  return formData;
};
