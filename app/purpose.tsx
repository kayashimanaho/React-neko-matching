import { useRouter } from "expo-router";
import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Purpose = "friend" | "partner" | null;

export default function PurposeScreen() {
  const router = useRouter();
  const [selected, setSelected] = useState<Purpose>(null);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>どんな相手を{"\n"}探していますか？</Text>
        <Text style={styles.subtitle}>探したい相手を教えてください</Text>

        <View style={styles.options}>
          <TouchableOpacity
            style={[styles.optionCard, selected === "friend" && styles.optionCardSelected]}
            onPress={() => setSelected("friend")}
          >
            <Text style={styles.optionIcon}>🐱</Text>
            <Text style={[styles.optionTitle, selected === "friend" && styles.optionTitleSelected]}>
              猫友を探す
            </Text>
            <Text style={[styles.optionDesc, selected === "friend" && styles.optionDescSelected]}>
              猫好き同士でつながりたい
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.optionCard, selected === "partner" && styles.optionCardSelected]}
            onPress={() => setSelected("partner")}
          >
            <Text style={styles.optionIcon}>💞</Text>
            <Text style={[styles.optionTitle, selected === "partner" && styles.optionTitleSelected]}>
              どんな人も気軽に入れる
            </Text>
            <Text style={[styles.optionDesc, selected === "partner" && styles.optionDescSelected]}>
              恋愛も友達も幅広くつながりたい
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={[styles.nextButton, !selected && styles.nextButtonDisabled]}
          onPress={() => selected && router.push("/has-cat")}
          disabled={!selected}
        >
          <Text style={styles.nextButtonText}>次へ進む　›</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f3ea",
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 40,
    alignItems: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#2d6db5",
    textAlign: "center",
    lineHeight: 34,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 13,
    color: "#a0a0a0",
    marginBottom: 36,
  },
  options: {
    width: "100%",
    gap: 14,
    marginBottom: 40,
  },
  optionCard: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "#d0ccc8",
    padding: 22,
    alignItems: "center",
    gap: 6,
  },
  optionCardSelected: {
    borderColor: "#3574bc",
    backgroundColor: "#eaf1fb",
  },
  optionIcon: {
    fontSize: 38,
  },
  optionTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#444",
  },
  optionTitleSelected: {
    color: "#3574bc",
  },
  optionDesc: {
    fontSize: 13,
    color: "#a0a0a0",
    textAlign: "center",
  },
  optionDescSelected: {
    color: "#3574bc",
  },
  nextButton: {
    width: "100%",
    height: 54,
    backgroundColor: "#3574bc",
    borderRadius: 27,
    alignItems: "center",
    justifyContent: "center",
  },
  nextButtonDisabled: {
    backgroundColor: "#c8c8c8",
  },
  nextButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
