const pool = require("./db");

const TransactionModel = {
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

  getAllTransactions: async () => {
    const query = `
      SELECT * FROM transactions
      ORDER BY created_at DESC;
    `;
    const result = await pool.query(query);
    return result.rows;
  }
};

module.exports = TransactionModel;

