import { useRouter } from "expo-router";
import React from "react";
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function HasCatScreen() {
  const router = useRouter();

  const handleSelect = () => {
    router.push("/user-info");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>現在猫ちゃんと{"\n"}一緒に住んでいますか？</Text>

        <View style={styles.options}>
          <TouchableOpacity style={styles.primaryButton} onPress={handleSelect}>
            <Text style={styles.primaryButtonText}>一緒に住んでいる 🐱</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.secondaryButton} onPress={handleSelect}>
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
    backgroundColor: "#FDFBEE",
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 80,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    lineHeight: 36,
    marginBottom: 60,
  },
  options: {
    width: "100%",
    gap: 16,
  },
  primaryButton: {
    width: "100%",
    height: 56,
    backgroundColor: "#3B76AD",
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
  },
  primaryButtonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  secondaryButton: {
    width: "100%",
    height: 56,
    backgroundColor: "#FFF",
    borderRadius: 28,
    borderWidth: 1,
    borderColor: "#3B76AD",
    alignItems: "center",
    justifyContent: "center",
  },
  secondaryButtonText: {
    color: "#3B76AD",
    fontSize: 18,
    fontWeight: "bold",
  },
  backLink: {
    marginTop: 32,
  },
  backLinkText: {
    color: "#999",
    fontSize: 14,
  },
});
