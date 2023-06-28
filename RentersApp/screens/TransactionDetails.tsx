import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { port } from '../port';
import { UserContext } from '../UserContext';
import PullToRefresh from "../props/refresh";

type Transaction = {
    credit_card: string,
    owner_id : string,
    property_id : string,
    transaction_amount : string,
    transaction_date  : string,
    transaction_id : string,
    transaction_type : string,
    user_id : string,
};

const TransactionDetails = ({ route }: any) => {
  const [transaction, setTransactions] = useState<Transaction[]>([]); // Specify the type of user state as User | null
  const {id, username } = route.params;

  const handleRefresh = async () => {
    await fetchTransactions(id);
  };

  useEffect(() => {
    fetchTransactions(id);
  }, [id]);


  async function fetchTransactions(id : string) {
    try {
      const response = await fetch(`${port}/transactiondetails`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
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

  return (
    <PullToRefresh onRefresh={handleRefresh}>
    <View style={styles.container}>
      {transaction?.map((trans) => (
        <View key={trans.transaction_id}>
          <Text style={styles.label}>Type:</Text>
          <Text style={styles.value}>{trans.transaction_type}</Text>
          <Text style={styles.label}>Amount:</Text>
          <Text style={styles.value}>{trans.transaction_amount}</Text>
          <Text style={styles.label}>FROM:</Text>
          <Text style={styles.value}>{username}</Text>
          <Text style={styles.label}>Date:</Text>
          <Text style={styles.value}>{trans.transaction_date}</Text>
          <Text style={styles.label}>Transaction ID:</Text>
          <Text style={styles.value}>{trans.transaction_id}</Text>
          <Text style={styles.label}>Property ID:</Text>
          <Text style={styles.value}>{trans.property_id}</Text>
          <Text style={styles.label}>Credit Card:</Text>
          <Text style={styles.value}>{trans.credit_card}</Text>
        </View>
      ))}
    </View>
    </PullToRefresh>
  );
};
  

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f8f8f8',
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  value: {
    marginBottom: 16,
  },
});

export default TransactionDetails;
