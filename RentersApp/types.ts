import {
    CompositeScreenProps,
    NavigatorScreenParams,
  } from "@react-navigation/native";
  import { NativeStackScreenProps } from "@react-navigation/native-stack";

  declare global {
    namespace ReactNavigation {
      interface RootParamList extends RootStackParamList {}
    }
  }

export type RootStackParamList = {
    Login: undefined;
    Forgot: undefined;
    MainPage: undefined;
    Properties1: undefined;
    ContactUs: undefined;
    AboutUs: undefined;
    Transactions: undefined;
    Menu: undefined;
    Profile: undefined;
    Main: undefined;
    AllTransactions: undefined;
    TransactionDetails: undefined;
    ViewTenants: undefined;
    TenantDetails: undefined;
    AddTenant: undefined;
    ViewProperties: undefined;
    PropertyDetails: undefined;
    AddProperty: undefined;
    Payment: undefined;
  };

  export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>;