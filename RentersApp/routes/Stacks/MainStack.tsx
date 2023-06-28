import { createStackNavigator } from '@react-navigation/stack';
import AboutUs from '../../screens/FrontScreen/AboutUs';
import ContactUs from '../../screens/FrontScreen/ContactUs';
import Properties from '../../screens/FrontScreen/Properties';
import MainPage from '../../screens/FrontScreen/MainPage';

import { RootStackParamList } from '../../types';

const Stack = createStackNavigator<RootStackParamList>();

export const MainStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="MainPage" component={MainPage} options={{ headerShown: false }}/>
        </Stack.Navigator>
    );
}

export const PropertiesStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Properties1" component={Properties} options={{ headerShown: false }}/>
        </Stack.Navigator>
    );
}
export const AboutUsStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="AboutUs" component={AboutUs} options={{ headerShown: false }}/>
        </Stack.Navigator>
    );
}
export const ContactUsStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="ContactUs" component={ContactUs} options={{ headerShown: false }}/>
        </Stack.Navigator>
    );
}
