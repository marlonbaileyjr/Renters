import React, { useState, useEffect, useContext } from 'react';
import { View, TextInput, Button, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { port } from '../port';
import { UserContext } from '../UserContext';

type UserData = {
  user_id: string,
  key: number,
  password: string,
  firstnm: string,
  lastnm: string,
  email: string,
  phonenum: string,
  username: string
};

const Profile = () => {
  const [user, setUser] = useState<UserData | null>(null);
  const { userID } = useContext(UserContext);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    fetchUsers(userID);
  }, []);

  async function fetchUsers(userID: string) {
    try {
      const response = await fetch(`${port}/profile`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userID }),
      });

      if (response.ok) {
        const result = await response.json();
        setUser(result.data[0]);
        console.log(user)
      } else {
        const error = await response.json();
        console.error(error.error);
      }
    } catch (err) {
      console.error(err);
    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  if (user === null) {
    return null; // or show a loading indicator
  }

  return (
    <View style={styles.container}>
      <TextInput
          style={styles.input}
          value={user.firstnm}
          editable={false}
      />
      <TextInput
        style={styles.input}
        value={user.lastnm}
        editable={false}
      />
      <TextInput
        style={styles.input}
        value={user.email}
        editable={false}
      />
      <TextInput
        style={styles.input}
        value={user.phonenum}
        editable={false}
      />
      {showPassword ? (
        <TextInput
          style={styles.input}
          value={user.password}
          editable={false}
        />
      ) : (
        <TouchableOpacity
          style ={styles.button}
          onPress={togglePasswordVisibility}
        >
          <Text style={styles.button_text}>Show Password</Text>
        </TouchableOpacity>
      )}
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


export default Profile;
