import { useRouter } from "expo-router";
import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { OnboardingProgress } from "@/components/onboarding-progress";

const NEUTERED = ["実施済み", "未実施", "予定あり"];
const FOOD = ["特殊フード", "特になし"];
const AIR = ["稼働中", "未稼働", "設置予定あり"];
const BRUSH_MAX = 5;
const CLEAN_MAX = 4;

export default function AllergyScreen() {
  const router = useRouter();
  const [neutered, setNeutered] = useState<string | null>(null);
  const [food, setFood] = useState<string | null>(null);
  const [air, setAir] = useState<string | null>(null);
  const [brushLevel, setBrushLevel] = useState(0);
  const [cleanLevel, setCleanLevel] = useState(0);

  const canProceed = neutered && food && air && brushLevel > 0 && cleanLevel > 0;

  return (
    <SafeAreaView style={styles.container}>
      <OnboardingProgress progress={90} />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>猫ちゃんのアレルギー情報を{"\n"}教えてください</Text>
        <Text style={styles.subtitle}>後から内容は変えられます！</Text>

        {/* 避妊・去勢手術 */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>避妊・去勢手術</Text>
          <View style={styles.chips}>
            {NEUTERED.map((item) => (
              <TouchableOpacity
                key={item}
                style={[styles.chip, neutered === item && styles.chipSelected]}
                onPress={() => setNeutered(item)}
              >
                <Text style={[styles.chipText, neutered === item && styles.chipTextSelected]}>{item}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* フード */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>フード</Text>
          <View style={styles.chips}>
            {FOOD.map((item) => (
              <TouchableOpacity
                key={item}
                style={[styles.chip, food === item && styles.chipSelected]}
                onPress={() => setFood(item)}
              >
                <Text style={[styles.chipText, food === item && styles.chipTextSelected]}>{item}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* 空気清浄機 */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>空気清浄機</Text>
          <View style={styles.chips}>
            {AIR.map((item) => (
              <TouchableOpacity
                key={item}
                style={[styles.chip, air === item && styles.chipSelected]}
                onPress={() => setAir(item)}
              >
                <Text style={[styles.chipText, air === item && styles.chipTextSelected]}>{item}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* ブラッシング頻度 */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>ブラッシング頻度</Text>
          <View style={styles.iconRow}>
            {Array.from({ length: BRUSH_MAX }).map((_, i) => (
              <TouchableOpacity key={i} onPress={() => setBrushLevel(i + 1)}>
                <Text style={[styles.iconText, i < brushLevel ? styles.iconActive : styles.iconInactive]}>
                  𝄞
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* 掃除頻度 */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>掃除頻度</Text>
          <View style={styles.iconRow}>
            {Array.from({ length: CLEAN_MAX }).map((_, i) => (
              <TouchableOpacity key={i} onPress={() => setCleanLevel(i + 1)}>
                <Text style={[styles.iconText, i < cleanLevel ? styles.iconActive : styles.iconInactive]}>
                  🧹
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <TouchableOpacity
          style={[styles.nextButton, !canProceed && styles.nextButtonDisabled]}
          onPress={() => canProceed && router.replace("/(tabs)")}
          disabled={!canProceed}
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
  title: { fontSize: 22, fontWeight: "bold", color: "#1a1a3e", textAlign: "center", lineHeight: 32, marginBottom: 6 },
  subtitle: { fontSize: 13, color: "#a0a0a0", marginBottom: 24, textAlign: "center" },
  section: { width: "100%", marginBottom: 24, alignItems: "center" },
  sectionLabel: { fontSize: 14, fontWeight: "600", color: "#444", marginBottom: 12, textAlign: "center" },
  chips: { flexDirection: "row", flexWrap: "wrap", gap: 10, justifyContent: "center" },
  chip: {
    paddingHorizontal: 18, paddingVertical: 10, borderRadius: 8,
    borderWidth: 1.5, borderColor: "#ccc", backgroundColor: "#fff",
  },
  chipSelected: { borderColor: "#3574bc", backgroundColor: "#eaf1fb" },
  chipText: { fontSize: 13, color: "#666" },
  chipTextSelected: { color: "#3574bc", fontWeight: "bold" },
  iconRow: { flexDirection: "row", gap: 12, justifyContent: "center" },
  iconText: { fontSize: 28 },
  iconActive: { opacity: 1 },
  iconInactive: { opacity: 0.25 },
  nextButton: {
    width: "100%", height: 54, backgroundColor: "#3574bc",
    borderRadius: 27, alignItems: "center", justifyContent: "center", marginTop: 8,
  },
  nextButtonDisabled: { backgroundColor: "#c8c8c8" },
  nextButtonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  backLink: { marginTop: 16, alignItems: "center" },
  backLinkText: { color: "#a0a0a0", fontSize: 13 },
});
