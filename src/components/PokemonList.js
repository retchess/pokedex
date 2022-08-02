import { StyleSheet, View, ActivityIndicator, FlatList } from "react-native";
import React from "react";
import PokemonCard from "../components/PokemonCard";

export default function PokemonList({ pokemons, loadPokemons, hasNext }) {
  const loadMore = () => {
    loadPokemons();
  };

  return (
    <FlatList
      data={pokemons}
      numColumns={2}
      showsVerticalScrollIndicator={false}
      keyExtractor={(pokemon) => String(pokemon.id)}
      renderItem={({ item }) => <PokemonCard pokemon={item} />}
      contentContainerStyle={styles.flatListContentContainer}
      onEndReached={hasNext && loadMore}
      onEndReachedThreshold={0.1}
      ListFooterComponent={
        hasNext && (
          <ActivityIndicator
            size={"large"}
            style={styles.spinner}
            color={"#AEAEAE"}
          />
        )
      }
    ></FlatList>
  );
}

const styles = StyleSheet.create({
  flatListContentContainer: {
    paddingHorizontal: 5,
  },
  spinner: {
    marginTop: 20,
    marginBottom: 60,
  },
});
