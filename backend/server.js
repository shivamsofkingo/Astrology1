require("dotenv").config();

const app = require("./app");
const sequelize = require("./config/database");

const PORT = Number(process.env.PORT || 5000);

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected successfully");

    app.listen(PORT, () => {
      console.log(`Admin server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Unable to connect to database:", error);
  }
};

startServer();