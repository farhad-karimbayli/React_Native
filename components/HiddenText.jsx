import { useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";

function HiddenText({text}){
    const [isHidden, SetHidden] = useState(false)

    const onHandle = () => {
        SetHidden(!isHidden)
    }

    return <View style={styles.container}>
            <Button onPress={onHandle} title={isHidden ? 'Show' : 'Hide'}/>
            <Text style={{fontSize: 28}}>{isHidden ? '' : text}</Text>
        </View>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10
  }
});

export default HiddenText