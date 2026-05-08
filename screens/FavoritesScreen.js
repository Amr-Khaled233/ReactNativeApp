import React from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useFavorites } from "../context/FavoritesContext";

export default function FavoritesScreen({ openDrawer, goHome }) {
  const { favorites, toggleFavorite } = useFavorites();

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.poster} />
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={1}>
          {item.title}
        </Text>
        <View style={styles.metaRow}>
          <Text style={styles.year}>{item.year}</Text>
          <View style={styles.rating}>
            <Ionicons name="star" size={12} color="#FFD700" />
            <Text style={styles.ratingText}>{item.rating}</Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => toggleFavorite(item)}
          style={styles.heartBtn}
        >
          <Ionicons name="heart" size={24} color="#FF4B4B" />
        </TouchableOpacity>
      </View>
    </View>
  );

  if (favorites.length === 0) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={openDrawer}>
            <Ionicons name="menu" size={28} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>MY FAVORITES</Text>
          <View style={{ width: 28 }} />
        </View>
        <View style={styles.emptyContainer}>
          <Ionicons name="heart-outline" size={64} color="#4A4A6A" />
          <Text style={styles.emptyTitle}>No Favorites Yet</Text>
          <Text style={styles.emptySubtitle}>
            Movies you like will appear here
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={openDrawer}>
          <Ionicons name="menu" size={28} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>MY FAVORITES</Text>
        <TouchableOpacity onPress={goHome}>
          <Ionicons name="home-outline" size={24} color="#888899" />
        </TouchableOpacity>
      </View>
      <FlatList
        data={favorites}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        numColumns={2}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0D0D12" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#1A1A2E",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  list: { padding: 8, paddingBottom: 20 },
  card: {
    flex: 1,
    margin: 6,
    backgroundColor: "#1A1A2E",
    borderRadius: 16,
    overflow: "hidden",
    elevation: 4,
  },
  poster: { width: "100%", aspectRatio: 2 / 3, backgroundColor: "#2A2A3A" },
  info: { padding: 12, position: "relative" },
  title: { color: "#FFFFFF", fontSize: 14, fontWeight: "600", marginBottom: 6 },
  metaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  year: { color: "#888899", fontSize: 12 },
  rating: { flexDirection: "row", alignItems: "center", gap: 4 },
  ratingText: { color: "#FFD700", fontSize: 12, fontWeight: "600" },
  heartBtn: {
    position: "absolute",
    top: -30,
    right: 8,
    backgroundColor: "#222235",
    padding: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#333344",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
  },
  emptyTitle: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "700",
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: { color: "#888899", fontSize: 14, textAlign: "center" },
});
