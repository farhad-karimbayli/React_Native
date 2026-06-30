import { Image, Platform, Pressable, StyleSheet, Text, View } from "react-native";

import { useFavorites } from "../../context/FavoritesContext";

const RecipeCard = ({ recipe }) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorite = isFavorite(recipe.id);

  return (
    <View style={styles.card}>
      <Image source={{ uri: recipe.thumb }} style={styles.image} />
      <Pressable
        hitSlop={10}
        onPress={(event) => {
          event.stopPropagation?.();
          toggleFavorite(recipe);
        }}
        style={styles.favoriteButton}
      >
        <Text style={styles.favoriteIcon}>{favorite ? "❤️" : "🤍"}</Text>
      </Pressable>
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={1}>
          {recipe.name}
        </Text>
        <Text style={styles.category}>{recipe.category}</Text>
        <Text style={styles.area}>{recipe.area ?? "Unknown"}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
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
    aspectRatio: 1,
  },
  favoriteButton: {
    position: "absolute",
    top: 8,
    left: 8,
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.86)",
  },
  favoriteIcon: {
    fontSize: 20,
  },
  info: {
    padding: 10,
  },
  area: {
    position: "absolute",
    top: 8,
    right: 8,
    maxWidth: "48%",
    backgroundColor: "#15803d",
    paddingHorizontal: 6,
    paddingVertical: 4,
    color: "#fff",
    borderRadius: 8,
    fontSize: 10,
    overflow: "hidden",
  },
  title: { fontSize: 15, fontWeight: "bold", color: "#1e293b" },
  category: { fontSize: 12, color: "#64748b", marginTop: 2 },
});

export default RecipeCard;
