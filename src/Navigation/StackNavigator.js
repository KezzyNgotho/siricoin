import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useTheme } from "react-native-paper";

import { BottomTabNavigator } from "../Navigation/TabNavigator";

 import LoginScreen from '../Screens/LoginScreen';
import RegistrationScreen from "../Screens/RegistrationScreen";
import HomeScreen from "../Screens/HomeScreen";

const Stack = createNativeStackNavigator();

const MainStackNavigator = () => {
  const { colors } = useTheme();

  const screenOptionStyle = {
    headerStyle: {},
    headerShown: false,
    headerTintColor: colors.primary,
    headerBackTitle: "Back",
  };

  return (
    <Stack.Navigator screenOptions={screenOptionStyle} initialRouteName={"HomeScreen"}>
      <Stack.Screen name="Home" component={HomeScreen} />

     
    </Stack.Navigator>
  );
}



const LoginStackNavigator = () => {
  const { colors } = useTheme();

  const screenOptionStyle = {
    headerStyle: {},
    headerShown: false,
    headerTintColor: colors.primary,
  };

  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
       
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Registration" component={RegistrationScreen} />
      <Stack.Screen name="Main" component={BottomTabNavigator} />
    </Stack.Navigator>
  );
}


export{ MainStackNavigator,LoginStackNavigator};