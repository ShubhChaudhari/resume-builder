const fs = require("fs");
const path = require("path");
const Resume = require("../models/resume.model");
// const upload = require("../middlewares/upload.middleware");
const User = require("../models/user.model")
const { cloudinary, upload } = require("../config/cloudinary.config");

// Helper — extract Cloudinary public_id from URL
const getPublicId = (url) => {
  // URL format: https://res.cloudinary.com/<cloud>/image/upload/v123/resume-builder/filename.png
  const parts = url.split("/");
  const filename = parts[parts.length - 1].split(".")[0]; // remove extension
  const folder = parts[parts.length - 2];
  return `${folder}/${filename}`; // e.g. "resume-builder/resume-123"
};

//upload Img in local system in /uploads folder
// const uploadResumeImages = async (req, res) => {
//   try {
//     upload.fields([{ name: "thumbnail", maxCount: 1 }, { name: "profileImage", maxCount: 1 }])(req, res, async (err) => {
//       if (err) {
//         return res.status(400).json({ message: "File upload failed", error: err.message });
//       }

//       const resumeId = req.params.id;

//       const resume = await Resume.findOne({ _id: resumeId, userId: req.user._id});

//       if (!resume) {
//         return res.status(404).json({ message: "Resume not found or unauthorized" });
//       }

//       const uploadsFolder = path.join(__dirname, "..", "uploads");
//       const baseUrl = `${req.protocol}://${req.get("host")}`;

//       const newThumbnail = req.files?.thumbnail?.[0];
//       const newProfileImage = req.files?.profileImage?.[0];

//       // If uploaded new thumbnail, Delete old thumbnail
//       if (newThumbnail ) {
//         if(resume.thumbnailLink){
//           const oldThumbnail = path.join(uploadsFolder,path.basename(resume.thumbnailLink));
//           if (fs.existsSync(oldThumbnail)) fs.unlinkSync(oldThumbnail)
//         }

//         resume.thumbnailLink = `${baseUrl}/uploads/${newThumbnail.filename}`;
//       }

//       // If new profile image uploaded , Delete old profile image
//       if (newProfileImage) {
//         if(resume.profileInfo?.profilePreviewUrl){
//           const oldProfile = path.join(uploadsFolder,path.basename(resume.profileInfo.profilePreviewUrl));
//           if (fs.existsSync(oldProfile)) fs.unlinkSync(oldProfile)
//         }

//         resume.profileInfo.profilePreviewUrl = `${baseUrl}/uploads/${newProfileImage.filename}`;
         
//         // ✅ Update user.profileImageUrl at the same time
//         await User.findByIdAndUpdate(req.user._id, {
//           profileImageUrl: `${baseUrl}/uploads/${newProfileImage.filename}`,
//         });
//       }

//       await resume.save();

//       res.status(200).json({
//         message: "Images uploaded successfully",
//         thumbnailLink: resume.thumbnailLink,
//         profilePreviewUrl: resume.profileInfo.profilePreviewUrl,
//       });
//     });
//   } catch (err) {
//     console.error("Error uploading images:", err);
//     res.status(500).json({message: "Failed to upload images",error: err.message});
//   }
// };

const uploadResumeImages = async (req, res) => {
  try {
    upload.fields([
      { name: "thumbnail", maxCount: 1 },
      { name: "profileImage", maxCount: 1 },
    ])(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ message: "File upload failed", error: err.message });
      }

      const resumeId = req.params.id;
      const resume = await Resume.findOne({ _id: resumeId, userId: req.user._id });

      if (!resume) {
        return res.status(404).json({ message: "Resume not found or unauthorized" });
      }

      const newThumbnail = req.files?.thumbnail?.[0];
      const newProfileImage = req.files?.profileImage?.[0];

      // Handle thumbnail
      if (newThumbnail) {
        // Delete old thumbnail from Cloudinary
        if (resume.thumbnailLink) {
          await cloudinary.uploader.destroy(getPublicId(resume.thumbnailLink));
        }
        // Cloudinary gives full URL directly in file.path
        resume.thumbnailLink = newThumbnail.path;
      }

      // Handle profile image
      if (newProfileImage) {
        // Delete old profile image from Cloudinary
        if (resume.profileInfo?.profilePreviewUrl) {
          await cloudinary.uploader.destroy(getPublicId(resume.profileInfo.profilePreviewUrl));
        }

        const newProfileUrl = newProfileImage.path;
        resume.profileInfo.profilePreviewUrl = newProfileUrl;

        // Update user profileImageUrl in parallel
        await Promise.all([
          resume.save(),
          User.findByIdAndUpdate(req.user._id, { profileImageUrl: newProfileUrl }),
        ]);

      } else {
        await resume.save();
      }

      res.status(200).json({
        message: "Images uploaded successfully",
        thumbnailLink: resume.thumbnailLink,
        profilePreviewUrl: resume.profileInfo.profilePreviewUrl,
      });
    });
  } catch (err) {
    console.error("Error uploading images:", err);
    res.status(500).json({ message: "Failed to upload images", error: err.message });
  }
};

module.exports = {uploadResumeImages};