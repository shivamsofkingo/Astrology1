const Astrologer = require("../models/Astrologer");

const getAllAstrologers = async () => {
    return await Astrologer.findAll();
};

module.exports = {
    getAllAstrologers,
};