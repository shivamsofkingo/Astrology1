const Category = require('../models/Category');
const categoryUpload = require('../middleware/categoryUploadMiddleware');

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

const createCategory = async (req, res) => {
    let category;
    try {
        const body = req.body || {};
        const name = typeof body.name === 'string' ? body.name.trim() : '';
        const description = typeof body.description === 'string' ? body.description.trim() : null;

        if (!name) {
            await categoryUpload.cleanupCategoryImage(req.file);
            return res.status(400).json({ success: false, message: 'Category name is required' });
        }

        const slugBase = name.toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-|-$/g, '')
            .slice(0, 240)
            .replace(/-+$/g, '') || `category-${Date.now()}`;
        let slug = slugBase;
        let suffix = 2;
        while (await Category.findOne({ where: { slug } })) {
            slug = `${slugBase}-${suffix}`;
            suffix += 1;
        }

        const highestSortOrder = await Category.max('sortOrder');
        const sortOrder = highestSortOrder === null || highestSortOrder === undefined
            ? 0
            : Number(highestSortOrder) + 1;

        category = await Category.create({
            name,
            slug,
            description: description || null,
            image: null,
            isActive: true,
            sortOrder,
        });

        if (req.file) {
            const imagePath = await categoryUpload.finalizeCategoryImage(req.file, category.id);
            await category.update({ image: imagePath });
        }

        return res.status(201).json({
            success: true,
            message: 'Category created successfully',
            data: category,
        });
    } catch (error) {
        await categoryUpload.cleanupCategoryImage(req.file);
        if (category) {
            await category.destroy().catch((cleanupError) => console.error('Failed to roll back category:', cleanupError));
        }
        if (error.name === 'SequelizeUniqueConstraintError' || error.original?.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({ success: false, message: 'Could not generate a unique category slug. Please retry.' });
        }
        console.error('Create category error:', error);
        return res.status(500).json({ success: false, message: 'Failed to create category' });
    }
};

module.exports = { getCategories, createCategory };
