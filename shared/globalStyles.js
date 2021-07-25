import { StyleSheet } from "react-native";
import { globalConstants } from "../constants/global";

export const globalStyles = StyleSheet.create( {
    root: {
        flex: 1
    },
    bgPrimary: {
        backgroundColor: globalConstants.PRIMARY_COLOR
    },
    bgSecondary: {
        backgroundColor: globalConstants.SECONDARY_COLOR
    },
    bgBlack: {
        backgroundColor: "#000"
    },
    bgWhite: {
        backgroundColor: "#fff"
    },
    bgLight: {
        backgroundColor: "#F5F5F5"
    },
    borderPrimary: {
        borderColor: globalConstants.PRIMARY_COLOR
    },
    borderSecondary: {
        borderColor: globalConstants.SECONDARY_COLOR
    },
    textPrimary: {
        color: globalConstants.PRIMARY_COLOR
    },
    textSecondary: {
        color: globalConstants.SECONDARY_COLOR
    },
    textDanger: {
        color: "#FF0000"
    },
    textSuccess: {
        color: "#009631"
    },
    textGray: {
        color: "#3a3a3a"
    },
    bgTransparent: {
        backgroundColor: "transparent"
    },
    textWhite: {
        color: "#fff"
    },
    textJustify: {
        textAlign: "justify"
    },
    textCenter: {
        textAlign: "center"
    },
    textBold: {
        fontWeight: "bold"
    },
    justifyCenter: {
        justifyContent: "center"
    },
    flexCenterCenter: {
        justifyContent: "center",
        alignItems: "center"
    },
    justifySpaceAround: {
        justifyContent: "space-around"
    },
    justifySpaceBetween: {
        justifyContent: "space-between"
    },
    alignCenter: {
        alignItems: "center"
    },
    centerCenter: {
        justifyContent: "center",
        alignItems: "center"
    },
    flexRow: {
        flexDirection: "row"
    },
    flex: {
        flex: 1
    },
    widthBlock: {
        width: "100%"
    },
    containerPadding: {
        paddingHorizontal: 20
    },
    fullHeight: {
        height: "100%"
    },
    mb10: {
        marginBottom: 10
    },
    mb20: {
        marginBottom: 20
    },
    m40: {
        margin: 40
    },
    mt40: {
        marginTop: 40
    },
    mt20: {
        marginTop: 20
    },
    mt30: {
        marginTop: 30
    },
    mt90: {
        marginTop: 90
    },
    pH40: {
        paddingHorizontal: 40
    },
    fontRegular: {
        fontFamily: "montserrat_regular"
    },
    fontMedium: {
        fontFamily: "montserrat_medium"
    },
    bgDanger: {
        backgroundColor: "#ff0000"
    },
    textDark: {
        color: "#000000"
    },
    screenBg: {
        backgroundColor: globalConstants.SCREEN_BG
    },
    shadowBox: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5
    },
    quoteArea: {
        padding: 25,
        paddingBottom: 40
    },
    widgetIcon: {
        width: 25,
        height: 25
    },
    widgetHMargin: {
        marginHorizontal: 5
    },
    quoteText: {
        fontWeight: "bold",
        lineHeight: 25,
        fontFamily: "montserrat_regular",
    },
    textSmall: {
        fontSize: 11
    }
} );