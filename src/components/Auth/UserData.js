import { View, Text, StyleSheet, Button } from "react-native";
import React, { useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import useAuth from "../../hooks/useAuth";
import { GetPokemonsFavoriteApi } from "../../api/favorite";

export default function UserData() {
  const { auth, logout } = useAuth();
  const [total, setTotal] = useState(0);

  useFocusEffect(
    useCallback(() => {
      (async () => {
        try {
          const response = await GetPokemonsFavoriteApi();
          setTotal(response.length);
        } catch (error) {
          setTotal(0);
        }
      })();
    }, [])
  );

  return (
    <View style={styles.content}>
      <View style={styles.titleBlock}>
        <Text style={styles.title}>
          Bienvenido, {`${auth.firstName} ${auth.lastName}`}
        </Text>
      </View>
      <View style={styles.dataContent}>
        <ItemMenu title="Nombre" text={`${auth.firstName} ${auth.lastName}`} />
        <ItemMenu title="Username" text={auth.username} />
        <ItemMenu title="Email" text={auth.email} />
        <ItemMenu title="Total de favoritos" text={`${total} Pokemons`} />
      </View>
      <Button title="Cerrar sesion" onPress={logout} color="#ff3e3e" />
    </View>
  );
}

function ItemMenu(props) {
  const { title, text } = props;
  return (
    <View style={styles.itemMenu}>
      <Text style={styles.itemTitle}>{title}: </Text>
      <Text>{text} </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    marginHorizontal: 20,
    marginTop: 20,
  },
  titleBlock: {
    marginBottom: 30,
  },
  title: {
    fontWeight: "bold",
    fontSize: 22,
  },
  dataContent: {
    marginBottom: 20,
  },
  itemMenu: {
    flexDirection: "row",
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderColor: "#cfcfcf",
  },
  itemTitle: {
    fontWeight: "500",
    paddingRight: 10,
    width: 150,
  },
});
