import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, FlatList } from "react-native";
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
          function limit(string = "", limit = 0) {
            return string.substring(0, limit);
          }

          const date = limit(`${item.metadata.publishDate}`, 10);
          return (
            <View>
              <View style={{marginLeft: 2, marginTop: 10}}>
                <Text
                  style={{ fontWeight: "900", fontSize: 12, color: "#CD4645" }}
                >
                  {date}
                </Text>
              </View>
              <ArticleCard result={item} />
            </View>
          );
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