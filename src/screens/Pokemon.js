import { ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { getPokemonInfo } from "../api/pokemon";
import Header from "../components/PokemonDetail/Header";
import Type from "../components/PokemonDetail/Type";
import Stats from "../components/PokemonDetail/Stats";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Favorite from "../components/PokemonDetail/Favorite";
import useAuth from "../hooks/useAuth";

export default function Pokemon({ route, navigation }) {
  const [pokemon, setPokemon] = useState(null);
  const idPokemon = route.params.id;
  const { auth } = useAuth();
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => auth && <Favorite id={pokemon?.id} />,
      headerLeft: () => (
        <FontAwesome
          name="arrow-left"
          color="#fff"
          size={20}
          style={{ marginLeft: 20 }}
          onPress={navigation.goBack}
        />
      ),
    });
  }, [navigation, route.params, pokemon, auth]);
  useEffect(() => {
    (async () => {
      try {
        const response = await getPokemonInfo(idPokemon);
        setPokemon(response);
      } catch (error) {
        navigation.goBack();
      }
    })();
  }, [idPokemon]);

  if (!pokemon) return null;
  return (
    <ScrollView>
      <Header
        name={pokemon.name}
        type={pokemon.types[0].type.name}
        order={pokemon.order}
        image={pokemon.sprites.other["official-artwork"].front_default}
      />
      <Type types={pokemon.types} />
      <Stats pokemonStats={pokemon.stats} />
    </ScrollView>
  );
}
