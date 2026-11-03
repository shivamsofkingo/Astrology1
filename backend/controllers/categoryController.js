const Category = require("../models/Category");

const getCategories = async (req, res) => {
    try {
        const categories = await Category.findAll({
            where: { isActive: true },
            order: [['sortOrder', 'ASC']],
            attributes: ['id', 'name', 'slug', 'description', 'image', 'isActive', 'sortOrder'],
        });
        return res.status(200).json({
            success: true,
            message: 'Categories fetched successfully',
            data: categories,
        });
    } catch (error) {
        console.error('Get categories error:', error);
        return res.status(500).json({
            success: false,
            message: 'Failed to fetch categories',
        });
    }
};

module.exports = { getCategories };