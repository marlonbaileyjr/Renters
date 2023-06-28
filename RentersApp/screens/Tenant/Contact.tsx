import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { emailPort } from '../../port';


const Contact = () => {
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');


  const handleBodyChange = (text: any) => {
    setBody(text);
  };

  const handleSubmit = async (navigation: any) => {
    const htmlBody = `<html><body>${body}</body></html>`;
  
    try {
      const response = await fetch(`${emailPort}/send-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, body: htmlBody }),
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
  
    setEmail('');
    setBody('');
  };
  

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={email}
        editable={false}
      />
      <TextInput
        style={styles.input}
        placeholder="Body"
        multiline={true}
        numberOfLines={4}
        value={body}
        onChangeText={handleBodyChange}
      />
      <TouchableOpacity 
      style={styles.button}
      onPress={handleSubmit}>
        <Text style={styles.button_text}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

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

export default Contact;
