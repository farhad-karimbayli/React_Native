import { View, StyleSheet } from "react-native";
import ProfileCard from "./components/ProfileCard";

export default function App() {
  return (
    <View style={styles.container}>
      <ProfileCard
        name="Farhad"
        city="Baku"
        language="C#"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
});