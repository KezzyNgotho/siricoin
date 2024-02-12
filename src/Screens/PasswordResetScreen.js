import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TextInput, Button } from 'react-native-paper';

const PasswordResetScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleResetPassword = () => {
    if (!email) {
      setError('Please enter your email');
      return;
    }

    // Perform password reset logic here
    // For demo purposes, just log the email
    console.log('Reset password for:', email);

    // Display success message
    setSuccessMessage('Password reset instructions sent to your email.');
    // Clear input and error state
    setEmail('');
    setError('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reset Password</Text>
      <Text style={styles.message}>It happens to the best of us! Enter your email address below and we'll send you instructions to reset your password.</Text>
      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        style={styles.input}
        theme={{ colors: { primary: '#1D5D9B', background: '#EEF5FF' } }}
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      {successMessage ? <Text style={styles.successMessage}>{successMessage}</Text> : null}
      <Button mode="contained" onPress={handleResetPassword} style={styles.resetButton} labelStyle={styles.resetButtonText}>
        Reset Password
      </Button>
      <Button onPress={() => navigation.goBack()} color="#1D5D9B">
        Back to Login
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#1D5D9B',
  },
  message: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
    color: '#555555',
  },
  input: {
    width: '100%',
    marginBottom: 10,
    backgroundColor: '#EEF5FF',
  },
  resetButton: {
    paddingVertical: 10,
    paddingHorizontal: 50,
    borderRadius: 3,
    marginBottom: 20,
    backgroundColor: '#1D5D9B',
  },
  resetButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
  successMessage: {
    color: 'green',
    marginBottom: 10,
  },
});

export default PasswordResetScreen;
