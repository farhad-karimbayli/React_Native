import { useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native"

function SelectedProfileCard({ name, role, avatar }){
    const [isSelected, SetSelect] = useState(false)

    const onHandle = () => {
        SetSelect(!isSelected)
    }

    return(
        <Pressable onPress={onHandle}>
            <View style={[styles.card, isSelected ? { borderWidth: 2, borderColor: 'red' } : {}]}>
                <Image
                    style={styles.image}
                    source={{uri: avatar}}
                />
                <Text style={styles.text}>Имя: {name}</Text>
                <Text style={styles.text}>Роль: {role}</Text>
                <Text style={[styles.text, {color: 'red'}]}>{isSelected ? '✓ Выбрано' : ''}</Text>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    card: {
        padding: 10,
        backgroundColor: '#008cff',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#006fd6',
        borderRadius: 12,
        margin: 10
    },
    text: {
        fontSize: 20,
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 12
    },
})

export default SelectedProfileCard