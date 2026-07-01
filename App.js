import "react-native-gesture-handler";

import { NavigationContainer } from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import FavoritesProvider from "./context/FavoritesContext";
import RecipeDataProvider from "./context/RecipeDataContext";
import RootDrawer from "./routes/RootDrawer";

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <FavoritesProvider>
        <RecipeDataProvider>
          <NavigationContainer>
            <RootDrawer />
          </NavigationContainer>
        </RecipeDataProvider>
      </FavoritesProvider>
    </GestureHandlerRootView>
  );
}
