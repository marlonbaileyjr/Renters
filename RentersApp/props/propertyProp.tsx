import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { fetchUser } from '../functions/getUserName';
import { useNavigation } from '@react-navigation/native';

const Property = ({ Type, Tenant, Name, id, TenantID, UnitNum, Street, City, Zip, State}: any) => {
    const navigation: any = useNavigation();

    const handlePress = () => {
      navigation.navigate('PropertyDetails', {
        property_id :id,
        tenant_id: TenantID, 
        property_type: Type, 
        property_unitnum: UnitNum, 
        property_street: Street, 
        property_city: City, 
        property_zip: Zip, 
        property_state: State
      });
    };

    return (
      <View style={styles.propertyContainer}>
        <TouchableOpacity onPress={handlePress}>
          <View style={styles.rowContainer}>
            <Text style={styles.label}>Type: </Text>
            <Text style={styles.value}>{Type}</Text>
          </View>
          <View style={styles.rowContainer}>
            <Text style={styles.label}>Tenant: </Text>
            <Text style={styles.value}>{Tenant}</Text>
          </View>
          <View style={styles.rowContainer}>
            <Text style={styles.value}>{Name}</Text>
          </View>
        </TouchableOpacity>
      </View>
    ); 
}


const styles = StyleSheet.create({
    propertyContainer: {
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
  
  export default Property;