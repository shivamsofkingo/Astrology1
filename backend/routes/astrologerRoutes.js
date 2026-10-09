const express = require("express");
const upload = require("../middleware/uploadMiddleware");
const astrologerController = require("../controllers/astrologerController");

const router = express.Router();

router.get("/", astrologerController.getAllAstrologers);

router.post("/", upload.fields([
    { name: "profileImage", maxCount: 1 },
    { name: "certificate", maxCount: 1 },
    { name: "idProof", maxCount: 1 },
]),
    astrologerController.createAstrologer
);

module.exports = router;