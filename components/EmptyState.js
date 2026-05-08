import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function EmptyState({
  icon = "search-outline",
  title = "No Results",
  subtitle = "",
}) {
  return (
    <View style={styles.container}>
      <Ionicons name={icon} size={64} color="#4A4A6A" style={styles.icon} />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
  },
  icon: { marginBottom: 16 },
  title: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    color: "#A0A0B0",
    fontSize: 14,
    textAlign: "center",
    lineHeight: 20,
  },
});
