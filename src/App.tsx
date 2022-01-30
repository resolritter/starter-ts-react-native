import React from "react"
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native"
import {
  Colors,
  DebugInstructions,
  Header,
  ReloadInstructions,
} from "react-native/Libraries/NewAppScreen"

import { labels } from "./constants"

declare const global: { HermesInternal: null | {} }

const styles = StyleSheet.create({
  scrollView: {
    /* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access */
    backgroundColor: Colors.lighter,
    /* eslint-enable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access */
  },
  engine: { position: "absolute", right: 0 },
  body: {
    /* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access */
    backgroundColor: Colors.white,
    /* eslint-enable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access */
  },
  sectionContainer: { marginTop: 32, paddingHorizontal: 24 },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "600",
    /* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access */
    color: Colors.black,
    /* eslint-enable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access */
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: "400",
    /* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access */
    color: Colors.dark,
    /* eslint-enable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access */
  },
  highlight: { fontWeight: "700" },
  footer: {
    /* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access */
    color: Colors.dark,
    /* eslint-enable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access */
    fontSize: 12,
    fontWeight: "600",
    padding: 4,
    paddingRight: 12,
    textAlign: "right",
  },
})

const App = function () {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView accessibilityLabel={labels.Root}>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}
        >
          <Header />
          {global.HermesInternal == null ? null : (
            <View style={styles.engine}>
              <Text style={styles.footer}>Engine: IDK!</Text>
            </View>
          )}
          <View style={styles.body}>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Step One</Text>
              <Text
                accessibilityLabel={labels.HomePage.PresentationText}
                style={styles.sectionDescription}
              >
                {labels.HomePage.PresentationText}
              </Text>
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>See Your Changes</Text>
              <Text style={styles.sectionDescription}>
                <ReloadInstructions />
              </Text>
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Debug</Text>
              <Text style={styles.sectionDescription}>
                <DebugInstructions />
              </Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  )
}

export default App
