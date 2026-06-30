import { createDrawerNavigator } from "@react-navigation/drawer";

import Tabs from "./Tabs";
import AboutAppScreen from "../screens/AboutAppScreen";
import CategoryRecipesStack from "./CategoryRecipesStack";

const Drawer = createDrawerNavigator();

const RootDrawer = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "#20232A" },
        headerTintColor: "#61DAFB",
        headerTitleStyle: { fontWeight: "bold" },
      }}
    >
      <Drawer.Screen
        name="Main"
        component={Tabs}
        options={{ title: "Рецепты" }}
      />
      <Drawer.Screen
        name="Categories"
        component={CategoryRecipesStack}
        options={{ title: "Категории" }}
      />
      <Drawer.Screen
        name="About"
        component={AboutAppScreen}
        options={{ title: "О приложении" }}
      />
    </Drawer.Navigator>
  );
};

export default RootDrawer;
