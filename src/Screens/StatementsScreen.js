import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image, PermissionsAndroid, Platform } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import RNHTMLtoPDF from 'react-native-html-to-pdf';

const StatementsScreen = () => {
    const navigation = useNavigation();
    const [statementType, setStatementType] = useState('Income');
    const [statementList, setStatementList] = useState([]);

    useEffect(() => {
        requestStoragePermission();
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

    // Sample statement data (replace with actual data)
    const demoStatements = [
        {
            id: '1', type: 'Income', transactions: [
                { id: '1', date: '2023-12-01', description: 'Sample income transaction 1', amount: 500 },
                { id: '2', date: '2023-12-02', description: 'Sample income transaction 2', amount: 1000 },
            ]
        },
        {
            id: '2', type: 'Investment', transactions: [
                { id: '1', date: '2023-12-01', description: 'Sample investment transaction 1', amount: 700 },
                { id: '2', date: '2023-12-02', description: 'Sample investment transaction 2', amount: 1500 },
            ]
        },
    ];

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

        const selectedStatement = demoStatements.find(statement => statement.type === statementType);
        if (selectedStatement) {
            const transactionsByMonth = groupTransactionsByMonth(selectedStatement.transactions);
            transactionsByMonth.forEach((monthTransactions, month) => {
                htmlContent += `
          <h2>${month}</h2>
          <ul>
        `;
                monthTransactions.forEach(transaction => {
                    htmlContent += `
            <li>
              <p>Date: ${transaction.date}</p>
              <p>Description: ${transaction.description}</p>
              <p>Amount: ${transaction.amount}</p>
            </li>
          `;
                });
                htmlContent += `
          </ul>
        `;
            });
        }

        htmlContent += `
          </div>
        </body>
      </html>
    `;

        return htmlContent;
    };


    // Function to group transactions by month
    const groupTransactionsByMonth = (transactions) => {
        const groupedTransactions = new Map();
        transactions.forEach(transaction => {
            const date = new Date(transaction.date);
            const month = date.toLocaleString('default', { month: 'long', year: 'numeric' });
            if (!groupedTransactions.has(month)) {
                groupedTransactions.set(month, []);
            }
            groupedTransactions.get(month).push(transaction);
        });
        return groupedTransactions;
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
                    data={demoStatements.find(statement => statement.type === statementType)?.transactions || []}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.statementItem}>
                            <Text>Date: {item.date}</Text>
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
