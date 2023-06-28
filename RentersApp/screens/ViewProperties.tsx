import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'; 
import { TextInput } from 'react-native-gesture-handler';
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from '../UserContext';
import { port } from '../port';
import { useNavigation } from '@react-navigation/native';
import Property from '../props/propertyProp';
import PullToRefresh from "../props/refresh";

type PropertyData = {
    property_id: string,
    owner_id: string,
    tenant_id: string,
    property_type: string,
    property_unitnum: string,
    property_street: string,
    property_city: string,
    property_zip: string,
    property_state: string
  };

const ViewProperties = () => {
  const [property, setProperty] = useState<PropertyData[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [tenantName, setTenantNames] = useState("")
  const { userID, userType } = useContext(UserContext);
  const navigation: any = useNavigation();

  const handleRefresh = async () => {
    await fetchProperty(userID, userType);
  };

  async function fetchProperty(userID: string, userType:string) {
    try {
      const response = await fetch(`${port}/property`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userID, userType }),
      });

      // Check if response is successful
      if (response.ok) {
        const result = await response.json();

        setProperty(result.data);
        console.log(property)
      } else {
        const error = await response.json();
        console.error(error.error); // Error message from the server
      }
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    fetchProperty(userID, userType);
  }, [userID]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleResetFilters = () => {
    setSearchQuery("");
  }

  const filteredProperties = property.filter((property) => {
    const { property_id, tenant_id, property_type, property_unitnum, property_street, property_city, property_zip, property_state } = property;
    const lowerCaseQuery = searchQuery.toLowerCase();
    const propnames = `${property.property_unitnum} ${property.property_street} ${property.property_city} ${property.property_state}`;
    return (
      property_id.toString().includes(lowerCaseQuery) ||
      propnames.toLowerCase().includes(lowerCaseQuery) ||
      property_type.toLowerCase().includes(lowerCaseQuery) ||
      property_unitnum.toString().includes(lowerCaseQuery) ||
      property_street.toString().includes(lowerCaseQuery) ||
      property_city.toString().includes(lowerCaseQuery) ||
      property_zip.toString().includes(lowerCaseQuery) ||
      property_state.toLowerCase().includes(lowerCaseQuery)
    );
  });
  

  return (
    <PullToRefresh onRefresh={handleRefresh}>
      <View style={styles.property_container}>
        <View style={styles.filter_container}>
          {userType === 'tenant' && (
            <TouchableOpacity style={styles.reset_button} onPress={() => navigation.navigate('Add Property')}>
              <Text style={styles.reset_button_text}>Add Property</Text>
            </TouchableOpacity>
          )}
          <TextInput
            style={styles.search_input}
            placeholder="Search Properties..."
            value={searchQuery}
            onChangeText={handleSearch}
          />
          <TouchableOpacity style={styles.reset_button} onPress={handleResetFilters}>
            <Text style={styles.reset_button_text}>Reset</Text>
          </TouchableOpacity>
        </View>
        {filteredProperties.length === 0 ? (
          <Text style={styles.no_Property_text}>No Properties Yet</Text>
        ) : (
          filteredProperties.map(property => (
            <Property
              key={property.property_id}
              Type={property.property_type}
              Tenant={property.tenant_id}
              Name={`${property.property_unitnum} ${property.property_street} ${property.property_city} ${property.property_state}`}
              id={property.property_id}
              TenantID={property.tenant_id}
              UnitNum={property.property_unitnum}
              Street={property.property_street}
              City={property.property_city}
              Zip={property.property_zip}
              State={property.property_state}
            />
          ))
        )}
      </View>
    </PullToRefresh>
  );
  
}
export default ViewProperties

const styles = StyleSheet.create({
  property_container: {
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
    no_Property_text:{
      fontSize: 18,
      fontWeight: 'bold',
      color: 'black',
      marginTop: 20,
    }
  });
