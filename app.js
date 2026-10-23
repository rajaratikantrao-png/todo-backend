require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const todoItemsRouter = require("./routes/todoItemsRouter");

const DB_PATH = process.env.MONGODB_URI;
const PORT = process.env.PORT || 3000;

const app = express();

app.use(cors());
app.use(express.json());

// All Todo API routes
app.use("/api/todo", todoItemsRouter);

// 404 handler - always keep this last
app.use((req, res) => {
  res.status(404).json({
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
});

mongoose
  .connect(DB_PATH)
  .then(() => {
    console.log("Connected to MongoDB");

    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
  });