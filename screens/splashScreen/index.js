import React, { useState, useEffect, useRef } from "react";
import { CommonActions } from "@react-navigation/native";
import Constants from "expo-constants";
import * as Network from "expo-network";
import * as Notifications from "expo-notifications";
import { Layout, Spinner } from "@ui-kitten/components";
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
import { secondaryLogo } from "../../shared/generalAssets";
import NoInternet from "../../components/NoInternet";
import { requestAllQuotes, registerPushTokenToServer } from "../../actions";
import { retrieveDataFromLocalStorage } from "../../helpers";

const SplashScreen = ({ navigation }) => {
  const responseListener = useRef(),
    [internetIsReachable, setInternetIsReachable] = useState(true),
    [hasFetchedQuotes, setHasFetchedQuotes] = useState(false),
    [hasSavedPushToken, setHasSavedPushToken] = useState(false),
    successCallback = () => {
      Alert.alert("good");
      setHasFetchedQuotes(true);
    },
    errorCallback = (error) => {
      Alert.alert(error);
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
    if (hasFetchedQuotes) {
      navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [{ name: "WelcomeScreen" }]
        })
      );
    }
  }, [hasFetchedQuotes]);

   useEffect(() => {
    if (internetIsReachable && !hasSavedPushToken) {
       //push Notification
       registerForPushNotificationsAsync().then((token) => {
         registerNotifiationTokenToServer(token);
       });

       responseListener.current = Notifications.addNotificationResponseReceivedListener(
         () => {
           navigation.dispatch(
             CommonActions.reset({
               index: 1,
               routes: [{ name: "WelcomeScreen" }]
             })
           );
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
            <Image source={secondaryLogo} style={styles.logo} />

            <View style={styles.cta}>
              <Spinner status="basic" size="medium" />
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
    height: 150,
    width: 150,
    marginBottom: 10
  },
  cta: {
    position: "absolute",
    bottom: (10 / 100) * globalConstants.SCREEN_HEIGHT
  }
});
