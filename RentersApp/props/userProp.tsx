import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { fetchProp } from '../functions/getPropertyName';
import { useNavigation } from '@react-navigation/native';

const User = ({ user_id,
    first_name,
    last_name,
    email,
    phone_number,
    owner_id,
    user_type,
    property_id}: any) => {
  const [propName, setpropName] = useState('');
  const navigation: any = useNavigation();

  useEffect(() => {
    const fetchPropData = async () => {
      try {
        const fetchedProperty: any = await fetchProp(property_id);
        setpropName(fetchedProperty);
      } catch (error) {
        console.error('Failed to fetch user data:', error);
      }
    };

    fetchPropData();
  }, []);

  const handlePress = () => {
    navigation.navigate('TenantDetails', {
        user_id: user_id,
        first_name: first_name,
        last_name: last_name,
        email: email,
        phone_number: phone_number,
        owner_id: owner_id,
        user_type: user_type,
        property_id: property_id,
    });
  };
  
  const name:string = `${first_name} ${last_name}`;

  return (
    <View style={styles.transactionContainer}>
      <TouchableOpacity onPress={handlePress}>
        <View style={styles.rowContainer}>
          <Text style={styles.label}>Name: </Text>
          <Text style={styles.value}>{name}</Text>
        </View>
        <View style={styles.rowContainer}>
          <Text style={styles.label}>Properties: </Text>
          <Text style={styles.value}>{propName}</Text>
        </View>
        <View style={styles.rowContainer}>
          <Text style={styles.label}>Email: </Text>
          <Text style={styles.value}>{email}</Text>
        </View>
        <View style={styles.rowContainer}>
          <Text style={styles.label}>Phone Number: </Text>
          <Text style={styles.value}>{phone_number}</Text>
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

export default User;
