const { Op, Sequelize } = require("sequelize");
const Astrologer = require("../models/Astrologer");

const getAllAstrologers = async (page = 1, limit = 10, search = "", specialization = "") => {
    const offset = (page - 1) * limit;
    const where = {};
    if (search) {
        where[Op.or] = [
            { fullName: { [Op.like]: `%${search}%` } },
            { mobileNumber: { [Op.like]: `%${search}%` } },
            { email: { [Op.like]: `%${search}%` } },
        ];
    }
    if (specialization) {
        where[Op.and] = [
            Sequelize.where(
                Sequelize.fn(
                    "JSON_CONTAINS",
                    Sequelize.col("specializations"),
                    JSON.stringify(specialization)
                ),
                1
            ),
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

const createAstrologer = async (data) => {
    return await Astrologer.create({
        mobileNumber: data.mobileNumber,
        email: data.email,
        fullName: data.fullName,
        profileImage: data.profileImage,
        about: data.about,
        age: Number(data.age),
        gender: data.gender,
        experience: Number(data.experience),
        specializations: data.specializations,
        languages: data.languages,
        certificateUrl: data.certificateUrl,
        idProofUrl: data.idProofUrl,
        chatRate: Number(data.chatRate),
        callRate: Number(data.callRate),
        videoCallRate: Number(data.videoCallRate),
        isApproved: false,
        isRejected: false,
        profileCompleted: true,
        isAvailable: false,
        bankDetails: null
    });
};

module.exports = {
    getAllAstrologers,
    createAstrologer
};