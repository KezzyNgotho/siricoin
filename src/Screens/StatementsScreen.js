// Import necessary modules
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image, PermissionsAndroid, Platform } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import firebase from '../components/firebase'; // Import Firebase configuration

const StatementsScreen = () => {
    const navigation = useNavigation();
    const [statementType, setStatementType] = useState('Income');
    const [statementList, setStatementList] = useState([]);

    useEffect(() => {
        requestStoragePermission();
        fetchStatements(); // Fetch statements from Firebase
    }, []);

    // Function to request storage permission
    const requestStoragePermission = async () => {
        if (Platform.OS !== 'android') {
            console.log('Storage permission is not required on this platform.');
            return;
        }

        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                {
                    title: 'Storage Permission',
                    message: 'App needs access to storage to download files.',
                    buttonPositive: 'OK',
                }
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log('Storage permission granted');
            } else {
                console.log('Storage permission denied');
            }
        } catch (err) {
            console.warn('Error requesting storage permission:', err);
        }
    };

    // Function to fetch statements from Firebase
    const fetchStatements = async () => {
        try {
            const currentUser = firebase.auth().currentUser;
            if (currentUser) {
                const userId = currentUser.uid;

                // Fetch statements from Firebase
                const snapshot = await firebase.firestore().collection('Statements').where('userId', '==', userId).get();
                const fetchedStatements = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })); // Add 'id' field to each document
                setStatementList(fetchedStatements);
            }
        } catch (error) {
            console.error('Error fetching statements:', error);
        }
    };

    // Function to handle changing the statement type
    const handleStatementTypeChange = (type) => {
        setStatementType(type);
    };

    // Function to generate PDF
    const generatePDF = async () => {
        const htmlContent = generateHTMLContent();
        const options = {
            html: htmlContent,
            fileName: 'statement.pdf',
            directory: 'Documents',
        };

        const file = await RNHTMLtoPDF.convert(options);
        console.log('PDF generated:', file.filePath);
    };

    // Function to generate HTML content for the PDF
    const generateHTMLContent = () => {
        let htmlContent = `
      <html>
        <head>
          <style>
            /* Add your custom styles here */
          </style>
        </head>
        <body>
          <div>
            <img src="file:///android_asset/logo.png" alt="Logo" width="100" height="100"/>
            <h1>${statementType === 'Income' ? 'Income Statement' : 'Investment Statement'}</h1>
    `;

        // You can use statementList to generate HTML content dynamically here
        statementList
            .filter(statement => statement.type === statementType)
            .forEach(statement => {
                htmlContent += `
                    <div>
                        <p>Date: ${new Date(statement.date.seconds * 1000).toLocaleDateString()}</p>
                        <p>Description: ${statement.description}</p>
                        <p>Amount: ${statement.amount}</p>
                    </div>
                `;
            });

        htmlContent += `
          </div>
        </body>
      </html>
    `;

        return htmlContent;
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image source={require('../assets/icons8-back-50.png')} style={styles.backIcon} />
                </TouchableOpacity>
                <Text style={styles.title}>Statements</Text>
                <TouchableOpacity onPress={generatePDF}>
                    <Image source={require('../assets/icons8-print-30.png')} style={styles.downloadIcon} />
                </TouchableOpacity>
            </View>

            {/* Select Statement Type */}
            <View style={styles.dropdownContainer}>
                <Picker
                    selectedValue={statementType}
                    onValueChange={handleStatementTypeChange}
                    style={styles.dropdown}
                >
                    <Picker.Item label="Income" value="Income" />
                    <Picker.Item label="Investment" value="Investment" />
                </Picker>
            </View>

            {/* Statement List */}
            <View style={styles.statementListContainer}>
                <Text style={styles.statementListTitle}>
                    {statementType === 'Income' ? 'Income Statement' : 'Investment Statement'}
                </Text>
                <FlatList
                    data={statementList.filter(statement => statement.type === statementType)}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.statementItem}>
                            <Text>Date: {new Date(item.date.seconds * 1000).toLocaleDateString()}</Text>
                            <Text>Description: {item.description}</Text>
                            <Text>Amount: {item.amount}</Text>
                        </View>
                    )}
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
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    backIcon: {
        width: 30,
        height: 30,
    },
    title: {
        fontSize: 24,
        color: 'black',
    },
    downloadIcon: {
        width: 30,
        height: 30,
    },
    dropdownContainer: {
        marginBottom: 20,
    },
    dropdown: {
        height: 50,
        width: '100%',
        backgroundColor: '#EEF5FF',
    },
    statementListContainer: {
        flex: 1,
    },
    statementListTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#0766AD',
    },
    statementItem: {
        borderWidth: 1,
        borderColor: '#0766AD',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
        backgroundColor: '#EEF5FF',
    },
});

export default StatementsScreen;
