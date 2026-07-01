import {
  ActivityIndicator,
  FlatList,
  Image,
  Platform,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { useEffect, useRef, useState } from "react";
import { useNavigation } from "@react-navigation/native";

import PressableCard from "../components/PressableCard";
import { useRecipeData } from "../context/RecipeDataContext";
import { getCategories } from "../data/api";
import { RECIPES } from "../data/recipes";

const localCategories = Array.from(
  new Map(
    RECIPES.filter((recipe) => recipe.category).map((recipe) => [
      recipe.category,
      {
        idCategory: recipe.category,
        strCategory: recipe.category,
        strCategoryThumb: recipe.thumb,
        strCategoryDescription: "Локальная категория рецептов",
      },
    ]),
  ).values(),
);

const CategoryRecipesScreen = () => {
  const navigation = useNavigation();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { width, height } = useWindowDimensions();
  const { favoriteCategory, rememberCategory } = useRecipeData();
  const openedDefaultCategory = useRef(false);
  const numColumns = width > height ? 3 : 2;

  const loadCategories = async () => {
    try {
      setLoading(true);
      setError(null);
      setCategories(await getCategories());
    } catch (err) {
      setCategories(localCategories);
      setError(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  useEffect(() => {
    if (openedDefaultCategory.current || !favoriteCategory) {
      return;
    }

    openedDefaultCategory.current = true;
    navigation.navigate("RecipeListByCategory", {
      recipeCategory: favoriteCategory,
    });
  }, [favoriteCategory, navigation]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#61DAFB" />
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      <FlatList
        data={categories}
        key={numColumns}
        numColumns={numColumns}
        keyExtractor={(item) => item.idCategory}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <PressableCard
            onPress={() => {
              rememberCategory(item.strCategory);
              navigation.navigate("RecipeListByCategory", {
                recipeCategory: item.strCategory,
              });
            }}
            style={{ flex: 1 / numColumns, padding: 7 }}
          >
            <View style={styles.card}>
              <Image
                source={{ uri: item.strCategoryThumb }}
                style={styles.image}
              />
              <View style={styles.info}>
                <Text style={styles.title} numberOfLines={1}>
                  {item.strCategory}
                </Text>
                <Text style={styles.description} numberOfLines={2}>
                  {item.strCategoryDescription}
                </Text>
              </View>
            </View>
          </PressableCard>
        )}
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
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F4F7FA",
  },
  list: { padding: 6 },
  card: {
    minHeight: 210,
    backgroundColor: "#fff",
    borderRadius: 12,
    overflow: "hidden",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.12,
        shadowRadius: 5,
      },
      android: { elevation: 3 },
    }),
  },
  image: {
    width: "100%",
    aspectRatio: 1.25,
  },
  info: { padding: 10 },
  title: { fontSize: 15, fontWeight: "bold", color: "#1e293b" },
  description: {
    color: "#64748b",
    fontSize: 12,
    lineHeight: 17,
    marginTop: 4,
  },
  errorText: {
    color: "#075985",
    marginHorizontal: 12,
    marginBottom: 4,
    fontSize: 13,
    fontWeight: "700",
  },
});

export default CategoryRecipesScreen;
