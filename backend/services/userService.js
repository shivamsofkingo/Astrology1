const User = require("../models/User");

const getAllUsers = async () => {
    return await User.findAll({
        order: [["createdAt", "DESC"]],
    });
};

module.exports = {
    getAllUsers,
};