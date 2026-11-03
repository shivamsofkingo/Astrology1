const express = require("express");
const cors = require("cors");
const path = require("path");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const astrologerRoutes = require("./routes/astrologerRoutes");
const categoryRoutes = require("./routes/categoryRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/storage/uploads", express.static(path.join(__dirname, "storage", "uploads")));

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Admin API is running",
    });
});

// Authentication routes
app.use("/api", authRoutes);

// User routes
app.use("/api/admin/users", userRoutes);

// Astrologer routes
app.use("/api/admin/astrologers", astrologerRoutes);

// Product catalog categories
app.use("/api/categories", categoryRoutes);

module.exports = app;