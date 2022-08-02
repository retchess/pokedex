import React, { useEffect, useState } from "react";
import { View, Text, Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { GetPokemonsFavoriteApi } from "../api/favorite";

export default function Favorite() {
  const [favorites, setFavorites] = useState(null);

  const getFavorites = async () => {
    const response = await GetPokemonsFavoriteApi();
    console.log(response);
  };

  return (
    <SafeAreaView>
      <Text>Favorite</Text>
      <Button title="get favorites" onPress={getFavorites}></Button>
    </SafeAreaView>
  );
}
