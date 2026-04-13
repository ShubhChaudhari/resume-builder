const express = require("express");

const { registerUser, loginUser, getUserProfile } = require("../controllers/auth.controller");

const { protect } = require("../middlewares/auth.middleware");
// const upload = require("../middlewares/upload.middleware") //middleware set for local
const { upload } = require("../config/cloudinary.config")

const router = express.Router();

// Auth Routes
router.post("/register", registerUser); // Register User
router.post("/login", loginUser); // Login User
router.get("/profile", protect, getUserProfile); // Get User Profile

router.post("/upload-image", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  //make url based on local path
  // const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;

  // req.file.path is now the full Cloudinary URL directly
  res.status(200).json({ imageUrl: req.file.path });
});

module.exports = router;