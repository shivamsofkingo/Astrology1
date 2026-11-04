const Category = require('../models/Category');
const categoryUpload = require('../middleware/categoryUploadMiddleware');

const createSlugBase = (name) => name.toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 240)
    .replace(/-+$/g, '') || `category-${Date.now()}`;

const isValidCategoryId = (id) => /^\d+$/.test(id)
    && Number.isSafeInteger(Number(id))
    && Number(id) > 0;

const getUniqueSlug = async (name, excludedCategoryId) => {
    const slugBase = createSlugBase(name);
    let slug = slugBase;
    let suffix = 2;
    let existingCategory = await Category.findOne({ where: { slug } });
    while (existingCategory && existingCategory.id !== excludedCategoryId) {
        slug = `${slugBase}-${suffix}`;
        suffix += 1;
        existingCategory = await Category.findOne({ where: { slug } });
    }
    return slug;
};

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

const getCategoryById = async (req, res) => {
    if (!isValidCategoryId(req.params.id)) {
        return res.status(400).json({ success: false, message: 'Category id must be a positive integer' });
    }
    try {
        const category = await Category.findByPk(req.params.id);
        if (!category) {
            return res.status(404).json({ success: false, message: 'Category not found' });
        }
        return res.status(200).json({
            success: true,
            message: 'Category fetched successfully',
            data: category,
        });
    } catch (error) {
        console.error('Get category error:', error);
        return res.status(500).json({ success: false, message: 'Failed to fetch category' });
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

        const slug = await getUniqueSlug(name);

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

const updateCategory = async (req, res) => {
    if (!isValidCategoryId(req.params.id)) {
        await categoryUpload.cleanupCategoryImage(req.file);
        return res.status(400).json({ success: false, message: 'Category id must be a positive integer' });
    }
    try {
        const category = await Category.findByPk(req.params.id);
        if (!category) {
            await categoryUpload.cleanupCategoryImage(req.file);
            return res.status(404).json({ success: false, message: 'Category not found' });
        }

        const body = req.body || {};
        const allowedFields = ['name', 'description', 'isActive', 'sortOrder', 'removeImage'];
        const hasCategoryField = allowedFields.some((field) => Object.prototype.hasOwnProperty.call(body, field));
        if (!hasCategoryField && !req.file) {
            await categoryUpload.cleanupCategoryImage(req.file);
            return res.status(400).json({ success: false, message: 'Provide at least one category field to update' });
        }

        if (req.file && body.removeImage === 'true') {
            await categoryUpload.cleanupCategoryImage(req.file);
            return res.status(400).json({ success: false, message: 'Upload a new image or remove the current image, not both' });
        }

        const updates = {};
        if (Object.prototype.hasOwnProperty.call(body, 'name')) {
            const name = typeof body.name === 'string' ? body.name.trim() : '';
            if (!name) {
                await categoryUpload.cleanupCategoryImage(req.file);
                return res.status(400).json({ success: false, message: 'Category name cannot be empty' });
            }
            if (name.length > 255) {
                await categoryUpload.cleanupCategoryImage(req.file);
                return res.status(400).json({ success: false, message: 'Category name must be 255 characters or fewer' });
            }
            updates.name = name;
            if (name !== category.name) {
                updates.slug = await getUniqueSlug(name, category.id);
            }
        }
        if (Object.prototype.hasOwnProperty.call(body, 'description')) {
            if (typeof body.description !== 'string') {
                await categoryUpload.cleanupCategoryImage(req.file);
                return res.status(400).json({ success: false, message: 'Category description must be a string' });
            }
            if (body.description.length > 5000) {
                await categoryUpload.cleanupCategoryImage(req.file);
                return res.status(400).json({ success: false, message: 'Category description must be 5000 characters or fewer' });
            }
            updates.description = body.description.trim() || null;
        }
        if (Object.prototype.hasOwnProperty.call(body, 'isActive')) {
            if (body.isActive !== 'true' && body.isActive !== 'false' && typeof body.isActive !== 'boolean') {
                await categoryUpload.cleanupCategoryImage(req.file);
                return res.status(400).json({ success: false, message: 'isActive must be a boolean' });
            }
            updates.isActive = body.isActive === true || body.isActive === 'true';
        }
        if (Object.prototype.hasOwnProperty.call(body, 'sortOrder')) {
            const sortOrderInput = body.sortOrder;
            const sortOrder = typeof sortOrderInput === 'number'
                ? sortOrderInput
                : typeof sortOrderInput === 'string' && sortOrderInput.trim()
                    ? Number(sortOrderInput)
                    : NaN;
            if (!Number.isSafeInteger(sortOrder) || sortOrder < 0) {
                await categoryUpload.cleanupCategoryImage(req.file);
                return res.status(400).json({ success: false, message: 'sortOrder must be a non-negative integer' });
            }
            updates.sortOrder = sortOrder;
        }

        const previousImage = category.image;
        if (req.file) {
            updates.image = await categoryUpload.finalizeCategoryImage(req.file, category.id);
        } else if (body.removeImage === 'true' || body.removeImage === true) {
            updates.image = null;
        } else if (body.removeImage !== undefined && body.removeImage !== 'false' && body.removeImage !== false) {
            await categoryUpload.cleanupCategoryImage(req.file);
            return res.status(400).json({ success: false, message: 'removeImage must be a boolean' });
        }

        if (Object.keys(updates).length === 0) {
            await categoryUpload.cleanupCategoryImage(req.file);
            return res.status(400).json({ success: false, message: 'Provide at least one category field to update' });
        }

        await category.update(updates);
        if (previousImage && previousImage !== category.image) {
            await categoryUpload.deleteCategoryImage(previousImage, category.id)
                .catch((error) => console.error('Failed to remove replaced category image:', error));
        }

        return res.status(200).json({
            success: true,
            message: 'Category updated successfully',
            data: category,
        });
    } catch (error) {
        await categoryUpload.cleanupCategoryImage(req.file);
        if (error.name === 'SequelizeUniqueConstraintError' || error.original?.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({ success: false, message: 'A category with this name already exists' });
        }
        console.error('Update category error:', error);
        return res.status(500).json({ success: false, message: 'Failed to update category' });
    }
};

module.exports = { getCategories, getCategoryById, createCategory, updateCategory };
