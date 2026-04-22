const router = require("express").Router();
const auth = require("../middleware/auth");
const { createAccount, getBalance } = require("../controllers/accountController");

router.post("/create", auth, createAccount);
router.get("/balance", auth, getBalance);

module.exports = router;

