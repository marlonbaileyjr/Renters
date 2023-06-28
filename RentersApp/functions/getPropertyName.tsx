import { port } from "../port";

export async function fetchProp(propID: string) {
  // Execute SQL query to fetch user from database
  try {
    const response = await fetch(`${port}/propName`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ propID }),
    });

    // Check if response is successful
    if (response.ok) {
      const result = await response.json();
      return(result.data[0].property_street);

      // Set the fetched user data to state
      //return result.data[0];
    } else {
      const error = await response.json();
      console.error(error.error); // Error message from the server
      return null; // Return null or an appropriate value for error handling
    }
  } catch (err) {
    console.error(err);
    return null; // Return null or an appropriate value for error handling
  }
}
