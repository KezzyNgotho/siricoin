import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, Modal, Button } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';

const WithdrawScreen = () => {
    const navigation = useNavigation();
  const [withdrawType, setWithdrawType] = useState('Income');
  const [amount, setAmount] = useState('');
  const [balance, setBalance] = useState(5000); // Sample balance, replace with actual balance
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  // Function to calculate minimum and maximum amount based on withdraw type
  const calculateMinMaxAmount = () => {
    let minAmount = 0;
    let maxAmount = balance;

    if (withdrawType === 'Income') {
      // Set minimum amount for Income type
      minAmount = 100; // Example: Minimum amount for Income
    } else if (withdrawType === 'Investment') {
      // Set minimum amount for Investment type
      minAmount = 500; // Example: Minimum amount for Investment
    }

    return { minAmount, maxAmount };
  };

  const handleWithdraw = () => {
    // Check if amount is valid
    if (parseInt(amount) <= balance && parseInt(amount) > 0) {
      // Withdraw logic here
      console.log('Withdraw successful');
      // Show success message
      setShowSuccessMessage(true);
      // Hide success message after 3 seconds
      setTimeout(() => setShowSuccessMessage(false), 3000);
    } else {
      // Set alert message
      setAlertMessage('Invalid amount. Please enter a valid amount to withdraw.');
      // Show alert
      setShowAlert(true);
      // Hide alert after 3 seconds
      setTimeout(() => setShowAlert(false), 3000);
    }
  };

  // Calculate minimum and maximum amount
  const { minAmount, maxAmount } = calculateMinMaxAmount();

  // Function to update balance based on withdrawal type
  const updateBalance = (type) => {
    if (type === 'Income') {
      setBalance(5000); // Example: Set income balance
    } else if (type === 'Investment') {
      setBalance(10000); // Example: Set investment balance
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={require('../assets/icons8-back-50.png')} style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.title}>Withdraw</Text>
      </View>

      {/* Select Withdraw Type */}
      <View style={styles.dropdownContainer}>
         {/* Display Balance */}
      <Text style={styles.balance}>Balance: Kes {balance}</Text>

        <Picker
          selectedValue={withdrawType}
          onValueChange={(itemValue) => {
            setWithdrawType(itemValue);
            updateBalance(itemValue); // Update balance when type changes
          }}
          style={styles.dropdown}
        >
          <Picker.Item label="Income" value="Income" />
          <Picker.Item label="Investment" value="Investment" />
        </Picker>
      </View>

     
      {/* Enter Amount */}
      <Text style={styles.label}>Enter Amount</Text>
      <TextInput
        value={amount}
        onChangeText={(text) => setAmount(text)}
        keyboardType="numeric"
        style={styles.input}
      />

      {/* Display Minimum and Maximum Amount */}
      <Text style={styles.amountLimits}>
        Minimum: Kes{minAmount} - Maximum: Kes{maxAmount}
      </Text>

      {/* Withdraw Button */}
      <TouchableOpacity style={styles.withdrawButton} onPress={handleWithdraw}>
        <Text style={styles.withdrawButtonText}>Withdraw</Text>
      </TouchableOpacity>

      {/* Alert Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={showAlert}
        onRequestClose={() => setShowAlert(false)}
      >
        <View style={styles.alertContainer}>
          <View style={styles.alertBox}>
            <Text style={styles.alertText}>{alertMessage}</Text>
          </View>
        </View>
      </Modal>

      {/* Success Message */}
      {showSuccessMessage && (
        <View style={styles.successMessage}>
          <Text style={styles.successMessageText}>Withdrawal successful!</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
    backgroundColor:'white'
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 40,
  },
  backIcon: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  title: {
    fontSize: 24,
    //fontWeight: 'bold',
    color:'black'
  },
  dropdownContainer: {
    marginBottom: 20,
  },
  dropdown: {
    height: 50,
    width: '100%',
    backgroundColor: '#EEF5FF',
  },
  balance: {
    fontSize: 18,
    marginBottom: 20,
    color:'#1D5D9B'
  },
  label: {
    fontSize: 16,
    marginBottom: 20,
    color:'black'
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  amountLimits: {
    fontSize: 16,
    marginBottom: 30,
    color: '#1D5D9B',
  },
  withdrawButton: {
   
    alignItems: 'center',
    backgroundColor: '#1D5D9B',
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 3,
    marginBottom: 20,
  },
  withdrawButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  alertContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  alertBox: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 1,
    elevation: 5,
  },
  successMessage: {
    backgroundColor: '#32CD32',
    padding: 10,
    borderRadius: 1,
    elevation: 5,
    marginBottom: 20,
   // alignContent:'center',
    alignItems:'center'
  },
  alertText: {
    fontSize: 16,
    marginBottom: 20,
    color:'white'
  },
  successMessageText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 20,
    color:'#fff'
  },
});

export default WithdrawScreen;
