const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Astrologer = sequelize.define('astrologer', {
    mobileNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    fullName: {
        type: DataTypes.STRING,
        allowNull: true
    },
    profileImage: {
        type: DataTypes.STRING,
        allowNull: true
    },
    about: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    gender: {
        type: DataTypes.STRING,
        allowNull: true
    },
    experience: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    specializations: {
        type: DataTypes.JSON, // Array of strings e.g. ["Vedic Astrology", "Tarot Reading"]
        allowNull: true
    },
    languages: {
        type: DataTypes.JSON, // Array of strings e.g. ["English", "Hindi"]
        allowNull: true
    },
    certificateUrl: {
        type: DataTypes.STRING,
        allowNull: true
    },
    idProofUrl: {
        type: DataTypes.STRING,
        allowNull: true
    },
    isApproved: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    isRejected: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    profileCompleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    isAvailable: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },

    chatRate: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    callRate: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    videoCallRate: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    bankDetails: {
        type: DataTypes.JSON, // { accountHolderName, bankName, accountNumber, ifscCode, upiId }
        allowNull: true
    }
});

module.exports = Astrologer;
