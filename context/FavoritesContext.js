import { createContext, useContext, useEffect, useState } from "react";

import { load, save } from "../utils/storage";

export const FavoritesContext = createContext();

const FAVORITES_STORAGE_KEY = "favorites";

const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let mounted = true;

    const loadFavorites = async () => {
      const storedFavorites = await load(FAVORITES_STORAGE_KEY, []);

      if (mounted) {
        setFavorites(Array.isArray(storedFavorites) ? storedFavorites : []);
        setLoaded(true);
      }
    };

    loadFavorites();

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    if (loaded) {
      save(FAVORITES_STORAGE_KEY, favorites);
    }
  }, [favorites, loaded]);

  const toggleFavorite = (recipe) => {
    setFavorites((prev) =>
      prev.some((item) => item.id === recipe.id)
        ? prev.filter((item) => item.id !== recipe.id)
        : [...prev, recipe],
    );
  };

  const isFavorite = (id) => favorites.some((recipe) => recipe.id === id);

  return (
    <FavoritesContext.Provider
      value={{ favorites, toggleFavorite, isFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoritesContext);

export default FavoritesProvider;
