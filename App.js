/** @format */

import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "./src/screens/HomeScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ProfileScreen from "./src/screens/ProfileScreen";
import RVScreen from "./src/screens/RVScreen";
import EditVideoScreen from "./src/screens/EditVideoScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const BottomTab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={"RVScreen"}
        screenOptions={{ headerShown: false }}>
        <Stack.Screen name={"RVScreen"} component={RVScreen} />
        <Stack.Screen name={"EditVideo"} component={EditVideoScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const BottomTabs = () => {
  return (
    <BottomTab.Navigator
      screenOptions={{
        tabBarStyle: { backgroundColor: "black" },
        headerShown: false,
        tabBarActiveTintColor: "white",
      }}>
      <BottomTab.Screen
        name='Home'
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={require("./src/images/home.png")}
              style={[
                styles.bottomTabIcon,
                focused && styles.bottomTabIconFocused,
              ]}
            />
          ),
        }}
      />
      <BottomTab.Screen
        name='Discover'
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={require("./src/images/search.png")}
              style={[
                styles.bottomTabIcon,
                focused && styles.bottomTabIconFocused,
              ]}
            />
          ),
        }}
      />
      <BottomTab.Screen
        name='NewVideo'
        component={RVScreen}
        options={{
          tabBarLabel: () => null,
          tabBarIcon: ({ focused }) => (
            <Image
              source={require("./src/images/new-video.png")}
              style={[
                styles.newVideoButton,
                focused && styles.bottomTabIconFocused,
              ]}
            />
          ),
        }}
      />
      <BottomTab.Screen
        name='Inbox'
        component={EditVideoScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={require("./src/images/message.png")}
              style={[
                styles.bottomTabIcon,
                focused && styles.bottomTabIconFocused,
              ]}
            />
          ),
        }}
      />
      <BottomTab.Screen
        name='Profile'
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={require("./src/images/user.png")}
              style={[
                styles.bottomTabIcon,
                focused && styles.bottomTabIconFocused,
              ]}
            />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
};

export default App;

const styles = StyleSheet.create({
  bottomTabIcon: {
    width: 20,
    height: 20,
    tintColor: "grey",
  },
  bottomTabIconFocused: {
    tintColor: "white",
  },
  newVideoButton: {
    width: 48,
    height: 24,
  },
});
