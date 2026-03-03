const express = require("express");
const cors = require("cors");
const { sequelize } = require("./models");
const todoRoutes = require("./routes/todoRoutes");
const errorHandler = require("./middleware/errorHandler");

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get("/", (_req, res) => {
  res.json({ message: "Todo Tracker API is running" });
});

app.use("/todos", todoRoutes);

// Error handling middleware
app.use(errorHandler);

// Start Server
const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connection established successfully.");

    // Sync models (creates tables if they don't exist)
    await sequelize.sync();
    console.log("Database synced.");

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Unable to start server:", error);
    process.exit(1);
  }
};

startServer();

module.exports = app;
