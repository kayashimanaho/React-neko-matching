import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const PREFECTURES = [
  "北海道","青森県","岩手県","宮城県","秋田県","山形県","福島県",
  "茨城県","栃木県","群馬県","埼玉県","千葉県","東京都","神奈川県",
  "新潟県","富山県","石川県","福井県","山梨県","長野県","岐阜県",
  "静岡県","愛知県","三重県","滋賀県","京都府","大阪府","兵庫県",
  "奈良県","和歌山県","鳥取県","島根県","岡山県","広島県","山口県",
  "徳島県","香川県","愛媛県","高知県","福岡県","佐賀県","長崎県",
  "熊本県","大分県","宮崎県","鹿児島県","沖縄県",
];

const JOBS = ["会社員","自営業","学生","フリーランス","アルバイト","主婦・主夫","無職","その他"];

const GENDERS = ["男", "女", "選択しない"] as const;
const DAYS = ["土日祝", "平日", "不定期"] as const;

type DropdownKey = "location" | "job";

function DropdownField({
  label,
  value,
  onPress,
}: {
  label: string;
  value: string | null;
  onPress: () => void;
}) {
  return (
    <View style={styles.fieldGroup}>
      <Text style={styles.label}>{label}</Text>
      <TouchableOpacity style={styles.dropdownInput} onPress={onPress}>
        <Text style={value ? styles.dropdownValue : styles.dropdownPlaceholder}>
          {value ?? "選択してください"}
        </Text>
        <Text style={styles.dropdownArrow}>▼</Text>
      </TouchableOpacity>
    </View>
  );
}

export default function UserInfoScreen() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [location, setLocation] = useState<string | null>(null);
  const [birthDate, setBirthDate] = useState("");
  const [gender, setGender] = useState<string | null>(null);
  const [job, setJob] = useState<string | null>(null);
  const [freeDay, setFreeDay] = useState<string | null>(null);

  const [modal, setModal] = useState<DropdownKey | null>(null);

  const canProceed = name && location && birthDate && gender && job && freeDay;

  const dropdownOptions: Record<DropdownKey, string[]> = {
    location: PREFECTURES,
    job: JOBS,
  };

  const handleSelect = (key: DropdownKey, value: string) => {
    if (key === "location") setLocation(value);
    if (key === "job") setJob(value);
    setModal(null);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* プログレスバー */}
      <View style={styles.progressWrapper}>
        <View style={styles.progressTrack}>
          <View style={styles.progressFill} />
        </View>
        <Text style={styles.progressCat}>🐈</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>貴方の情報を{"\n"}教えてください！</Text>
        <Text style={styles.subtitle}>後から設定は変えられます！</Text>

        {/* お名前 */}
        <View style={styles.fieldGroup}>
          <Text style={styles.label}>お名前</Text>
          <TextInput
            style={styles.input}
            placeholder="そうま"
            placeholderTextColor="#c0bdb8"
            value={name}
            onChangeText={setName}
          />
        </View>

        {/* 居住地 */}
        <DropdownField
          label="居住地"
          value={location}
          onPress={() => setModal("location")}
        />

        {/* 年齢（生年月日） */}
        <View style={styles.fieldGroup}>
          <Text style={styles.label}>年齢</Text>
          <TextInput
            style={styles.input}
            placeholder="2002/04/22"
            placeholderTextColor="#c0bdb8"
            value={birthDate}
            onChangeText={setBirthDate}
            keyboardType="numbers-and-punctuation"
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

        {/* 現在のお仕事 */}
        <DropdownField
          label="現在のお仕事は？"
          value={job}
          onPress={() => setModal("job")}
        />

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
          onPress={() => canProceed && router.push("/user-values")}
          disabled={!canProceed}
        >
          <Text style={styles.nextButtonText}>次に進む　›</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.back()} style={styles.backLink}>
          <Text style={styles.backLinkText}>‹　1つ前に戻る</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* ドロップダウンモーダル */}
      <Modal visible={modal !== null} transparent animationType="slide">
        <Pressable style={styles.modalOverlay} onPress={() => setModal(null)}>
          <View style={styles.modalSheet}>
            <View style={styles.modalHandle} />
            <ScrollView>
              {modal &&
                dropdownOptions[modal].map((item) => (
                  <TouchableOpacity
                    key={item}
                    style={styles.modalItem}
                    onPress={() => handleSelect(modal, item)}
                  >
                    <Text style={styles.modalItemText}>{item}</Text>
                  </TouchableOpacity>
                ))}
            </ScrollView>
          </View>
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f3ea",
  },
  progressWrapper: {
    paddingHorizontal: 24,
    paddingTop: 12,
    marginBottom: 4,
  },
  progressTrack: {
    height: 6,
    backgroundColor: "#d0ccc8",
    borderRadius: 3,
  },
  progressFill: {
    height: 6,
    width: "30%",
    backgroundColor: "#3574bc",
    borderRadius: 3,
  },
  progressCat: {
    position: "absolute",
    left: "30%",
    top: 4,
    fontSize: 18,
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 40,
    alignItems: "center",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#1a1a3e",
    textAlign: "center",
    lineHeight: 38,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 13,
    color: "#a0a0a0",
    marginBottom: 32,
    textAlign: "center",
  },
  fieldGroup: {
    width: "100%",
    marginBottom: 20,
    alignItems: "center",
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#444",
    marginBottom: 8,
    textAlign: "center",
  },
  input: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    height: 50,
    paddingHorizontal: 14,
    fontSize: 15,
    color: "#444",
    textAlign: "center",
  },
  dropdownInput: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    height: 50,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  dropdownValue: {
    fontSize: 15,
    color: "#444",
    flex: 1,
    textAlign: "center",
  },
  dropdownPlaceholder: {
    fontSize: 15,
    color: "#c0bdb8",
    flex: 1,
    textAlign: "center",
  },
  dropdownArrow: {
    fontSize: 11,
    color: "#888",
    marginLeft: 4,
  },
  chipRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    justifyContent: "center",
  },
  chip: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#fff",
  },
  chipSelected: {
    borderColor: "#3574bc",
    backgroundColor: "#fff",
  },
  chipText: {
    fontSize: 14,
    color: "#888",
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
    marginTop: 16,
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
    marginTop: 18,
  },
  backLinkText: {
    color: "#a0a0a0",
    fontSize: 13,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "flex-end",
  },
  modalSheet: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 12,
    maxHeight: "60%",
  },
  modalHandle: {
    width: 40,
    height: 4,
    backgroundColor: "#d0ccc8",
    borderRadius: 2,
    alignSelf: "center",
    marginBottom: 12,
  },
  modalItem: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderBottomWidth: 1,
    borderBottomColor: "#f0ede8",
  },
  modalItemText: {
    fontSize: 16,
    color: "#444",
    textAlign: "center",
  },
});
