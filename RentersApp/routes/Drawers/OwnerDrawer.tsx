import { createDrawerNavigator } from '@react-navigation/drawer';
import {OwnerMainStack} from "../Stacks/OwnerMainStack";
import {TransactionStack} from "../Stacks/OwnerMainStack";
import {ViewTenantStack} from "../Stacks/OwnerMainStack";
import { ViewPropertyStack } from '../Stacks/OwnerMainStack';

const Drawer = createDrawerNavigator();

const OwnerDrawerNavigator = () => {
  return (
      <Drawer.Navigator>
        <Drawer.Screen name="Home" component={OwnerMainStack} options={{ headerShown: false }} />
        <Drawer.Screen name="Transactions" component={TransactionStack} options={{ headerShown: false }} />
        <Drawer.Screen name="Tenant" component={ViewTenantStack} options={{ headerShown: false }} />
        <Drawer.Screen name="Properties" component={ViewPropertyStack} options={{ headerShown: false }} />
      </Drawer.Navigator>
  );
}

export default OwnerDrawerNavigator;
