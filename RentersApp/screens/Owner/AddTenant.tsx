import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'; 
import { TextInput } from 'react-native-gesture-handler';
import React, { useContext, useEffect, useState } from "react";
import { MultipleSelectList } from 'react-native-dropdown-select-list'
import { emailPort } from '../../port';
import { UserContext } from '../../UserContext';
import { port } from '../../port';
import { useNavigation } from '@react-navigation/native';
import generateRandomCode from '../../functions/randomCode';


const AddTenant = () => {
  const navigation: any = useNavigation();
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [email, setEmail] = useState('');
  const [selected, setSelected] = useState([]);
  const { userID} = useContext(UserContext);
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch user data on component mount
    fetchProperties(userID);
  }, [userID]);



  async function SendEmail(email: string, body: string) {
    try {
      const response = await fetch(`${emailPort}/send-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, body }),
      });
      if (response.ok) {
        const result = await response.json();
        console.log(result);
      } else {
        const error = await response.json();
        console.log(error);
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function fetchProperties(userId: any) {
    try {
      const response = await fetch(`${port}/property`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId }),
      });
      if (response.ok) {
        const result = await response.json();
        const formattedData: any = result.data.map((property: any, index: any) => {
          const propertyDetails = `${property.property_street} ${property.property_city} ${property.property_state}`;
          return {
            key: property.property_id,
            value: propertyDetails,
          };
        });
        setData(formattedData);
      } else {
        const error = await response.json();
        console.log(error);
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function PostProperties(code: string, property: number) {
    try {
      const response = await fetch(`${port}/signup_prop`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code, property }),
      });
      if (response.ok) {
        console.log("Properties Added");
      } else {
        const error = await response.json();
        console.log(error);
      }
    } catch (err) {
      console.log(err);
    }
  }
  
  async function PostCode(fname: string, lname: string, email: string, unique: string, created: string, expire: string) {
    try {
      const response = await fetch(`${port}/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fname, lname, email, unique, created, expire }),
      });
  
      if (response.ok) {
        const responseData = await response.json();
        const { message } = responseData;
  
        selected.forEach(async id => {
          await PostProperties(unique, id);
        });
  
        console.log(message);
      } else {
        const error = await response.json();
        console.log(error);
      }
    } catch (err) {
      console.log(err);
    }
  }
  
  
    

  const handleSendEmail = async () => {
    // Generate random 10-character code including special characters
    const gen_code: string = generateRandomCode(10);
  
    // Get current date and time
    const currentDateTime = new Date();
  
    // Add 24 hours to the current date and time
    const expDate = new Date(currentDateTime.getTime() + (24 * 60 * 60 * 1000));
  
    // Format the date and time
    const options: any = { year: 'numeric', day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' };
    const currFormatted = currentDateTime.toLocaleDateString('en-US', options).replace(/\//g, '-');
    const expFormatted = expDate.toLocaleDateString('en-US', options).replace(/\//g, '-');
  
    // Call the PostCode function
    await PostCode(fname, lname, email, gen_code, currFormatted, expFormatted);
  
    // Prepare the email body
    const emailBody = `
      <p>Hello,</p>
      <p>Thank you for signing up. Here is your Sign Up Link:</p>
      <p><a href="https://example.com?code=${gen_code}">Sign Up Here</a></p>
      <p>This code will expire on ${expFormatted}.</p>
      <p>Best regards,</p>
      <p>Your App Team</p>
    `;
  
    // Call the SendEmail function with the email body
    SendEmail(email, emailBody);
  };
  
  

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="First Name"
        value={fname}
        onChangeText={setFname}
      />
      <TextInput
        style={styles.input}
        placeholder="Last Name"
        value={lname}
        onChangeText={setLname}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <MultipleSelectList
        setSelected={(val: any) => setSelected(val)} 
        data={data} 
        save="key"
        label="Assign Properties"
      />
        {fname && lname && email && selected ? (    
      <TouchableOpacity style={styles.button} onPress={handleSendEmail}>
        <Text style={styles.button_text}>Send Email</Text>
      </TouchableOpacity>
      ) : null}
    </View>
  );
};

export default AddTenant;

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
