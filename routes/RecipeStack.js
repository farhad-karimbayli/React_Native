import RecipeListScreen from "../screens/RecipeListScreen";
import RecipeDetailsScreen from "../screens/RecipeDetailScreen";
import { Image, Pressable, Text, View, StyleSheet } from "react-native";
import { RECIPES } from "../data/recipes";
import RecipeListByCategory from "../screens/RecipeListByCategoryList";
import AboutAppScreen from "../screens/AboutAppScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

const RecipeStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="RecipeList"
      screenOptions={{
        headerStyle: { backgroundColor: "#20232A" },
        headerTintColor: "#61DAFB",
        headerTitleStyle: { fontWeight: "bold" },
      }}
    >
      <Stack.Screen
        name="RecipeList"
        component={RecipeListScreen}
        options={({ navigation }) => ({
          title: "Что приготовить?",

          headerRight: () => {
            const r = RECIPES[Math.floor(Math.random() * RECIPES.length)];

            return (
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  columnGap: 16,
                }}
              >
                <Pressable
                  onPress={() =>
                    navigation.navigate("RecipeDetail", {
                      recipe: r,
                    })
                  }
                >
                  <Image
                    style={styles.diceIcon}
                    source={require("../assets/icons/dice-cube-icon.png")}
                  />
                </Pressable>
                <Pressable
                  onPress={() => {
                    navigation.navigate("AboutApp");
                  }}
                >
                  <Text style={styles.aboutLink}>О нас</Text>
                </Pressable>
              </View>
            );
          },
        })}
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
      <Stack.Screen
        name="RecipeListByCategory"
        component={RecipeListByCategory}
      />
      <Stack.Screen
        name="AboutApp"
        component={AboutAppScreen}
        options={{ title: "О приложении" }}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  diceIcon: { width: 40, height: 40 },
  aboutLink: { color: "#61DAFB", fontSize: 16, fontWeight: "600" },
});

export default RecipeStack;
