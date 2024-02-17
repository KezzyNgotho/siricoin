import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
const HomeScreen = () => {

  const navigation = useNavigation();
  const [showCard, setShowCard] = useState(false); // State variable for card expansion

  const toggleCardVisibility = () => {
    setShowCard(!showCard);
  };

  return (
    <View style={styles.container}>
    {/* Logo */}
    <View style={styles.logoContainer}>
      <View style={styles.logoBackground}>
        <Image
          source={require('../assets/icons8-invest-100.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>
    </View>
    {/* Welcome message and username */}
    <View style={styles.userInfoContainer}>
      <View style={styles.welcomeMessageContainer}>
        <Text style={styles.welcomeMessage}>Welcome back!</Text>
      </View>
      <View style={styles.usernameContainer}>
        <Text style={styles.username}>KEZIE NGOTHO </Text>
      </View>
    </View>
    {/* Button section */}
    <View style={styles.buttonContainer}>
      <TouchableOpacity
      onPress={() => navigation.navigate('Withdraw')}
       style={styles.button}>
        <View style={styles.iconBackground}>
          <Image
            source={require('../assets/icons8-wallet-64.png')}
            style={styles.icon}
          />
        </View>
        <Text style={styles.buttonText}>Withdraw</Text>
      </TouchableOpacity>
      <TouchableOpacity 
       onPress={() => navigation.navigate('Pending')}
      style={styles.button}>
        <View style={styles.iconBackground}>
          <Image
            source={require('../assets/icons8-pending-50.png')}
            style={styles.icon}
          />
        </View>
        <Text style={styles.buttonText}>Pending</Text>
      </TouchableOpacity>
      <TouchableOpacity 
       onPress={() => navigation.navigate('Statements')}
    
      style={styles.button}>
        
        <View style={styles.iconBackground}>
          <Image
            source={require('../assets/icons8-note-50.png')}
            style={styles.icon}
          />
        </View>
        <Text style={styles.buttonText}>Statements</Text>
      </TouchableOpacity>
      <TouchableOpacity 
      onPress={() => navigation.navigate('Terms')}
      style={styles.button}>
        <View style={styles.iconBackground}>
          <Image
            source={require('../assets/icons8-copyleft-50.png')}
            style={styles.icon}
          />
        </View>
        <Text style={styles.buttonText}>Terms</Text>
      </TouchableOpacity>
    </View>
    {/* Card with balance and expandable content */}
    <View style={styles.card}>
      {/* Title and eye icon */}
      {!showCard && (
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>My Balance</Text>
          <TouchableOpacity style={styles.eyeIconContainer} onPress={toggleCardVisibility}>
            <Image
              source={showCard ? require('../assets/icons8-invisible-24.png') : require('../assets/icons8-eye-48.png')}
              style={styles.eyeIcon}
            />
          </TouchableOpacity>
        </View>
      )}
      {/* Expanded content */}
      {showCard && (
        <View style={styles.expandedContent}>
          {/* Title for accounts */}
          <View style={styles.expandedTitleContainer}>
            <Text style={styles.expandedTitle}>My balance</Text>
            <TouchableOpacity style={styles.eyeIconContainer} onPress={toggleCardVisibility}>
              <Image
                source={require('../assets/icons8-invisible-24.png')}
                style={styles.eyeIcon}
              />
            </TouchableOpacity>
          </View>
          {/* Accounts */}
          <View style={styles.expandedItem}>
            <Text style={styles.expandedItemText}>Income</Text>
            <Text style={styles.expandedItemBalance}>ksh 1000</Text>
          </View>
          <View style={styles.expandedItem}>
            <Text style={styles.expandedItemText}>Investment</Text>
            <Text style={styles.expandedItemBalance}>ksh 3000</Text>
          </View>
          <View style={styles.expandedItem}>
            <Text style={styles.expandedItemText}>Fixed</Text>
            <Text style={styles.expandedItemBalance}>ksh 1000</Text>
          </View>
        </View>
      )}
    </View>
  </View>
  
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //alignItems: 'center',
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  logoContainer: {
    marginBottom: 39,
    alignItems: 'center',
  },
  logoBackground: {
    backgroundColor: 'lightgrey', // Change the background color
    borderRadius: 80,
    padding: 15,
    borderColor: '#E0F4FF', // Add border color
    borderWidth: 2, // Add border width
  },
  button: {
    alignItems: 'center',
  },
  iconBackground: {
    backgroundColor: 'white',
    borderRadius: 60,
    padding: 10,
    borderColor: '#E0F4FF', // Change the border color
    borderWidth: 2, // Add border width
  },
  icon: {
    width: 30,
    height: 30,
    marginBottom: 5,
  },
  logo: {
    width: 90,
    height: 90,
  },
  userInfoContainer: {
    marginBottom: 10,
    marginRight: 20,
  },
  welcomeMessageContainer: {
    marginBottom: 2,
  },
  welcomeMessage: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#0766AD',
  },
  usernameContainer: {
    marginBottom: 29,
  },
  username: {
    fontSize: 18,
    color: 'black',
    fontWeight:"bold"
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  buttonText: {
    fontSize: 14,
    color: 'black',
    //fontWeight: 'bold',
  },
  card: {
    width: '100%',
    marginTop: 40,
    backgroundColor: '#EEF5FF',
    borderRadius: 10,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleText: {
    fontWeight: 'bold',
    marginRight: 5,
    color: '#1D5D9B',
    fontSize: 16,
  },
  eyeIconContainer: {
    padding: 5,
    marginLeft: 150,
  },
  eyeIcon: {
    width: 25,
    height: 25,
  },
  expandedContent: {
    marginTop: 10,
  },
  expandedTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  expandedItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 28,
  },
  expandedItemText: {
    fontWeight: 'bold',
    color: 'black',
  },
  expandedItemBalance: {
    fontWeight: 'bold',
    color: '#176B87',
  },
  expandedTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 6,
    color: '#1D5D9B',
  },
  expandedTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
});




export default HomeScreen;
