import React from "react";
import { StyleSheet, Text, View } from "react-native";

export function OnboardingProgress({ progress }: { progress: number }) {
  return (
    <View style={styles.wrapper}>
      <View style={styles.track}>
        <View style={[styles.fill, { width: `${progress}%` as any }]}>
          <Text style={styles.cat}>🐈</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 8,
  },
  track: {
    height: 6,
    backgroundColor: "#d0ccc8",
    borderRadius: 3,
  },
  fill: {
    height: 6,
    backgroundColor: "#3574bc",
    borderRadius: 3,
    alignItems: "flex-end",
    overflow: "visible",
  },
  cat: {
    fontSize: 18,
    position: "absolute",
    right: -10,
    top: -14,
  },
});
