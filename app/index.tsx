import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import { Image, StyleSheet, View } from "react-native";

export default function SplashScreen() {
  const router = useRouter();

  useEffect(() => {
    // 3秒後に認証画面（AuthPage）へ移動する設定（後で作成します）
    const timer = setTimeout(() => {
      router.replace("/auth"); //3秒後の遷移先をauth.tsxにする
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      {/* ロゴ画像 */}
      <Image
        source={require("../assets//images/logo.png")}
        style={styles.logo}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FDFBEE", // デザイン通りのベージュ
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: "contain",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#5A4033", // デザイン通りの茶色
    marginTop: 20,
  },
});
