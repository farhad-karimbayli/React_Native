import { useState } from "react";
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    SafeAreaView,
    useWindowDimensions,
    RefreshControl,
    Button,
} from "react-native";

import { initialTeam } from "../data/team";
import TeamMemberCard from "../components/TeamMemberCard";

const TeamScreen = () => {
    const { width, height } = useWindowDimensions();

    const isLandscape = width > height;
    const columns = isLandscape ? 2 : 1;

    const [team, setTeam] = useState(initialTeam);
    const [selectedId, setSelectedId] = useState(null);
    const [refreshing, setRefreshing] = useState(false);

    const orientationText = isLandscape ? "альбомная" : "книжная";

    const handleSelect = (id) => {
        setSelectedId(id);
    };

    const handleRefresh = () => {
        setRefreshing(true);

        setTimeout(() => {
            setTeam(initialTeam);
            setSelectedId(null);
            setRefreshing(false);
        }, 700);
    };

    const handleDeleteSelected = () => {
        if (!selectedId) return;

        setTeam((prevTeam) =>
            prevTeam.filter((person) => person.id !== selectedId)
        );

        setSelectedId(null);
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <Text style={styles.title}>Наша команда</Text>

                <Text style={styles.screenInfo}>
                    Экран: {Math.round(width)} × {Math.round(height)} | Ориентация:{" "}
                    {orientationText}
                </Text>

                <View style={styles.deleteButton}>
                    <Button
                        title="Удалить выбранного"
                        onPress={handleDeleteSelected}
                        disabled={!selectedId}
                    />
                </View>

                <FlatList
                    key={columns}
                    data={team}
                    numColumns={columns}
                    keyExtractor={(item) => item.id}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={team.length === 0 && styles.emptyListContainer}
                    columnWrapperStyle={columns === 2 && styles.row}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={handleRefresh}
                        />
                    }
                    ListEmptyComponent={
                        <Text style={styles.emptyText}>Список пуст</Text>
                    }
                    ItemSeparatorComponent={() => <View style={styles.separator} />}
                    renderItem={({ item }) => (
                        <View style={columns === 2 ? styles.cardWrapperTwoColumns : styles.cardWrapperOneColumn}>
                            <TeamMemberCard
                                person={item}
                                selected={selectedId === item.id}
                                onPress={() => handleSelect(item.id)}
                            />
                        </View>
                    )}
                />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "#f3f4f6",
    },

    container: {
        flex: 1,
        padding: 16,
    },

    title: {
        fontSize: 28,
        fontWeight: "800",
        color: "#111827",
        marginBottom: 6,
    },

    screenInfo: {
        fontSize: 14,
        color: "#6b7280",
        marginBottom: 14,
    },

    deleteButton: {
        marginBottom: 14,
    },

    row: {
        gap: 12,
    },

    cardWrapperOneColumn: {
        width: "100%",
    },

    cardWrapperTwoColumns: {
        flex: 1,
    },

    separator: {
        height: 2,
        backgroundColor: "#e5e7eb",
        marginBottom: 12,
    },

    emptyListContainer: {
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
    },

    emptyText: {
        fontSize: 18,
        color: "#6b7280",
        fontWeight: "600",
    },
});

export default TeamScreen;