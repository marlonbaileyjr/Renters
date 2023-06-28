import { createDrawerNavigator } from '@react-navigation/drawer';
import {TenantMainStack} from "../Stacks/TenantMainStack";
import { TenantContactStack } from '../Stacks/TenantMainStack';
import { TenantTransactionStack } from '../Stacks/TenantMainStack';
import { TenantPropertyStack } from '../Stacks/TenantMainStack';

const Drawer = createDrawerNavigator();

const TenantDrawerNavigator = () => {
  return (
      <Drawer.Navigator>
        <Drawer.Screen name="Home" component={TenantMainStack} options={{ headerShown: false }}/>
        <Drawer.Screen name="Transactions" component={TenantTransactionStack} options={{headerShown: false}}/>
        <Drawer.Screen name="Properties" component={TenantPropertyStack} options={{ headerShown: false }}/>
        <Drawer.Screen name="Contact" component={TenantContactStack} options={{ headerShown: false }}/>
      </Drawer.Navigator>
  );
}

export default TenantDrawerNavigator;