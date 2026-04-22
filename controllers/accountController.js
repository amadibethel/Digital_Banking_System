const pool = require("../config/db");
const generateAccount = require("../utils/generateAccount");

exports.createAccount = async (req, res) => {
  const userId = req.user.id;

  const existing = await pool.query(
    "SELECT * FROM accounts WHERE customer_id=$1",
    [userId]
  );

  if (existing.rows.length > 0)
    return res.status(400).json({ message: "Account already exists" });

  const accNo = generateAccount();

  const account = await pool.query(
    `INSERT INTO accounts(customer_id,account_number)
     VALUES($1,$2) RETURNING *`,
    [userId, accNo]
  );

  res.json(account.rows[0]);
};

exports.getBalance = async (req, res) => {
  const userId = req.user.id;

  const result = await pool.query(
    `SELECT balance FROM accounts WHERE customer_id=$1`,
    [userId]
  );

  res.json(result.rows[0]);
};

