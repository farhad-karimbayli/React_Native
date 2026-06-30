import { createContext, useContext, useState } from "react";

export const FavoritesContext = createContext();

const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

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
