import React from "react";
import { Text } from "@ui-kitten/components";
import { View, StyleSheet } from "react-native";
import { globalStyles } from "../../shared/globalStyles";
import Attribution from "../Atrribution";

const ItemCard = ({ quote, showAtrribute }) => {
  return (
    <View style={[globalStyles.bgBlack, styles.container]}>
      <View style={[globalStyles.quoteArea]}>
        <Text
          style={[
            globalStyles.textWhite,
            globalStyles.quoteText,
            globalStyles.textCenter,
            quote["quote"].length <= 80 ? { fontSize: 25 } : null,
            quote["quote"].length > 80 && quote["quote"].length <= 100
              ? { fontSize: 20 }
              : null
          ]}
        >
          {quote.quote}
        </Text>
        {quote.citation ? (
          <Text
            style={[
              globalStyles.textSecondary,
              globalStyles.textCenter,
              globalStyles.textBold,
              globalStyles.mt20
            ]}
          >
            - {quote.citation}            
          </Text>
        ) : null}
      </View>
      {showAtrribute ? <Attribution /> : null}
    </View>
  );
};

export default ItemCard;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 0,
    position: "relative",
    borderColor: "#fff",
    borderWidth: 1
  }
});
