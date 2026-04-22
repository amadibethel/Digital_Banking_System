const pool = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { verifyIdentity } = require("../services/nibssService");

exports.onboard = async (req, res) => {
  const { full_name, email, password, bvn, nin } = req.body;

  if (!bvn && !nin)
    return res.status(400).json({ message: "BVN or NIN required" });

  const verify = await verifyIdentity({ bvn, nin });

  if (!verify.success)
    return res.status(400).json({ message: "Verification failed" });

  const hashed = await bcrypt.hash(password, 10);

  const result = await pool.query(
    `INSERT INTO customers(full_name,email,password,bvn,nin,is_verified)
     VALUES($1,$2,$3,$4,$5,true) RETURNING *`,
    [full_name, email, hashed, bvn, nin]
  );

  const token = jwt.sign({ id: result.rows[0].id }, process.env.JWT_SECRET);

  res.json({ token, user: result.rows[0] });
};

