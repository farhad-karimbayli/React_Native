import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { useRecipeData } from "../context/RecipeDataContext";

const HistoryScreen = () => {
  const navigation = useNavigation();
  const { clearHistory, history } = useRecipeData();

  return (
    <View style={styles.screen}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>Недавно просмотренные</Text>
        <Pressable
          disabled={!history.length}
          onPress={clearHistory}
          style={[styles.clearButton, !history.length && styles.disabledButton]}
        >
          <Text style={[styles.clearText, !history.length && styles.disabledText]}>
            Очистить
          </Text>
        </Pressable>
      </View>
      <FlatList
        data={history}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item, index }) => (
          <Pressable
            onPress={() => {
              navigation.navigate("RecipeDetail", { recipe: item });
            }}
            style={styles.item}
          >
            <Text style={styles.index}>{index + 1}</Text>
            <View style={styles.itemBody}>
              <Text style={styles.itemTitle} numberOfLines={1}>
                {item.name}
              </Text>
              <Text style={styles.itemMeta} numberOfLines={1}>
                id: {item.id}
                {item.category ? ` · ${item.category}` : ""}
              </Text>
            </View>
          </Pressable>
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>История просмотров пока пустая</Text>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingTop: 16,
    paddingHorizontal: 14,
    backgroundColor: "#F4F7FA",
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
    marginBottom: 12,
  },
  title: {
    flex: 1,
    color: "#1e293b",
    fontSize: 20,
    fontWeight: "900",
  },
  clearButton: {
    borderRadius: 10,
    backgroundColor: "#20232A",
    paddingHorizontal: 12,
    paddingVertical: 9,
  },
  disabledButton: {
    backgroundColor: "#e2e8f0",
  },
  clearText: {
    color: "#61DAFB",
    fontSize: 13,
    fontWeight: "800",
  },
  disabledText: {
    color: "#64748b",
  },
  list: {
    gap: 10,
    paddingBottom: 24,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 12,
    backgroundColor: "#fff",
    padding: 12,
  },
  index: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#e0f2fe",
    color: "#075985",
    fontSize: 15,
    fontWeight: "900",
    lineHeight: 32,
    textAlign: "center",
  },
  itemBody: {
    flex: 1,
  },
  itemTitle: {
    color: "#1e293b",
    fontSize: 16,
    fontWeight: "800",
  },
  itemMeta: {
    color: "#64748b",
    fontSize: 12,
    marginTop: 3,
  },
  empty: { textAlign: "center", color: "#64748b", marginTop: 40 },
});

export default HistoryScreen;
