import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { useRoute } from '@react-navigation/native';

const RecipeDetailScreen = () => {
    const navigation = useNavigation()
    const { recipe } = useRoute().params;

    return (
        <ScrollView style={styles.screen}>
            <Image source={{ uri: recipe.thumb }} style={styles.image} />
            <View style={styles.body}>
                <Text style={styles.title}>{recipe.name}</Text>
                <Text style={styles.meta}>{recipe.category} * {recipe.area}</Text>
                <Pressable
                    onPress={() => navigation.push('CategoryRecipes', { category: recipe.category })}
                    style={({ pressed }) => [styles.categoryButton, pressed && styles.categoryButtonPressed]}
                >
                    <Text style={styles.categoryButtonText}>Ещё из этой категории</Text>
                </Pressable>
                <Text style={styles.section}>Ингредиенты</Text>
                <Text style={styles.text}>* Заглушка - настоящие ингредиенты придут с API в Модуле 5</Text>
            </View>
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    screen: { flex: 1, backgroundColor: '#fff' },
    image: { width: '100%', height: 240 },
    body: { padding: 16 },
    title: { fontSize: 24, fontWeight: 'bold', color: '#1e293b' },
    meta: { fontSize: 14, color: '#64748b', marginTop: 4 },
    categoryButton: {
        alignSelf: 'flex-start',
        backgroundColor: '#20232A',
        borderRadius: 10,
        marginTop: 14,
        paddingHorizontal: 14,
        paddingVertical: 10,
    },
    categoryButtonPressed: {
        opacity: 0.75,
    },
    categoryButtonText: {
        color: '#61DAFB',
        fontWeight: '700',
    },
    section: { fontSize: 18, fontWeight: 'bold', marginTop: 20, marginBottom: 6, color: '#1e293b' },
    text: { fontSize: 15, color: '#334155', lineHeight: 22 }
})

export default RecipeDetailScreen
