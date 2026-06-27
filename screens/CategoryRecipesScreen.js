import { FlatList, StyleSheet, Text, useWindowDimensions, View } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { RECIPES } from "../data/recipes";
import RecipeCard from "../components/RecipeCard";
import PressableCard from "../components/PressableCard";

const CategoryRecipesScreen = () => {
    const navigation = useNavigation()
    const { category } = useRoute().params;
    const { width, height } = useWindowDimensions()
    const numColumns = width > height ? 3 : 2
    const recipes = RECIPES.filter((recipe) => recipe.category === category)

    return (
        <View style={styles.screen}>
            <Text style={styles.subtitle}>Рецепты категории: {category}</Text>
            <FlatList
                data={recipes}
                key={numColumns}
                numColumns={numColumns}
                keyExtractor={(item) => String(item.id)}
                contentContainerStyle={styles.list}
                renderItem={({ item }) =>
                    <PressableCard
                        onPress={() => { navigation.push('RecipeDetail', { recipe: item }) }}
                        style={{ flex: 1 / numColumns, padding: 6 }}
                    >
                        <RecipeCard recipe={item} />
                    </PressableCard>
                }
                ListEmptyComponent={<Text style={styles.empty}>В этой категории пока нет рецептов</Text>}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    screen: { flex: 1, paddingTop: 16, paddingHorizontal: 8, backgroundColor: '#F4F7FA' },
    subtitle: { color: '#475569', fontSize: 16, fontWeight: '700', marginHorizontal: 6, marginBottom: 8 },
    list: { padding: 6 },
    empty: { textAlign: 'center', color: '#64748b', marginTop: 40 }
})

export default CategoryRecipesScreen
