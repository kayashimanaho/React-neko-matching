import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HasCatScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>現在猫ちゃんと{"\n"}一緒に住んでいますか？</Text>
        <Text style={styles.subtitle}>後から設定は変えられます！</Text>

        <View style={styles.options}>
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() => router.push("/user-info")}
          >
            <Text style={styles.primaryButtonText}>一緒に住んでいる 🐱</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() => router.push("/user-info")}
          >
            <Text style={styles.secondaryButtonText}>今は居ない</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={() => router.back()} style={styles.backLink}>
          <Text style={styles.backLinkText}>‹ 一つ前に戻る</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f3ea",
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 80,
    alignItems: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1a1a3e",
    textAlign: "center",
    lineHeight: 34,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 13,
    color: "#a0a0a0",
    textAlign: "center",
    marginBottom: 48,
  },
  options: {
    width: "100%",
    gap: 14,
  },
  primaryButton: {
    width: "100%",
    height: 54,
    backgroundColor: "#3574bc",
    borderRadius: 27,
    alignItems: "center",
    justifyContent: "center",
  },
  primaryButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  secondaryButton: {
    width: "100%",
    height: 54,
    backgroundColor: "#fff",
    borderRadius: 27,
    borderWidth: 1.5,
    borderColor: "#3574bc",
    alignItems: "center",
    justifyContent: "center",
  },
  secondaryButtonText: {
    color: "#3574bc",
    fontSize: 16,
    fontWeight: "bold",
  },
  backLink: {
    marginTop: 28,
  },
  backLinkText: {
    color: "#a0a0a0",
    fontSize: 13,
  },
});
