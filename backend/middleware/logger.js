// Runs on every request, logs method, URL, and timestamp
const logger = (req, res, next) => {
  console.log(`${req.method} ${req.url} - ${new Date().toISOString()}`);
  next(); // must call next(), or the request hangs forever
};

module.exports = logger;
