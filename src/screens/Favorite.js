import React, { useState, useCallback } from "react";
import { View, Text } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { GetPokemonsFavoriteApi } from "../api/favorite";
import useAuth from "../hooks/useAuth";
import { getPokemonInfo } from "../api/pokemon";
import PokemonList from "../components/PokemonList";
import NotLogged from "../components/Auth/NotLogged";

export default function Favorite() {
  const [favorites, setFavorites] = useState([]);
  const { auth } = useAuth();

  useFocusEffect(
    useCallback(() => {
      if (auth) {
        (async () => {
          const response = await GetPokemonsFavoriteApi();
          const pokemonsArray = [];
          for await (const id of response) {
            const pokemonDetails = await getPokemonInfo(id);
            pokemonsArray.push({
              id: pokemonDetails.id,
              name: pokemonDetails.name,
              type: pokemonDetails.types[0].type.name,
              order: pokemonDetails.order,
              image:
                pokemonDetails.sprites.other["official-artwork"].front_default,
            });
          }
          setFavorites(pokemonsArray);
        })();
      }
    }, [auth])
  );

  return !auth ? (
    <NotLogged />
  ) : (
    <SafeAreaView>
      <PokemonList pokemons={favorites} />
    </SafeAreaView>
  );
}
