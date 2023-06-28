import { useState } from "react";
import { View, Text, StyleSheet } from "react-native"
import { TextInput } from "react-native-gesture-handler";

const Payment = () => {  
    const [creditCard, setcreditCard] = useState('');
    const [cvv, setcvv] = useState('');
    const [zipcode, setzipCode] = useState('');

    return (
        <View style={styles.container}>
        <TextInput 
          placeholder="Card Number" 
          value={creditCard}
          onChangeText={text => setcreditCard(text)} 
          style={styles.input}
        />
        <TextInput 
          placeholder="CVV" 
          value={cvv}
          onChangeText={text => setcvv(text)} 
          style={styles.input}
          //secureTextEntry
        />
        <TextInput 
          placeholder="ZipCode" 
          value={zipcode}
          onChangeText={text => setzipCode(text)} 
          style={styles.input}
          //secureTextEntry
        />
        </View>
    )
}

export default Payment

const styles = StyleSheet.create({
    input:{
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop:5
      },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    }
});