// models/queries.js

const { Pool } = require("pg");

// Create a PostgreSQL connection pool
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "banking_db",
  password: "your_password_here",
  port: 5432,
});

module.exports = {
  // =========================
  // USER QUERIES
  // =========================

  createUser: async (first_name, last_name, email, password_hash) => {
    const query = `
      INSERT INTO users (first_name, last_name, email, password_hash)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;
    const values = [first_name, last_name, email, password_hash];
    const result = await pool.query(query, values);
    return result.rows[0];
  },

  getUserByEmail: async (email) => {
    const query = `SELECT * FROM users WHERE email = $1`;
    const result = await pool.query(query, [email]);
    return result.rows[0];
  },

  getUserById: async (id) => {
    const query = `SELECT * FROM users WHERE id = $1`;
    const result = await pool.query(query, [id]);
    return result.rows[0];
  },

  // =========================
  // ACCOUNT QUERIES
  // =========================

  createAccount: async (user_id, account_number, balance = 0) => {
    const query = `
      INSERT INTO accounts (user_id, account_number, balance)
      VALUES ($1, $2, $3)
      RETURNING *;
    `;
    const values = [user_id, account_number, balance];
    const result = await pool.query(query, values);
    return result.rows[0];
  },

  getAccountByUserId: async (user_id) => {
    const query = `SELECT * FROM accounts WHERE user_id = $1`;
    const result = await pool.query(query, [user_id]);
    return result.rows;
  },

  updateAccountBalance: async (account_id, new_balance) => {
    const query = `
      UPDATE accounts
      SET balance = $1
      WHERE id = $2
      RETURNING *;
    `;
    const result = await pool.query(query, [new_balance, account_id]);
    return result.rows[0];
  },

  // =========================
  // TRANSACTION QUERIES
  // =========================

  createTransaction: async (from_account, to_account, amount, type) => {
    const query = `
      INSERT INTO transactions (from_account, to_account, amount, type)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;
    const values = [from_account, to_account, amount, type];
    const result = await pool.query(query, values);
    return result.rows[0];
  },

  getTransactionsByAccount: async (account_id) => {
    const query = `
      SELECT * FROM transactions
      WHERE from_account = $1 OR to_account = $1
      ORDER BY created_at DESC;
    `;
    const result = await pool.query(query, [account_id]);
    return result.rows;
  },

  // =========================
  // AUTH / SECURITY HELPERS
  // =========================

  updateUserPassword: async (user_id, password_hash) => {
    const query = `
      UPDATE users
      SET password_hash = $1
      WHERE id = $2
      RETURNING *;
    `;
    const result = await pool.query(query, [password_hash, user_id]);
    return result.rows[0];
  },
};

