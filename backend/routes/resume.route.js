const express = require("express");

const { createResume, getUserResumes, getResumeById, updateResume, deleteResume } = require("../controllers/resume.controller");

const { protect } = require("../middlewares/auth.middleware");
const {uploadResumeImages} = require("../controllers/uploadImages");
 
const router = express.Router();

// Routes
router.post("/", protect, createResume); // Create Resume
router.get("/", protect, getUserResumes); // Get Resumes
router.get("/:id", protect, getResumeById); // Get Resume By ID
router.put("/:id", protect, updateResume); // Update Resume
router.put("/:id/upload-images", protect, uploadResumeImages); // Upload Images
router.delete("/:id", protect, deleteResume); // Delete Resume

module.exports = router;