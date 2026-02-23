import React from "react";
import {
    Image,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

export default function AuthPage() {
  return (
    <SafeAreaView style={styles.container}>
      {/* 背景用の足跡エリア */}
      <Image
        source={require("../assets/images/icon01.png")} // もし可能ならPNGに書き出すのが一番簡単です
        style={[
          styles.footprint,
          { top: "25%", left: "10%", transform: [{ rotate: "-20deg" }] },
        ]}
      />
      {/* 足跡2（左上・少し下） */}
      <Image
        source={require("../assets/images/icon01.png")}
        style={[
          styles.footprint,
          { top: "30%", left: "15%", transform: [{ rotate: "-10deg" }] },
        ]}
      />
      {/* 足跡3（右上・少し下） */}
      <Image
        source={require("../assets/images/icon01.png")}
        style={[
          styles.footprint,
          { top: "50%", right: "10%", transform: [{ rotate: "20deg" }] },
        ]}
      />
      {/* 足跡4（右下・少し下） */}
      <Image
        source={require("../assets/images/icon01.png")}
        style={[
          styles.footprint,
          { top: "55%", right: "15%", transform: [{ rotate: "10deg" }] },
        ]}
      />
      <View style={styles.content}>
        {/* 上部のテキスト */}
        <View style={styles.textContainer}>
          <Text style={styles.mainText}>猫好き同士で繋がれる</Text>
          <Text style={styles.mainText}>優しいマッチングアプリ</Text>
        </View>

        {/* メイン画像（猫と女性） */}
        {/* 実際の画像ファイルがあれば assets に入れて source を書き換えてください */}
        <View style={styles.imageWrapper}>
          <Image
            source={require("../assets//images/img01.png")} // 一旦テスト用画像
            style={styles.mainImage}
          />
        </View>

        {/* ページインジケーター（青いドット） */}
        <View style={styles.indicatorContainer}>
          <View style={[styles.dot, styles.activeDot]} />
          <View style={styles.dot} />
          <View style={styles.dot} />
          <View style={styles.dot} />
        </View>

        {/* ボタンエリア */}
        <View style={styles.buttonContainer}>
          {/* 新規会員登録ボタン */}
          <TouchableOpacity style={styles.primaryButton} activeOpacity={0.8}>
            <Text style={styles.primaryButtonText}>新規会員登録をする</Text>
          </TouchableOpacity>

          {/* ログインボタン */}
          <TouchableOpacity style={styles.secondaryButton} activeOpacity={0.7}>
            <Text style={styles.secondaryButtonText}>ログイン</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FDFBEE", // デザイン通りのベージュ
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around", // 要素をバランスよく配置
    paddingVertical: 40,
  },
  textContainer: {
    alignItems: "center",
  },
  mainText: {
    fontSize: 20,
    color: "#333",
    fontWeight: 500,
    lineHeight: 32,
    letterSpacing: 0,
    textAlign: "center",
  },
  footprint: {
    position: "absolute", // 画面の好きな場所に置くために必須
    width: 30, // 足跡の横幅（デザインに合わせて調整してください）
    height: 30, // 足跡の高さ
    zIndex: 0, // 他の要素の下に配置
  },
  // ------------------
  content: {
    flex: 1,
    zIndex: 1, // コンテンツを足跡より上に
    alignItems: "center",
    justifyContent: "space-around",
    paddingVertical: 40,
  },
  imageWrapper: {
    width: 280,
    height: 280,
    borderRadius: 140, // 正円にする
    overflow: "hidden",
    borderWidth: 0,
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
    backgroundColor: "#3B76AD", // デザインの青
    width: 25, // アクティブなドットだけ少し長く
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
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
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
});
