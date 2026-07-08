const express = require("express");
const controller = require("../controllers/leads.controller");
const asyncHandler = require("../middleware/asyncHandler");
const requireRole = require("../middleware/requireRole");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

// All routes require authentication
router.use(requireAuth); //

// GET routes
router.get("/", asyncHandler(controller.list));
router.get("/stats", asyncHandler(controller.stats));
router.get("/:id", asyncHandler(controller.getOne));

// PATCH routes
router.patch("/:id/status", asyncHandler(controller.patchStatus));
router.patch("/:id", asyncHandler(controller.updateLead));

module.exports = router;
