import React, { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  Layout,
  Spinner,
  ViewPager
} from "@ui-kitten/components";
import Constants from "expo-constants";
import { SafeAreaView, ScrollView, View } from "react-native";
import { globalStyles } from "../../shared/globalStyles";
import ViewShot from "react-native-view-shot";
import ItemCard from "../../components/ItemCard";
import ActionWidgets from "../../components/ActionWidgets";
import {
  bookmarkQuote,
  captureAndSaveScreenshot,
  captureAndShareScreenshot,
  copyToClipboard,
  retrieveDataFromLocalStorage
} from "../../helpers";
import QuoteViewTitle from "../../components/QuoteViewTitle";
import { globalConstants } from "../../constants";
import ErrorMessage from "../../components/ErrorMessage";
import * as Network from "expo-network";
import { requestAllQuotes } from "../../actions";
import NoInternet from "../../components/NoInternet";
import { AppUpdateModal } from "../../components/Modals";
import { checkAppVersions } from "../../actions/AppVersions/checkAppVersions";


const androidAppUpdateDefaultState = {
  showDialog: false,
  link: null
},
  iosAppUpdateDefaultState = {
    showDialog: false,
    link: null
  };


const HomeScreen = ( { navigation } ) => {
  const [ loadedQuotes, setLoadedQuotes ] = useState( null ),
    [ loadedCategories, setLoadedCategories ] = useState( [] ),
    [ pagedCategoryIndex, setPagedCategoryIndex ] = React.useState( 0 ),
    [ showAtrribute, setShowAtrribute ] = useState( false ),
    [ currentQuote, setCurrentQuote ] = useState( null ),
    [ noInternetAccess, setNoInternetAccess ] = useState( true ),
    [ responseMessage, setResponseMessage ] = useState( null ),
    [ hasCheckedAppVersion, setHasCheckedAppVersion ] = useState( false ),
    [ androidAppVersion, setAndroidAppVersion ] = useState( androidAppUpdateDefaultState ),
    [ iosAppVersion, setIosAppVersion ] = useState( iosAppUpdateDefaultState ),
    shouldLoadPagedComponent = ( index ) => index === pagedCategoryIndex,
    viewShotRef = useRef( null ),
    dispatch = useDispatch(),
    ActionWidgetActions = {
      shareAsImage: () => {
        captureAndShareScreenshot( viewShotRef, setShowAtrribute );
      },
      downloadAsImage: () => {
        captureAndSaveScreenshot( viewShotRef, setShowAtrribute );
      },
      copyToClipboard: () => {
        copyToClipboard(
          `${currentQuote.quote} ${currentQuote.citation ? " - " + currentQuote.citation : ""
          }`
        );
      },
      bookmark: () => {
        dispatch( bookmarkQuote( currentQuote ) );
      }
    },
    loadCurrentQuote = ( category_slug ) => {
      setCurrentQuote( null );
      for ( let index = 0; index < loadedQuotes.length; index++ ) {
        const temp = loadedQuotes[ index ];
        if ( temp.category.slug === category_slug ) {
          setCurrentQuote( loadedQuotes[ index ] );
          break;
        }
      }
    },
    requestSuccessCallback = ( data ) => {
      setLoadedQuotes( data );
    },
    requestErrorCallback = ( error ) => {
      console.log( error );
    },
    requestCallback = {
      success: requestSuccessCallback,
      error: requestErrorCallback
    },
    fetchQuotesFromServer = async () => {
      await Network.getNetworkStateAsync()
        .then( ( networkStatus ) => {
          if ( networkStatus.isInternetReachable ) {
            if ( !noInternetAccess ) {
              setNoInternetAccess( true );
            }
            requestAllQuotes( requestCallback, true );
          } else {
            setNoInternetAccess( false );
          }
        } )
        .catch( ( error ) => {
          console.log( "Something went wrong", error );
        } );
    },
    extractCategories = () => {
      const categories = [];
      loadedQuotes.forEach( ( quote ) => {
        categories.push( quote.category );
      } );
      setLoadedCategories( categories );
    },
    checkRemoteAppVersion = async () => {
      const callbackFn = ( remoteVersion ) => {

        if ( Platform.OS === "android" && remoteVersion.android.version !== Constants.manifest.version ) {
          setTimeout( () => {
            setAndroidAppVersion( { link: remoteVersion.android.url, showDialog: true } );
          }, 1000 );
        } else if ( Platform.OS === "ios" && remoteVersion.ios.version !== Constants.manifest.version ) {
          setTimeout( () => {
            setIosAppVersion( { link: remoteVersion.ios.url, showDialog: true } );
          }, 1000 );
        }

        setHasCheckedAppVersion( true );
      }

      await Network.getNetworkStateAsync()
        .then( ( networkStatus ) => {
          if ( networkStatus.isInternetReachable ) {
            checkAppVersions( callbackFn );
          }
        } )
        .catch( ( error ) => {
          console.log( "Something went wrong", error );
        } );
    }

  useEffect( () => {
    const timer = setTimeout( () => {
      setResponseMessage( null );
    }, 10000 );
    return () => {
      clearTimeout( timer );
    };
  }, [ responseMessage ] );

  useEffect( () => {
    retrieveDataFromLocalStorage( "todayQuotes" )
      .then( ( todayQuotes ) => {
        if ( todayQuotes ) {
          setLoadedQuotes( todayQuotes );
        } else {
          fetchQuotesFromServer();
        }
      } )
      .catch( ( error ) => {
        console.log( "Something went wrong", error );
      } );
  }, [] );

  useEffect( () => {
    if ( loadedQuotes ) {
      extractCategories();
    }
  }, [ loadedQuotes ] );

  useEffect( () => {
    if ( !hasCheckedAppVersion ) {
      //check app version from server
      checkRemoteAppVersion();
    }
  }, [ hasCheckedAppVersion ] );

  const categoryPagerList =
    loadedQuotes && loadedQuotes.length > 0
      ? loadedQuotes.map( ( quote, index ) => {
        return (
          <ScrollView
            key={index}>

            {androidAppVersion.showDialog ? <AppUpdateModal dialog={androidAppVersion} setDialog={setAndroidAppVersion} /> : null}

            {iosAppVersion.showDialog ? <AppUpdateModal dialog={iosAppVersion} setDialog={setIosAppVersion} /> : null}

            <View
              style={{
                minHeight: ( 70 / 100 ) * globalConstants.SCREEN_HEIGHT
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
                    { height: ( 60 / 100 ) * globalConstants.SCREEN_HEIGHT }
                  ]}
                >
                  <Spinner />
                </View>
              )}
            </View>
          </ScrollView>
        );
      } )
      : [];
  return (
    <SafeAreaView style={[ globalStyles.root, globalStyles.bgBlack ]}>

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
            onSelect={( index ) => setPagedCategoryIndex( index )}
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

export default HomeScreen;
