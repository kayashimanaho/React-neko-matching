import React, { useState } from "react"; // useStateを追加
import {
    Image,
    Modal,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

export default function AuthPage() {
  // ポップアップの表示管理
  const [modalVisible, setModalVisible] = useState(false);
  // 新規登録かログインかの切り替え管理
  const [isSignUp, setIsSignUp] = useState(true);

  // ボタンを押した時の共通処理
  const openModal = (signUpMode: boolean) => {
    setIsSignUp(signUpMode);
    setModalVisible(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* 背景用の足跡エリア */}
      <Image
        source={require("../assets/images/icon01.png")}
        style={[
          styles.footprint,
          { top: "25%", left: "10%", transform: [{ rotate: "-20deg" }] },
        ]}
      />
      <Image
        source={require("../assets/images/icon01.png")}
        style={[
          styles.footprint,
          { top: "30%", left: "15%", transform: [{ rotate: "-10deg" }] },
        ]}
      />
      <Image
        source={require("../assets/images/icon01.png")}
        style={[
          styles.footprint,
          { top: "50%", right: "10%", transform: [{ rotate: "20deg" }] },
        ]}
      />
      <Image
        source={require("../assets/images/icon01.png")}
        style={[
          styles.footprint,
          { top: "55%", right: "15%", transform: [{ rotate: "10deg" }] },
        ]}
      />

      <View style={styles.content}>
        <View style={styles.textContainer}>
          <Text style={styles.mainText}>猫好き同士で繋がれる</Text>
          <Text style={styles.mainText}>優しいマッチングアプリ</Text>
        </View>

        <View style={styles.imageWrapper}>
          <Image
            source={require("../assets/images/img01.png")}
            style={styles.mainImage}
          />
        </View>

        <View style={styles.indicatorContainer}>
          <View style={[styles.dot, styles.activeDot]} />
          <View style={styles.dot} />
          <View style={styles.dot} />
          <View style={styles.dot} />
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() => openModal(true)} // 新規登録モード
          >
            <Text style={styles.primaryButtonText}>新規会員登録をする</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() => openModal(false)} // ログインモード
          >
            <Text style={styles.secondaryButtonText}>ログイン</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* ポップアップ本体 */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalView}>
            {/* ロゴ（ファイル名を確認してください） */}
            <Image
              source={require("../assets/images/logo.png")}
              style={styles.modalLogo}
            />

            <TouchableOpacity style={styles.lineButton}>
              <Image
                source={require("../assets/images/icon02.png")}
                style={[styles.modalLogo, { width: 60, height: 20 }]} // ここで個別に指定！
              />
              <Text style={styles.lineButtonText}>
                {isSignUp ? "LINEでサインイン" : "LINEで続ける"}
              </Text>
            </TouchableOpacity>

            <View style={styles.separatorContainer}>
              <View style={styles.line} />
              <Text style={styles.orText}>または</Text>
              <View style={styles.line} />
            </View>

            <TouchableOpacity style={styles.snsButton}>
              <Text style={styles.snsButtonText}>
                {isSignUp ? "電話番号でサインイン" : "電話番号で続ける"}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.snsButton}>
              <Text style={styles.snsButtonText}>
                {isSignUp ? "Appleでサインイン" : "Appleで続ける"}
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={() => setModalVisible(false)}
            style={styles.closeButton}
          >
            <Text style={styles.closeButtonText}>✕</Text>
            <Text style={styles.closeButtonText}>閉じる</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FDFBEE",
  },
  content: {
    flex: 1,
    zIndex: 1,
    alignItems: "center",
    justifyContent: "space-around",
    paddingVertical: 40,
  },
  textContainer: {
    alignItems: "center",
  },
  mainText: {
    fontSize: 20,
    color: "#333",
    fontWeight: "500",
    lineHeight: 32,
    textAlign: "center",
  },
  footprint: {
    position: "absolute",
    width: 30,
    height: 30,
    zIndex: 0,
  },
  imageWrapper: {
    width: 280,
    height: 280,
    borderRadius: 140,
    overflow: "hidden",
  },
  mainImage: {
    width: "100%",
    height: "100%",
  },
  indicatorContainer: {
    flexDirection: "row",
    gap: 8,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#D1D1D1",
  },
  activeDot: {
    backgroundColor: "#3B76AD",
    width: 25,
  },
  buttonContainer: {
    width: "100%",
    paddingHorizontal: 30,
    gap: 15,
  },
  primaryButton: {
    backgroundColor: "#3B76AD",
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
  },
  primaryButtonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  secondaryButton: {
    backgroundColor: "#FFF",
    height: 56,
    borderRadius: 28,
    borderWidth: 1,
    borderColor: "#3B76AD",
    alignItems: "center",
    justifyContent: "center",
  },
  secondaryButtonText: {
    color: "#3B76AD",
    fontSize: 18,
    fontWeight: "bold",
  },
  // モーダル用のスタイル
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    width: "85%",
    backgroundColor: "#FDFBEE",
    borderRadius: 20,
    padding: 30,
    alignItems: "center",
  },
  modalLogo: {
    width: 120,
    height: 60,
    resizeMode: "contain",
    marginBottom: 20,
  },
  lineButton: {
    backgroundColor: "#06C755",
    width: "100%",
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  lineButtonText: { color: "#FFF", fontWeight: "bold" },
  snsButton: {
    backgroundColor: "#FFF",
    width: "100%",
    height: 50,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "#D1D1D1",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  snsButtonText: { color: "#333" },
  separatorContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 15,
  },
  line: { flex: 1, height: 1, backgroundColor: "#D1D1D1" },
  orText: { marginHorizontal: 10, color: "#999", fontSize: 12 },
  closeButton: { marginTop: 10 },
  closeButtonText: { color: "#fff", textAlign: "center" },
});
