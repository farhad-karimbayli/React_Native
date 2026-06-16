import { ScrollView, StyleSheet, Text, View } from "react-native";
import Counter from "./components/Counter";
import HiddenText from "./components/HiddenText";
import LikeCounter from "./components/LikeCounter";
import ProfileCard from "./components/ProfileCard";
import SelectedProfileCard from "./components/SelectedProfileCard";

export default function App() {
  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.container}
      contentInsetAdjustmentBehavior="automatic"
    >
      <View style={styles.header}>
        <Text style={styles.title}>Home work</Text>
        <Text style={styles.subtitle}>useState, onPress and Flexbox</Text>
      </View>

      <View style={styles.grid}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>1. Like button</Text>
          <View style={styles.likeBox}>
            <LikeCounter />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>2. Show / hide text</Text>
          <View style={styles.hiddenTextBox}>
            <HiddenText text="This text can be hidden and then showed again" />
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>3. ProfileCard and choosing card</Text>
        <View style={styles.cards}>
          <ProfileCard name="Farhad" city="Baku" language="C#" />
          <SelectedProfileCard
            name="Aysel"
            role="React Native student"
            avatar="https://i.pravatar.cc/200?img=47"
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Counter </Text>
        <View style={styles.counterBox}>
          <Counter />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  container: {
    padding: 20,
    gap: 16,
  },
  header: {
    gap: 6,
  },
  title: {
    fontSize: 30,
    fontWeight: "700",
    color: "#1f2937",
  },
  subtitle: {
    fontSize: 16,
    color: "#4b5563",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
  },
  section: {
    flexGrow: 1,
    flexBasis: 300,
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 16,
    gap: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
  },
  likeBox: {
    height: 70,
  },
  hiddenTextBox: {
    height: 90,
  },
  cards: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
  },
  counterBox: {
    height: 180,
  },
});
