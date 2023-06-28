import { createStackNavigator } from '@react-navigation/stack';
import Login from "../../screens/SignIn/Login";
import Forgot from "../../screens/SignIn/Forgot";
import { RootStackParamList } from '../../types';

const Stack = createStackNavigator<RootStackParamList>();

const LoginStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Forgot" component={Forgot} />
        </Stack.Navigator>
    );
}

export default LoginStack;