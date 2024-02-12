import React from "react";
import { useTheme } from "react-native-paper";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { Image, StyleSheet } from "react-native";

import InvestmentScreen from "../Screens/InvestmentScreen";
import TransactScreen from "../Screens/TransactScreen";
import ProfileScreen from "../Screens/ProfileScreen";
import { MainStackNavigator, ContactStackNavigator } from "./StackNavigator";

const BottomTabNavigator = () => {
  const { colors } = useTheme();

  const Tab = createMaterialBottomTabNavigator();

  return (
    <Tab.Navigator
    
    activeColor={'#0F2167'}
      inactiveColor={'#1D5D9B'}
      barStyle={{ backgroundColor: '#EEF5FF' }} // Use background color from theme
      initialRouteName='HomeScreen'
      tabBarOptions={{
        labelStyle: styles.tabBarLabelStyle,
      }}
    >
      <Tab.Screen
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color }) => (
            <Image
              source={require("../assets/home.png")}
              style={{ tintColor: color, width: 26, height: 26 }}
            />
          ),
        }}
        name="HomeScreen"
        component={MainStackNavigator}
      />
      <Tab.Screen
        options={{
          tabBarLabel: "Invest",
          tabBarIcon: ({ color }) => (
            <Image
              source={require("../assets/book.png")}
              style={{ tintColor: color, width: 26, height: 26}}
            />
          ),
        }}
        name="Invest"
        component={InvestmentScreen}
      />
      <Tab.Screen
        options={{
          tabBarLabel: "Transact",
          tabBarIcon: ({ color }) => (
            <Image
              source={require("../assets/icons8-bank-50.png")}
              style={{ tintColor: color, width: 26, height: 26 }}
            />
          ),
        }}
        name="Transact"
        component={TransactScreen}
      />
      <Tab.Screen
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color }) => (
            <Image
              source={require("../assets/icons8-user-30.png")}
              style={{ tintColor: color, width: 26, height: 26 }}
            />
          ),
        }}
        name="Profile"
        component={ProfileScreen}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBarLabelStyle: {
    fontFamily: "Roboto", // Your custom font family
    fontWeight: "bold", // Your custom font weight
    fontSize: 18,
    color:'#1D5D9B', // Your custom font size
  },
});

export { BottomTabNavigator };
