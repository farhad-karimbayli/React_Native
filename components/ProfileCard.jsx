import { Text, TouchableOpacity, StyleSheet } from "react-native";

function ProfileCard({ profile, selected, onPress }) {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={[
                styles.card,
                selected && styles.selectedCard
            ]}>
              
            <Text style={styles.name}>{profile.name}</Text>
            <Text style={styles.info}>Age: {profile.age}</Text>
            <Text style={styles.info}>City: {profile.city}</Text>
            <Text style={styles.info}>Profession: {profile.profession}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#ffffff",
        padding: 16,
        marginHorizontal: 16,
        marginVertical: 8,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#ddd",
    },

    selectedCard: {
        backgroundColor: "#d0f0ff",
        borderColor: "#00aaff",
        borderWidth: 2,
    },

    name: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 6,
    },

    info: {
        fontSize: 15,
        color: "#555",
        marginTop: 2,
    },
});

export default ProfileCard;