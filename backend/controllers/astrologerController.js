const astrologerService = require("../services/astrologerService");
const upload = require("../middleware/uploadMiddleware");

const parseArray = (value) => {
    if (Array.isArray(value)) {
        return value;
    }
    if (!value) {
        return [];
    }
    try {
        const parsed = JSON.parse(value);
        return Array.isArray(parsed) ? parsed : [];
    } catch {
        return [];
    }
};

const getAllAstrologers = async (req, res) => {
    try {
        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 10;
        const search = req.query.search || "";
        const specialization = req.query.specialization || "";

        const result = await astrologerService.getAllAstrologers(
            page,
            limit,
            search,
            specialization
        );
        res.status(200).json({
            success: true,
            ...result,
        });
    } catch (error) {
        console.error("Get astrologers error:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch astrologers",
            error: error.message,
        });
    }
};

const createAstrologer = async (req, res) => {
    const files = req.files || {};
    let astrologer;
    let keepFiles = false;

    try {
        const { fullName, email, mobileNumber, gender, age, experience, about, chatRate, callRate, videoCallRate } = req.body;
        const specializations = parseArray(req.body.specializations);
        const languages = parseArray(req.body.languages);
        const profileImage = req.files?.profileImage?.[0];
        const certificate = req.files?.certificate?.[0];
        const idProof = req.files?.idProof?.[0];

        // Basic validation
        if (!fullName?.trim()) {
            return res.status(400).json({
                success: false,
                message: "Full name is required"
            });
        }

        if (!email?.trim()) {
            return res.status(400).json({
                success: false,
                message: "Email is required"
            });
        }

        if (!mobileNumber?.trim()) {
            return res.status(400).json({
                success: false,
                message: "Mobile number is required"
            });
        }

        if (!gender) {
            return res.status(400).json({
                success: false,
                message: "Gender is required"
            });
        }

        if (!age || Number(age) < 18) {
            return res.status(400).json({
                success: false,
                message: "Valid age is required"
            });
        }

        if (!profileImage) {
            return res.status(400).json({
                success: false,
                message: "Profile image is required"
            });
        }

        if (!certificate) {
            return res.status(400).json({
                success: false,
                message: "Certificate is required"
            });
        }

        if (!idProof) {
            return res.status(400).json({
                success: false,
                message: "ID proof is required"
            });
        }

        astrologer = await astrologerService.createAstrologer({
            fullName: fullName.trim(),
            email: email.trim().toLowerCase(),
            mobileNumber: mobileNumber.trim(),
            gender,
            age: Number(age),
            experience: Number(experience),
            about: about?.trim() || "",
            specializations,
            languages,
            chatRate: Number(chatRate),
            callRate: Number(callRate),
            videoCallRate: Number(videoCallRate),
            profileImage: null,
            certificateUrl: null,
            idProofUrl: null
        });

        const fileUrls = await upload.finalizeAstrologerFiles(files, astrologer.id);
        await astrologer.update(fileUrls);
        keepFiles = true;

        return res.status(201).json({
            success: true,
            message: "Astrologer created successfully",
            data: astrologer
        });

    } catch (error) {
        console.error("Create astrologer error:", error);
        if (astrologer) {
            try {
                await astrologer.destroy();
            } catch (cleanupError) {
                console.error("Failed to remove incomplete astrologer:", cleanupError);
            }
        }

        if ( error.name === "SequelizeUniqueConstraintError") {
            return res.status(409).json({
                success: false,
                message:
                    "Email or mobile number already exists"
            });
        }

        return res.status(500).json({
            success: false,
            message: "Failed to create astrologer",
            error: error.message
        });
    } finally {
        if (!keepFiles) {
            try {
                await upload.cleanupAstrologerFiles(files);
            } catch (cleanupError) {
                console.error("Failed to clean up astrologer uploads:", cleanupError);
            }
        }
    }
};

module.exports = {
    getAllAstrologers,
    createAstrologer
};