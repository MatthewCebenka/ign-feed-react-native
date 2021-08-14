import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import * as WebBrowser from "expo-web-browser";
import ign from '../api/ign';

const ArticleCard = ({ result }) => {
  const [state, setState] = useState(null);

  const _handlePressButtonAsync = async () => {
    let state = await WebBrowser.openBrowserAsync(
      "https://www.ign.com/articles/" + result.metadata.slug
    );
    setState(state);
  };

  const [commentCount, setcommentCount] = useState(0);

  const query = async () => {
    try {
      const response = await ign.get(`/comments?ids=${result.contentId}`);
      setcommentCount(response.data.content[0].count);
    } catch (err) {
      console.log("query failed");
    }
  };

  useEffect(() => query(), []);

  return (
    <View
      style={{
        marginVertical: 10,
        borderWidth: 0.1,
        borderRadius: 10,
        backgroundColor: "white",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 2.22,
        elevation: 3,
      }}
    >
      <View style={{ marginHorizontal: 15 }}>
        <Text style={{ fontSize: 25, fontWeight: "800", marginVertical: 10 }}>
          {result.metadata.headline}
        </Text>
      </View>
      <TouchableOpacity onPress={_handlePressButtonAsync}>
        <Image
          style={{
            height: 200,
            width: "100%",
            alignSelf: "center",
            borderRadius: 10,
            resizeMode: "contain",
          }}
          source={{
            uri: result.thumbnails[1].url,
          }}
        />
      </TouchableOpacity>
      <View style={{ marginHorizontal: 15 }}>
        <Text style={{ marginVertical: 15, fontSize: 15, fontWeight: "600" }}>
          {result.metadata.description}
        </Text>
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginHorizontal: 10,
          marginBottom: 15,
        }}
      >
        <View
          style={{
            color: "#CD4645",
            borderBottomWidth: 2.5,
            borderColor: "#CD4645",
            height: 20,
          }}
        >
          <TouchableOpacity>
            <Text style={{ fontWeight: "800", fontSize: 12, color: "#CD4645" }}>
              {result.contentType.toUpperCase()}
            </Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
            style={{ flexDirection: "row", alignItems: "center" }}
          >
            <FontAwesome5
              style={{ marginRight: 8 }}
              name="comment"
              size={24}
              color="black"
            />
            <Text style={{ fontWeight: "800" }}>{commentCount}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ArticleCard;
