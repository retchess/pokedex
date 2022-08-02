import { View, Text } from "react-native";
import React, { useState, useEffect } from "react";
import Icon from "react-native-vector-icons/FontAwesome5";
import {
  AddPokemonFavoriteApi,
  isAlreadyFavorite,
  removePokemonFromFavoriteApi,
} from "../../api/favorite";

export default function Favorite({ id }) {
  const [isFavorite, setIsFavorite] = useState(undefined);
  const [reloadCheck, setReloadCheck] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const response = await isAlreadyFavorite(id);
        setIsFavorite(response);
      } catch (error) {
        setIsFavorite(false);
      }
    })();
  }, [id, reloadCheck]);

  const addFavorite = async () => {
    try {
      await AddPokemonFavoriteApi(id);
      onReloadCheckFavorite();
    } catch (error) {
      console.log(error);
    }
  };

  const removeFromFavorite = async () => {
    try {
      await removePokemonFromFavoriteApi(id);
      onReloadCheckFavorite();
    } catch (error) {
      console.log(error);
    }
  };

  const onReloadCheckFavorite = () => {
    setReloadCheck(!reloadCheck);
  };

  return (
    <Icon
      name="heart"
      color="#fff"
      size={20}
      onPress={isFavorite ? removeFromFavorite : addFavorite}
      solid={isFavorite}
      style={{ marginRight: 20 }}
    />
  );
}
