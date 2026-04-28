import { useRouter } from "expo-router";
import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { OnboardingProgress } from "@/components/onboarding-progress";

const PERSONALITIES = ["人懐っこい", "甘えん坊", "活発", "クール", "おっとり"];

export default function CatInfoScreen() {
  const router = useRouter();
  const [catName, setCatName] = useState("");
  const [breed, setBreed] = useState("");
  const [age, setAge] = useState("");
  const [personalities, setPersonalities] = useState<string[]>([]);

  const togglePersonality = (item: string) => {
    setPersonalities((prev) =>
      prev.includes(item)
        ? prev.filter((x) => x !== item)
        : prev.length < 3
        ? [...prev, item]
        : prev
    );
  };

  const canProceed = catName && breed && age && personalities.length > 0;

  return (
    <SafeAreaView style={styles.container}>
      <OnboardingProgress progress={75} />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>貴方の猫ちゃんの{"\n"}情報を教えてください！</Text>
        <Text style={styles.subtitle}>後から設定は変えられます！</Text>

        <View style={styles.fieldGroup}>
          <Text style={styles.label}>お名前</Text>
          <TextInput
            style={styles.input}
            placeholder="ぷんすけ"
            placeholderTextColor="#c0bdb8"
            value={catName}
            onChangeText={setCatName}
          />
        </View>

        <View style={styles.fieldGroup}>
          <Text style={styles.label}>猫種</Text>
          <TextInput
            style={styles.input}
            placeholder="ロシアンブルー"
            placeholderTextColor="#c0bdb8"
            value={breed}
            onChangeText={setBreed}
          />
        </View>

        <View style={styles.fieldGroup}>
          <Text style={styles.label}>年齢</Text>
          <TextInput
            style={styles.input}
            placeholder="4ヶ月"
            placeholderTextColor="#c0bdb8"
            value={age}
            onChangeText={setAge}
          />
        </View>

        <View style={styles.fieldGroup}>
          <Text style={styles.label}>性格</Text>
          <Text style={styles.sublabel}>最大3つまで選べます</Text>
          <View style={styles.chips}>
            {PERSONALITIES.map((item) => (
              <TouchableOpacity
                key={item}
                style={[
                  styles.chip,
                  personalities.includes(item) && styles.chipSelected,
                ]}
                onPress={() => togglePersonality(item)}
              >
                <Text style={[styles.chipText, personalities.includes(item) && styles.chipTextSelected]}>
                  {item}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <TouchableOpacity
          style={[styles.nextButton, !canProceed && styles.nextButtonDisabled]}
          onPress={() => canProceed && router.push("/ai-profile")}
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
  title: { fontSize: 24, fontWeight: "bold", color: "#1a1a3e", textAlign: "center", lineHeight: 36, marginBottom: 6 },
  subtitle: { fontSize: 13, color: "#a0a0a0", marginBottom: 28, textAlign: "center" },
  fieldGroup: { width: "100%", marginBottom: 20, alignItems: "center" },
  label: { fontSize: 14, fontWeight: "600", color: "#444", marginBottom: 8, textAlign: "center" },
  sublabel: { fontSize: 12, color: "#a0a0a0", marginBottom: 10, textAlign: "center" },
  input: {
    width: "100%", backgroundColor: "#fff", borderRadius: 10,
    borderWidth: 1, borderColor: "#ccc", height: 50,
    paddingHorizontal: 14, fontSize: 15, color: "#444", textAlign: "center",
  },
  chips: { flexDirection: "row", flexWrap: "wrap", gap: 10, justifyContent: "center" },
  chip: {
    paddingHorizontal: 18, paddingVertical: 10, borderRadius: 20,
    borderWidth: 1.5, borderColor: "#ccc", backgroundColor: "#fff",
  },
  chipSelected: { borderColor: "#3574bc", backgroundColor: "#eaf1fb" },
  chipText: { fontSize: 13, color: "#666" },
  chipTextSelected: { color: "#3574bc", fontWeight: "bold" },
  nextButton: {
    width: "100%", height: 54, backgroundColor: "#3574bc",
    borderRadius: 27, alignItems: "center", justifyContent: "center", marginTop: 8,
  },
  nextButtonDisabled: { backgroundColor: "#c8c8c8" },
  nextButtonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  backLink: { marginTop: 16, alignItems: "center" },
  backLinkText: { color: "#a0a0a0", fontSize: 13 },
});
