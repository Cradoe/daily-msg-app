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
    ATTRIBUTION: "www.daily-msg.com",
    IMAGE_DOWNLOAD_DIRECTORY: "DailyMSG",
    INITIAL_CATEGORY: { id: 1, slug: "advice", category: "Advice" },
    CATEGORIES: "categories"
};