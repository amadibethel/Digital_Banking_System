const router = require("express").Router();
const auth = require("../middleware/auth");
const {
  transfer,
  nameEnquiry,
  history
} = require("../controllers/transactionController");

router.post("/transfer", auth, transfer);
router.post("/name-enquiry", auth, nameEnquiry);
router.get("/history", auth, history);

module.exports = router;

