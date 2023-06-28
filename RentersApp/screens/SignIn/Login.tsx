import { useContext, useState } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity, KeyboardAvoidingView, TextInput } from 'react-native';
import { UserContext } from '../../UserContext';
import { port } from '../../port';

export default function LoginScreen() {
  const { setUserType, setLoggedin, setUserID } = useContext(UserContext);

  const [email, setemail] = useState('');
  const [password, setPassword] = useState('');

  async function login(email: string, password: string) {
    // Remove spaces from email and convert to lowercase
    email = email.replace(/\s+/g, '').toLowerCase();
  
    try {
      const response = await fetch(`${port}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });
  
      // Check if response is successful
      if (response.ok) {
        const result = await response.json();  
        // Update user type in context
        setUserType(result.userType);
  
        // Update user ID in context
        setUserID(result.userId);
  
        // Update logged in status in context
        setLoggedin(true);
  
      } else {
        const error = await response.json();
        alert(error.error); // Error message from the server
      }
    } catch (err) {
      console.error(err);
    }
  }
  
  
  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior="padding"
    >
      <View style={styles.inputContainer}>
        <TextInput 
          placeholder="email" 
          value={email}
          onChangeText={text => setemail(text)} 
          style={styles.input}
        />
        <TextInput 
          placeholder="Password" 
          value={password}
          onChangeText={text => setPassword(text)} 
          style={styles.input}
          //secureTextEntry
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => login(email, password)}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    alignItems:'center',
    justifyContent:'center',
  },
  inputContainer:{
    width: '80%'
  },
  input:{
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop:5
  },
  buttonContainer:{
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:40
  },
  button:{
    backgroundColor: '#0782f9',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText:{
    color: 'white',
    fontWeight: '700',
    fontSize: 16
  },
  buttonOutineText:{
    color: '#0782f9',
    fontWeight: '700',
    fontSize: 16
  },
});
