const express = require('express');
const bodyParser = require('body-parser');
const oracledb = require('oracledb');
const { EmojiExpressionless } = require('react-bootstrap-icons');

const app = express();
app.use(bodyParser.json());

const connectionConfig= {
  user: 'admin',
  password: 'Renters55555#',
  connectString: 'renters_high'
}

async function connectToOracleDB(sqlQuery, bindings) {
  try {
    const connection = await oracledb.getConnection(connectionConfig);
    const result = await connection.execute(sqlQuery, bindings, { autoCommit: true });
    await connection.release();
    return result;
  } catch (err) {
    console.error('Error executing SQL query:', err.message);
    throw err;
  }
}

//__________________________________________________________________________
// Login endpoint
app.post('/login', async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Check if email and password are provided
      if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
      }
  
      // Execute SQL query to fetch user from database
      const sqlQuery = `SELECT * FROM users WHERE LOWER(email) = LOWER(:email) AND password = :password`;
      const result = await connectToOracleDB(sqlQuery, { email, password });
  
      // Check if user exists
      if (result.rows.length === 0) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }
  
      // Check if owner_id is null, if so, user is owner, otherwise user is tenant
      const userType = result.rows[0][8];
      const userId = result.rows[0][0].toString()
  
      // User is authenticated, return success response with userType
      return res.status(200).json({ message: 'Login successful', userType, userId});
    } catch (err) { 
      console.error(err);
      return res.status(500).json({ error: 'Internal server error' });
    }
  
  });
//__________________________________________________________________________
//add User
app.post('/addUser', async (req, res) => {
  try {
    const { firstnm, lastnm, email, phonenum, password, owner_id, user_type } = req.body; // Destructure userId from req.body

    // Execute SQL query to fetch user from database
    const sqlQuery = `INSERT INTO users (firstnm, lastnm, email, phonenum, password, owner_id, user_type) VALUES (:firstnm, :lastnm, :email, :phonenum, :password, :owner_id, :user_type)`;
    const result = await connectToOracleDB(sqlQuery, {firstnm, lastnm, email, phonenum, password, owner_id, user_type});
    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'User not added' });
    }

    const structuredResponse = {
      message: 'User added',
    };

    return res.status(200).json(structuredResponse);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});
