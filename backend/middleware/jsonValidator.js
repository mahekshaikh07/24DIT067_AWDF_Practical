// Rejects POST/PUT requests that don't send Content-Type: application/json
const jsonValidator = (req, res, next) => {
  if (req.method === "POST" || req.method === "PUT") {
    if (req.headers["content-type"] !== "application/json") {
      return res.status(400).json({
        error: "Content-Type must be application/json"
      });
    }
  }
  next();
};

module.exports = jsonValidator;
