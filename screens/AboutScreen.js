import { StyleSheet, Text, View } from "react-native";

const AboutScreen = () => {
    return (
        <View style={styles.screen}>
            <Text style={styles.title}>Рецепты</Text>
            <Text style={styles.text}>
                Учебное приложение со списком рецептов, поиском, случайным блюдом и переходами по категориям.
            </Text>
            <Text style={styles.text}>
                Дальше сюда можно добавить избранное, вкладки снизу и данные из API.
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
    },
    title: {
        color: '#1e293b',
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 12,
    },
    text: {
        color: '#334155',
        fontSize: 16,
        lineHeight: 24,
        marginBottom: 10,
    },
})

export default AboutScreen
