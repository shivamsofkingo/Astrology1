const Subcategory = require('../models/Subcategory');
const Category = require('../models/Category');
const categoryUpload = require('../middleware/categoryUploadMiddleware');

const createSlugBase = (name) => name.toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 240)
    .replace(/-+$/g, '') || `subcategory-${Date.now()}`;

const isValidId = (id) => /^\d+$/.test(String(id || ''))
    && Number.isSafeInteger(Number(id))
    && Number(id) > 0;

const getUniqueSlug = async (name) => {
    const slugBase = createSlugBase(name);
    let slug = slugBase;
    let suffix = 2;
    while (await Subcategory.findOne({ where: { slug } })) {
        slug = `${slugBase}-${suffix++}`;
    }
    return slug;
};

const createSubcategory = async (req, res) => {
    let subcategory;
    const body = req.body || {};
    const name = typeof body.name === 'string' ? body.name.trim() : '';
    const description = typeof body.description === 'string' ? body.description.trim() : '';
    const categoryId = body.categoryId;

    if (!name) {
        await categoryUpload.cleanupCategoryImage(req.file);
        return res.status(400).json({ success: false, message: 'Subcategory name is required' });
    }
    if (name.length > 255) {
        await categoryUpload.cleanupCategoryImage(req.file);
        return res.status(400).json({ success: false, message: 'Subcategory name must be 255 characters or fewer' });
    }
    if (description.length > 5000) {
        await categoryUpload.cleanupCategoryImage(req.file);
        return res.status(400).json({ success: false, message: 'Description must be 5000 characters or fewer' });
    }
    if (!isValidId(categoryId)) {
        await categoryUpload.cleanupCategoryImage(req.file);
        return res.status(400).json({ success: false, message: 'A valid categoryId is required' });
    }

    try {
        const category = await Category.findByPk(Number(categoryId));
        if (!category || !category.isActive) {
            await categoryUpload.cleanupCategoryImage(req.file);
            return res.status(404).json({ success: false, message: 'Active category not found' });
        }

        const slug = await getUniqueSlug(name);
        const highestSortOrder = await Subcategory.max('sortOrder', { where: { categoryId: Number(categoryId) } });
        subcategory = await Subcategory.create({
            name,
            slug,
            description: description || null,
            categoryId: Number(categoryId),
            isActive: true,
            sortOrder: highestSortOrder == null ? 0 : Number(highestSortOrder) + 1,
        });

        if (req.file) {
            const imagePath = await categoryUpload.finalizeSubcategoryImage(req.file, subcategory.id);
            await subcategory.update({ image: imagePath });
        }

        return res.status(201).json({ success: true, message: 'Subcategory created successfully', data: subcategory });
    } catch (error) {
        await categoryUpload.cleanupCategoryImage(req.file);
        if (subcategory) {
            await subcategory.destroy().catch((cleanupError) => console.error('Failed to roll back subcategory:', cleanupError));
        }
        console.error('Create subcategory error:', error);
        return res.status(500).json({ success: false, message: 'Failed to create subcategory' });
    }
};

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

module.exports = { getAllSubcategories, createSubcategory };
