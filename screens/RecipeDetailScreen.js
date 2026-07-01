import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Linking,
  Pressable,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import { useRef } from "react";
import PressableCard from "../components/PressableCard";
import RecipeCard from "../components/RecipeCard";
import { useRecipeData } from "../context/RecipeDataContext";
import { getMealDetailsById, getMealsByCategory } from "../data/api";

const getIngredientImage = (name) =>
  `https://www.themealdb.com/images/ingredients/${encodeURIComponent(name)}-Small.png`;

const IngredientCard = ({ ingredient }) => {
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <View style={styles.ingredientCard}>
      {imageFailed ? (
        <View style={styles.ingredientImageFallback}>
          <Text style={styles.ingredientImageFallbackText}>Нет фото</Text>
        </View>
      ) : (
        <Image
          onError={() => setImageFailed(true)}
          source={{ uri: ingredient.image }}
          style={styles.ingredientImage}
        />
      )}
      <Text style={styles.ingredientName} numberOfLines={2}>
        {ingredient.name}
      </Text>
      {ingredient.measure ? (
        <Text style={styles.ingredientMeasure} numberOfLines={2}>
          {ingredient.measure}
        </Text>
      ) : null}
    </View>
  );
};

const RecipeDetailsScreen = () => {
  const { recipe } = useRoute().params;
  const navigation = useNavigation();
  const viewedRecipeId = useRef(null);
  const { loaded, notes, recordRecipeView, setNote } = useRecipeData();

  useEffect(() => {
    navigation.setOptions({ title: recipe.name });
  }, [navigation, recipe.name]);

  const [full, setFull] = useState();
  const [related, setRelated] = useState([]);
  const [relatedLoading, setRelatedLoading] = useState(false);
  const [instructionsAreFull, setInstructionsAreFull] = useState(false);

  const instructions = full?.strInstructions || recipe.instructions || "";
  const smallInstructions = instructions.slice(0, 240);
  const category = full?.strCategory || recipe.category;
  const note = notes[recipe.id] || "";
  const youtubeUrl = full?.strYoutube || recipe.youtube || "";

  useEffect(() => {
    if (!loaded) {
      return;
    }

    if (viewedRecipeId.current === recipe.id) {
      return;
    }

    viewedRecipeId.current = recipe.id;
    recordRecipeView(recipe);
  }, [loaded, recipe, recipe.id, recordRecipeView]);

  useEffect(() => {
    const getRecipe = async () => {
      try {
        setFull(undefined);
        setFull(await getMealDetailsById(recipe.id));
      } catch (err) {
        setFull(null);
      }
    };

    getRecipe();
  }, [recipe.id]);

  useEffect(() => {
    if (!category) {
      setRelated([]);
      return;
    }

    const getRelated = async () => {
      try {
        setRelatedLoading(true);
        const meals = await getMealsByCategory(category);
        setRelated(meals.filter((item) => item.id !== recipe.id).slice(0, 8));
      } catch (err) {
        setRelated([]);
      } finally {
        setRelatedLoading(false);
      }
    };

    getRelated();
  }, [category, recipe.id]);

  const ingredients = [];

  if (full) {
    for (let i = 1; i <= 20; i++) {
      const ing = full["strIngredient" + i];
      const mea = full["strMeasure" + i];

      if (ing && ing.trim()) {
        const name = ing.trim();
        ingredients.push({
          id: `${name}-${i}`,
          name,
          measure: mea?.trim() || "",
          image: getIngredientImage(name),
        });
      }
    }
  }

  const onShare = async () => {
    try {
      await Share.share({
        message: `Готовим ${recipe.name} (${recipe.area ?? "Unknown"})`,
      });
    } catch (err) {}
  };

  const openVideo = async () => {
    if (!youtubeUrl) {
      return;
    }

    try {
      await Linking.openURL(youtubeUrl);
    } catch (err) {}
  };

  return (
    <ScrollView style={styles.screen}>
        <Image source={{ uri: recipe.thumb }} style={styles.image} />
        <View style={styles.body}>
          <Text style={styles.title}>{recipe.name}</Text>
          <Text style={styles.meta}>Категория: {category ?? "Unknown"}</Text>
          <Text style={styles.meta}>
            Страна: {full?.strArea || recipe.area || "Unknown"}
          </Text>

          <Text style={styles.section}>Ингредиенты</Text>
          {ingredients.length ? (
            <FlatList
              horizontal
              data={ingredients}
              keyExtractor={(item) => item.id}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.ingredientsList}
              renderItem={({ item }) => <IngredientCard ingredient={item} />}
            />
          ) : full === null ? (
            <Text style={styles.muted}>Ингредиенты недоступны офлайн.</Text>
          ) : (
            <Text style={styles.muted}>Загружаем ингредиенты...</Text>
          )}

          <Text style={styles.section}>Инструкции</Text>
          <Text style={styles.instructions}>
            {instructions
              ? instructionsAreFull
                ? instructions
                : smallInstructions
              : "Инструкции пока недоступны."}
          </Text>
          {instructions.length > 240 ? (
            <Pressable
              onPress={() => setInstructionsAreFull((prev) => !prev)}
              style={styles.textButton}
            >
              <Text style={styles.textButtonLabel}>
                {instructionsAreFull ? "Показать меньше" : "Показать больше"}
              </Text>
            </Pressable>
          ) : null}

          <Text style={styles.section}>Личная заметка</Text>
          <TextInput
            value={note}
            onChangeText={(text) => setNote(recipe.id, text)}
            multiline
            placeholder="Напиши заметку к этому рецепту..."
            placeholderTextColor="#94a3b8"
            style={styles.noteInput}
          />
        </View>
        <View style={styles.actions}>
          <Pressable
            disabled={!youtubeUrl}
            style={[styles.pressable, !youtubeUrl && styles.disabledPressable]}
            onPress={openVideo}
          >
            <Text
              style={[
                styles.pressableText,
                !youtubeUrl && styles.disabledPressableText,
              ]}
            >
              Видео-рецепт
            </Text>
          </Pressable>
          <Pressable
            disabled={!category}
            style={[styles.pressable, !category && styles.disabledPressable]}
            onPress={() => {
              navigation.navigate("RecipeListByCategory", {
                recipeCategory: category,
              });
            }}
          >
            <Text
              style={[
                styles.pressableText,
                !category && styles.disabledPressableText,
              ]}
            >
              Ещё из этой категории
            </Text>
          </Pressable>
          <Pressable style={styles.pressable} onPress={onShare}>
            <Text style={styles.pressableText}>Поделиться рецептом</Text>
          </Pressable>
        </View>
        <View style={styles.relatedBlock}>
          <Text style={styles.section}>Похожие</Text>
          {relatedLoading ? (
            <ActivityIndicator color="#61DAFB" />
          ) : related.length ? (
            <FlatList
              horizontal
              data={related}
              keyExtractor={(item) => item.id}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.relatedList}
              renderItem={({ item }) => (
                <PressableCard
                  onPress={() => {
                    navigation.push("RecipeDetail", { recipe: item });
                  }}
                  style={styles.relatedItem}
                >
                  <RecipeCard recipe={item} />
                </PressableCard>
              )}
            />
          ) : (
            <Text style={styles.muted}>Похожие рецепты не найдены.</Text>
          )}
        </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#fff" },
  image: { width: "100%", height: 240 },
  body: { padding: 16 },
  title: { fontSize: 24, fontWeight: "bold", color: "#1e293b" },
  meta: { fontSize: 14, color: "#64748b", marginTop: 4 },
  section: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 6,
    color: "#1e293b",
  },
  text: { fontSize: 15, color: "#334155", lineHeight: 22 },
  muted: { fontSize: 15, color: "#94a3b8", lineHeight: 22 },
  ingredientsList: {
    gap: 10,
    paddingVertical: 4,
  },
  ingredientCard: {
    width: 118,
    minHeight: 162,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 10,
    backgroundColor: "#f8fafc",
    padding: 8,
  },
  ingredientImage: {
    width: "100%",
    height: 76,
    resizeMode: "contain",
  },
  ingredientImageFallback: {
    height: 76,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    backgroundColor: "#e0f2fe",
  },
  ingredientImageFallbackText: {
    color: "#1e6f8e",
    fontSize: 12,
    fontWeight: "700",
  },
  ingredientName: {
    color: "#1e293b",
    fontSize: 13,
    fontWeight: "800",
    marginTop: 8,
  },
  ingredientMeasure: {
    color: "#64748b",
    fontSize: 12,
    lineHeight: 16,
    marginTop: 3,
  },
  instructions: { fontSize: 15, color: "#334155", lineHeight: 22 },
  noteInput: {
    minHeight: 100,
    borderWidth: 1,
    borderColor: "#cbd5e1",
    borderRadius: 10,
    backgroundColor: "#fff",
    color: "#1e293b",
    fontSize: 15,
    lineHeight: 22,
    paddingHorizontal: 12,
    paddingVertical: 10,
    textAlignVertical: "top",
  },
  textButton: {
    alignSelf: "flex-start",
    marginTop: 8,
  },
  textButtonLabel: {
    color: "#1e6f8e",
    fontWeight: "700",
  },
  actions: {
    paddingHorizontal: 16,
    paddingBottom: 10,
    gap: 10,
  },
  pressable: {
    alignItems: "center",
    backgroundColor: "#20232A",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  pressableText: {
    color: "#61DAFB",
    fontWeight: "700",
  },
  disabledPressable: {
    backgroundColor: "#e2e8f0",
  },
  disabledPressableText: {
    color: "#64748b",
  },
  relatedBlock: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  relatedList: {
    gap: 14,
    paddingVertical: 4,
  },
  relatedItem: {
    width: 160,
  },
});

export default RecipeDetailsScreen;
