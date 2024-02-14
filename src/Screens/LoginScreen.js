import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      // Perform login request
      const response = await axios.post('http://192.168.0.103:3000/Users', { email, password });
      const { uid, userData } = response.data;

      // Store session data in AsyncStorage
      await storeSessionData(uid, userData);

      // Navigate to MainScreen on successful login
      navigation.navigate('Main');
    } catch (error) {
      console.error('Error logging in:', error.message);
      // Handle login error (e.g., display error message to user)
    }
  };

  // Function to store session data
  const storeSessionData = async (uid, userData) => {
    try {
      await AsyncStorage.setItem('uid', uid);
      await AsyncStorage.setItem('userData', JSON.stringify(userData));
    } catch (error) {
      console.error('Error storing session data:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Welcome back!</Text>
      <Text style={styles.title}>Login</Text>
      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        style={styles.input}
        theme={{ colors: { primary: '#1D5D9B', background: '#EEF5FF' } }}
      />
      <TextInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
        theme={{ colors: { primary: '#1D5D9B', background: '#EEF5FF' } }}
      />
      <Button mode="contained" onPress={handleLogin} style={styles.loginButton} labelStyle={styles.loginButtonText}>
        Login
      </Button>
      <Button onPress={() => navigation.navigate('Password')} color="#1D5D9B">
        Forgot Password?
      </Button>
      <Button onPress={() => navigation.navigate('Registration')} color="#1D5D9B">
        Don't have an account? Sign up
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#FFFFFF',
  },
  welcome: {
    fontSize: 18,
    marginBottom: 20,
    color: '#1D5D9B',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'black',
  },
  input: {
    width: '100%',
    marginBottom: 10,
    backgroundColor: '#EEF5FF',
  },
  loginButton: {
    paddingVertical: 10,
    paddingHorizontal: 50,
    borderRadius: 3,
    marginBottom: 20,
    backgroundColor: '#1D5D9B',
  },
  loginButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});

export default LoginScreen;
