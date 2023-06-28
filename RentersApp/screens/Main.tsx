import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, KeyboardAvoidingView } from "react-native";
import { UserContext } from "../UserContext";
import {TouchableOpacity } from "react-native-gesture-handler";
import Transaction from '../props/transactionProp';
import { port } from "../port";
import { fetchUser } from "../functions/getUserName";
import PullToRefresh from "../props/refresh";

type User = {
  userName: string;
};

type TransactionData = {
  transaction_id: string;
  transaction_type: string;
  transaction_amount: string;
  transaction_date: string;
  user_id: any;
};

const OwnerMain = ({navigation}: any) => {
  const { userID, userType } = useContext(UserContext);
  const [user, setUser] = useState<User | null>(null); // Specify the type of user state as User | null
  const [transactions, setTransactions] = useState<TransactionData[]>([]);

  const handleRefresh = async () => {
    await fetchData(userID);
  };

  useEffect(() => {
    fetchData(userID);
  }, [userID]);

  async function fetchData(userID: string) {
    await fetchtransactions(userID);
    await fetchUserName(userID);
  }

  async function fetchtransactions(userID: string) {
    try {
      const response = await fetch(`${port}/transactions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userID, userType }),
      });

      // Check if response is successful
      if (response.ok) {
        const result = await response.json();
        console.log(result.message); // User Found message
        setTransactions(result.transactions);
      } else {
        const error = await response.json();
        console.error(error.error); // Error message from the server
      }
    } catch (err) {
      console.error(err);
    }
  }

//fetch user
async function fetchUserName(userID: string) {
  try {
    const fetchedUserName: string | null = await fetchUser(userID);
    if (fetchedUserName) {
      setUser({ userName: fetchedUserName });
    }
  } catch (err) {
    console.error(err);
  }
}
    
return (
  <PullToRefresh onRefresh={handleRefresh}>
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <Text style={styles.title}>Welcome {user?.userName}!</Text>
      {userType === 'tenant' && (
        <View>
          <Text style={styles.subheading}>Your Next Payment Is Due On....</Text>
          <TouchableOpacity
            style={styles.paymentButton}
            onPress={() => navigation.navigate("Payment")}
          >
            <Text style={styles.paymentButtonText}>Make Payment</Text>
          </TouchableOpacity>
        </View>
      )}
      <Text style={styles.subheading}>Recent Transactions</Text>
      {transactions.length === 0 ? (
        <Text style={styles.no_transaction_text}>No Transactions Yet</Text>
      ) : (
        <View style={styles.transaction_container}>
          {transactions.slice(0, 3).map(transaction => (
            <Transaction
              key={transaction.transaction_id}
              type={transaction.transaction_type}
              amount={transaction.transaction_amount}
              user_id={transaction.user_id}
              date={transaction.transaction_date}
              id={transaction.transaction_id}
            />
          ))}
        </View>
      )}
      <TouchableOpacity
        style={styles.paymentButton}
        onPress={() => navigation.navigate("Transactions")}
      >
        <Text style={styles.paymentButtonText}>View All Transactions</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  </PullToRefresh>
);
}
    
    const styles = StyleSheet.create({
    container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 16,
    },
    title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 32,
    },
    subheading: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
    },
    paymentButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: "blue",
    borderRadius: 4,
    marginBottom: 16,
    },
    paymentButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    },
    transaction_container: {
    flex: 1,
    alignItems: "center",
    width: "100%",
    },
    no_transaction_text:{
      fontSize: 18,
      fontWeight: 'bold',
      color: 'black',
      marginTop: 20,
    }
    });
    
    export default OwnerMain;