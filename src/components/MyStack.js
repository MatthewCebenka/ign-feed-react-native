import React from "react";
import { StyleSheet } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

import IGNLogo from "./IGNLogo";
import MyTabs from "./MyTabs";

const Stack = createStackNavigator();

const MyStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Home"
      color='red'
      options={{
        headerTitle: () => <IGNLogo style={styles.logo} />,
        headerStyle: {
          backgroundColor: '#BF1212',
        },
      }}
      component={MyTabs}
    />
  </Stack.Navigator>
);

const styles = StyleSheet.create({
  logo: {
    height: 20,
    width: 60,
  },
});

export default MyStack;
