import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import { load, save } from "../utils/storage";

const RecipeDataContext = createContext();

const STORAGE_KEYS = {
  notes: "recipeNotes",
  views: "recipeViews",
  history: "recipeHistory",
  favoriteCategory: "favoriteCategory",
  cardSize: "cardSize",
  lastSearchQuery: "lastSearchQuery",
};

const HISTORY_LIMIT = 5;

const normalizeCardSize = (value) => (value === "small" ? "small" : "large");

const RecipeDataProvider = ({ children }) => {
  const [loaded, setLoaded] = useState(false);
  const [notes, setNotes] = useState({});
  const [views, setViews] = useState({});
  const [history, setHistory] = useState([]);
  const [favoriteCategory, setFavoriteCategory] = useState(null);
  const [cardSize, setCardSize] = useState("large");
  const [lastSearchQuery, setLastSearchQueryState] = useState("");

  useEffect(() => {
    let mounted = true;

    const loadData = async () => {
      const [
        storedNotes,
        storedViews,
        storedHistory,
        storedFavoriteCategory,
        storedCardSize,
        storedLastSearchQuery,
      ] = await Promise.all([
        load(STORAGE_KEYS.notes, {}),
        load(STORAGE_KEYS.views, {}),
        load(STORAGE_KEYS.history, []),
        load(STORAGE_KEYS.favoriteCategory, null),
        load(STORAGE_KEYS.cardSize, "large"),
        load(STORAGE_KEYS.lastSearchQuery, ""),
      ]);

      if (!mounted) {
        return;
      }

      setNotes(
        storedNotes && typeof storedNotes === "object" && !Array.isArray(storedNotes)
          ? storedNotes
          : {},
      );
      setViews(
        storedViews && typeof storedViews === "object" && !Array.isArray(storedViews)
          ? storedViews
          : {},
      );
      setHistory(Array.isArray(storedHistory) ? storedHistory.slice(0, HISTORY_LIMIT) : []);
      setFavoriteCategory(
        typeof storedFavoriteCategory === "string" ? storedFavoriteCategory : null,
      );
      setCardSize(normalizeCardSize(storedCardSize));
      setLastSearchQueryState(
        typeof storedLastSearchQuery === "string" ? storedLastSearchQuery : "",
      );
      setLoaded(true);
    };

    loadData();

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    if (loaded) {
      save(STORAGE_KEYS.notes, notes);
    }
  }, [loaded, notes]);

  useEffect(() => {
    if (loaded) {
      save(STORAGE_KEYS.views, views);
    }
  }, [loaded, views]);

  useEffect(() => {
    if (loaded) {
      save(STORAGE_KEYS.history, history);
    }
  }, [loaded, history]);

  useEffect(() => {
    if (loaded) {
      save(STORAGE_KEYS.favoriteCategory, favoriteCategory);
    }
  }, [favoriteCategory, loaded]);

  useEffect(() => {
    if (loaded) {
      save(STORAGE_KEYS.cardSize, cardSize);
    }
  }, [cardSize, loaded]);

  useEffect(() => {
    if (loaded) {
      save(STORAGE_KEYS.lastSearchQuery, lastSearchQuery);
    }
  }, [lastSearchQuery, loaded]);

  const setNote = useCallback((recipeId, note) => {
    setNotes((prev) => ({
      ...prev,
      [recipeId]: note,
    }));
  }, []);

  const recordRecipeView = (recipe) => {
    const viewedAt = Date.now();

    setViews((prev) => ({
      ...prev,
      [recipe.id]: (Number(prev[recipe.id]) || 0) + 1,
    }));

    setHistory((prev) => {
      const nextItem = { ...recipe, viewedAt };
      const withoutCurrent = prev.filter((item) => item.id !== recipe.id);

      return [nextItem, ...withoutCurrent].slice(0, HISTORY_LIMIT);
    });
  };

  const clearHistory = useCallback(() => {
    setHistory([]);
  }, []);

  const rememberCategory = useCallback((category) => {
    if (category) {
      setFavoriteCategory(category);
    }
  }, []);

  const setCardSizePreference = useCallback((size) => {
    setCardSize(normalizeCardSize(size));
  }, []);

  const setLastSearchQuery = useCallback((query) => {
    setLastSearchQueryState(query);
  }, []);

  return (
    <RecipeDataContext.Provider
      value={{
        cardSize,
        clearHistory,
        favoriteCategory,
        history,
        loaded,
        lastSearchQuery,
        notes,
        recordRecipeView,
        rememberCategory,
        setCardSizePreference,
        setLastSearchQuery,
        setNote,
        views,
      }}
    >
      {children}
    </RecipeDataContext.Provider>
  );
};

export const useRecipeData = () => useContext(RecipeDataContext);

export default RecipeDataProvider;
