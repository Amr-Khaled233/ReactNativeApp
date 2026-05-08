import React, { useEffect } from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";
import { useFavorites } from "../context/FavoritesContext";

export default function CustomToast() {
  const { toast } = useFavorites();
  const yOffset = useSharedValue(-50);
  const opacity = useSharedValue(0);

  useEffect(() => {
    if (toast.visible) {
      yOffset.value = withTiming(Platform.OS === "ios" ? 60 : 80, {
        duration: 300,
      });
      opacity.value = withTiming(1, { duration: 300 });
      const timer = setTimeout(() => {
        yOffset.value = withTiming(-50, { duration: 300 });
        opacity.value = withTiming(0, { duration: 300 });
      }, 2300);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const animatedStyle = useAnimatedStyle(() => ({
    top: yOffset.value,
    opacity: opacity.value,
  }));

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <View style={styles.content}>
        <Ionicons
          name={
            toast.type === "success" ? "checkmark-circle" : "information-circle"
          }
          size={20}
          color="#4ADE80"
        />
        <Text style={styles.text}>{toast.message}</Text>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: 16,
    right: 16,
    top: -50,
    backgroundColor: "#2A2A3A",
    borderRadius: 12,
    padding: 12,
    zIndex: 1000,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 4,
  },
  content: { flexDirection: "row", alignItems: "center", gap: 8 },
  text: { color: "#FFFFFF", fontWeight: "600", flex: 1 },
});
