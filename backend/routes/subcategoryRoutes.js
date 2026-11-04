const express = require('express');
const router = express.Router();
const subcategoryController = require('../controllers/subcategoryController');
const categoryUpload = require('../middleware/categoryUploadMiddleware');

router.get('/', subcategoryController.getAllSubcategories);
router.post('/', (req, res, next) => {
    categoryUpload.single('image')(req, res, (error) => {
        if (error) {
            const status = error.code === 'LIMIT_FILE_SIZE' ? 413 : 400;
            return res.status(status).json({ success: false, message: error.message });
        }
        return next();
    });
}, subcategoryController.createSubcategory);

module.exports = router;
