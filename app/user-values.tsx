import { useRouter } from "expo-router";
import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { OnboardingProgress } from "@/components/onboarding-progress";

const VALUES = [
  { id: "personality", emoji: "😊", title: "性格・タイプ", desc: "優しい、親しみやすい、素直、マイペース…" },
  { id: "social", emoji: "😄", title: "社交性", desc: "人見知り、外向的、少人数が好き…" },
  { id: "lifestyle", emoji: "🌿", title: "生活習慣", desc: "早起き、夜型、丁寧な暮らし…" },
  { id: "romance", emoji: "💕", title: "恋愛観", desc: "ゆっくり距離を縮めたい、積極的…" },
  { id: "future", emoji: "🏠", title: "将来の目標", desc: "同棲、猫と暮らす家、のんびり生活…" },
  { id: "hobby", emoji: "🎨", title: "共通の趣味", desc: "同じ趣味を一緒に楽しみたい…" },
];

export default function UserValuesScreen() {
  const router = useRouter();
  const [selected, setSelected] = useState<string[]>([]);

  const toggle = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <OnboardingProgress progress={40} />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>あなたが大切に{"\n"}していることは？</Text>
        <Text style={styles.subtitle}>後から設定は変えられます！</Text>

        <View style={styles.grid}>
          {VALUES.map((v) => (
            <TouchableOpacity
              key={v.id}
              style={[styles.card, selected.includes(v.id) && styles.cardSelected]}
              onPress={() => toggle(v.id)}
            >
              <Text style={styles.cardEmoji}>{v.emoji}</Text>
              <Text style={[styles.cardTitle, selected.includes(v.id) && styles.cardTitleSelected]}>
                {v.title}
              </Text>
              <Text style={styles.cardDesc} numberOfLines={2}>{v.desc}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          style={[styles.nextButton, selected.length === 0 && styles.nextButtonDisabled]}
          onPress={() => router.push("/hobbies")}
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
  subtitle: { fontSize: 13, color: "#a0a0a0", marginBottom: 28, textAlign: "center" },
  grid: { width: "100%", flexDirection: "row", flexWrap: "wrap", gap: 12, marginBottom: 32 },
  card: {
    width: "30%",
    flexGrow: 1,
    backgroundColor: "#eef4e8",
    borderRadius: 12,
    padding: 12,
    alignItems: "flex-start",
    borderWidth: 2,
    borderColor: "transparent",
  },
  cardSelected: { borderColor: "#3574bc", backgroundColor: "#eaf1fb" },
  cardEmoji: { fontSize: 22, marginBottom: 6 },
  cardTitle: { fontSize: 13, fontWeight: "bold", color: "#444", marginBottom: 4 },
  cardTitleSelected: { color: "#3574bc" },
  cardDesc: { fontSize: 11, color: "#888", lineHeight: 16 },
  nextButton: {
    width: "100%", height: 54, backgroundColor: "#3574bc",
    borderRadius: 27, alignItems: "center", justifyContent: "center",
  },
  nextButtonDisabled: { backgroundColor: "#c8c8c8" },
  nextButtonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  backLink: { marginTop: 16, alignItems: "center" },
  backLinkText: { color: "#a0a0a0", fontSize: 13 },
});
