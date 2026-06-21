import { Pressable } from "react-native";

const PressableCard = ({ onPress,style, children }) => {
    return <Pressable 
        onPress={ onPress }
        android_ripple={{ 
            color: "rgba(255,255,255,0.3)",
            foreground: true,
        }}
        style= {style} >

        {children}
        
    </Pressable>

}

export default PressableCard