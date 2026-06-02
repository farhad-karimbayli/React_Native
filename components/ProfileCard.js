import { View, Text, StyleSheet } from "react-native";

export default function ProfileCard(props) {
  return (
    <View style={styles.card}>
      <Text style={styles.name}>{props.name}</Text>
      <Text>Город: {props.city}</Text>
      <Text>Любимый язык программирования: {props.language}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 20,
    width: 300,
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },
});