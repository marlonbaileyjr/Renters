import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { fetchProp } from '../../functions/getPropertyName';
import PullToRefresh from "../../props/refresh";


type TenantData = {
  key: number,
  user_id: string,
  firstnm: string,
  lastnm: string,
  email: string,
  phonenum: string,
  owner_id: string,
  user_type: string,
  property_id: string
};

const TenantDetails = ({ route }: any) => {
  const { user_id, first_name, last_name, email, phone_number, property_id } = route.params;
  const [propName, setpropName] = useState('');

  const handleRefresh = async () => {
    await fetchProp(property_id);
  };

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
  }, [property_id]); // Add property_id as a dependency for useEffect

  return (
    <PullToRefresh onRefresh={handleRefresh}>
    <View style={styles.container}>
      <Text style={styles.label}>USER ID:</Text>
      <Text style={styles.value}>{user_id}</Text>
      <Text style={styles.label}>name:</Text>
      <Text style={styles.value}>{`${first_name} ${last_name}`}</Text>
      <Text style={styles.label}>Email:</Text>
      <Text style={styles.value}>{email}</Text>
      <Text style={styles.label}>Phone Number:</Text>
      <Text style={styles.value}>{phone_number}</Text>
      <Text style={styles.label}>Property:</Text>
      <Text style={styles.value}>{propName}</Text>
    </View>
    </PullToRefresh>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f8f8f8',
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  value: {
    marginBottom: 16,
  },
});

export default TenantDetails;
