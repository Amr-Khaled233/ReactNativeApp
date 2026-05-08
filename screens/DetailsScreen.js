import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useFavorites } from "../context/FavoritesContext";
import { getMovieDetails } from "../services/imdb";

export default function DetailsScreen({ route, navigation }) {
  const { movie } = route.params;
  const { favorites, toggleFavorite, isFavorite } = useFavorites();

  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const favorite = isFavorite(movie.id);

  useEffect(() => {
    fetchDetails();
  }, []);

  const fetchDetails = async () => {
    setLoading(true);
    const data = await getMovieDetails(movie.id);
    setDetails(data);
    setLoading(false);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#E50914" />
        <Text style={styles.loadingText}>Loading details...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Header Image */}
        <View style={styles.header}>
          <Image
            source={{ uri: details?.backdrop || movie.image }}
            style={styles.backdrop}
          />
          <View style={styles.overlay} />

          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.favBtn}
            onPress={() => toggleFavorite(movie)}
          >
            <Ionicons
              name={favorite ? "heart" : "heart-outline"}
              size={24}
              color={favorite ? "#E50914" : "#fff"}
            />
          </TouchableOpacity>
        </View>

        {/* Content */}
        <View style={styles.content}>
          <Text style={styles.title}>{movie.title}</Text>

          <View style={styles.metaRow}>
            <Text style={styles.year}>{movie.year}</Text>
            <View style={styles.ratingBox}>
              <Ionicons name="star" size={16} color="#FFD700" />
              <Text style={styles.ratingText}>{movie.rating}/10</Text>
            </View>
          </View>

          {details && (
            <>
              {/* Runtime & Genres */}
              <View style={styles.infoGrid}>
                <Text style={styles.infoText}>⏱️ {details.runtime}</Text>
              </View>

              {/* Genres Tags */}
              <View style={styles.genreContainer}>
                {details.genres.split(",").map((genre, index) => (
                  <Text key={index} style={styles.genreTag}>
                    {genre.trim()}
                  </Text>
                ))}
              </View>

              {/* Plot */}
              <Text style={styles.sectionTitle}>Storyline</Text>
              <Text style={styles.plot}>
                {details.plot || "No description available."}
              </Text>

              {/* Director */}
              <Text style={styles.sectionTitle}>Director</Text>
              <Text style={styles.subText}>{details.director}</Text>

              {/* Cast */}
              <Text style={styles.sectionTitle}>Cast</Text>
              <Text style={styles.subText}>{details.stars}</Text>
            </>
          )}

          <View style={{ height: 40 }} />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0D0D12" },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0D0D12",
  },
  loadingText: { color: "#fff", marginTop: 10 },
  scrollView: { flex: 1 },
  header: { height: 350, position: "relative" },
  backdrop: { width: "100%", height: "100%", resizeMode: "cover" },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  backBtn: {
    position: "absolute",
    top: 50,
    left: 20,
    backgroundColor: "rgba(0,0,0,0.6)",
    padding: 10,
    borderRadius: 50,
  },
  favBtn: {
    position: "absolute",
    top: 50,
    right: 20,
    backgroundColor: "rgba(0,0,0,0.6)",
    padding: 10,
    borderRadius: 50,
  },
  content: { padding: 20 },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
    lineHeight: 32,
  },
  metaRow: { flexDirection: "row", alignItems: "center", marginBottom: 20 },
  year: { color: "#aaa", fontSize: 16, marginRight: 15 },
  ratingBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1A1A2E",
    padding: 6,
    borderRadius: 8,
    gap: 5,
  },
  ratingText: { color: "#FFD700", fontWeight: "bold" },
  infoGrid: { flexDirection: "row", gap: 20, marginBottom: 15 },
  infoText: {
    color: "#ccc",
    fontSize: 14,
    backgroundColor: "#1A1A2E",
    padding: 8,
    borderRadius: 6,
  },
  genreContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 20,
  },
  genreTag: {
    color: "#fff",
    backgroundColor: "#E50914",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    fontSize: 13,
  },
  sectionTitle: {
    color: "#E50914",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    marginTop: 15,
  },
  plot: { color: "#ddd", fontSize: 15, lineHeight: 24, marginBottom: 10 },
  subText: { color: "#aaa", fontSize: 15, marginBottom: 5 },
});
