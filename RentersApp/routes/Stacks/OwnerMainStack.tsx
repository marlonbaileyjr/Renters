import { createStackNavigator } from '@react-navigation/stack';
import {Appearance, View, StyleSheet, Modal} from 'react-native'
import { Feather } from '@expo/vector-icons';
import Payment from '../../screens/Tenant/Payment';
import Transactions from '../../screens/Transaction';
import TransactionDetails from '../../screens/TransactionDetails';
import Transaction from '../../props/transactionProp';
import Tenants from '../../screens/Owner/ViewTenants';
import TenantDetails from '../../screens/Owner/TenantDetails';
import AddTenant from '../../screens/Owner/AddTenant';
import PropertyDetails from '../../screens/PropertyDetails';
import AddProperty from '../../screens/Owner/AddProperty';
import ViewProperties from '../../screens/ViewProperties';
import Main from '../../screens/Main';
import MenuScreen from '../../screens/Menu';
import Profile from '../../screens/Profile';
import { RootStackParamList } from '../../types';

const Stack = createStackNavigator<RootStackParamList>();
export const OwnerMainStack = () => {
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
      <Stack.Screen name="Payment" component={Payment} />
      <Stack.Screen name="TransactionDetails" component={TransactionDetails} />
      <Stack.Screen name="Menu" component={MenuScreen}/>
      <Stack.Screen name="Profile" component={Profile}/>

    </Stack.Navigator>
  );
};


export const TransactionStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="AllTransactions" component={Transactions} />
      <Stack.Screen name="TransactionDetails" component={TransactionDetails} />
      <Stack.Screen name="Transactions" component={Transaction} />
    </Stack.Navigator>
  );
};

export const ViewTenantStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ViewTenants" component={Tenants} />
      <Stack.Screen name="TenantDetails" component={TenantDetails} />
      <Stack.Screen name="AddTenant" component={AddTenant} />
    </Stack.Navigator>
  );
};

export const ViewPropertyStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ViewProperties" component={ViewProperties} />
      <Stack.Screen name="PropertyDetails" component={PropertyDetails} />
      <Stack.Screen name="AddProperty" component={AddProperty} />
    </Stack.Navigator>
  );
};

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
