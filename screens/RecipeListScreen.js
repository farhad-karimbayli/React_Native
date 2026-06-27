import { useState } from "react";
import { FlatList, TextInput, useWindowDimensions, View, StyleSheet, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { RECIPES } from '../data/recipes';
import RecipeCard from "../components/RecipeCard";
import PressableCard from "../components/PressableCard";

const RecipeListScreen = () => {
    const navigation = useNavigation()
    const [quary, setQuary] = useState('')
    const { width, height } = useWindowDimensions()
    const numColumns = width > height ? 3 : 2
    const filtered = RECIPES.filter((item) => item.name.toLowerCase().includes(quary.toLowerCase()))


    return (
        <View style={styles.screen}>
            <TextInput
                value={quary}
                onChangeText={setQuary}
                placeholder="Поиск рецепта..."
                placeholderTextColor={'#94a3b8'}
                style={styles.search}
            />
            <FlatList
                data={filtered}
                key={numColumns}
                numColumns={numColumns}
                keyExtractor={(item) => String(item.id)}
                contentContainerStyle={{ padding: 6 }}
                renderItem={({ item }) =>
                    <PressableCard
                        onPress={() => { navigation.push('RecipeDetail', { recipe: item }) }}
                        style={{ flex: 1 / numColumns, padding: 6 }}
                    >
                        <RecipeCard recipe={item} />
                    </PressableCard>
                }
                ListEmptyComponent={<Text style={styles.empty}>Ничего не найдено</Text>}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    screen: { flex: 1, paddingTop: 20, paddingHorizontal: 8, backgroundColor: '#F4F7FA' },
    search: {
        backgroundColor: '#fff', borderRadius: 10, paddingHorizontal: 14, paddingVertical: 12,
        fontSize: 16, marginHorizontal: 6, marginBottom: 8,
        borderWidth: 1, borderColor: '#e2e8f0'
    },
    empty: { textAlign: 'center', color: '#64748b', marginTop: 40 }
})

export default RecipeListScreen
