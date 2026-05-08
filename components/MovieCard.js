import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useFavorites } from "../context/FavoritesContext";
import { getImageUrl } from "../services/imdb";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";

export default function MovieCard({ movie }) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorite = isFavorite(movie.id);
  const scale = useSharedValue(1);

  const handlePress = () => {
    toggleFavorite(movie);
    scale.value = withSpring(1.3, { damping: 8, stiffness: 150 }, () => {
      scale.value = withSpring(1, { damping: 15 });
    });
  };

  const animatedIcon = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const year = movie.year || "N/A";
  const imageUrl = getImageUrl(movie.image || movie.poster_path);

  return (
    <TouchableOpacity style={styles.container} activeOpacity={0.7}>
      <Image source={{ uri: imageUrl }} style={styles.poster} />
      <View style={styles.overlay}>
        <View style={styles.infoRow}>
          <Text style={styles.title} numberOfLines={1}>
            {movie.title}
          </Text>
          <Text style={styles.year}>{year}</Text>
        </View>
        <View style={styles.ratingRow}>
          <Ionicons name="star" size={14} color="#FFD700" />
          <Text style={styles.rating}>{movie.rating || "0.0"}</Text>
        </View>
        <Animated.View style={animatedIcon}>
          <TouchableOpacity onPress={handlePress} style={styles.favBtn}>
            <Ionicons
              name={favorite ? "heart" : "heart-outline"}
              size={22}
              color={favorite ? "#FF4B4B" : "white"}
            />
          </TouchableOpacity>
        </Animated.View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "48%",
    margin: "1%",
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: "#1A1A2E",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  poster: {
    width: "100%",
    aspectRatio: 2 / 3,
    backgroundColor: "#2A2A3A",
    resizeMode: "cover",
  },
  overlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 10,
    backgroundColor: "rgba(0,0,0,0.6)",
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginBottom: 4,
  },
  title: { color: "#FFFFFF", fontSize: 14, fontWeight: "600", flex: 1 },
  year: { color: "#A0A0B0", fontSize: 12, fontWeight: "500" },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginBottom: 4,
  },
  rating: { color: "#FFFFFF", fontSize: 12, fontWeight: "600" },
  favBtn: {
    position: "absolute",
    top: -24,
    right: 8,
    backgroundColor: "#222235",
    padding: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#333344",
  },
});
