const userService = require("../services/userService");

const getAllUsers = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const search = req.query.search || "";
        const result = await userService.getAllUsers(
            page,
            limit,
            search,
        );
        res.status(200).json({
            success: true,
            ...result,
        });
    } catch (error) {
        console.error("Get users error:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch users",
            error: error.message,
        });
    }
};

module.exports = {
    getAllUsers,
};