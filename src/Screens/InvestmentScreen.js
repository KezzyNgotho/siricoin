import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image, Alert } from 'react-native';

const InvestmentScreen = () => {
  const [amount, setAmount] = useState('');
  const [selectedOption, setSelectedOption] = useState('myNumber');
  const [otherNumber, setOtherNumber] = useState('');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  useEffect(() => {
    let timer;
    if (showSuccessMessage) {
      timer = setTimeout(() => {
        setShowSuccessMessage(false);
      }, 3000); // Dismiss the success message after 3 seconds
    }
    return () => {
      clearTimeout(timer);
    };
  }, [showSuccessMessage]);

  const handleInvest = () => {
    if (amount === '') {
      Alert.alert('Error', 'Please enter the amount to invest');
    } else if (selectedOption === 'otherNumber' && otherNumber === '') {
      Alert.alert('Error', 'Please enter the other number');
    } else {
      setShowSuccessMessage(true);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Investment</Text>
      <View style={styles.iconContainer}>
        <Image source={require('../assets/icons8-invest-100.png')} style={styles.icon} />
      </View>
      <Text style={styles.minAmountText}>Minimum Amount: kes 120</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Amount"
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
      />
      <View style={styles.optionContainer}>
        <TouchableOpacity
          style={[styles.optionButton, selectedOption === 'myNumber' && styles.selectedOption]}
          onPress={() => setSelectedOption('myNumber')}
        />
        <Text style={styles.optionText}>My Number</Text>
        <TouchableOpacity
          style={[styles.optionButton, selectedOption === 'otherNumber' && styles.selectedOption]}
          onPress={() => setSelectedOption('otherNumber')}
        />
        <Text style={styles.optionText}>Other Number</Text>
      </View>
      {selectedOption === 'otherNumber' && (
        <TextInput
          style={styles.input}
          placeholder="Enter Other Number"
          keyboardType="numeric"
          value={otherNumber}
          onChangeText={setOtherNumber}
        />
      )}
      <TouchableOpacity style={styles.investButton} onPress={handleInvest}>
        <Text style={styles.investButtonText}>Invest</Text>
      </TouchableOpacity>
      {showSuccessMessage && (
        <View style={styles.successMessage}>
          <Text style={styles.successMessageText}>Investment successful!</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 40,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
   // fontWeight: 'bold',
    marginBottom: 40,
    color:'black'
  },
  iconContainer: {
    marginBottom: 50,
  },
  icon: {
    width: 100,
    height: 100,
  },
  minAmountText: {
    fontSize: 16,
    marginBottom: 20,
    color:"#1D5D9B"
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor:'#EEF5FF',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 30,
    width: '80%',
  },
  optionContainer: {
    flexDirection: 'row',
    marginBottom: 40,
    alignItems: 'center',
  },
  optionButton: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 50,
    padding: 13,
    marginRight: 10,
  },
  selectedOption: {
    backgroundColor: '#1D5D9B',
  },
  optionText: {
    color: 'black',
    marginRight: 10,
  },
  investButton: {
    backgroundColor: '#1D5D9B',
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 3,
    marginBottom: 20,
  },
  investButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  successMessage: {
    backgroundColor: '#32CD32',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
  },
  successMessageText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default InvestmentScreen;
