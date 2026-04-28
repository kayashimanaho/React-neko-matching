import { useRouter } from "expo-router";
import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { OnboardingProgress } from "@/components/onboarding-progress";

const HOBBIES = [
  "動物が好き", "音楽", "テレビ", "ゲーム",
  "本・漫画", "芸術", "運動", "車・バイク",
  "旅行", "インターネット・PC", "ファッション", "美容",
  "グルメ・お酒", "写真", "職業・資格・勉強", "占い",
];

export default function HobbiesScreen() {
  const router = useRouter();
  const [selected, setSelected] = useState<string[]>([]);

  const toggle = (item: string) => {
    setSelected((prev) =>
      prev.includes(item) ? prev.filter((x) => x !== item) : [...prev, item]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <OnboardingProgress progress={55} />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>あなたの興味が{"\n"}あることは？</Text>
        <Text style={styles.subtitle}>後から設定は変えられます！</Text>

        <View style={styles.grid}>
          {HOBBIES.map((item) => (
            <TouchableOpacity
              key={item}
              style={[styles.chip, selected.includes(item) && styles.chipSelected]}
              onPress={() => toggle(item)}
            >
              <Text style={[styles.chipText, selected.includes(item) && styles.chipTextSelected]}>
                {item}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          style={[styles.nextButton, selected.length === 0 && styles.nextButtonDisabled]}
          onPress={() => router.push("/cat-time")}
          disabled={selected.length === 0}
        >
          <Text style={styles.nextButtonText}>次に進む　›</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.back()} style={styles.backLink}>
          <Text style={styles.backLinkText}>‹　1つ前に戻る</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f3ea" },
  content: { flexGrow: 1, paddingHorizontal: 20, paddingTop: 20, paddingBottom: 40, alignItems: "center" },
  title: { fontSize: 24, fontWeight: "bold", color: "#1a1a3e", textAlign: "center", lineHeight: 36, marginBottom: 6 },
  subtitle: { fontSize: 13, color: "#a0a0a0", marginBottom: 24, textAlign: "center" },
  grid: { width: "100%", flexDirection: "row", flexWrap: "wrap", gap: 10, marginBottom: 32 },
  chip: {
    paddingHorizontal: 16, paddingVertical: 10, borderRadius: 20,
    backgroundColor: "#e0ddd6", borderWidth: 2, borderColor: "transparent",
  },
  chipSelected: { borderColor: "#3574bc", backgroundColor: "#eaf1fb" },
  chipText: { fontSize: 13, color: "#555" },
  chipTextSelected: { color: "#3574bc", fontWeight: "bold" },
  nextButton: {
    width: "100%", height: 54, backgroundColor: "#3574bc",
    borderRadius: 27, alignItems: "center", justifyContent: "center",
  },
  nextButtonDisabled: { backgroundColor: "#c8c8c8" },
  nextButtonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  backLink: { marginTop: 16, alignItems: "center" },
  backLinkText: { color: "#a0a0a0", fontSize: 13 },
});
