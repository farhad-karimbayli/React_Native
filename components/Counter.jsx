import { useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";

function Counter(){
    const [count, SetCount] = useState(0)

    const onHandle = (x) => {
        if(x === 0)
            SetCount(0)
        else if(count === 0 && x === -1)
            return
        else
            SetCount(count + x)
    }

    return <View style={styles.container}>
        <Button title="+" onPress={() => {onHandle(1)}}/>
        <Text>{count}</Text>
        <Button title="-" onPress={() => {onHandle(-1)}}/>
        <Button title="restart" onPress={() => {onHandle(0)}}/>
    </View>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10
    }
})

export default Counter