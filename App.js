import React from "react";
import { StatusBar } from "react-native";
import { FavoritesProvider } from "./context/FavoritesContext";
import RootNavigation from "./navigation/RootNavigation";

export default function App() {
  return (
    <FavoritesProvider>
      <StatusBar barStyle="light-content" backgroundColor="#0D0D12" />
      <RootNavigation />
    </FavoritesProvider>
  );
}
