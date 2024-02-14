import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import * as Print from 'react-native-print';
import { useNavigation } from '@react-navigation/native';
// Import your back icon image
import backIcon from '../assets/icons8-back-50.png';

const TermsScreen = () => {
  const navigation = useNavigation();
  
  const handlePrint = async () => {
    await Print.print({
      html: '<h1>Terms and Conditions</h1><p>Your terms and conditions content here.</p>',
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity style={styles.printButton} onPress={handlePrint}>
        <Image source={require('../assets/icons8-print-30.png')} style={styles.printIcon} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Image source={backIcon} style={styles.backIcon} />
      </TouchableOpacity>
      <Text style={styles.title}>Terms and Conditions</Text>
      <View style={styles.content}>
        <Text style={styles.sectionTitle}>1. Introduction</Text>
        <Text style={styles.paragraph}>
          Welcome to Siricoin Wallet. These terms and conditions outline the rules and regulations for the use of Siricoin's Wallet App.
        </Text>
        
        <Text style={styles.sectionTitle}>2. Acceptance of Terms</Text>
        <Text style={styles.paragraph}>
          By accessing this app, we assume you accept these terms and conditions. Do not continue to use Siricoin Wallet if you do not agree to take all of the terms and conditions stated on this page.
        </Text>
        
        <Text style={styles.sectionTitle}>3. User Responsibilities</Text>
        <Text style={styles.paragraph}>
          Users are responsible for maintaining the confidentiality of their account and password and for restricting access to their devices. Users agree to accept responsibility for all activities that occur under their account.
        </Text>

        <Text style={styles.sectionTitle}>4. Privacy Policy</Text>
        <Text style={styles.paragraph}>
          Our Privacy Policy explains how we collect, use, and protect your personal data in relation to your use of our services. By using Siricoin Wallet, you agree to the collection and use of information as described in our Privacy Policy.
        </Text>
        
        {/* Add more sections as needed */}
        
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingVertical: 20,
    paddingHorizontal: 16,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: 'black', // Change according to your theme
  },
  content: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#0766AD', // Change according to your theme
  },
  paragraph: {
    fontSize: 16,
    marginBottom: 15,
    lineHeight: 22,
    color: 'black', // Change according to your theme
  },
  printButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 999,
  },
  printIcon: {
    width: 30,
    height: 30,
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 999,
  },
  backIcon: {
    width: 30,
    height: 30,
  },
});

export default TermsScreen;
