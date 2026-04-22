
[Aconst pool = require("./db");

const AccountModel = {
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

  getAccountById: async (id) => {
    const query = `SELECT * FROM accounts WHERE id = $1`;
    const result = await pool.query(query, [id]);
    return result.rows[0];
  },

  updateBalance: async (account_id, new_balance) => {
    const query = `
      UPDATE accounts
      SET balance = $1
      WHERE id = $2
      RETURNING *;
    `;
    const result = await pool.query(query, [new_balance, account_id]);
    return result.rows[0];
  }
};

module.exports = AccountModel;

