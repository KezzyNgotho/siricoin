import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, Modal } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import firebase from '../components/firebase';

const WithdrawScreen = () => {
  const navigation = useNavigation();
  const [withdrawType, setWithdrawType] = useState('Income');
  const [amount, setAmount] = useState('');
  const [balance, setBalance] = useState(0);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const currentUser = firebase.auth().currentUser;
        if (currentUser) {
          const userId = currentUser.uid;

          let totalBalance = 0;
          const snapshot = await firebase
            .firestore()
            .collection('Investment')
            .where('userId', '==', userId)
            .get();

          snapshot.forEach((doc) => {
            totalBalance += doc.data().amount;
          });

          setBalance(totalBalance);
        }
      } catch (error) {
        console.error('Error fetching balance:', error);
      }
    };

    fetchBalance();
  }, [withdrawType]); // Fetch balance when withdrawType changes

  const calculateMinMaxAmount = () => {
    let minAmount = 0;
    let maxAmount = balance;

    if (withdrawType === 'Income') {
      minAmount = 100; // Example: Minimum amount for Income
    } else if (withdrawType === 'Investment') {
      minAmount = 500; // Example: Minimum amount for Investment
    }

    return { minAmount, maxAmount };
  };

  const handleWithdraw = async () => {
    const withdrawalAmount = parseInt(amount);
    if (withdrawalAmount <= balance && withdrawalAmount > 0) {
      try {
        if (withdrawType === 'Investment') {
          const currentUser = firebase.auth().currentUser;
          if (currentUser) {
            const userId = currentUser.uid;

            const investmentSnapshot = await firebase
              .firestore()
              .collection('Investment')
              .where('userId', '==', userId)
              .get();

            const batch = firebase.firestore().batch();
            investmentSnapshot.forEach((doc) => {
              const investmentRef = firebase.firestore().collection('Investment').doc(doc.id);
              const currentBalance = doc.data().amount;
              const newBalance = currentBalance - withdrawalAmount;
              batch.update(investmentRef, { amount: newBalance });
            });

            await batch.commit();
          }
        }

        await createPendingTransaction(withdrawalAmount);

        console.log('Withdrawal successful!');
        setShowSuccessMessage(true);
        setTimeout(() => setShowSuccessMessage(false), 3000);
      } catch (error) {
        console.error('Error handling withdrawal:', error);
        setAlertMessage('Error handling withdrawal. Please try again later.');
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 3000);
      }
    } else {
      setAlertMessage('Invalid amount. Please enter a valid amount to withdraw.');
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
    }
  };

  const createPendingTransaction = async (withdrawalAmount) => {
    try {
      const currentUser = firebase.auth().currentUser;
      if (currentUser) {
        const userId = currentUser.uid;

        await firebase.firestore().collection('Pending').add({
          userId: userId,
          type: withdrawType,
          amount: withdrawalAmount,
          timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });

        console.log('Pending transaction created');
      }
    } catch (error) {
      console.error('Error creating pending transaction:', error);
      throw error;
    }
  };

  const { minAmount, maxAmount } = calculateMinMaxAmount();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={require('../assets/icons8-back-50.png')} style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.title}>Withdraw</Text>
      </View>

      <View style={styles.dropdownContainer}>
        <Text style={styles.balance}>Balance: Kes {balance}</Text>
        <Picker
          selectedValue={withdrawType}
          onValueChange={(itemValue) => setWithdrawType(itemValue)}
          style={styles.dropdown}
        >
          <Picker.Item label="Income" value="Income" />
          <Picker.Item label="Investment" value="Investment" />
        </Picker>
      </View>

      <Text style={styles.label}>Enter Amount</Text>
      <TextInput
        value={amount}
        onChangeText={(text) => setAmount(text)}
        keyboardType="numeric"
        style={styles.input}
      />

      <Text style={styles.amountLimits}>
        Minimum: Kes{minAmount} - Maximum: Kes{maxAmount}
      </Text>

      <TouchableOpacity style={styles.withdrawButton} onPress={handleWithdraw}>
        <Text style={styles.withdrawButtonText}>Withdraw</Text>
      </TouchableOpacity>

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
    backgroundColor: 'white'
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
    color: 'black'
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
    color: '#1D5D9B'
  },
  label: {
    fontSize: 16,
    marginBottom: 20,
    color: 'black'
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
    alignItems: 'center'
  },
  alertText: {
    fontSize: 16,
    marginBottom: 20,
    color: 'white'
  },
  successMessageText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#fff'
  },
});

export default WithdrawScreen;
