import "react-native-gesture-handler";

import { NavigationContainer } from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import FavoritesProvider from "./context/FavoritesContext";
import RootDrawer from "./routes/RootDrawer";

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <FavoritesProvider>
        <NavigationContainer>
          <RootDrawer />
        </NavigationContainer>
      </FavoritesProvider>
    </GestureHandlerRootView>
  );
}
