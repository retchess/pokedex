import { StyleSheet, View, SafeAreaView, Text, Image } from "react-native";
import getColorByPokemonType from "../../utils/getColorByPokemonType";
import React from "react";

export default function Header({ name, type, order, image }) {
  const color = getColorByPokemonType(type);
  const bgStyles = { backgroundColor: color, ...styles.bgStyles };
  return (
    <>
      <View style={bgStyles} />
      <SafeAreaView style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.order}>#{`${order}`.padStart(3, 0)}</Text>
        </View>
        <View style={styles.contentImg}>
          <Image source={{ uri: image }} style={styles.image} />
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  bgStyles: {
    width: "100%",
    height: 350,
    position: "absolute",
    borderBottomEndRadius: 300,
    borderBottomLeftRadius: 300,
    transform: [{ scaleX: 2 }],
  },
  content: {
    marginHorizontal: 20,
    marginTop: 70,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 10,
  },
  name: {
    textTransform: "capitalize",
    color: "white",
    fontWeight: "bold",
    fontSize: 27,
  },
  order: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  contentImg: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
  },
  image: {
    width: 250,
    height: 250,
    bottom: 15,
    resizeMode: "contain",
    alignSelf: "center",
  },
});
