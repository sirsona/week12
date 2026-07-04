const AppError = require("../utils/AppError");

function errorHandler(err, req, res, next) {
  console.error("Error:", err);

  // Handle custom AppError
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      error: err.message,
    });
  }

  // PostgreSQL error codes
  switch (err.code) {
    case "23505":
      return res.status(409).json({
        error: "That record already exists",
      });
    case "23514":
      return res.status(400).json({
        error: "Invalid value for a constrained column",
      });
    case "23503":
      return res.status(400).json({
        error: "Invalid reference",
      });
    case "22P02":
      return res.status(400).json({
        error: "Invalid ID format. ID must be a valid UUID.",
      });
    default:
      // Default error
      console.error("Unhandled error:", err);
      return res.status(500).json({
        error: "Internal server error",
      });
  }
}

module.exports = errorHandler;
