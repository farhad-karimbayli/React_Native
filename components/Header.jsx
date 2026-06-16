import { Text, View } from "react-native";

function Header({title}){
    return <View>
        <Text style={{fontSize: 22}}>{title}</Text>
    </View>
}

export default Header