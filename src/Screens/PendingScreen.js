import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';

const PendingScreen = () => {
  const navigation = useNavigation();
  const [pendingType, setPendingType] = useState('Income');
  const [pendingList, setPendingList] = useState([]);

  // Sample pending withdrawals data (replace with actual data)
  const allPendingWithdrawals = [
    { id: '1', type: 'Income', amount: 500, details: 'Sample income withdrawal' },
    { id: '2', type: 'Investment', amount: 1000, details: 'Sample investment withdrawal' },
    { id: '3', type: 'Income', amount: 300, details: 'Another sample income withdrawal' },
  ];

  // Function to handle changing the pending type
  const handlePendingTypeChange = (type) => {
    setPendingType(type);
  };

  // Function to filter pending withdrawals based on type
  const getPendingWithdrawalsByType = () => {
    return allPendingWithdrawals.filter((withdrawal) => withdrawal.type === pendingType);
  };

  // Function to render each item in the pending list
  const renderPendingItem = ({ item }) => (
    <View style={styles.pendingItem}>
      <Text style={styles.pendingItemType}>Type: {item.type}</Text>
      <Text style={styles.pendingItemAmount}>Amount: {item.amount}</Text>
      <Text style={styles.pendingItemDetails}>Details: {item.details}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={require('../assets/icons8-back-50.png')} style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.title}>Pending Withdrawals</Text>
      </View>
    
      {/* Select Pending Type */}
      <View style={styles.dropdownContainer}>
        <Picker
          selectedValue={pendingType}
          onValueChange={handlePendingTypeChange}
          style={styles.dropdown}
        >
          <Picker.Item label="Income" value="Income" />
          <Picker.Item label="Investment" value="Investment" />
        </Picker>
      </View>

      {/* Pending List */}
      <View style={styles.pendingListContainer}>
        <Text style={styles.pendingListTitle}>Pending</Text>
        <FlatList
          data={getPendingWithdrawalsByType()}
          keyExtractor={(item) => item.id}
          renderItem={renderPendingItem}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
    backgroundColor: 'white',
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
    color: 'black',
  },
  dropdownContainer: {
    marginBottom: 20,
  },
  dropdown: {
    height: 50,
    width: '100%',
    backgroundColor: '#EEF5FF',
  },
  pendingListContainer: {
    flex: 1,
  },
  pendingListTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: "#0766AD",
  },
  pendingItem: {
    borderWidth: 1,
    borderColor: '#0766AD',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#EEF5FF',
  },
  pendingItemType: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: 'black',
  },
  pendingItemAmount: {
    fontSize: 14,
    marginBottom: 5,
    color: 'black',
  },
  pendingItemDetails: {
    fontSize: 14,
    color: 'black',
  },
});

export default PendingScreen;
