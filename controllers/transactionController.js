const pool = require("../config/db");
const { nameEnquiry, interBankTransfer } = require("../services/nibssService");
const { v4: uuidv4 } = require("uuid");

exports.nameEnquiry = async (req, res) => {
  const { accountNumber } = req.body;
  const result = await nameEnquiry(accountNumber);
  res.json(result);
};

exports.transfer = async (req, res) => {
  const { receiver, amount } = req.body;
  const userId = req.user.id;

  const senderAcc = await pool.query(
    "SELECT * FROM accounts WHERE customer_id=$1",
    [userId]
  );

  if (senderAcc.rows[0].balance < amount)
    return res.status(400).json({ message: "Insufficient funds" });

  const reference = uuidv4();

  await pool.query("BEGIN");

  try {
    await pool.query(
      "UPDATE accounts SET balance = balance - $1 WHERE id=$2",
      [amount, senderAcc.rows[0].id]
    );

    const receiverAcc = await pool.query(
      "SELECT * FROM accounts WHERE account_number=$1",
      [receiver]
    );

    if (receiverAcc.rows.length > 0) {
      // Intra-bank
      await pool.query(
        "UPDATE accounts SET balance = balance + $1 WHERE account_number=$2",
        [amount, receiver]
      );
    } else {
      // Inter-bank
      await interBankTransfer({ receiver, amount });
    }

    await pool.query(
      `INSERT INTO transactions(sender_account,receiver_account,amount,type,status,reference)
       VALUES($1,$2,$3,$4,$5,$6)`,
      [senderAcc.rows[0].account_number, receiver, amount, "transfer", "success", reference]
    );

    await pool.query("COMMIT");

    res.json({ message: "Transfer successful", reference });
  } catch (err) {
    await pool.query("ROLLBACK");
    res.status(500).json({ message: "Transfer failed" });
  }
};

exports.history = async (req, res) => {
  const userId = req.user.id;

  const acc = await pool.query(
    "SELECT account_number FROM accounts WHERE customer_id=$1",
    [userId]
  );

  const result = await pool.query(
    `SELECT * FROM transactions WHERE sender_account=$1`,
    [acc.rows[0].account_number]
  );

  res.json(result.rows);
};

