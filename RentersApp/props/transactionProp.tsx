import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { fetchUser } from '../functions/getUserName';
import { useNavigation } from '@react-navigation/native';

const Transaction = ({ type, amount, user_id, date, id }: any) => {
  const [username, setUsername] = useState('');
  const navigation: any = useNavigation();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const fetchedUsername: any = await fetchUser(user_id);
        setUsername(fetchedUsername);
      } catch (error) {
        console.error('Failed to fetch user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const handlePress = () => {
    navigation.navigate('TransactionDetails', {
      id: id,
      username: username
    });
  };
  

  return (
    <View style={styles.transactionContainer}>
      <TouchableOpacity onPress={handlePress}>
        <View style={styles.rowContainer}>
          <Text style={styles.label}>Type: </Text>
          <Text style={styles.value}>{type}</Text>
        </View>
        <View style={styles.rowContainer}>
          <Text style={styles.label}>Amount: </Text>
          <Text style={styles.value}>{amount}</Text>
        </View>
        <View style={styles.rowContainer}>
          <Text style={styles.label}>FROM: </Text>
          <Text style={styles.value}>{username}</Text>
        </View>
        <View style={styles.rowContainer}>
          <Text style={styles.label}>Date: </Text>
          <Text style={styles.value}>{date}</Text>
        </View> 
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  transactionContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    width: '80%',
    height: 120,
    padding: 16,
    marginBottom: 16,
    backgroundColor: '#f8f8f8',
  },
  rowContainer: {
    flexDirection: 'row',
    marginBottom: 8,
    alignItems: 'center',
  },
  label: {
    fontWeight: 'bold',
    marginRight: 4,
  },
  value: {
    flex: 1,
    textAlign: 'right',
  },
});

export default Transaction;
