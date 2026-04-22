const pool = require("./db");

const UserModel = {
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

  updatePassword: async (id, password_hash) => {
    const query = `
      UPDATE users
      SET password_hash = $1
      WHERE id = $2
      RETURNING *;
    `;
    const result = await pool.query(query, [password_hash, id]);
    return result.rows[0];
  }
};

module.exports = UserModel;

