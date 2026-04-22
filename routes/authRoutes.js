const router = require("express").Router();
const { onboard } = require("../controllers/authController");

router.post("/onboard", onboard);

module.exports = router;

