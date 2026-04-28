import { useRouter } from "expo-router";
import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { OnboardingProgress } from "@/components/onboarding-progress";

const CAT_STYLES = [
  "一緒に寝る", "写真を撮るのが好き", "おもちゃを作る",
  "ブラッシングが好き", "猫吸い", "お散歩", "たくさん遊ぶ",
];

export default function CatTimeScreen() {
  const router = useRouter();
  const [selected, setSelected] = useState<string[]>([]);

  const toggle = (item: string) => {
    setSelected((prev) =>
      prev.includes(item) ? prev.filter((x) => x !== item) : [...prev, item]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <OnboardingProgress progress={65} />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>あなたが大切に{"\n"}していることは？</Text>
        <Text style={styles.subtitle}>後から設定は変えられます！</Text>

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>猫との過ごし方</Text>
          <View style={styles.chips}>
            {CAT_STYLES.map((item) => (
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
        </View>

        <TouchableOpacity
          style={[styles.nextButton, selected.length === 0 && styles.nextButtonDisabled]}
          onPress={() => router.push("/cat-info")}
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
  content: { flexGrow: 1, paddingHorizontal: 24, paddingTop: 20, paddingBottom: 40, alignItems: "center" },
  title: { fontSize: 24, fontWeight: "bold", color: "#1a1a3e", textAlign: "center", lineHeight: 36, marginBottom: 6 },
  subtitle: { fontSize: 13, color: "#a0a0a0", marginBottom: 32, textAlign: "center" },
  section: { width: "100%", marginBottom: 40 },
  sectionLabel: { fontSize: 14, fontWeight: "600", color: "#555", textAlign: "center", marginBottom: 16 },
  chips: { flexDirection: "row", flexWrap: "wrap", gap: 10, justifyContent: "center" },
  chip: {
    paddingHorizontal: 18, paddingVertical: 10, borderRadius: 20,
    borderWidth: 1.5, borderColor: "#b8d4a8", backgroundColor: "#fff",
  },
  chipSelected: { borderColor: "#3574bc", backgroundColor: "#eaf1fb" },
  chipText: { fontSize: 13, color: "#6a9c5a" },
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
