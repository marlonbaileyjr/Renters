import { port } from "../port";

export async function fetchUser(userID: string) {
  // Execute SQL query to fetch user from database
  try {
    const response = await fetch(`${port}/username`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userID }),
    });
    // Check if response is successful
    if (response.ok) {
      const result = await response.json();

      const fname = result.first_name;
      const lname = result.last_name;

      // Set the fetched user data to state
      const userName = `${fname} ${lname}`;
      return userName;
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
