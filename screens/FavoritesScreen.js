import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  useWindowDimensions,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import CardSizeToggle from "../components/CardSizeToggle";
import RecipeCard from "../components/RecipeCard";
import { useEffect, useState } from "react";
import PressableCard from "../components/PressableCard";
import { useFavorites } from "../context/FavoritesContext";
import { useRecipeData } from "../context/RecipeDataContext";
import { getMealById } from "../data/api";
import { getRecipeColumns } from "../utils/cardLayout";

const FavoritesScreen = () => {
  const navigation = useNavigation();
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { width, height } = useWindowDimensions();
  const { favorites } = useFavorites();
  const { cardSize } = useRecipeData();
  const numColumns = getRecipeColumns(cardSize, width, height);
  const favoriteIds = favorites.map((item) =>
    typeof item === "string" ? item : item.id,
  );

  const filtered = recipes.filter((item) =>
    item.name.toLowerCase().includes(query.toLowerCase()),
  );

  const loadFavorites = async () => {
    if (!favoriteIds.length) {
      setRecipes([]);
      setLoading(false);
      setError(null);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const freshRecipes = await Promise.all(
        favoriteIds.map((id) => getMealById(id)),
      );
      setRecipes(freshRecipes.filter(Boolean));
    } catch (err) {
      setRecipes(favorites.filter((item) => typeof item !== "string"));
      setError(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFavorites();
  }, [favorites]);

  return (
    <View style={styles.screen}>
      <TextInput
        value={query}
        onChangeText={setQuery}
        placeholder="Поиск в избранном..."
        placeholderTextColor={"#94a3b8"}
        style={styles.search}
      />
      <CardSizeToggle />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
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
              <RecipeCard recipe={item} size={cardSize} />
            </PressableCard>
          )}
          ListEmptyComponent={
            <Text style={styles.empty}>В избранном пока ничего нет</Text>
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
  errorText: {
    color: "#075985",
    marginHorizontal: 12,
    marginBottom: 4,
    fontSize: 13,
    fontWeight: "700",
  },
  empty: { textAlign: "center", color: "#64748b", marginTop: 40 },
});

export default FavoritesScreen;
