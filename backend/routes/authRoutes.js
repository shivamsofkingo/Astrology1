const express = require("express");
const jwt = require("jsonwebtoken");

const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET;
const adminEmail = process.env.ADMIN_EMAIL;
const adminPassword = process.env.ADMIN_PASSWORD;

// Login
router.post("/login", (req, res) => {
    const { email, password } = req.body;

    if (email === adminEmail && password === adminPassword) {
        const token = jwt.sign({ email, role: "admin", }, JWT_SECRET, { expiresIn: "24h", });
        return res.json({
            success: true,
            token,
            user: {
                email,
                role: "admin",
            },
        });
    }
    return res.status(401).json({
        success: false,
        message: "Invalid credentials",
    });
});

// Logout
router.post("/logout", (req, res) => {
    res.json({
        success: true,
        message: "Logged out successfully",
    });
});

module.exports = router;