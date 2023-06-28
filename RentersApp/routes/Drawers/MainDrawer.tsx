import { createDrawerNavigator } from '@react-navigation/drawer';
import LoginStack from '../Stacks/LoginStack';
import { MainStack } from '../Stacks/MainStack'; // Update import statement
import { PropertiesStack } from '../Stacks/MainStack';
import { AboutUsStack } from '../Stacks/MainStack';
import { ContactUsStack } from '../Stacks/MainStack';


const Drawer = createDrawerNavigator();

const MainDrawerNavigator = () => {
  return (
      <Drawer.Navigator>
        <Drawer.Screen name="Main" component={MainStack} options={{ headerShown: true }} />
        <Drawer.Screen name="Properties" component={PropertiesStack} options={{ headerShown: false }} />
        <Drawer.Screen name="About Us" component={AboutUsStack} options={{ headerShown: false }} />
        <Drawer.Screen name="Contact Us" component={ContactUsStack} options={{ headerShown: false }} />
        <Drawer.Screen name="LoginScreen" component={LoginStack}  options={{ headerShown: false }}/>
      </Drawer.Navigator>
  );
}

export default MainDrawerNavigator;
