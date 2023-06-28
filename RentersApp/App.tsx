import 'react-native-gesture-handler';
import { StyleSheet, Text } from 'react-native';
import OwnerNavigator from './routes/Drawers/OwnerDrawer';
import TenantNavigator from './routes/Drawers/TenantDrawer';
import MainDrawerNavigator from './routes/Drawers/MainDrawer';
import Login from './routes/Stacks/LoginStack';
import { useEffect, useState } from 'react';
import {NavigationContainer} from '@react-navigation/native';
import { UserContext } from './UserContext';;
import * as Notifications from 'expo-notifications';
import { useNotifications } from './hooks/useNotifications';


export default function App() {
  const [userType, setUserType] = useState('');
  const [loggedin, setLoggedin] = useState(false);
  const [userID, setUserID] = useState('');

  useEffect(()=>{
    const {registerForPushNotificationsAsync, handleNotificationResponse}=
    useNotifications()

    registerForPushNotificationsAsync()
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
      }),
    });

    const responseListener =
    Notifications.addNotificationResponseReceivedListener(
      handleNotificationResponse
    )

    return()=>{
      if (responseListener)
      Notifications.removeNotificationSubscription(responseListener)
    }

  })
  

  return (
    <UserContext.Provider value={{ userType, setUserType, loggedin, setLoggedin, userID, setUserID }}>
      <NavigationContainer>
        {loggedin ? (
          userType === 'owner' ? (
            <OwnerNavigator />
          ) : userType === 'tenant' ? (
            <TenantNavigator />
          ) : (
            <Login />
          )
        ) : (
          <>
            <MainDrawerNavigator />
          </>
        )}
      </NavigationContainer>
    </UserContext.Provider>
  );
  
}

// Handle incoming deep links

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});