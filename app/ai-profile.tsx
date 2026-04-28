import { useRouter } from "expo-router";
import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { OnboardingProgress } from "@/components/onboarding-progress";

const BIOS = [
  {
    label: "おすすめ",
    text: "プロフィール見てくれてありがとうございます！\n\n普段はカフェ店員をしています。\n休日はだいたい外に出ているアクティブ派です🏃\n音楽：邦ロックが好きで、夏フェスは毎年参戦してます！\nグルメ：ラーメン巡りと、お洒落なカフェ探し。\n旅行：次は北海道に行って美味しい海鮮を食べたい。\n趣味が合う方はもちろん、新しい世界を教えてくれる方も大歓迎です！仲良くなったらライブやカフェに行けたら嬉しいです。気軽に「いいね」してください！",
  },
  {
    label: "カジュアル",
    text: "猫大好きな普通の社会人です🐱\n愛猫のぷんすけと毎日まったり過ごしてます。\n週末は猫カフェ巡りか、おうちでのんびり映画鑑賞。\n同じく猫好きな方と仲良くなれたら嬉しいです！\nお気軽にメッセージください😊",
  },
  {
    label: "シリアス",
    text: "猫との生活を大切にしながら、充実した毎日を送っています。\n仕事にも趣味にも真剣に取り組むタイプです。\n将来は猫と一緒に暮らせるパートナーを探しています。\n共通の価値観を持った方と、ゆっくり関係を築いていきたいと思っています。",
  },
];

export default function AiProfileScreen() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <SafeAreaView style={styles.container}>
      <OnboardingProgress progress={85} />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>自己紹介文を{"\n"}選んでください</Text>
        <Text style={styles.subtitle}>後から内容は変えられます！</Text>

        <View style={styles.card}>
          <View style={styles.badgeRow}>
            <View style={[styles.badge, { backgroundColor: currentIndex === 0 ? "#f472b6" : "#94a3b8" }]}>
              <Text style={styles.badgeText}>{BIOS[currentIndex].label}</Text>
            </View>
          </View>
          <Text style={styles.bioText}>{BIOS[currentIndex].text}</Text>
          <TouchableOpacity
            style={[styles.selectButton, selected === currentIndex && styles.selectButtonActive]}
            onPress={() => setSelected(currentIndex)}
          >
            <Text style={[styles.selectButtonText, selected === currentIndex && styles.selectButtonTextActive]}>
              {selected === currentIndex ? "✓ 選択中" : "これにする"}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.dots}>
          {BIOS.map((_, i) => (
            <TouchableOpacity key={i} onPress={() => setCurrentIndex(i)}>
              <View style={[styles.dot, i === currentIndex && styles.dotActive]} />
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          style={[styles.nextButton, selected === null && styles.nextButtonDisabled]}
          onPress={() => selected !== null && router.push("/allergy")}
          disabled={selected === null}
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
  subtitle: { fontSize: 13, color: "#a0a0a0", marginBottom: 24, textAlign: "center" },
  card: {
    width: "100%", backgroundColor: "#fff", borderRadius: 16,
    padding: 20, marginBottom: 20, borderWidth: 1, borderColor: "#e0ddd8",
  },
  badgeRow: { alignItems: "center", marginBottom: 14 },
  badge: { paddingHorizontal: 16, paddingVertical: 4, borderRadius: 12 },
  badgeText: { color: "#fff", fontSize: 12, fontWeight: "bold" },
  bioText: { fontSize: 14, color: "#444", lineHeight: 22 },
  selectButton: {
    marginTop: 16, paddingVertical: 10, borderRadius: 20,
    borderWidth: 1.5, borderColor: "#3574bc", alignItems: "center",
  },
  selectButtonActive: { backgroundColor: "#3574bc" },
  selectButtonText: { fontSize: 14, color: "#3574bc", fontWeight: "bold" },
  selectButtonTextActive: { color: "#fff" },
  dots: { flexDirection: "row", gap: 8, marginBottom: 28 },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: "#d0ccc8" },
  dotActive: { backgroundColor: "#3574bc", width: 20 },
  nextButton: {
    width: "100%", height: 54, backgroundColor: "#3574bc",
    borderRadius: 27, alignItems: "center", justifyContent: "center",
  },
  nextButtonDisabled: { backgroundColor: "#c8c8c8" },
  nextButtonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  backLink: { marginTop: 16, alignItems: "center" },
  backLinkText: { color: "#a0a0a0", fontSize: 13 },
});
