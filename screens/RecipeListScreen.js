import {
  ActivityIndicator,
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  useWindowDimensions,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { RECIPES } from "../data/recipes";
import {
  getAreas,
  getMealsByArea,
  getMealsByFirstLetter,
  getMealsBySearch,
} from "../data/api";
import RecipeCard from "../components/RecipeCard";
import { useEffect, useState } from "react";
import PressableCard from "../components/PressableCard";

const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
const FALLBACK_AREAS = [
  "Italian",
  "Canadian",
  "Chinese",
  "British",
  "French",
  "Japanese",
  "Mexican",
];

const RecipeListScreen = () => {
  const [recipes, setRecipes] = useState([]);
  const [areas, setAreas] = useState(FALLBACK_AREAS);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigation = useNavigation();
  const [query, setQuery] = useState("");
  const [activeLetter, setActiveLetter] = useState(null);
  const [activeArea, setActiveArea] = useState(null);
  const { width, height } = useWindowDimensions();
  const numColumns = width > height ? 3 : 2;

  const localRecipes = RECIPES.filter((item) =>
    item.name.toLowerCase().includes(query.toLowerCase()),
  );
  const getLocalRecipes = (type, value) => {
    if (type === "letter") {
      return RECIPES.filter((item) =>
        item.name.toLowerCase().startsWith(value.toLowerCase()),
      );
    }

    if (type === "area") {
      return RECIPES.filter((item) => item.area === value);
    }

    return localRecipes;
  };

  const getMeals = async ({ type = "search", value = query.trim() } = {}) => {
    try {
      setLoading(true);
      setError(null);

      if (type === "letter") {
        setRecipes(await getMealsByFirstLetter(value));
        return;
      }

      if (type === "area") {
        setRecipes(await getMealsByArea(value));
        return;
      }

      setRecipes(await getMealsBySearch(value));
    } catch (err) {
      setRecipes(getLocalRecipes(type, value));
      setError("Нет сети, показываем локальные рецепты");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const loadAreas = async () => {
      try {
        setAreas(await getAreas());
      } catch (err) {
        setAreas(FALLBACK_AREAS);
      }
    };

    loadAreas();
  }, []);

  useEffect(() => {
    if (activeLetter || activeArea) {
      return;
    }

    const timeout = setTimeout(() => {
      getMeals({ type: "search", value: query.trim() });
    }, 500);

    return () => clearTimeout(timeout);
  }, [query, activeLetter, activeArea]);

  const selectLetter = (letter) => {
    setQuery("");
    setActiveArea(null);
    setActiveLetter(letter);
    getMeals({ type: "letter", value: letter.toLowerCase() });
  };

  const selectArea = (area) => {
    setQuery("");
    setActiveLetter(null);
    setActiveArea(area);
    getMeals({ type: "area", value: area });
  };

  const clearFilters = () => {
    setQuery("");
    setActiveLetter(null);
    setActiveArea(null);
    getMeals({ type: "search", value: "" });
  };

  return (
    <View style={styles.screen}>
      <TextInput
        value={query}
        onChangeText={(text) => {
          setActiveLetter(null);
          setActiveArea(null);
          setQuery(text);
        }}
        placeholder="Поиск рецепта..."
        placeholderTextColor={"#94a3b8"}
        style={styles.search}
      />
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.chips}
      >
        <Pressable
          onPress={clearFilters}
          style={[
            styles.chip,
            !activeLetter && !activeArea && !query ? styles.activeChip : null,
          ]}
        >
          <Text
            style={[
              styles.chipText,
              !activeLetter && !activeArea && !query
                ? styles.activeChipText
                : null,
            ]}
          >
            Все
          </Text>
        </Pressable>
        {LETTERS.map((letter) => (
          <Pressable
            key={letter}
            onPress={() => selectLetter(letter)}
            style={[styles.chip, activeLetter === letter && styles.activeChip]}
          >
            <Text
              style={[
                styles.chipText,
                activeLetter === letter && styles.activeChipText,
              ]}
            >
              {letter}
            </Text>
          </Pressable>
        ))}
      </ScrollView>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.chips}
      >
        {areas.map((area) => (
          <Pressable
            key={area}
            onPress={() => selectArea(area)}
            style={[styles.areaChip, activeArea === area && styles.activeChip]}
          >
            <Text
              style={[
                styles.chipText,
                activeArea === area && styles.activeChipText,
              ]}
            >
              {area}
            </Text>
          </Pressable>
        ))}
      </ScrollView>
      {error ? (
        <View style={styles.errorBanner}>
          <Text style={styles.errorText}>{error}</Text>
          <Pressable
            style={styles.retryButton}
            onPress={() => {
              if (activeLetter) {
                getMeals({
                  type: "letter",
                  value: activeLetter.toLowerCase(),
                });
                return;
              }

              if (activeArea) {
                getMeals({ type: "area", value: activeArea });
                return;
              }

              getMeals({ type: "search", value: query.trim() });
            }}
          >
            <Text style={styles.retryText}>Повторить</Text>
          </Pressable>
        </View>
      ) : null}
      {loading ? (
        <ActivityIndicator style={styles.loader} size="large" color="#61DAFB" />
      ) : (
        <FlatList
          data={recipes}
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
  chips: {
    gap: 8,
    paddingHorizontal: 6,
    paddingBottom: 8,
  },
  chip: {
    minWidth: 38,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#e2e8f0",
    paddingHorizontal: 11,
    paddingVertical: 8,
  },
  areaChip: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#e2e8f0",
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  activeChip: {
    backgroundColor: "#20232A",
    borderColor: "#20232A",
  },
  chipText: {
    color: "#334155",
    fontSize: 13,
    fontWeight: "700",
  },
  activeChipText: {
    color: "#61DAFB",
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

export default RecipeListScreen;
