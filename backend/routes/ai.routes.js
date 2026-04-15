const express = require("express");
const { generateAIContent } = require("../controllers/ai.controller");
const { protect } = require("../middlewares/auth.middleware");

const router = express.Router();

router.post("/generate", protect, generateAIContent);

module.exports = router;