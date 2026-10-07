const userService = require("../services/userService");

const getAllUsers = async (req, res) => {
    try {
        const users = await userService.getAllUsers();
        res.status(200).json({
            success: true,
            count: users.length,
            data: users,
        });
    } catch (error) {
        console.error("Error getting users:", error);
        res.status(500).json({
            success: false,
            message: "Failed to get users",
        });
    }
};

module.exports = {
    getAllUsers,
};