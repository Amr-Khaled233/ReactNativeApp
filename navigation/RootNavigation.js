import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import HomeScreen from "../screens/HomeScreen";
import FavoritesScreen from "../screens/FavoritesScreen";
import DetailsScreen from "../screens/DetailsScreen";

const Stack = createNativeStackNavigator();

export default function RootNavigation() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [currentScreen, setCurrentScreen] = useState("Home");

  // قائمة الـ Drawer البسيطة
  if (drawerOpen) {
    return (
      <View style={styles.drawerContainer}>
        <View style={styles.drawerHeader}>
          <Ionicons name="film-outline" size={48} color="#E50914" />
          <Text style={styles.drawerTitle}>CINEMA</Text>
        </View>

        <TouchableOpacity
          style={styles.drawerItem}
          onPress={() => {
            setDrawerOpen(false);
            setCurrentScreen("Home");
          }}
        >
          <Ionicons name="home-outline" size={22} color="#888899" />
          <Text style={styles.drawerLabel}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.drawerItem}
          onPress={() => {
            setDrawerOpen(false);
            setCurrentScreen("Favorites");
          }}
        >
          <Ionicons name="heart-outline" size={22} color="#888899" />
          <Text style={styles.drawerLabel}>Favorites</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.closeDrawer}
          onPress={() => setDrawerOpen(false)}
        >
          <Ionicons name="close" size={24} color="#888899" />
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {currentScreen === "Home" ? (
          <>
            <Stack.Screen name="HomeMain">
              {(props) => (
                <HomeScreen {...props} openDrawer={() => setDrawerOpen(true)} />
              )}
            </Stack.Screen>
            <Stack.Screen name="Details" component={DetailsScreen} />
          </>
        ) : (
          <Stack.Screen name="FavoritesMain">
            {(props) => (
              <FavoritesScreen
                {...props}
                openDrawer={() => setDrawerOpen(true)}
                goHome={() => setCurrentScreen("Home")}
              />
            )}
          </Stack.Screen>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
    backgroundColor: "#0A0A0F",
    padding: 20,
  },
  drawerHeader: {
    alignItems: "center",
    paddingVertical: 40,
    borderBottomWidth: 1,
    borderBottomColor: "#1A1A2E",
    marginBottom: 20,
  },
  drawerTitle: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "700",
    marginTop: 12,
    letterSpacing: 2,
  },
  drawerItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 12,
    gap: 14,
    marginBottom: 8,
    backgroundColor: "#1A1A2E",
  },
  drawerLabel: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "500",
  },
  closeDrawer: {
    marginTop: "auto",
    alignSelf: "center",
    padding: 12,
  },
});
