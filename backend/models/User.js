const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('user', {
    mobileNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            isEmail: true
        }
    },
    name: {
        type: DataTypes.STRING,
        allowNull: true
    },
    gender: {
        type: DataTypes.STRING,
        allowNull: true
    },
    dob: {
        type: DataTypes.STRING,
        allowNull: true
    },
    tob: {
        type: DataTypes.STRING,
        allowNull: true
    },
    pob: {
        type: DataTypes.STRING,
        allowNull: true
    },
    profileImage: {
        type: DataTypes.STRING,
        allowNull: true
    },
    zodiacSign: {
        type: DataTypes.STRING,
        allowNull: true
    },
    profileCompleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    deactivatedAt: {
        type: DataTypes.DATE,
        allowNull: true
    },
    deactivationReason: {
        type: DataTypes.STRING,
        allowNull: true
    },
    astrologyProfile: {
        type: DataTypes.JSON,
        allowNull: true
    },
    moonSign: {
        type: DataTypes.STRING,
        allowNull: true
    },
    sunSign: {
        type: DataTypes.STRING,
        allowNull: true
    },
    ascendant: {
        type: DataTypes.STRING,
        allowNull: true
    },
    latitude: {
        type: DataTypes.FLOAT,
        allowNull: true
    },
    longitude: {
        type: DataTypes.FLOAT,
        allowNull: true
    },
    timezone: {
        type: DataTypes.FLOAT,
        allowNull: true
    },
    astrologyMetadata: {
        type: DataTypes.JSON,
        allowNull: true
    }
});

module.exports = User;
