const User = require("../models/User");
const { Op } = require("sequelize");

const getAllUsers = async (
    page = 1,
    limit = 10,
    search = "",
    role = ""
) => {
    const offset = (page - 1) * limit;
    const where = {};

    // Search by name, email or mobile
    if (search) {
        where[Op.or] = [
            {
                name: {
                    [Op.like]: `%${search}%`,
                },
            },
            {
                email: {
                    [Op.like]: `%${search}%`,
                },
            },
            {
                mobileNumber: {
                    [Op.like]: `%${search}%`,
                },
            },
        ];
    }

    // Role filter
    if (role && role !== "All roles") {
        where.role = role;
    }

    const { count, rows } = await User.findAndCountAll({
        where,
        limit,
        offset,
        order: [["createdAt", "DESC"]],
    });
    return {
        users: rows,
        totalUsers: count,
        currentPage: page,
        totalPages: Math.ceil(count / limit),
        limit,
    };
};

module.exports = {
    getAllUsers,
};