// Route-specific middleware - validates :id format before it reaches the controller
// Used only on Practical 4's in-memory routes (numeric IDs).
// Practical 5's Mongo routes use MongoDB's own ObjectId, so this is not applied there.
const validateTaskId = (req, res, next) => {
  const id = req.params.id;

  if (isNaN(id)) {
    return res.status(400).json({ error: "Invalid task ID format" });
  }
  next();
};

module.exports = validateTaskId;
