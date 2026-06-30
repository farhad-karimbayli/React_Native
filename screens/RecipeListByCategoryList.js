import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  useWindowDimensions,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { RECIPES } from "../data/recipes";
import { getMealsByCategory } from "../data/api";
import RecipeCard from "../components/RecipeCard";
import { useState } from "react";
import PressableCard from "../components/PressableCard";
import { useRoute } from "@react-navigation/native";
import { useEffect } from "react";

const RecipeListByCategory = () => {
  const { recipeCategory } = useRoute().params;
  const navigation = useNavigation();
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { width, height } = useWindowDimensions();
  useEffect(() => {
    navigation.setOptions({ title: recipeCategory });
  }, [navigation, recipeCategory]);
  const numColumns = width > height ? 3 : 2;

  const localRecipes = RECIPES.filter((item) => item.category === recipeCategory);
  const filtered = recipes.filter((item) =>
    item.name.toLowerCase().includes(query.toLowerCase()),
  );

  const loadRecipes = async () => {
    try {
      setLoading(true);
      setError(null);
      setRecipes(await getMealsByCategory(recipeCategory));
    } catch (err) {
      setRecipes(localRecipes);
      setError("Нет сети, показываем локальные рецепты");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRecipes();
  }, [recipeCategory]);

  return (
    <View style={styles.screen}>
      <TextInput
        value={query}
        onChangeText={setQuery}
        placeholder="Поиск в категории..."
        placeholderTextColor={"#94a3b8"}
        style={styles.search}
      />
      {error ? (
        <View style={styles.errorBanner}>
          <Text style={styles.errorText}>{error}</Text>
          <Pressable style={styles.retryButton} onPress={loadRecipes}>
            <Text style={styles.retryText}>Повторить</Text>
          </Pressable>
        </View>
      ) : null}
      {loading ? (
        <ActivityIndicator style={styles.loader} size="large" color="#61DAFB" />
      ) : (
        <FlatList
          data={filtered}
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
              <RecipeCard recipe={item} />
            </PressableCard>
          )}
          ListEmptyComponent={
            <Text style={styles.empty}>Ничего не найдено</Text>
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 8,
    backgroundColor: "#F4F7FA",
  },
  search: {
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    marginHorizontal: 6,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorBanner: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
    marginHorizontal: 6,
    marginBottom: 8,
    borderRadius: 10,
    backgroundColor: "#fee2e2",
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  errorText: {
    flex: 1,
    color: "#991b1b",
    fontSize: 13,
  },
  retryButton: {
    borderRadius: 8,
    backgroundColor: "#20232A",
    paddingHorizontal: 10,
    paddingVertical: 7,
  },
  retryText: {
    color: "#61DAFB",
    fontWeight: "700",
  },
  empty: { textAlign: "center", color: "#64748b", marginTop: 40 },
});

export default RecipeListByCategory;
