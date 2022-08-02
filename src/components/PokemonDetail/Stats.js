import { StyleSheet, View, Text } from "react-native";
import React from "react";

export default function Stats({ pokemonStats }) {
  const barStyles = (num) => {
    const color = num > 49 ? "#00ac17" : "#ff3e3e";
    return {
      width: `${num}%`,
      backgroundColor: color,
    };
  };
  return (
    <View style={styles.content}>
      <Text style={styles.title}>Base Stats</Text>
      {pokemonStats.map(function (item, index) {
        return (
          <View key={index} style={styles.block}>
            <View style={styles.blockTitle}>
              <Text style={styles.statName}>{item.stat.name}</Text>
            </View>
            <View style={styles.blockInfo}>
              <Text style={styles.baseStats}>{item.base_stat}</Text>
              <View style={styles.bgBar}>
                <View
                  style={[styles.statBar, barStyles(item.base_stat)]}
                ></View>
              </View>
            </View>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 20,
    marginTop: 40,
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
    paddingBottom: 5,
  },
  statName: {
    textTransform: "capitalize",
    fontWeight: "500",
    fontSize: 14,
  },
  blockTitle: {
    width: "35%",
  },
  block: {
    flexDirection: "row",
    paddingVertical: 5,
  },
  blockInfo: {
    width: "65%",
    flexDirection: "row",
    alignItems: "center",
  },
  baseStats: {
    width: "12%",
    fontSize: 14,
  },
  bgBar: {
    backgroundColor: "#dedede",
    width: "88%",
    height: 5,
    borderRadius: 20,
    overflow: "hidden",
  },
  statBar: {
    width: "100%",
    height: 5,
    borderRadius: 20,
  },
});
