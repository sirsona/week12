const express = require("express");
const controller = require("../controllers/leads.controller");
const asyncHandler = require("../middleware/asyncHandler");
const requireRole = require("../middleware/requireRole");

const router = express.Router();

router.get("/", asyncHandler(controller.list));
router.get("/stats", requireRole("admin"), asyncHandler(controller.stats));

router.get("/:id", asyncHandler(controller.getOne));

router.patch("/:id/status", asyncHandler(controller.patchStatus));
router.patch("/:id", asyncHandler(controller.updateLead));

module.exports = router;
