import { useState } from "react";
import { Pressable, View, Text, StyleSheet } from "react-native";
import { Button } from "react-native";

function LikeCounter(){
    const [likes, SetLike] = useState(0);
    
    const onHandle = () => {
        SetLike(likes + 1)
    }

    return <View style={styles.container}>
        <Button onPress={onHandle} title='LIKE'/>
        <Text style={{fontSize: 30}}>{likes}</Text>
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

export default LikeCounter