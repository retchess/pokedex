import { StyleSheet, View, Text } from "react-native";
import React from "react";
import getColorByPokemonType from "../../utils/getColorByPokemonType";

export default function Type({ types }) {
  return (
    <View style={styles.content}>
      {types.map(function (item, index) {
        return (
          <View
            key={index}
            style={{
              ...styles.pill,
              backgroundColor: getColorByPokemonType(item.type.name),
            }}
          >
            <Text style={styles.typeName}>{item.type.name}</Text>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    marginTop: 30,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  pill: {
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 20,
    marginHorizontal: 5,
  },
  typeName: {
    color: "#fff",
    fontWeight: "bold",
    textTransform: "capitalize",
  },
});
