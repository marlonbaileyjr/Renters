import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { UserContext } from "../../UserContext";
import { TextInput } from "react-native-gesture-handler";
import { port } from "../../port";
import { fetchUser } from "../../functions/getUserName";
import User from "../../props/userProp";
import { useNavigation } from '@react-navigation/native';
import PullToRefresh from "../../props/refresh";

type TenantData = {
  key: number,
  user_id: string,
  firstnm: string,
  lastnm: string,
  email: string,
  phonenum: string,
  owner_id: string,
  user_type: string,
  property_id: string
};

const Tenants = () => {
  const [tenants, setTenants] = useState<TenantData[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [usernames, setUsernames] = useState<{ [key: string]: string }>({});
  const { userID, userType } = useContext(UserContext);
  const navigation: any = useNavigation();

  const handleRefresh = async () => {
    await fetchUsers(userID);
    await fetchUsernames(tenants);
  };

  useEffect(() => {
    // Fetch user data on component mount
    fetchUsers(userID);
  }, [userID]);

  useEffect(() => {
    // Fetch usernames on component mount
    fetchUsernames(tenants);
  }, [tenants]);

  async function fetchUsers(userID: string) {
    try {
      const response = await fetch(`${port}/user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userID, userType }),
      });

      // Check if response is successful
      if (response.ok) {
        const result = await response.json();

        setTenants(result.data);
      } else {
        const error = await response.json();
        console.error(error.error); // Error message from the server
      }
    } catch (err) {
      console.error(err);
    }
  }

  async function fetchUsernames(transactions: TenantData[]) {
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

  const filteredUsers = tenants.filter((tenant) => {
    const {user_id, firstnm, lastnm, email, phonenum, owner_id, property_id } =tenant;
    const lowerCaseQuery = searchQuery.toLowerCase();
    const username = usernames[user_id] || ""; // Get the username from the usernames state variable
    return (
      user_id.toString().includes(lowerCaseQuery) || 
      firstnm.toLowerCase().includes(lowerCaseQuery) ||
      lastnm.toLowerCase().includes(lowerCaseQuery) || 
      email.toLowerCase().includes(lowerCaseQuery) ||
      phonenum.toString().includes(lowerCaseQuery) ||
      owner_id.toString().includes(lowerCaseQuery) ||
      property_id.toString().includes(lowerCaseQuery) 
    );
  });

  return (
    <PullToRefresh onRefresh={handleRefresh}>
    <View style={styles.transaction_container}>
      <View style={styles.filter_container}>
      <TouchableOpacity style={styles.reset_button} onPress={() => navigation.navigate('Add User')}>
        <Text style={styles.reset_button_text}>Add Tenant</Text>
      </TouchableOpacity>
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
      {filteredUsers.map(user => (
        <User
          key={user.key}
          user_id={user.user_id}
          first_name={user.firstnm}
          last_name={user.lastnm}
          email={user.email}
          phone_number={user.phonenum}
          owner_id={user.owner_id}
          user_type={user.user_type}
          property_id={user.property_id}
        />
      ))}
    </View>
    </PullToRefresh>
  )
}
export default Tenants
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
    });
