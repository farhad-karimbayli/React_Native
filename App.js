import "react-native-gesture-handler";

import { NavigationContainer } from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import FavoritesProvider from "./context/FavoritesContext";
import RecipeDataProvider from "./context/RecipeDataContext";
import RootDrawer from "./routes/RootDrawer";
import { SQLiteProvider } from "expo-sqlite";


async function initDb(db) {
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS notes (
     id  INTEGER PRIMARY KEY AUTOINCREMENT,
     recipeId TEXT NOT NULL,
     text TEXT NOT NULL,A
     createdAt TEXT DEFAULT (datetime('now'))
    );
  `);

  const columns = await db.getAllAsync("PRAGMA table_info(notes)");
  const hasRecipeId = columns.some((column) => column.name === "recipeId");
  const hasTypoRecipeId = columns.some((column) => column.name === "recipedId");
}

export default function App() {
  return (
    <SQLiteProvider databaseName="recipes.db" onInit={initDb}>
      <GestureHandlerRootView style={{ flex: 1 }}>
      <FavoritesProvider>
        <RecipeDataProvider>
          <NavigationContainer>
            <RootDrawer />
          </NavigationContainer>
        </RecipeDataProvider>
      </FavoritesProvider>
    </GestureHandlerRootView>
    </SQLiteProvider>
  );
}
