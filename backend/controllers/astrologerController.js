const astrologerService = require("../services/astrologerService");

const getAllAstrologers = async (req, res) => {
    try {
        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 10;
        const search = req.query.search || "";
        const result = await astrologerService.getAllAstrologers(
            page,
            limit,
            search
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

module.exports = {
    getAllAstrologers,
};