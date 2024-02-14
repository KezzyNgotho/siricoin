import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const TransactScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Transactions</Text>
      </View>

      {/* Main Transactions Label */}
      <Text style={styles.mainTransactionsLabel}>Main Transactions</Text>

      {/* Icon buttons */}
      <View style={styles.iconButtonsContainer}>
        {/* Withdraw */}
        <TouchableOpacity 
         onPress={() => navigation.navigate('Withdraw')}
        style={styles.iconButton}>
          <View style={styles.iconBackground}>
            <Image
              source={require('../assets/icons8-withdraw-money-100.png')}
              style={styles.icon}
            />
          </View>
          <Text style={styles.iconText}>Withdraw</Text>
        </TouchableOpacity>

        {/* Reinvest */}
        <TouchableOpacity style={styles.iconButton}>
          <View style={styles.iconBackground}>
            <Image
              source={require('../assets/icons8-invest-1001.png')}
              style={styles.icon}
            />
          </View>
          <Text style={styles.iconText}>Reinvest</Text>
        </TouchableOpacity>

        {/* Deposit */}
        <TouchableOpacity 
          onPress={() => navigation.navigate('Invest')}
        style={styles.iconButton}>
          <View style={styles.iconBackground}>
            <Image
              source={require('../assets/icons8-plus-64.png')}
              style={styles.icon}
            />
          </View>
          <Text style={styles.iconText}>Deposit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 40,
    paddingTop: 40, // Add padding top for header
   // alignContent:'center',
  },
  header: {
    marginBottom: 20,
    alignSelf:'center'
  },
  title: {
    fontSize: 24,
    //fontWeight: 'bold',
    color:'black',
    marginBottom: 20,
  },
  mainTransactionsLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 25,
    color:'#1D5D9B',
  },
  iconButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  iconButton: {
    alignItems: 'center',
  },
  iconBackground: {
    backgroundColor: 'white',
    borderRadius: 50,
    padding: 15,
    borderWidth:2,
    borderColor: '#E0F4FF', // Change the border color
  
  },
  icon: {
    width: 27,
    height: 27,
  },
  iconText: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 5,
    color:'black',
  },
});

export default TransactScreen;
