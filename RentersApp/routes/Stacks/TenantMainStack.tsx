import { createStackNavigator } from '@react-navigation/stack';
import Transactions from '../../screens/Transaction';
import Main from '../../screens/Main';
import payment from '../../screens/Tenant/Payment';
import Contact from '../../screens/Tenant/Contact';
import TransactionDetails from '../../screens/TransactionDetails';
import ViewProperties from '../../screens/ViewProperties';
import PropertyDetails from '../../screens/PropertyDetails';
import MenuScreen from '../../screens/Menu';
import { Appearance, StyleSheet, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import Profile from '../../screens/Profile';
import { RootStackParamList } from '../../types';

const Stack = createStackNavigator<RootStackParamList>();

export const TenantMainStack = () => {
  const isDarkMode = Appearance.getColorScheme() === 'dark';
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Main"
        component={Main}
        options={({ navigation }) => ({
          headerRight: () => (
            <View style={styles.iconContainer}>
              <Feather
                name="help-circle"
                size={24}
                color={isDarkMode ? '#fff' : '#000'}
                style={styles.icon}
                //onPress={toggleModal}
              />
              <Feather
                name="user"
                size={24}
                color={isDarkMode ? '#fff' : '#000'}
                style={styles.icon}
                onPress={() => navigation.navigate('Menu')}
              />
            </View>
          ),
        })}
      />
      <Stack.Screen name="Transactions" component={Transactions} />
      <Stack.Screen name="Payment" component={payment} />
      <Stack.Screen name="TransactionDetails" component={TransactionDetails} />
      <Stack.Screen name="Menu" component={MenuScreen}/>
      <Stack.Screen name="Profile" component={Profile}/>
    </Stack.Navigator>
  );
}

export const TenantTransactionStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Transactions" component={Transactions}/>
      <Stack.Screen name="TransactionDetails" component={TransactionDetails} />
    </Stack.Navigator>
  )
}

export const TenantPropertyStack = () => {
  return(
    <Stack.Navigator>
      <Stack.Screen name="Properties1" component={ViewProperties}/>
      <Stack.Screen name="PropertyDetails" component={PropertyDetails} />
    </Stack.Navigator>
  )
}

export const TenantContactStack=()=>{
  return (
    <Stack.Navigator>
      <Stack.Screen name="ContactUs" component={Contact}/>
    </Stack.Navigator>
  )
}

const styles = StyleSheet.create({
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  icon: {
    marginLeft: 10,
  },
});