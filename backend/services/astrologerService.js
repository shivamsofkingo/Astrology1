const { Op } = require("sequelize");
const Astrologer = require("../models/Astrologer");

const getAllAstrologers = async (page = 1, limit = 10, search = "") => {
    const offset = (page - 1) * limit;
    const where = {};
    if (search) {
        where[Op.or] = [
            { fullName: { [Op.like]: `%${search}%` } },
            { mobileNumber: { [Op.like]: `%${search}%` } },
        ];
    }
    const { count, rows } = await Astrologer.findAndCountAll({
        where,
        limit,
        offset,
        order: [["createdAt", "DESC"]],
    });
    return {
        astrologers: rows,
        totalAstrologers: count,
        currentPage: page,
        totalPages: Math.ceil(count / limit),
        limit,
    };
};

module.exports = {
    getAllAstrologers,
};