const astrologerService = require("../services/astrologerService");

const getAllAstrologers = async (req, res) => {
    try {
        const astrologers = await astrologerService.getAllAstrologers();
        res.status(200).json({
            success: true,
            count: astrologers.length,
            data: astrologers,
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

module.exports = {
    getAllAstrologers,
};