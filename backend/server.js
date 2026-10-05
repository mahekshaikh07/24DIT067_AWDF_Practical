const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

const logger = require("./middleware/logger");
const jsonValidator = require("./middleware/jsonValidator");
const errorHandler = require("./middleware/errorHandler");

const taskRoutes = require("./routes/taskRoutes");           // Practical 4 (in-memory)
const mongoTaskRoutes = require("./routes/mongoTaskRoutes"); // Practical 5 (MongoDB)

app.use(express.json());       // parse incoming JSON body
app.use(logger);               // log every request
app.use(jsonValidator);        // check content-type on POST/PUT

// Practical 4 -> in-memory CRUD
app.use("/tasks", taskRoutes);

// Practical 5 -> MongoDB CRUD (kept as a separate route so both practicals work side by side)
app.use("/mongo-tasks", mongoTaskRoutes);

// 404 handler for undefined routes
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// global error handler -> ALWAYS LAST
app.use(errorHandler);

const PORT = 5000;

// Connect to MongoDB, then start the server either way
// (this way /tasks from Practical 4 still works even if Mongo isn't running)
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err.message));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
