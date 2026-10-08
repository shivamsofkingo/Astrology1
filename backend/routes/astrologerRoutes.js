const express = require("express");
const astrologerController = require("../controllers/astrologerController");

const router = express.Router();

router.get("/", astrologerController.getAllAstrologers);

module.exports = router;