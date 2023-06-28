import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { UserContext } from "../UserContext";
import Transaction from "../props/transactionProp";
import { TextInput } from "react-native-gesture-handler";
import { port } from "../port";
import { fetchUser } from "../functions/getUserName";
import PullToRefresh from "../props/refresh";

type TransactionData = {
  transaction_id: string;
  transaction_type: string;
  transaction_amount: string;
  transaction_date: string;
  user_id: any;
};

const Transactions = () => {
  const [transactions, setTransactions] = useState<TransactionData[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [usernames, setUsernames] = useState<{ [key: string]: string }>({});
  const { userID, userType } = useContext(UserContext);

  const handleRefresh = async () => {
    await fetchTransactions(userID);
  };

  useEffect(() => {
    // Fetch user data on component mount
    fetchTransactions(userID);
  }, [userID]);

  useEffect(() => {
    // Fetch usernames on component mount
    fetchUsernames(transactions);
  }, [transactions]);

  async function fetchTransactions(userID: string) {
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
        setTransactions(result.transactions);
      } else {
        const error = await response.json();
        console.error(error.error); // Error message from the server
      }
    } catch (err) {
      console.error(err);
    }
  }

  async function fetchUsernames(transactions: TransactionData[]) {
    try {
      const usernamesData: { [key: string]: string } = {};

      // Fetch usernames for all user IDs in transactions
      for (const transaction of transactions) {
        const { user_id } = transaction;

        if (!usernames[user_id]) {
          const fetchedUsername: any = await fetchUser(user_id);
          usernamesData[user_id] = fetchedUsername;
        }
      }

      setUsernames(usernamesData);
    } catch (error) {
      console.error('Failed to fetch usernames:', error);
    }
  }

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleResetFilters = () => {
    setSearchQuery("");
  }
  
  const filteredTransactions = transactions.filter((transaction) => {
    const { transaction_id, transaction_type, transaction_amount, transaction_date, user_id } = transaction;
    const lowerCaseQuery = searchQuery.toLowerCase();
    const username = usernames[user_id] || ""; // Get the username from the usernames state variable
    return (
      transaction_id.toString().includes(lowerCaseQuery) || // Convert transaction_id to string and check for inclusion
      transaction_type.toLowerCase().includes(lowerCaseQuery) ||
      transaction_amount.toString().includes(lowerCaseQuery) || // Convert transaction_amount to string and check for inclusion
      transaction_date.toLowerCase().includes(lowerCaseQuery) ||
      username.toLowerCase().includes(lowerCaseQuery) // Check for inclusion of username
    );
  
  }
  );

  return (
    <PullToRefresh onRefresh={handleRefresh}>
    <View style={styles.transaction_container}>
      <View style={styles.filter_container}>
        <TextInput
          style={styles.search_input}
          placeholder="Search transactions..."
          value={searchQuery}
          onChangeText={handleSearch}
        />
        <TouchableOpacity style={styles.reset_button} onPress={handleResetFilters}>
          <Text style={styles.reset_button_text}>Reset</Text>
        </TouchableOpacity>
      </View>
      {filteredTransactions.length === 0 ? (
        <Text style={styles.no_transaction_text}>No Transactions Yet</Text>
      ) : (
        filteredTransactions.map(transaction => (
          <Transaction
            key={transaction.transaction_id}
            type={transaction.transaction_type}
            amount={transaction.transaction_amount}
            user_id={transaction.user_id}
            date={transaction.transaction_date}
            id={transaction.transaction_id}
          />
        ))
      )}
    </View>
  </PullToRefresh>
)}

export default Transactions

const styles = StyleSheet.create({
  transaction_container: {
    flex: 1,
    alignItems: "center",
    width: "100%",
  },
  filter_container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 16,
  },
  filter_label: {
    marginRight: 8,
  },
  filter_item: {
    paddingHorizontal: 8,
  },
  search_input: {
    flex: 1,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: "lightgrey",
    borderRadius: 8,
    marginRight: 16,
},
  reset_button: {
    backgroundColor: "lightgrey",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    marginBottom: 16,
    },
    reset_button_text: {
    color: "black",
    fontWeight: "bold",
    },
    no_transaction_text: {
      fontSize: 18,
      fontWeight: 'bold',
      color: 'black',
      marginTop: 20,
    },

    });
