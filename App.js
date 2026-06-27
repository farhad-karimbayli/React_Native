import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import RecipeListScreen from './screens/RecipeListScreen';
import RecipeDetailScreen from './screens/RecipeDetailScreen';
import CategoryRecipesScreen from './screens/CategoryRecipesScreen';
import AboutScreen from './screens/AboutScreen';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { RECIPES } from './data/recipes';

const Stack = createNativeStackNavigator()

const getRandomRecipe = () => RECIPES[Math.floor(Math.random() * RECIPES.length)]

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='RecipeList'
        screenOptions={{
          headerStyle: { backgroundColor: '#20232A' },
          headerTintColor: '#61DAFB',
          headerTitleStyle: { fontWeight: 'bold' }
        }}
      >
        <Stack.Screen
          name='RecipeList'
          component={RecipeListScreen}
          options={({ navigation }) => ({
            title: 'Что приготовить',
            headerRight: () => (
              <View style={styles.headerActions}>
                <Pressable
                  onPress={() => navigation.push('RecipeDetail', { recipe: getRandomRecipe() })}
                  style={styles.headerButton}
                >
                  <Text style={styles.headerIcon}>🎲</Text>
                </Pressable>
                <Pressable
                  onPress={() => navigation.navigate('About')}
                  style={styles.headerButton}
                >
                  <Text style={styles.headerText}>О приложении</Text>
                </Pressable>
              </View>
            )
          })}
        />
        <Stack.Screen
          name='RecipeDetail'
          component={RecipeDetailScreen}
          options={({ route }) =>
          ({
            title: route.params.recipe.name,
          })}
        />
        <Stack.Screen
          name='CategoryRecipes'
          component={CategoryRecipesScreen}
          options={({ route }) => ({ title: route.params.category })}
        />
        <Stack.Screen
          name='About'
          component={AboutScreen}
          options={{ title: 'О приложении' }}
        />
      </Stack.Navigator>

    </NavigationContainer>

  );
}

const styles = StyleSheet.create({
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  headerButton: {
    paddingHorizontal: 4,
    paddingVertical: 6,
  },
  headerIcon: {
    fontSize: 22,
  },
  headerText: {
    color: '#61DAFB',
    fontWeight: '700',
  },
})