//__________________________________________________________________________
//update User
app.post('updateUser', async (req, res) => {
  try {
    const user_id = req.params.user_id;
    const { email, password, phonenum } = req.body;

    // Execute SQL query to update user in the database
    const sqlQuery = `UPDATE users SET email = :email, password = :password, phonenum = :phonenum WHERE user_id = :user_id`;
    const result = await connectToOracleDB(sqlQuery, { user_id, email, password, phonenum });

    if (result.rowsAffected === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const structuredResponse = {
      message: 'User updated',
    };

    return res.status(200).json(structuredResponse);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});
//__________________________________________________________________________
// signup
app.post('/signup', async (req, res) => {
  try {
    const { unique, fname, lname, email, created, expire } = req.body;
    const sqlQuery = `
      INSERT INTO signup(unique_code, first_name, last_name, email, created_time, expiration_time)
      VALUES (:u_code, :f_name, :l_name, :email, TO_TIMESTAMP(:c_time, 'MM-DD-YYYY, HH:MI AM'), TO_TIMESTAMP(:e_time, 'MM-DD-YYYY, HH:MI AM'))
    `;
    const binds = {
      u_code: unique,
      f_name: fname,
      l_name: lname,
      email: email,
      c_time: created,
      e_time: expire
    };
    const result = await connectToOracleDB(sqlQuery, binds);
    const structuredResponse = {
      message: 'Code Generated',
    };

    return res.status(200).json(structuredResponse);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// signup_prop
app.post('/signup_prop', async (req, res) => {
  try {
    const { property, code } = req.body;

    const sqlQuery = `INSERT INTO signup_prop(property_id, unique_code) VALUES (:property, :code)`;
    const result = await connectToOracleDB(sqlQuery, { property, code });
    const structuredResponse = {
      message: 'Properties Added To Generated Code',
    };

    return res.status(200).json(structuredResponse);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

//__________________________________________________________________________
//user
app.post('/user', async (req, res) => {
  try {
    const { userID, userType } = req.body; // Destructure userId from req.body

    // Execute SQL query to fetch user from database
    let sqlQuery = '';
    if (userType === 'owner') {
      sqlQuery = `SELECT u.user_id, u.firstnm, u.lastnm, u.email, u.phonenum, u.owner_id, u.user_type , p.property_id
                  FROM users u
                  JOIN properties p ON u.user_id = p.tenant_id
                  WHERE u.owner_id = :userID`; // Use :userID as placeholder
                } else {
      sqlQuery = `SELECT u.user_id, u.firstnm, u.lastnm, u.email, u.phonenum, u.owner_id, u.user_type, p.property_id
                  FROM users u
                  JOIN properties p ON u.user_id = p.tenant_id
                  WHERE u.user_id = :userID`; // Use :userID as placeholder
    }
    const result = await connectToOracleDB(sqlQuery, {userID});
    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'User not found' });
    }

    const structuredResponse = {
      message: 'User found',
      data: []
    };

    result.rows.forEach((row, index) => {
      const rowData = {};
      result.metaData.forEach((meta, columnIndex) => {
        const lowercaseKey = meta.name.toLowerCase();
        rowData[lowercaseKey] = row[columnIndex];
      });
      rowData['key'] = index + 1; // Add the incrementing key
      structuredResponse.data.push(rowData);
    });

    console.log(structuredResponse);
    return res.status(200).json(structuredResponse);
 

  } catch (err) { 
    console.error(err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});
//__________________________________________________________________________
//Profile
app.post('/profile', async (req, res) => {
  try {
    const { userID} = req.body; // Destructure userId from req.body

    // Execute SQL query to fetch user from database
    const sqlQuery = `SELECT *
                  FROM users 
                  WHERE user_id = :userID`; // Use :userID as placeholder
    
    const result = await connectToOracleDB(sqlQuery, {userID});
    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'User not found' });
    }

    const structuredResponse = {
      message: 'User found',
      data: []
    };

    result.rows.forEach((row, index) => {
      const rowData = {};
      result.metaData.forEach((meta, columnIndex) => {
        const lowercaseKey = meta.name.toLowerCase();
        rowData[lowercaseKey] = row[columnIndex];
      });
      rowData['key'] = index + 1; // Add the incrementing key
      structuredResponse.data.push(rowData);
    });

    console.log(structuredResponse);
    return res.status(200).json(structuredResponse);
 

  } catch (err) { 
    console.error(err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});
//__________________________________________________________________________
//username
app.post('/username', async (req, res) => {
  try {
    const { userID } = req.body; // Destructure userId from req.body

    // Execute SQL query to fetch user from database
    const sqlQuery = `SELECT * FROM users WHERE user_id = :userID`; // Use :userId as placeholder
    const result = await connectToOracleDB(sqlQuery, { userID }); // Pass userId as bindings

    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'User not found' });
    }

    const response = {
      message: 'User found',
      user_id: result.rows[0][0],
      first_name: result.rows[0][4],
      last_name: result.rows[0][5],
      email: result.rows[0][1],
      phone_number: result.rows[0][6],
      owner_id: result.rows[0][7],
      user_type: result.rows[0][8]
    }

    return res.status(200).json(response);

  } catch (err) { 
    console.error(err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

//_________________________________________________________________________________________________________
app.post('/transactions', async (req, res) => {
  try {
    const { userID, userType } = req.body; // Destructure userID and userType from req.body

    // Execute SQL query to fetch transactions from database based on userType
    let sqlQuery = '';
    if (userType === 'owner') {
      sqlQuery = `SELECT t.*, TO_CHAR(t.transaction_date, 'YYYY-MM-DD') AS transaction_date
                  FROM transactions t
                  WHERE t.owner_id = :userID`; // Use :userID as placeholder
    } else {
      sqlQuery = `SELECT t.*, TO_CHAR(t.transaction_date, 'YYYY-MM-DD') AS transaction_date
                  FROM transactions t
                  WHERE t.user_id = :userID`; // Use :userID as placeholder
    }

    const result = await connectToOracleDB(sqlQuery, { userID }); // Pass userID as bindings

    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'No Transactions Found' });
    }
    const transactions = result.rows;
    const response = {
      message: 'Transactions found',
      transactions: transactions.map(transaction => ({
        transaction_id: transaction[0],
        user_id: transaction[1],
        owner_id: transaction[7],
        property_id: transaction[2],
        credit_card: transaction[3],
        transaction_type: transaction[4],
        transaction_date: transaction[6],
        transaction_amount: transaction[5]
      }))
    }
    return res.status(200).json(response);

  } catch (err) { 
    console.error(err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});
//________________________________________________________________________
//TranasctionDetails
app.post('/transactiondetails', async (req, res) => {
  try {
    const { id} = req.body; // Destructure userID and userType from req.body

    // Execute SQL query to fetch transactions from database based on userType
    const sqlQuery = `SELECT t.*, TO_CHAR(t.transaction_date, 'YYYY-MM-DD') AS transaction_date
                      FROM transactions t
                      WHERE t.TRANSACTION_ID = :id`


    const result = await connectToOracleDB(sqlQuery, { id }); // Pass userID as bindings

    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'No Transactions Found' });
    }
    const transactions = result.rows;
    const response = {
      message: 'Transactions found',
      transactions: transactions.map(transaction => ({
        transaction_id: transaction[0],
        user_id: transaction[1],
        owner_id: transaction[7],
        property_id: transaction[2],
        credit_card: transaction[3],
        transaction_type: transaction[4],
        transaction_date: transaction[6],
        transaction_amount: transaction[5]
      }))
    }
    return res.status(200).json(response);

  } catch (err) { 
    console.error(err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

//________________________________________________________________________
//property
app.post('/property', async (req, res) => {
  try {
    const { userID, userType } = req.body; // Destructure userId from req.body

    // Execute SQL query to fetch properties from the database
    let sqlQuery = '';
    if (userType === 'owner') {
      sqlQuery = `SELECT *
                  FROM properties WHERE owner_ID = :userID`; // Use :userId as a placeholder
    } else {
      sqlQuery = `SELECT *
                  FROM properties WHERE tenant_ID = :userID`; // Use :userId as a placeholder
    }
    const result = await connectToOracleDB(sqlQuery, { userID }); // Pass userId as bindings

    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'No Properties' });
    }

    const response = {
      message: 'Properties found',
      data: []
    };

    result.rows.forEach((row, index) => {
      const rowData = {};
      result.metaData.forEach((meta, columnIndex) => {
        const lowercaseKey = meta.name.toLowerCase();
        rowData[lowercaseKey] = row[columnIndex];
      });
      response.data.push({ key: index + 1, ...rowData }); // Assign incremental keys starting from 1
    });

    return res.status(200).json(response);

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});
//________________________________________________________________________
//Add Property
app.post('/addProperty',async (req,res) => {
  try{
    const {number,street,city,zip,type,state, user_id} = req.body;
    const sqlQuery = `Insert Into Properties(Owner_ID, Property_Type, Property_Unitnum, Property_Street, Property_City, Property_Zip, Property_State)
                      Values (:id, :Type, :num, :Street, :City, :zipCode, :State)`

    const binds = {
      id: user_id,
      num : number,
      Type: type,
      Street: street,
      City: city,
      zipCode: zip,
      State:state
    };

    const result = await connectToOracleDB(sqlQuery, binds);
    const structuredResponse = {
      message: 'Property Created Successfully',
    };

    return res.status(200).json(structuredResponse);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

//________________________________________________________________________
//property Name
app.post('/propName', async (req, res) => {
  try {
    const { propID } = req.body; // Destructure propId from req.body
    
    // Execute SQL query to fetch prop from database
    const sqlQuery = `SELECT * 
                      FROM properties WHERE property_id = :propID`; // Use :propId as placeholder
    const result = await connectToOracleDB(sqlQuery, { propID }); // Pass propId as bindings

    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Property not found' });
    }

    const response = {
      message: 'Property found',
      data: []
    };

    result.rows.forEach(row => {
      const rowData = {}
      result.metaData.forEach((meta, index) => {
        const lowercaseKey = meta.name.toLowerCase();
        rowData[lowercaseKey] = row[index];
      });
      response.data.push(rowData)
    });

    return res.status(200).json(response);

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});


// Start the server
app.listen(8080, () => {
  console.log('Server is running on port 8080');
});
