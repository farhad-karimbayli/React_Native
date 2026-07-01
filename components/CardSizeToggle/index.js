import { Pressable, StyleSheet, Text, View } from "react-native";

import { useRecipeData } from "../../context/RecipeDataContext";

const OPTIONS = [
  { label: "Мелкие", value: "small" },
  { label: "Крупные", value: "large" },
];

const CardSizeToggle = () => {
  const { cardSize, setCardSizePreference } = useRecipeData();

  return (
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
  );
};

const styles = StyleSheet.create({
  wrap: {
    alignSelf: "flex-end",
    flexDirection: "row",
    marginHorizontal: 6,
    marginBottom: 8,
    overflow: "hidden",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#cbd5e1",
    backgroundColor: "#fff",
  },
  option: {
    minWidth: 82,
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  activeOption: {
    backgroundColor: "#20232A",
  },
  text: {
    color: "#334155",
    fontSize: 13,
    fontWeight: "700",
  },
  activeText: {
    color: "#61DAFB",
  },
});

export default CardSizeToggle;
