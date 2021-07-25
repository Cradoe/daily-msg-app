import React, { useState, useEffect } from "react";
import { Layout, Spinner, Text } from "@ui-kitten/components";
import { connect } from "react-redux";
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Image,
  Alert
} from "react-native";
import { globalStyles } from "../../shared/globalStyles";
import { retrieveDataFromLocalStorage } from "../../helpers";
import BookmarkItem from "../../components/BookmarkItem";
import { error404Image } from "../../shared/generalAssets";

const BookmarkScreen = ( { bookmarkFromState } ) => {
  const [ bookmark, setBookmark ] = useState( [] ),
    [ hasFetchedBookmark, setHasFetchedBookmark ] = useState( false ),
    fetchUserBookmarkQuotes = async () => {
      await retrieveDataFromLocalStorage( "bookmark" )
        .then( ( bookmark ) => {
          setHasFetchedBookmark( true );
          if ( bookmark ) {
            const reversedList = bookmark.reverse();
            setBookmark( reversedList );
          }
        } )
        .catch( ( error ) => {
          Alert.alert( "Something went wrong", error );
          console.log( "Something went wrong", error );
        } );
    },
    bookmarkQuotes =
      bookmark.length > 0
        ? bookmark.map( ( quote, index ) => (
          <BookmarkItem quote={quote} key={index} />
        ) )
        : [];

  useEffect( () => {
    if ( Array.isArray( bookmarkFromState ) && bookmarkFromState.length > 0 ) {
      setHasFetchedBookmark( true );
      const reversedList = bookmarkFromState.reverse();
      setBookmark( reversedList );
    } else {
      fetchUserBookmarkQuotes();
    }
  }, [ bookmarkFromState ] );

  return (
    <SafeAreaView style={[ { flex: 1 }, globalStyles.bgBlack ]}>
      <Layout style={[ globalStyles.bgBlack, globalStyles.root ]}>
        {hasFetchedBookmark ? (
          bookmark.length > 0 ? (
            <ScrollView>{bookmarkQuotes}</ScrollView>
          ) : (
            <View style={[ globalStyles.root, globalStyles.centerCenter ]}>
              <Image source={error404Image} style={styles.error404Image} />
              <Text style={[ globalStyles.textWhite, globalStyles.fontMedium ]}>
                No Bookmark Added
              </Text>
            </View>
          )
        ) : (
          <View style={[ globalStyles.root, globalStyles.centerCenter ]}>
            <Spinner />
          </View>
        )}
      </Layout>
    </SafeAreaView>
  );
};


const mapStateToProps = ( state ) => {
  return {
    bookmarkFromState: state.bookmark
  };
};


const LinkedBookmarkScreen = connect( mapStateToProps )( BookmarkScreen );
export default LinkedBookmarkScreen;


const styles = StyleSheet.create( {
  error404Image: {
    width: 300,
    height: 200
  }
} );
