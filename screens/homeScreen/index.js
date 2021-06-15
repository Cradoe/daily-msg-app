import React, { useState, useRef, useEffect } from "react";
import {
  Layout,
  Spinner,
  ViewPager,
  Text,
  Button
} from "@ui-kitten/components";
import { SafeAreaView, View } from "react-native";
import { globalStyles } from "../../shared/globalStyles";
import ViewShot from "react-native-view-shot";
import ItemCard from "../../components/ItemCard";
import ActionWidgets from "../../components/ActionWidgets";
import {
  bookmarkQuote,
  captureAndSaveScreenshot,
  captureAndShareScreenshot,
  copyToClipboard
} from "../../helpers/global";
import QuoteViewTitle from "../../components/QuoteViewTitle";
import { globalConstants } from "../../constants";
import ErrorMessage from "../../components/ErrorMessage";
import { retrieveDataFromLocalStorage } from "../../helpers";
import * as Network from "expo-network";
import { requestAllQuotes } from "../../actions";
import NoInternet from "../../components/NoInternet";

const SingleView = ({ navigation }) => {
  const [loadedQuotes, setLoadedQuotes] = useState(null),
    [loadedCategories, setLoadedCategories] = useState([]),
    [pagedCategoryIndex, setPagedCategoryIndex] = React.useState(0),
    [showAtrribute, setShowAtrribute] = useState(false),
    [currentQuote, setCurrentQuote] = useState(null),
    [noInternetAccess, setNoInternetAccess] = useState(true),
    [responseMessage, setResponseMessage] = useState(null),
    shouldLoadPagedComponent = (index) => index === pagedCategoryIndex,
    viewShotRef = useRef(null),
    ActionWidgetActions = {
      shareAsImage: () => {
        captureAndShareScreenshot(viewShotRef, setShowAtrribute);
      },
      downloadAsImage: () => {
        captureAndSaveScreenshot(viewShotRef, setShowAtrribute);
      },
      copyToClipboard: () => {
        copyToClipboard(
          `${currentQuote.quote} ${
            currentQuote.citation ? " - " + currentQuote.citation : ""
          }`
        );
      },
      bookmark: () => {
        bookmarkQuote(currentQuote);
      }
    },
    loadCurrentQuote = (category_slug) => {
      setCurrentQuote(null);
      for (let index = 0; index < loadedQuotes.length; index++) {
        const temp = loadedQuotes[index];
        if (temp.category.slug === category_slug) {
          setCurrentQuote(loadedQuotes[index]);
          break;
        }
      }
    },
    requestSuccessCallback = (data) => {
      setLoadedQuotes(data);
    },
    requestErrorCallback = (error) => {
      console.log(error);
    },
    requestCallback = {
      success: requestSuccessCallback,
      error: requestErrorCallback
    },
    fetchQuotesFromServer = async () => {
      await Network.getNetworkStateAsync()
        .then((networkStatus) => {
          if (networkStatus.isInternetReachable) {
            if (!noInternetAccess) {
              setNoInternetAccess(true);
            }
            requestAllQuotes(requestCallback, true);
          } else {
            setNoInternetAccess(false);
          }
        })
        .catch((error) => {
          console.log("Something went wrong", error);
        });
    },
    extractCategories = () => {
      const categories = [];
      loadedQuotes.forEach((quote) => {
        categories.push(quote.category);
      });
      setLoadedCategories(categories);
    };

  useEffect(() => {
    const timer = setTimeout(() => {
      setResponseMessage(null);
    }, 10000);
    return () => {
      clearTimeout(timer);
    };
  }, [responseMessage]);

  useEffect(() => {
    retrieveDataFromLocalStorage("todayQuotes")
      .then((todayQuotes) => {
        if (todayQuotes) {
          setLoadedQuotes(todayQuotes);
        } else {
          fetchQuotesFromServer();
        }
      })
      .catch((error) => {
        console.log("Something went wrong", error);
      });
  }, []);

  useEffect(() => {
    if (loadedQuotes) {
      extractCategories();
    }
  }, [loadedQuotes]);

  const categoryPagerList =
    loadedQuotes && loadedQuotes.length > 0
      ? loadedQuotes.map((quote, index) => {
          return (
            <View
              key={index}
              style={{
                minHeight: (70 / 100) * globalConstants.SCREEN_HEIGHT
              }}
            >
              {currentQuote ? (
                <>
                  <ActionWidgets action={ActionWidgetActions} />
                  <ViewShot
                    style={[
                      globalStyles.containerPadding,
                      { paddingBottom: 50 }
                    ]}
                    ref={viewShotRef}
                    options={{ format: "png", quality: 1 }}
                  >
                    <ItemCard
                      quote={currentQuote}
                      showAtrribute={showAtrribute}
                    />
                  </ViewShot>
                </>
              ) : (
                <View
                  style={[
                    globalStyles.centerCenter,
                    { height: (60 / 100) * globalConstants.SCREEN_HEIGHT }
                  ]}
                >
                  <Spinner />
                </View>
              )}
            </View>
          );
        })
      : [];
  return (
    <SafeAreaView style={[globalStyles.root, globalStyles.bgBlack]}>
      <Layout
        style={[
          globalStyles.bgBlack,
          globalStyles.root,
          { position: "relative" }
        ]}
      >
        {loadedCategories.length > 0 ? (
          <QuoteViewTitle
            categories={loadedCategories}
            onSelect={loadCurrentQuote}
            onSwipe={pagedCategoryIndex}
          />
        ) : null}
        {categoryPagerList.length > 0 ? (
          <ViewPager
            selectedIndex={pagedCategoryIndex}
            shouldLoadComponent={shouldLoadPagedComponent}
            onSelect={(index) => setPagedCategoryIndex(index)}
          >
            {categoryPagerList}
          </ViewPager>
        ) : null}

        {responseMessage ? <ErrorMessage message={responseMessage} /> : null}
        {noInternetAccess ? (
          <NoInternet retryAction={fetchQuotesFromServer} />
        ) : null}
      </Layout>
    </SafeAreaView>
  );
};

export default SingleView;
