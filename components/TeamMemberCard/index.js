import { View, Text, Image, StyleSheet } from "react-native";
import PressableCard from "../PressableCard";

const TeamMemberCard = ({ person, selected, onPress }) => {
    return (
        <PressableCard
            onPress={onPress}
            style={[
                styles.card,
                selected && styles.selectedCard,
            ]}
        >
            <View style={styles.leftSide}>
                <View>
                    <Image source={{ uri: person.avatar }} style={styles.avatar} />

                    {person.online && <View style={styles.onlineDot} />}
                </View>

                <View>
                    <Text style={styles.name}>{person.name}</Text>
                    <Text style={styles.role}>{person.role}</Text>
                </View>
            </View>

            <View style={styles.badge}>
                <Text style={styles.badgeText}>
                    {person.online ? "ONLINE" : "OFFLINE"}
                </Text>
            </View>
        </PressableCard>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#ffffff",
        borderRadius: 16,
        padding: 14,
        marginBottom: 12,
        borderWidth: 2,
        borderColor: "transparent",

        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",

        elevation: 3,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 5,
        shadowOffset: {
            width: 0,
            height: 3,
        },
    },

    selectedCard: {
        borderColor: "#00bcd4",
        backgroundColor: "#e9fbff",
    },

    leftSide: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
        flex: 1,
    },

    avatar: {
        width: 54,
        height: 54,
        borderRadius: 27,
    },

    onlineDot: {
        width: 14,
        height: 14,
        borderRadius: 7,
        backgroundColor: "#20c997",
        borderWidth: 2,
        borderColor: "#ffffff",
        position: "absolute",
        right: 0,
        bottom: 0,
    },

    name: {
        fontSize: 16,
        fontWeight: "700",
        color: "#111827",
    },

    role: {
        fontSize: 13,
        color: "#6b7280",
        marginTop: 3,
    },

    badge: {
        backgroundColor: "#111827",
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 999,
    },

    badgeText: {
        color: "#ffffff",
        fontSize: 10,
        fontWeight: "700",
    },
});

export default TeamMemberCard;