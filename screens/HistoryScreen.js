import { FlatList, Pressable, StyleSheet, Text, useWindowDimensions, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import CardSizeToggle from "../components/CardSizeToggle";
import PressableCard from "../components/PressableCard";
import RecipeCard from "../components/RecipeCard";
import { useRecipeData } from "../context/RecipeDataContext";
import { getRecipeColumns } from "../utils/cardLayout";

const HistoryScreen = () => {
  const navigation = useNavigation();
  const { cardSize, clearHistory, history } = useRecipeData();
  const { width, height } = useWindowDimensions();
  const numColumns = getRecipeColumns(cardSize, width, height);

  return (
    <View style={styles.screen}>
      <View style={styles.headerRow}>
        <CardSizeToggle />
        <Pressable
          disabled={!history.length}
          onPress={clearHistory}
          style={[styles.clearButton, !history.length && styles.disabledButton]}
        >
          <Text style={[styles.clearText, !history.length && styles.disabledText]}>
            Очистить историю
          </Text>
        </Pressable>
      </View>
      <FlatList
        data={history}
        key={numColumns}
        numColumns={numColumns}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 6 }}
        renderItem={({ item }) => (
          <PressableCard
            onPress={() => {
              navigation.navigate("RecipeDetail", { recipe: item });
            }}
            style={{ flex: 1 / numColumns, padding: 7 }}
          >
            <RecipeCard recipe={item} size={cardSize} />
          </PressableCard>
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>История просмотров пока пустая</Text>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingTop: 16,
    paddingHorizontal: 8,
    backgroundColor: "#F4F7FA",
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
  },
  clearButton: {
    marginHorizontal: 6,
    marginBottom: 8,
    borderRadius: 10,
    backgroundColor: "#20232A",
    paddingHorizontal: 12,
    paddingVertical: 9,
  },
  disabledButton: {
    backgroundColor: "#e2e8f0",
  },
  clearText: {
    color: "#61DAFB",
    fontSize: 13,
    fontWeight: "700",
  },
  disabledText: {
    color: "#64748b",
  },
  empty: { textAlign: "center", color: "#64748b", marginTop: 40 },
});

export default HistoryScreen;
