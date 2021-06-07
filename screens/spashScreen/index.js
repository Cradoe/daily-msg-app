import React, { useState, useEffect, useRef } from "react";
import Constants from "expo-constants";
import * as Network from "expo-network";
import * as Notifications from "expo-notifications";
import { Layout, Text, Button, Icon } from "@ui-kitten/components";
import {
  StyleSheet,
  View,
  SafeAreaView,
  Image,
  Platform,
  Alert
} from "react-native";
import { globalStyles } from "../../shared/globalStyles";
import { globalConstants } from "../../constants";
import { appIcon } from "../../shared/generalAssets";
import NoInternet from "../../components/NoInternet";
import { requestAllQuotes, registerPushTokenToServer } from "../../actions";
import { retrieveDataFromLocalStorage } from "../../helpers";

const StarIcon = (props) => <Icon {...props} name="arrowhead-right-outline" />;

const SplashScreen = ({ navigation }) => {
  const responseListener = useRef(),
    [internetIsReachable, setInternetIsReachable] = useState(true),
    [hasFetchedQuotes, setHasFetchedQuotes] = useState(false),
    [hasSavedPushToken, setHasSavedPushToken] = useState(false),
    [ctaButtonText, setCtaButtonText] = useState("Continue"),
    handleCtaPress = () => {
      if (hasFetchedQuotes) {
        navigation.navigate("HomeScreen");
      } else {
        setCtaButtonText("Please Wait");
        setTimeout(() => {
          if (!hasFetchedQuotes) {
            fetchQuotesFromServer();
            setCtaButtonText("Continue");
          }
        }, 5000);
      }
    },
    successCallback = () => {
      setHasFetchedQuotes(true);
    },
    errorCallback = (error) => {
      console.log(error);
    },
    callback = {
      success: successCallback,
      error: errorCallback
    },
    fetchQuotesFromServer = async () => {
      await retrieveDataFromLocalStorage("todayQuotes")
        .then(async (todayQuotes) => {
          if (todayQuotes) {
            setHasFetchedQuotes(true);
          } else {
            await Network.getNetworkStateAsync()
              .then((networkStatus) => {
                if (networkStatus.isInternetReachable) {
                  if (!internetIsReachable) {
                    setInternetIsReachable(true);
                  }
                  requestAllQuotes(callback);
                } else {
                  setInternetIsReachable(false);
                }
              })
              .catch((error) => {
                console.log("Something went wrong", error);
              });
          }
        })
        .catch((error) => {
          console.log("Something went wrong", error);
        });
    },
    registerNotifiationTokenToServer = (token) => {
      const callback = {
        success: () => {
          setHasSavedPushToken(true);
        }
      };
      registerPushTokenToServer(token, callback);
    },
    registerForPushNotificationsAsync = async () => {
      let token;
      if (Constants.isDevice) {
        const {
          status: existingStatus
        } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== "granted") {
          const { status } = await Notifications.requestPermissionsAsync();
          finalStatus = status;
        }
        if (finalStatus !== "granted") {
          Alert.alert("Failed to get push token for push notification!");
          return;
        }
        token = (await Notifications.getExpoPushTokenAsync()).data;
      } else {
        Alert.alert("Must use physical device for Push Notifications");
      }

      if (Platform.OS === "android") {
        Notifications.setNotificationChannelAsync("default", {
          name: "default",
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: "#FF231F7C"
        });
      }

      return token;
    };

  useEffect(() => {
    fetchQuotesFromServer();
  }, []);

  useEffect(() => {
    if (internetIsReachable) {
      // push Notification
      registerForPushNotificationsAsync().then((token) => {
        registerNotifiationTokenToServer(token);
      });

      responseListener.current = Notifications.addNotificationResponseReceivedListener(
        () => {
          navigation.navigate("HomeScreen");
        }
      );

      return () => {
        Notifications.removeNotificationSubscription(responseListener.current);
      };
    }
  }, [internetIsReachable]);

  return (
    <SafeAreaView
      style={[
        globalStyles.root,
        {
          height: globalConstants.SCREEN_HEIGHT
        }
      ]}
    >
      <Layout
        style={[
          globalStyles.centerCenter,
          globalStyles.bgBlack,
          globalStyles.root,
          { position: "relative" }
        ]}
      >
        {internetIsReachable ? (
          <>
            <Image source={appIcon} style={styles.logo} />
            <Text
              style={[
                globalStyles.fontAltBold,
                globalStyles.textSmall,
                globalStyles.textWhite,
                globalStyles.textCenter
              ]}
            >
              Daily Banga
            </Text>
            <View style={styles.cta}>
              <Button
                onPress={handleCtaPress}
                accessoryRight={StarIcon}
                size="tiny"
                style={[
                  globalStyles.mt30,
                  globalStyles.bgPrimary,
                  globalStyles.noBorder
                ]}
              >
                {ctaButtonText}
              </Button>
            </View>
          </>
        ) : (
          <NoInternet retryAction={fetchQuotesFromServer} />
        )}
      </Layout>
    </SafeAreaView>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  logo: {
    height: 50,
    width: 50,
    marginBottom: 10
  },
  cta: {
    position: "absolute",
    bottom: (10 / 100) * globalConstants.SCREEN_HEIGHT
  }
});
