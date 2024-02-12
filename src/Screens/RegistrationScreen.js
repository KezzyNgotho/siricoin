import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TextInput, Button } from 'react-native-paper';

const RegistrationScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');

  const handleRegistration = () => {
    if (!email || !password || !confirmPassword || !mobileNumber || !username) {
      setError('Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // Perform registration logic here
    console.log('Registering with:', email, password, mobileNumber, username);
    // Navigate to MainScreen on successful registration
    navigation.navigate('Main');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Welcome to YourSiriCoin!</Text>
      <Text style={styles.subtitle}>Create Account</Text>
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
      <TextInput
        label="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
        style={styles.input}
        theme={{ colors: { primary: '#1D5D9B', background: '#EEF5FF' } }}
      />
      <TextInput
        label="Mobile Number"
        value={mobileNumber}
        onChangeText={setMobileNumber}
        keyboardType="phone-pad"
        style={styles.input}
        theme={{ colors: { primary: '#1D5D9B', background: '#EEF5FF' } }}
      />
      <TextInput
        label="Username"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
        theme={{ colors: { primary: '#1D5D9B', background: '#EEF5FF' } }}
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <Button mode="contained" onPress={handleRegistration} style={styles.registerButton} labelStyle={styles.registerButtonText}>
        Register
      </Button>
      <Button onPress={() => navigation.navigate('Login')} color="#1D5D9B">
        Already have an account? Log in
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
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#1D5D9B',
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'black',
  },
  input: {
    width: '100%',
    marginBottom: 10,
    backgroundColor: '#EEF5FF',
  },
  registerButton: {
    paddingVertical: 10,
    paddingHorizontal: 50,
    borderRadius: 3,
    marginBottom: 20,
    backgroundColor: '#1D5D9B',
  },
  registerButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
});

export default RegistrationScreen;
