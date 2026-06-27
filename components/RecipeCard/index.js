import { View, Text, Image, StyleSheet, Platform } from 'react-native'

const RecipeCard = ({ recipe }) => {
    return (
        <View style={styles.card}>
            <Image source={{ uri: recipe.thumb }} style={styles.image} />
            <View style={styles.info}>
                <Text style={styles.title} numberOfLines={1}>{recipe.name}</Text>
                <Text style={styles.category}>{recipe.category}</Text>
                <Text style={styles.area}>{recipe.area}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderRadius: 12,
        overflow: 'hidden',
        ...Platform.select({
            ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.12, shadowRadius: 5 },
            android: { elevation: 3 }
        })
    },
    image: {
        width: '100%',
        aspectRatio: 1
    },
    info: {
        position: 'static',
        padding: 10
    },
    area: { position: 'absolute', top: 10, right: 5, backgroundColor: 'green', padding: 5, color: 'white', borderRadius: 10 },
    title: { fontSize: 15, fontWeight: 'bold', color: '#1e293b' },
    category: { fontSize: 12, color: '#64748b', marginTop: 2 }
})

export default RecipeCard