const Subcategory = require('../models/Subcategory');
const Category = require('../models/Category');

const getAllSubcategories = async (req, res) => {
    try {
        const subcategories = await Subcategory.findAll({
            where: { isActive: true },
            order: [['categoryId', 'ASC'], ['sortOrder', 'ASC']],
            attributes: ['id', 'categoryId', 'name', 'slug', 'description', 'image', 'isActive', 'sortOrder'],
            include: [{ model: Category, as: 'category', attributes: ['id', 'name'] }],
        });
        return res.status(200).json({
            success: true,
            message: 'Subcategories fetched successfully',
            data: subcategories,
        });
    } catch (error) {
        console.error('Get all subcategories error:', error);
        return res.status(500).json({ success: false, message: 'Failed to fetch subcategories' });
    }
};

module.exports = { getAllSubcategories };
