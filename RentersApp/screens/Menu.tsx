import React, { useContext } from 'react';
import { UserContext } from '../UserContext';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const MenuScreen = ({navigation}: any) => {
  const { setLoggedin, setUserID  } = useContext(UserContext);

  const navigateWindow = (option: string) => {
    navigation.navigate(option)
  };

  const Signout = () =>{
    setLoggedin(false)
    setUserID('')
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.optionContainer}
        onPress={() => navigateWindow("Profile")}
      >
        <Text style={styles.option}>View Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.optionContainer}
        onPress={Signout}
      >
        <Text style={styles.option}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionContainer: {
    marginBottom: 16,
  },
  option: {
    fontSize: 24,
  },
});

export default MenuScreen;
