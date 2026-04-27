import { useRouter } from "expo-router";
import React, { useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Purpose = "friend" | "partner" | null;

export default function PurposeScreen() {
  const router = useRouter();
  const [selected, setSelected] = useState<Purpose>(null);

  const handleNext = () => {
    if (selected) {
      router.push("/has-cat");
    }
  };

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
          onPress={handleNext}
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
    backgroundColor: "#FDFBEE",
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 40,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    lineHeight: 36,
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 14,
    color: "#999",
    marginBottom: 40,
  },
  options: {
    width: "100%",
    gap: 16,
    marginBottom: 48,
  },
  optionCard: {
    width: "100%",
    backgroundColor: "#FFF",
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "#E0E0E0",
    padding: 24,
    alignItems: "center",
    gap: 8,
  },
  optionCardSelected: {
    borderColor: "#3B76AD",
    backgroundColor: "#EBF3FA",
  },
  optionIcon: {
    fontSize: 40,
  },
  optionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  optionTitleSelected: {
    color: "#3B76AD",
  },
  optionDesc: {
    fontSize: 13,
    color: "#999",
    textAlign: "center",
  },
  optionDescSelected: {
    color: "#3B76AD",
  },
  nextButton: {
    width: "100%",
    height: 56,
    backgroundColor: "#3B76AD",
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
  },
  nextButtonDisabled: {
    backgroundColor: "#C0C0C0",
  },
  nextButtonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});
