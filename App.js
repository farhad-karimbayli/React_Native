import { useState } from "react";
import {
    SafeAreaView,
    FlatList,
    StyleSheet,
    Text,
    View,
} from "react-native";

import ProfileCard from "./components/ProfileCard";

export default function App() {
    const names = [
        { id: "1", name: "Farhad" },
        { id: "2", name: "Ali" },
        { id: "3", name: "Nigar" },
        { id: "4", name: "Murad" },
        { id: "5", name: "Aysel" },
    ];

    const profiles = [
        {
            id: "1",
            name: "Farhad",
            age: 20,
            city: "Baku",
            profession: "Backend Developer",
        },
        {
            id: "2",
            name: "Ali",
            age: 21,
            city: "Ganja",
            profession: "Backend Developer",
        },
        {
            id: "3",
            name: "Aysel",
            age: 19,
            city: "Baku",
            profession: "UI/UX Designer",
        },
        {
            id: "4",
            name: "Murad",
            age: 22,
            city: "Baku",
            profession: "Mobile Developer",
        },
        {
            id: "5",
            name: "Rustam",
            age: 20,
            city: "Ganja",
            profession: "QA Engineer",
        },
    ];

    const [selectedId, setSelectedId] = useState(null);

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.mainTitle}>Homework FlatList</Text>

            <Text style={styles.sectionTitle}>1. List of Names</Text>

            <FlatList
                data={names}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => {
                    console.log("Name item:", item);

                    return (
                        <View style={styles.nameItem}>
                            <Text style={styles.nameText}>{item.name}</Text>
                        </View>
                    );
                }}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
                ListHeaderComponent={
                    <Text style={styles.listHeader}>Names:</Text>
                }
                ListEmptyComponent={
                    <Text style={styles.emptyText}>No names found</Text>
                }
            />

            <Text style={styles.sectionTitle}>2. Profile Cards</Text>

            <FlatList
                data={profiles}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => {
                    console.log("Profile item:", item);

                    return (
                        <ProfileCard
                            profile={item}
                            selected={selectedId === item.id}
                            onPress={() => setSelectedId(item.id)}
                        />
                    );
                }}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
                ListHeaderComponent={
                    <Text style={styles.listHeader}>Profiles:</Text>
                }
                ListEmptyComponent={
                    <Text style={styles.emptyText}>No profiles found</Text>
                }
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5f5f5",
        paddingTop: 40,
    },

    mainTitle: {
        fontSize: 28,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 20,
    },

    sectionTitle: {
        fontSize: 22,
        fontWeight: "bold",
        marginLeft: 16,
        marginTop: 16,
        marginBottom: 8,
    },

    listHeader: {
        fontSize: 18,
        fontWeight: "600",
        marginHorizontal: 16,
        marginBottom: 8,
        color: "#333",
    },

    nameItem: {
        backgroundColor: "#ffffff",
        padding: 16,
        marginHorizontal: 16,
        borderRadius: 10,
    },

    nameText: {
        fontSize: 18,
    },

    separator: {
        height: 8,
    },

    emptyText: {
        textAlign: "center",
        fontSize: 16,
        color: "gray",
        marginTop: 20,
    },
});