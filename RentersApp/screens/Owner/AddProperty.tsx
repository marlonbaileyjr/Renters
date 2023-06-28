import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native'; 
import { TextInput } from 'react-native-gesture-handler';
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from '../../UserContext';
import { port } from '../../port';
import { useNavigation } from '@react-navigation/native';
import { SelectList  } from 'react-native-dropdown-select-list'

const AddProperty = () => {
    const navigation: any = useNavigation();
    const [type, setType] = useState('');
    const [number, setNumber] = useState<number>(0);
    const [street, setStreet] = useState('');
    const [city, setCity] = useState('');
    const [zip, setZip] = useState<number>(0);
    const [state, setState] = useState('');
    const {userID} = useContext(UserContext);
    const [data, setData] = useState([]);
    const [typeData, setTypeData] = useState([]);

    useEffect(() => {
        // Fill state abbreviations manually
        const states: any = [
          'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
          'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
          'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
          'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
          'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
        ];
    
        // Fill property types manually
        const propertyTypes: any = [
            'Single Family Home',
            'Apartment',
            'Condo',
            'Townhouse',
            'Duplex',
            'Triplex',
            'Fourplex',
            'Multi-Family Home',
            'Mobile Home',
            'Vacation Rental',
            'Commercial Property',
            'Industrial Property',
            'Office Space',
            'Retail Space',
            'Warehouse',
            'Land',
            'Other'
          ];
          
    
        // Update the data state variable with state abbreviations
        setData(states);
    
        // Update the typeData state variable with property types
        setTypeData(propertyTypes);
      }, []);

      async function AddProperty(number: number,street: string,city: string,zip: number,type: string,state: string, user_id:string) {
        try {
          const response = await fetch(`${port}/addProperty`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({number,street,city,zip,type,state, user_id}),
          });
      
          if (response.ok) {
            const responseData = await response.json();
            const { message } = responseData;
            alert(message)
            navigation.navigate('View Properties')
          } else {
            const error = await response.json();
            console.log(error);
          }
        } catch (err) {
          console.log(err);
        }
      }

    return (
        <View style={styles.container}>
            <SelectList 
            setSelected={(val: any) => setType(val)} 
            data={typeData} 
            save="value"
            />
            <TextInput
            style={styles.input}
            placeholder="Unit Number"
            onChangeText={(text) => setNumber(parseInt(text))}
            keyboardType='numeric'
            />
            <TextInput
            style={styles.input}
            placeholder="Street"
            onChangeText={setStreet}
            />
            <TextInput
            style={styles.input}
            placeholder="City"
            onChangeText={setCity}
            />
            <TextInput
            style={styles.input}
            placeholder="Zip"
            onChangeText={(text) => setZip(parseInt(text))}
            keyboardType='numeric'
            />
            <SelectList 
            setSelected={(val: any) => setState(val)} 
            data={data} 
            save="value"
            />
              {number && street && city && zip && type && state ? (    
            <TouchableOpacity style={styles.button} onPress={() => AddProperty(number, street, city, zip, type, state, userID)}>
            <Text style={styles.button_text}>Add Property</Text>
          </TouchableOpacity>
          
            ) : null}

        </View>
    )

}
export default AddProperty

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    input: {
      borderWidth: 1,
      borderColor: 'black',
      borderRadius: 8,
      padding: 8,
      margin: 10,
      width: 200,
    },
    button: {
      backgroundColor: 'lightgrey',
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 8,
      marginBottom: 16,
      marginTop: 20,
    },
    button_text: {
      color: 'black',
      fontWeight: 'bold',
    },
  });
  