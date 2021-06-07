import React, { useState, useRef, useEffect } from "react";
import { Layout, Spinner, ViewPager, Text } from "@ui-kitten/components";
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
import { requestQuote } from "../../actions";
import QuoteViewTitle from "../../components/QuoteViewTitle";
import { globalConstants } from "../../constants";
import * as Network from "expo-network";
import NoInternet from "../../components/NoInternet";
import ErrorMessage from "../../components/ErrorMessage";

const SingleView = ({ navigation }) => {
  const [quote, setQuote] = useState(null),
    [pagedCategoryIndex, setPagedCategoryIndex] = React.useState(0),
    [internetIsReachable, setInternetIsReachable] = useState(true),
    [showAtrribute, setShowAtrribute] = useState(false),
    [isFetchingQuote, setisFetchingQuote] = useState(false),
    [selectedCategorySlug, setSelectedCategorySlug] = useState(
      globalConstants.INITIAL_CATEGORY.slug
    ),
    [loadedCategories, setLoadedCategories] = useState([]),
    [responseMessage, setResponseMessage] = useState(null),
    viewShotRef = useRef(null),
    ActionWidgetActions = {
      shareAsImage: () => {
        captureAndShareScreenshot(viewShotRef, setShowAtrribute);
      },
      downloadAsImage: () => {
        captureAndSaveScreenshot(viewShotRef, setShowAtrribute);
      },
      copyToClipboard: () => {
        copyToClipboard(quote.quote);
      },
      bookmark: () => {
        bookmarkQuote(quote);
      }
    },
    successCallback = (data) => {
      setQuote(data);
      setisFetchingQuote(false);
    },
    errorCallback = (error) => {
      console.log(error);
      setResponseMessage(error);
    },
    callback = {
      success: successCallback,
      error: errorCallback
    },
    fetchQuoteFromServer = async (category_slug) => {
      setisFetchingQuote(true);
      setSelectedCategorySlug(category_slug);
      await Network.getNetworkStateAsync().then((networkStatus) => {
        if (networkStatus.isInternetReachable) {
          requestQuote(category_slug, callback);
          if (!internetIsReachable) {
            setInternetIsReachable(true);
          }
        } else {
          setInternetIsReachable(false);
        }
      });
    };
  useEffect(() => {
    const timer = setTimeout(() => {
      setResponseMessage(null);
    }, 10000);
    return () => {
      clearTimeout(timer);
    };
  }, [responseMessage]);
  const categoriesPager =
    loadedCategories.length > 0
      ? loadedCategories.map((category, index) => (
          <View key={index}>
            {internetIsReachable ? (
              quote && !isFetchingQuote ? (
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
                    <ItemCard quote={quote} showAtrribute={showAtrribute} />
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
              )
            ) : (
              <NoInternet
                retryAction={() => fetchQuoteFromServer(selectedCategorySlug)}
              />
            )}
          </View>
        ))
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
        <>
          <QuoteViewTitle
            categories={loadedCategories}
            setLoadedCategories={setLoadedCategories}
            onSelect={fetchQuoteFromServer}
            onSwipe={loadedCategories[pagedCategoryIndex]}
          />
          <ViewPager
            selectedIndex={pagedCategoryIndex}
            onSelect={(index) => setPagedCategoryIndex(index)}
          >
            {categoriesPager}
          </ViewPager>
          {responseMessage ? <ErrorMessage message={responseMessage} /> : null}
        </>
      </Layout>
    </SafeAreaView>
  );
};

export default SingleView;
