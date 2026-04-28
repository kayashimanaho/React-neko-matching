import { useRouter } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function PurposeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>どんな相手を{"\n"}探していますか？</Text>
        <Text style={styles.subtitle}>後から設定は変えられます！</Text>

        <View style={styles.options}>
          <TouchableOpacity
            style={[styles.optionButton, styles.blueButton]}
            onPress={() => router.push("/has-cat")}
          >
            <Text style={styles.optionEmoji}>🐱👩</Text>
            <View style={styles.optionTextWrap}>
              <Text style={styles.optionTitle}>猫友を探す</Text>
              <Text style={styles.optionDesc}>猫の話ができる友達を見つけたい</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.optionButton, styles.greenButton]}
            onPress={() => router.push("/has-cat")}
          >
            <Text style={styles.optionEmoji}>💑</Text>
            <View style={styles.optionTextWrap}>
              <Text style={styles.optionTitle}>恋人も視野に入れる</Text>
              <Text style={styles.optionDesc}>将来も猫と暮らせる人に出会いたい</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f3ea" },
  content: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 40,
    alignItems: "center",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#1a1a3e",
    textAlign: "center",
    lineHeight: 38,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 13,
    color: "#a0a0a0",
    marginBottom: 48,
    textAlign: "center",
  },
  options: { width: "100%", gap: 16 },
  optionButton: {
    width: "100%",
    height: 80,
    borderRadius: 40,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 24,
    gap: 14,
  },
  blueButton: { backgroundColor: "#3574bc" },
  greenButton: { backgroundColor: "#7aad5a" },
  optionEmoji: { fontSize: 28 },
  optionTextWrap: { flex: 1 },
  optionTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 2,
  },
  optionDesc: { fontSize: 12, color: "rgba(255,255,255,0.85)" },
});
