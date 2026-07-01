import { Image, Linking, Pressable, StyleSheet, Text, View } from "react-native";

const AboutAppScreen = () => {
  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Рецепты</Text>
      <Text style={styles.text}>
        Учебное приложение с поиском блюд, избранным, категориями и деталями из
        TheMealDB.
      </Text>
      <Pressable
        onPress={() =>
          Linking.openURL("hhttps://github.com/farhad-karimbayli/React_Native/")
        }
      >
        <Image
          style={styles.githubIcon}
          source={require("../assets/icons/github-icon.png")}
        />
      </Pressable>
      <Text style={styles.linkText}>GitHub</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 20,
    paddingHorizontal: 8,
    backgroundColor: "#F4F7FA",
  },
  title: {
    color: "#1e293b",
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 12,
  },
  text: {
    maxWidth: 320,
    color: "#334155",
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 24,
    textAlign: "center",
  },
  githubIcon: { width: 120, height: 120 },
  linkText: {
    marginTop: 10,
    color: "#1e6f8e",
    fontWeight: "700",
  },
});

export default AboutAppScreen;
