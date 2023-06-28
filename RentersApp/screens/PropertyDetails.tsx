import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'; 
import { TextInput } from 'react-native-gesture-handler';
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from '../UserContext';
import { port } from '../port';
import { useNavigation } from '@react-navigation/native';

type PropertyData = {
  property_id: string,
  owner_id: string,
  tenant_id: string,
  property_type: string,
  property_unitnum: string,
  property_street: string,
  property_city: string,
  property_zip: string,
  property_state: string
};

const PropertyDetails = ({ route }: any) => {
  const {property_id,
    tenant_id, 
    property_type, 
    property_unitnum, 
    property_street, 
    property_city, 
    property_zip, 
    property_state} = route.params;


    return (
      <View style={styles.container}>
      <Text style={styles.label}>Property ID:</Text>
      <Text style={styles.value}>{property_id}</Text>
      <Text style={styles.label}>Tenant:</Text>
      <Text style={styles.value}>{tenant_id}</Text>
      <Text style={styles.label}>Type:</Text>
      <Text style={styles.value}>{property_type}</Text>
      <Text style={styles.label}>Number:</Text>
      <Text style={styles.value}>{property_unitnum}</Text>
      <Text style={styles.label}>Street:</Text>
      <Text style={styles.value}>{property_street}</Text>
      <Text style={styles.label}>City:</Text>
      <Text style={styles.value}>{property_city}</Text>
      <Text style={styles.label}>State:</Text>
      <Text style={styles.value}>{property_state}</Text>
      <Text style={styles.label}>Zip:</Text>
      <Text style={styles.value}>{property_zip}</Text>
    </View>
    )

}
export default PropertyDetails

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
  