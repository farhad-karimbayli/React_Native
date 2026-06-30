import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

import { useFavorites } from "../context/FavoritesContext";
import FavoriteRecipesStack from "./FavoriteRecipesStack";
import RecipeStack from "./RecipeStack";

const Tab = createBottomTabNavigator();

const Tabs = () => {
  const { favorites } = useFavorites();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: "#1e6f8e",
        tabBarInactiveTintColor: "#94a3b8",
        tabBarIcon: ({ color, size, focused }) => {
          const iconName =
            route.name === "Recipes"
              ? "restaurant"
              : focused
                ? "heart"
                : "heart-outline";

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name="Recipes"
        component={RecipeStack}
        options={({ route }) => ({
          title: "Рецепты",
          tabBarStyle: {
            display:
              getFocusedRouteNameFromRoute(route) === "RecipeDetail"
                ? "none"
                : "flex",
          },
        })}
      />
      <Tab.Screen
        name="Favorites"
        component={FavoriteRecipesStack}
        options={{
          tabBarBadge: favorites.length || undefined,
          title: "Избранное",
        }}
      />
    </Tab.Navigator>
  );
};

export default Tabs;
