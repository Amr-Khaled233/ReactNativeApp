import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useFavorites } from "../context/FavoritesContext";
import { getMovies } from "../services/imdb";

export default function HomeScreen({ navigation, openDrawer }) {
  const { favorites, toggleFavorite, isFavorite } = useFavorites();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const loadMovies = async (query = "") => {
    try {
      setLoading(true);
      const data = await getMovies(query);
      setMovies(data);
    } catch (error) {
      console.error("Error loading movies:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadMovies();
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    loadMovies(searchQuery);
  };

  const handleSearch = (text) => {
    setSearchQuery(text);
    if (text.trim().length > 2 || text.trim() === "") {
      loadMovies(text);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate("Details", { movie: item })}
      activeOpacity={0.8}
    >
      <Image
        source={{ uri: item.image }}
        style={styles.poster}
        defaultSource={{
          uri: "https://via.placeholder.com/300x450/2A2A3A/666677?text=No+Image",
        }}
      />

      {/* Overlay Gradient */}
      <View style={styles.overlay} />

      {/* Info Section - في النص */}
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={2}>
          {item.title}
        </Text>
        <View style={styles.metaRow}>
          <Text style={styles.year}>{item.year}</Text>
          <View style={styles.rating}>
            <Ionicons name="star" size={12} color="#FFD700" />
            <Text style={styles.ratingText}>{item.rating}</Text>
          </View>
        </View>
      </View>

      {/* Favorite Button - تحت خالص */}
      <TouchableOpacity
        onPress={(e) => {
          e.stopPropagation();
          toggleFavorite(item);
        }}
        style={styles.heartBtn}
        activeOpacity={0.7}
      >
        <Ionicons
          name={isFavorite(item.id) ? "heart" : "heart-outline"}
          size={28}
          color={isFavorite(item.id) ? "#FF4B4B" : "#FFFFFF"}
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  if (loading && movies.length === 0) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#E50914" />
        <Text style={styles.loadingText}>Loading movies...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={openDrawer}>
          <Ionicons name="menu" size={28} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>CINEMA</Text>
        <View style={{ width: 28 }} />
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons
          name="search"
          size={20}
          color="#888899"
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Search movies..."
          placeholderTextColor="#666677"
          value={searchQuery}
          onChangeText={handleSearch}
          clearButtonMode="while-editing"
          returnKeyType="search"
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity
            onPress={() => {
              setSearchQuery("");
              loadMovies();
            }}
          >
            <Ionicons name="close-circle" size={20} color="#888899" />
          </TouchableOpacity>
        )}
      </View>

      {/* Movies List */}
      <FlatList
        data={movies}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        numColumns={2}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            tintColor="#E50914"
            colors={["#E50914"]}
          />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="film-outline" size={64} color="#4A4A6A" />
            <Text style={styles.emptyText}>No movies found</Text>
          </View>
        }
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
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFFFFF",
    letterSpacing: 2,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1A1A2E",
    margin: 12,
    borderRadius: 12,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "#2A2A3A",
  },
  searchIcon: { marginRight: 8 },
  searchInput: {
    flex: 1,
    color: "#FFFFFF",
    fontSize: 15,
    paddingVertical: 12,
  },
  list: { padding: 8, paddingBottom: 20 },
  card: {
    flex: 1,
    margin: 6,
    backgroundColor: "#1A1A2E",
    borderRadius: 16,
    overflow: "hidden",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  poster: {
    width: "100%",
    aspectRatio: 2 / 3,
    backgroundColor: "#2A2A3A",
  },
  overlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "60%",
    backgroundColor: "rgba(0,0,0,0.7)",
  },
  info: {
    position: "absolute",
    bottom: 60,
    left: 0,
    right: 0,
    padding: 12,
  },
  title: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 6,
  },
  metaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  year: {
    color: "#888899",
    fontSize: 12,
  },
  rating: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  ratingText: {
    color: "#FFD700",
    fontSize: 12,
    fontWeight: "600",
  },
  heartBtn: {
    position: "absolute",
    bottom: 12,
    right: 12,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    padding: 10,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0D0D12",
  },
  loadingText: {
    color: "#888899",
    marginTop: 12,
    fontSize: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 40,
  },
  emptyText: {
    color: "#888899",
    marginTop: 12,
    fontSize: 16,
  },
});
