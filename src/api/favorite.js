import AsyncStorage from "@react-native-async-storage/async-storage";
import { FAVORITE_STORAGE } from "../utils/constants";

export async function GetPokemonsFavoriteApi() {
  try {
    const response = await AsyncStorage.getItem(FAVORITE_STORAGE);
    console.log(response);
    return JSON.parse(response || "[]");
  } catch (error) {
    throw error;
  }
}

export async function AddPokemonFavoriteApi(id) {
  try {
    const favorites = await GetPokemonsFavoriteApi();
    favorites.push(id);
    await AsyncStorage.setItem(FAVORITE_STORAGE, JSON.stringify(favorites));
  } catch (error) {
    throw error;
  }
}

export async function isAlreadyFavorite(id) {
  try {
    const response = await GetPokemonsFavoriteApi();
    return response.includes(id);
  } catch (error) {
    throw error;
  }
}

export async function removePokemonFromFavoriteApi(id) {
  try {
    const favorites = await GetPokemonsFavoriteApi();
    const newFavorites = favorites.filter((fav) => fav != id);
    await AsyncStorage.setItem(FAVORITE_STORAGE, JSON.stringify(newFavorites));
  } catch (error) {
    throw error;
  }
}
