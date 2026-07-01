import { Pressable, StyleSheet, Text, View } from "react-native";

import { useRecipeData } from "../../context/RecipeDataContext";

const OPTIONS = [
  { label: "Мелкие", value: "small" },
  { label: "Крупные", value: "large" },
];

const CardSizeToggle = () => {
  const { cardSize, setCardSizePreference } = useRecipeData();

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Размер карточек</Text>
      <View style={styles.wrap}>
        {OPTIONS.map((option) => {
          const active = cardSize === option.value;

          return (
            <Pressable
              key={option.value}
              onPress={() => setCardSizePreference(option.value)}
              style={[styles.option, active && styles.activeOption]}
            >
              <Text style={[styles.text, active && styles.activeText]}>
                {option.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 6,
    marginBottom: 10,
  },
  label: {
    color: "#64748b",
    fontSize: 13,
    fontWeight: "700",
    marginBottom: 6,
  },
  wrap: {
    flexDirection: "row",
    height: 48,
    overflow: "hidden",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#cbd5e1",
    backgroundColor: "#fff",
  },
  option: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    minWidth: 0,
  },
  activeOption: {
    backgroundColor: "#20232A",
  },
  text: {
    color: "#334155",
    fontSize: 16,
    fontWeight: "800",
  },
  activeText: {
    color: "#61DAFB",
  },
});

export default CardSizeToggle;
