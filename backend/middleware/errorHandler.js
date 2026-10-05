// Global error handler. Must be the LAST app.use() in server.js
const errorHandler = (err, req, res, next) => {
  console.error(err.stack); // full trace stays on server console only

  res.status(500).json({ error: "Something went wrong" });
};

module.exports = errorHandler;
