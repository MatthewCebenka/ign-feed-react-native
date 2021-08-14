import React, { useState, useEffect } from "react";
import { StyleSheet, View, FlatList } from "react-native";
import ArticleCard from "./ArticleCard";
import ign from "../api/ign";

const ArticlesFeed = () => {
  const [results, setResults] = useState([]);

  const query = async () => {
    try {
      const response = await ign.get("/articles", {
        params: {
          count: 10,
        },
      });
      setResults(response.data.data);
    } catch (err) {
      console.log("query failed");
    }
  };

  useEffect(() => query(), []);

  console.log(results);

  return (
    <View style={styles.root}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={results}
        keyExtractor={(result) => result.contentId}
        renderItem={({ item }) => {
          return <ArticleCard result={item} />;
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    width: "100%",
    flex: 1,
    backgroundColor: "white",
    paddingLeft: 10,
    paddingRight: 10,
  },
});

export default ArticlesFeed;
