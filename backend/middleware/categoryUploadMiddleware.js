const multer = require('multer');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');

const stagingDir = path.join(__dirname, '..', 'storage', 'temp-uploads');
const imageExtensions = {
    'image/jpeg': '.jpg',
    'image/png': '.png',
    'image/webp': '.webp',
};

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        fs.mkdir(stagingDir, { recursive: true }, (error) => callback(error, stagingDir));
    },
    filename: (req, file, callback) => {
        callback(null, `${crypto.randomBytes(16).toString('hex')}${imageExtensions[file.mimetype] || ''}`);
    },
});

const upload = multer({
    storage,
    limits: { fileSize: 10 * 1024 * 1024, files: 1 },
    fileFilter: (req, file, callback) => {
        if (!imageExtensions[file.mimetype]) {
            return callback(new Error('Image must be JPEG, PNG, or WEBP'));
        }
        return callback(null, true);
    },
});

const finalizeImage = async (file, categoryId, entityFolder) => {
    const folder = path.join(__dirname, '..', 'storage', 'uploads', 'category', String(categoryId), entityFolder);
    await fs.promises.mkdir(folder, { recursive: true });
    const destinationPath = path.join(folder, file.filename);
    await fs.promises.rename(file.path, destinationPath);
    file.finalPath = destinationPath;
    return `/storage/uploads/category/${categoryId}/${entityFolder}/${file.filename}`;
};

upload.finalizeCategoryImage = (file, categoryId) => finalizeImage(file, categoryId, 'category');
upload.finalizeSubcategoryImage = async (file, subcategoryId) => {
    const folder = path.join(__dirname, '..', 'storage', 'uploads', 'subcategory', String(subcategoryId), 'subcategory');
    await fs.promises.mkdir(folder, { recursive: true });
    const destinationPath = path.join(folder, file.filename);
    await fs.promises.rename(file.path, destinationPath);
    file.finalPath = destinationPath;
    return `/storage/uploads/subcategory/${subcategoryId}/subcategory/${file.filename}`;
};

upload.cleanupCategoryImage = async (file) => {
    if (!file) return;
    const paths = [file.path, file.finalPath].filter(Boolean);
    await Promise.allSettled(paths.map((filePath) => fs.promises.unlink(filePath)));
};

upload.deleteCategoryImage = async (imagePath, categoryId) => {
    const imagePrefix = `/storage/uploads/category/${categoryId}/category/`;
    if (typeof imagePath !== 'string' || !imagePath.startsWith(imagePrefix)) return;

    const fileName = imagePath.slice(imagePrefix.length);
    if (!fileName || path.basename(fileName) !== fileName) return;

    const imageFile = path.join(__dirname, '..', 'storage', 'uploads', 'category', String(categoryId), 'category', fileName);
    try {
        await fs.promises.unlink(imageFile);
    } catch (error) {
        if (error.code !== 'ENOENT') throw error;
    }
};

upload.deleteSubcategoryImage = async (imagePath, subcategoryId) => {
    const imagePrefix = `/storage/uploads/subcategory/${subcategoryId}/subcategory/`;
    if (typeof imagePath !== 'string' || !imagePath.startsWith(imagePrefix)) return;

    const fileName = imagePath.slice(imagePrefix.length);
    if (!fileName || path.basename(fileName) !== fileName) return;

    const imageFile = path.join(__dirname, '..', 'storage', 'uploads', 'subcategory', String(subcategoryId), 'subcategory', fileName);
    try {
        await fs.promises.unlink(imageFile);
    } catch (error) {
        if (error.code !== 'ENOENT') throw error;
    }
};

module.exports = upload;
