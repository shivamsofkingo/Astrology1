const multer = require("multer");
const path = require("path");
const fs = require("fs");
const crypto = require("crypto");

const stagingDir = path.join(
    __dirname,
    "..",
    "storage",
    "temp-uploads"
);

const allowedImageTypes = [
    "image/jpeg",
    "image/png",
    "image/webp",
];

const allowedDocumentTypes = [
    "application/pdf",
    "image/jpeg",
    "image/png",
    "image/webp",
];

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        fs.mkdir(stagingDir, { recursive: true }, (error) => {
            cb(error, stagingDir);
        });
    },
    filename: (req, file, cb) => {
        const extension = path.extname(file.originalname).toLowerCase();
        const filename = `${crypto.randomBytes(16).toString("hex")}${extension}`;
        cb(null, filename);

    },
});

const fileFilter = (req, file, cb) => {
    if (file.fieldname === "profileImage") {
        if (!allowedImageTypes.includes(file.mimetype)) {
            return cb(
                new Error("Profile image must be JPEG, PNG, or WEBP")
            );
        }
    } else if (
        file.fieldname === "certificate" ||
        file.fieldname === "idProof"
    ) {
        if (!allowedDocumentTypes.includes(file.mimetype)) {
            return cb(
                new Error("Documents must be PDF, JPEG, PNG, or WEBP")
            );
        }
    } else {
        return cb(new Error(`Unexpected file field: ${file.fieldname}`));
    }
    cb(null, true);
};

const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 10 * 1024 * 1024,
        files: 3,
    },
});

const uploadFolders = {
    profileImage: "profile",
    certificate: "certificate",
    idProof: "idProof",
};

const finalizeAstrologerFiles = async (files, astrologerId) => {
    const movedFiles = [];
    const urls = {};

    try {
        for (const [fieldName, uploadedFiles] of Object.entries(files || {})) {
            const folder = uploadFolders[fieldName];
            if (!folder) {
                throw new Error(`Unexpected upload field: ${fieldName}`);
            }
            for (const file of uploadedFiles) {
                const destinationDir = path.join(
                    __dirname,
                    "..",
                    "storage",
                    "uploads",
                    "astrologer",
                    String(astrologerId),
                    folder
                );
                const destinationPath = path.join(destinationDir, file.filename);
                await fs.promises.mkdir(destinationDir, { recursive: true });
                await fs.promises.rename(file.path, destinationPath);
                file.finalPath = destinationPath;
                movedFiles.push(file);
                const url = `/storage/uploads/astrologer/${astrologerId}/${folder}/${file.filename}`;
                if (fieldName === "profileImage") {
                    urls.profileImage = url;
                } else if (fieldName === "certificate") {
                    urls.certificateUrl = url;
                } else if (fieldName === "idProof") {
                    urls.idProofUrl = url;
                }
            }
        }
        return urls;
    } catch (error) {
        await cleanupAstrologerFiles(files);
        throw error;
    }
};

const cleanupAstrologerFiles = async (files) => {
    const paths = Object.values(files || {})
        .flat()
        .flatMap((file) => [file.path, file.finalPath])
        .filter(Boolean);
    const results = await Promise.allSettled(
        paths.map((filePath) => fs.promises.unlink(filePath))
    );
    const errors = results
        .filter((result) => result.status === "rejected" && result.reason.code !== "ENOENT")
        .map((result) => result.reason);
    if (errors.length) {
        throw new AggregateError(errors, "Failed to clean up astrologer upload files");
    }
};

upload.finalizeAstrologerFiles = finalizeAstrologerFiles;
upload.cleanupAstrologerFiles = cleanupAstrologerFiles;

module.exports = upload;
