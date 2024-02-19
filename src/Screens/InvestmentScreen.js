import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image, Alert } from 'react-native';
import firebase from '../components/firebase';

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

  const handleInvest = async () => {
    if (amount === '') {
      Alert.alert('Error', 'Please enter the amount to invest');
      return;
    }
  
    try {
      const currentUser = firebase.auth().currentUser;
      if (!currentUser) {
        console.log('No user is currently logged in');
        return;
      }
  
      const uid = currentUser.uid;
      let selectedOptionValue = selectedOption === 'myNumber' ? otherNumber : otherNumber;
  
      // Fetch the user's mobile number if selected option is 'myNumber'
      if (selectedOption === 'myNumber') {
        const userDoc = await firebase.firestore().collection('users').doc(uid).get();
        if (userDoc.exists) {
          const userData = userDoc.data();
          selectedOptionValue = userData.mobileNumber;
        } else {
          console.log('User document not found');
          return;
        }
      }
  
      // Check if the user has an existing investment document
      const investmentRef = firebase.firestore().collection('Investment').doc(uid);
      const investmentDoc = await investmentRef.get();
  
      if (investmentDoc.exists) {
        // Update the existing document with the new amount
        const currentAmount = investmentDoc.data().amount;
        await investmentRef.update({
          amount: currentAmount + parseFloat(amount),
        });
      } else {
        // Create a new document if it doesn't exist
        await investmentRef.set({
          userId: uid,
          amount: parseFloat(amount),
          date: firebase.firestore.FieldValue.serverTimestamp(),
          selectedOption: selectedOptionValue,
        });
      }
  
      // Record the statement in the Statements collection
      await firebase.firestore().collection('Statements').add({
        userId: uid,
        type: 'Investment',
        amount: parseFloat(amount),
        date: firebase.firestore.FieldValue.serverTimestamp(),
      });
  
      setShowSuccessMessage(true);
  
    } catch (error) {
      console.error('Error recording transaction:', error);
      Alert.alert('Error', 'Failed to record the transaction. Please try again.');
    }
  };
  
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Investment</Text>
      <View style={styles.iconContainer}>
        <Image source={require('../assets/icons8-return-on-investment-99.png')} style={styles.icon} />
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
    marginBottom: 40,
    color: 'black'
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
    color: "#1D5D9B"
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#EEF5FF',
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
    borderColor: 'black',
    borderRadius: 50,
    padding: 10,
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
