import { useState } from "react";
import { Image, Platform, Pressable, StyleSheet, Text, View } from "react-native";

import { useFavorites } from "../../context/FavoritesContext";
import { useRecipeData } from "../../context/RecipeDataContext";

const RecipeCard = ({ recipe, size = "large" }) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const { views } = useRecipeData();
  const [imageFailed, setImageFailed] = useState(false);
  const favorite = isFavorite(recipe.id);
  const viewCount = Number(views[recipe.id]) || 0;
  const isSmall = size === "small";

  return (
    <View style={styles.card}>
      {recipe.thumb && !imageFailed ? (
        <Image
          onError={() => setImageFailed(true)}
          source={{ uri: recipe.thumb }}
          style={styles.image}
        />
      ) : (
        <View style={styles.imageFallback}>
          <Text style={styles.imageFallbackTitle} numberOfLines={1}>
            {recipe.name}
          </Text>
          <Text style={styles.imageFallbackText}>Нет фото</Text>
        </View>
      )}
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
      <View style={[styles.info, isSmall && styles.smallInfo]}>
        <Text style={[styles.title, isSmall && styles.smallTitle]} numberOfLines={1}>
          {recipe.name}
        </Text>
        <Text style={[styles.category, isSmall && styles.smallMeta]} numberOfLines={1}>
          {recipe.category}
        </Text>
        <Text style={[styles.views, isSmall && styles.smallMeta]}>
          Просмотров: {viewCount}
        </Text>
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
  imageFallback: {
    width: "100%",
    aspectRatio: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#e0f2fe",
    padding: 12,
  },
  imageFallbackTitle: {
    color: "#075985",
    fontSize: 14,
    fontWeight: "800",
    textAlign: "center",
  },
  imageFallbackText: {
    color: "#1e6f8e",
    fontSize: 12,
    fontWeight: "700",
    marginTop: 6,
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
  smallInfo: {
    padding: 8,
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
  smallTitle: { fontSize: 13 },
  category: { fontSize: 12, color: "#64748b", marginTop: 2 },
  views: { fontSize: 11, color: "#1e6f8e", marginTop: 3, fontWeight: "700" },
  smallMeta: { fontSize: 10 },
});

export default RecipeCard;
