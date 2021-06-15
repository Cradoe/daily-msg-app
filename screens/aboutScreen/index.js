import React from "react";
import { Text, Layout, Card } from "@ui-kitten/components";
import {
  StyleSheet,
  ScrollView,
  SafeAreaView,
  StatusBar,
  View
} from "react-native";
import { globalStyles } from "../../shared/globalStyles";
import { globalConstants } from "../../constants";

const About = () => {
  return (
    <SafeAreaView style={[globalStyles.root, globalStyles.screenBg]}>
      <Layout style={globalStyles.containerPadding}>
        <Text
          style={[
            globalStyles.fontMedium,
            globalStyles.textBold,
            styles.heading
          ]}
        >
          About Us
        </Text>
        <ScrollView style={[globalStyles.mt20, globalStyles.mb20]}>
          <Card style={globalStyles.mb20}>
            <View>
              <Text style={styles.paragraph}>
                Daily MSG provides fresh quotes/advice/sayings every day that is
                intended to inspire the day to day life situations easier for our users.
              </Text>
              <Text style={styles.paragraph}>
                We bring to you contents, sourced from all around the world, in
                order to inspire your day-to-day activities.
              </Text>

              <Text style={styles.paragraph}>
                We are passionate about what drives and bring out the best of
                human actions, and on a mission to share our knowledge with the
                world, through everyday contents from prominent figures.
              </Text>

              <Text style={styles.paragraph}>
                For us, the quality and accuracy of our contents are a top
                priority. That's why we perform scheduled proofreading of
                contents that'll be served to our users. We'd as well appreciate
                your comments if should you find an error has slipped through
                the cracks. The appropriate correction will be done immediately
                we get your message.
              </Text>

              <Text style={styles.paragraph}>
                However, all contents on our app are available to the public
                domain and remain the rightful copyright of the owner.
              </Text>

              <Text style={styles.paragraph}>Email: info@daily-msg.com</Text>
              <Text style={styles.paragraph}>Phone: +234(0) 814 961 7083</Text>
              <Text style={[styles.paragraph, globalStyles.mb20]}>
                Website: www.daily-msg.com
              </Text>
            </View>
          </Card>
        </ScrollView>
      </Layout>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  heading: {
    borderBottomColor: globalConstants.SECONDARY_COLOR,
    borderBottomWidth: 5,
    fontSize: 20,
    borderRadius: 20,
    marginTop: 30
  },
  paragraph: {
    marginVertical: 2,
    textAlign: "justify"
  }
});

export default About;
