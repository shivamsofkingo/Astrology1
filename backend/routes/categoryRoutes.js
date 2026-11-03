const express = require("express");
const categoryController = require("../controllers/categoryController");
const categoryUpload = require('../middleware/categoryUploadMiddleware');

const router = express.Router();

router.get("/", categoryController.getCategories);
router.post("/", (req, res, next) => {
    categoryUpload.single('image')(req, res, (error) => {
        if (error) {
            const status = error.code === 'LIMIT_FILE_SIZE' ? 413 : 400;
            return res.status(status).json({ success: false, message: error.message });
        }
        return next();
    });
}, categoryController.createCategory);

module.exports = router;
