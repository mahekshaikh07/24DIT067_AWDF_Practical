const express = require("express");
const router = express.Router();
const validateTaskId = require("../middleware/ValidateTaskId");

let tasks = [
  { id: 1, title: "Learn Express", completed: false }
];
let nextId = 2;

// GET all tasks
router.get("/", (req, res) => {
  res.status(200).json(tasks);
});

// POST create a task
router.post("/", (req, res) => {
  const { title } = req.body;

  if (!title) {
    return res.status(400).json({ error: "Title is required" });
  }

  const newTask = { id: nextId++, title, completed: false };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

// PUT update a task
router.put("/:id", validateTaskId, (req, res) => {
  const id = parseInt(req.params.id);
  const task = tasks.find(t => t.id === id);

  if (!task) {
    return res.status(404).json({ error: "Task not found" });
  }

  const { title, completed } = req.body;
  if (title !== undefined) task.title = title;
  if (completed !== undefined) task.completed = completed;

  res.status(200).json(task);
});

// DELETE a task
router.delete("/:id", validateTaskId, (req, res) => {
  const id = parseInt(req.params.id);
  const index = tasks.findIndex(t => t.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "Task not found" });
  }

  tasks.splice(index, 1);
  res.status(200).json({ message: "Task deleted" });
});

module.exports = router;
