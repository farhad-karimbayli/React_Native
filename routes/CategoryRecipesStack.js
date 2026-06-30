import { Image, Pressable, StyleSheet } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import CategoryRecipesScreen from "../screens/CategoryRecipesScreen";
import RecipeDetailsScreen from "../screens/RecipeDetailScreen";
import RecipeListByCategory from "../screens/RecipeListByCategoryList";
import { RECIPES } from "../data/recipes";

const Stack = createNativeStackNavigator();

const CategoryRecipesStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Categories"
      screenOptions={{
        headerStyle: { backgroundColor: "#20232A" },
        headerTintColor: "#61DAFB",
        headerTitleStyle: { fontWeight: "bold" },
      }}
    >
      <Stack.Screen
        name="Categories"
        component={CategoryRecipesScreen}
        options={{ title: "Категории" }}
      />
      <Stack.Screen
        name="RecipeListByCategory"
        component={RecipeListByCategory}
      />
      <Stack.Screen
        name="RecipeDetail"
        component={RecipeDetailsScreen}
        options={({ navigation }) => ({
          headerRight: () => {
            const r = RECIPES[Math.floor(Math.random() * RECIPES.length)];

            return (
              <Pressable
                onPress={() =>
                  navigation.navigate("RecipeDetail", { recipe: r })
                }
              >
                <Image
                  style={styles.diceIcon}
                  source={require("../assets/icons/dice-cube-icon.png")}
                />
              </Pressable>
            );
          },
        })}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  diceIcon: { width: 40, height: 40 },
});

export default CategoryRecipesStack;
