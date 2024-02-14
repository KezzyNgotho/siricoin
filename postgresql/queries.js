const bcrypt = require('bcrypt');
const { Pool } = require("pg");

const pool = new Pool({
  user: 'Keziah',
  host: 'siricoin.postgres.database.azure.com',
  database: 'database',
  password: 'KN@129822',
  port: 5432,
});

const createUser = async (email, password, mobileNumber, username) => {
  try {
    // Check if user with the same email already exists
    const existingUser = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (existingUser.rows.length > 0) {
      throw new Error("User already exists with this email");
    }

    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Proceed with user creation
    const insertQuery = `
      INSERT INTO users (email, password, mobile_number, username)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;
    const result = await pool.query(insertQuery, [email, hashedPassword, mobileNumber, username]);
    return result.rows[0];
  } catch (error) {
    throw error;
  }
};

const loginUser = async (email, password) => {
  try {
    // Retrieve user with the provided email
    const query = `
      SELECT * FROM users
      WHERE email = $1;
    `;
    const values = [email];
    const user = await pool.query(query, values);

    // Check if user exists and if the password matches
    if (user.rows.length === 0) {
      // Return a 404 error if user is not found
      const error = new Error('User not found');
      error.status = 404;
      throw error;
    }

    const retrievedUser = user.rows[0];
    const passwordMatch = await bcrypt.compare(password, retrievedUser.password);
    if (!passwordMatch) {
      throw new Error('Invalid email or password');
    }

    // Return the user data if login is successful
    return {
      uid: retrievedUser.uid,
      userData: {
        email: retrievedUser.email,
        mobileNumber: retrievedUser.mobile_number,
        username: retrievedUser.username,
      },
    };
  } catch (error) {
    // Instead of rethrowing the error, we can return a custom error message
    return { error: error.message, status: error.status || 500 };
  }
};

module.exports = {
  createUser,
  loginUser,
};
