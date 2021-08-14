import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import ArticlesFeed from "./ArticlesFeed";
import VideosFeed from "./VideosFeed";

const Tab = createBottomTabNavigator();

const MyTabs = () => (
  <Tab.Navigator
    tabBarOptions={{
      labelPosition: "beside-icon",
      activeTintColor: "black",
      labelStyle: {
        fontSize: 25,
        fontWeight: '700'
      },
    }}
  >
    <Tab.Screen name="Articles" component={ArticlesFeed} />
    <Tab.Screen name="Videos" component={VideosFeed} />
  </Tab.Navigator>
);

export default MyTabs;
