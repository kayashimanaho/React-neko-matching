import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const GENDERS = ["男性", "女性", "教えない"] as const;
const JOBS = ["会社員", "自営業", "学生", "フリーランス", "その他"] as const;
const DAYS = ["土曜", "日曜", "平日"] as const;

export default function UserInfoScreen() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState<string | null>(null);
  const [job, setJob] = useState<string | null>(null);
  const [freeDay, setFreeDay] = useState<string | null>(null);

  const canProceed = name && location && age && gender && job && freeDay;

  return (
    <SafeAreaView style={styles.container}>
      {/* プログレスバー */}
      <View style={styles.progressBar}>
        <View style={styles.progressFill} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>貴方の情報を{"\n"}教えてください！</Text>
        <Text style={styles.subtitle}>後から変更できます</Text>

        {/* 名前 */}
        <View style={styles.fieldGroup}>
          <Text style={styles.label}>名前</Text>
          <TextInput
            style={styles.input}
            placeholder="例）田中太郎"
            placeholderTextColor="#c0bdb8"
            value={name}
            onChangeText={setName}
          />
        </View>

        {/* 居住地 */}
        <View style={styles.fieldGroup}>
          <Text style={styles.label}>居住地</Text>
          <TextInput
            style={styles.input}
            placeholder="例）東京都"
            placeholderTextColor="#c0bdb8"
            value={location}
            onChangeText={setLocation}
          />
        </View>

        {/* 年齢 */}
        <View style={styles.fieldGroup}>
          <Text style={styles.label}>年齢</Text>
          <TextInput
            style={styles.input}
            placeholder="例）25"
            placeholderTextColor="#c0bdb8"
            value={age}
            onChangeText={setAge}
            keyboardType="number-pad"
          />
        </View>

        {/* 性別 */}
        <View style={styles.fieldGroup}>
          <Text style={styles.label}>性別</Text>
          <View style={styles.chipRow}>
            {GENDERS.map((g) => (
              <TouchableOpacity
                key={g}
                style={[styles.chip, gender === g && styles.chipSelected]}
                onPress={() => setGender(g)}
              >
                <Text style={[styles.chipText, gender === g && styles.chipTextSelected]}>{g}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* 職業 */}
        <View style={styles.fieldGroup}>
          <Text style={styles.label}>職業</Text>
          <View style={styles.chipRow}>
            {JOBS.map((j) => (
              <TouchableOpacity
                key={j}
                style={[styles.chip, job === j && styles.chipSelected]}
                onPress={() => setJob(j)}
              >
                <Text style={[styles.chipText, job === j && styles.chipTextSelected]}>{j}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* お休みの日 */}
        <View style={styles.fieldGroup}>
          <Text style={styles.label}>お休みの日は？</Text>
          <View style={styles.chipRow}>
            {DAYS.map((d) => (
              <TouchableOpacity
                key={d}
                style={[styles.chip, freeDay === d && styles.chipSelected]}
                onPress={() => setFreeDay(d)}
              >
                <Text style={[styles.chipText, freeDay === d && styles.chipTextSelected]}>{d}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <TouchableOpacity
          style={[styles.nextButton, !canProceed && styles.nextButtonDisabled]}
          onPress={() => canProceed && router.push("/(tabs)")}
          disabled={!canProceed}
        >
          <Text style={styles.nextButtonText}>次へ進む　›</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.back()} style={styles.backLink}>
          <Text style={styles.backLinkText}>‹ 一つ前に戻る</Text>
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
  progressBar: {
    height: 4,
    backgroundColor: "#d0ccc8",
  },
  progressFill: {
    height: 4,
    width: "30%",
    backgroundColor: "#3574bc",
    borderRadius: 2,
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 40,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#2d6db5",
    lineHeight: 34,
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 13,
    color: "#a0a0a0",
    marginBottom: 28,
  },
  fieldGroup: {
    marginBottom: 22,
  },
  label: {
    fontSize: 13,
    fontWeight: "600",
    color: "#555",
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#d0ccc8",
    height: 48,
    paddingHorizontal: 14,
    fontSize: 15,
    color: "#444",
  },
  chipRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#d0ccc8",
    backgroundColor: "#fff",
  },
  chipSelected: {
    borderColor: "#3574bc",
    backgroundColor: "#eaf1fb",
  },
  chipText: {
    fontSize: 13,
    color: "#666",
  },
  chipTextSelected: {
    color: "#3574bc",
    fontWeight: "bold",
  },
  nextButton: {
    width: "100%",
    height: 54,
    backgroundColor: "#3574bc",
    borderRadius: 27,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
  },
  nextButtonDisabled: {
    backgroundColor: "#c8c8c8",
  },
  nextButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  backLink: {
    alignItems: "center",
    marginTop: 18,
  },
  backLinkText: {
    color: "#a0a0a0",
    fontSize: 13,
  },
});
