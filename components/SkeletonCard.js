import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

export default function SkeletonCard() {
  const opacity = useSharedValue(0.3);

  useEffect(() => {
    opacity.value = withRepeat(withTiming(1, { duration: 800 }), -1, true);
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({ opacity: opacity.value }));

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.poster, animatedStyle]} />
      <Animated.View style={[styles.line, animatedStyle]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "48%",
    margin: "1%",
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: "#1A1A2E",
  },
  poster: { width: "100%", aspectRatio: 2 / 3, backgroundColor: "#2A2A3A" },
  line: {
    height: 14,
    width: "70%",
    margin: 12,
    backgroundColor: "#2A2A3A",
    borderRadius: 4,
  },
});
