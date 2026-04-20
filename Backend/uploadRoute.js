const express = require("express");
const upload = require("./multerConfig");
const Image = require("./model/Image");
// const protect = require("./middleware/authMiddleware");

const router = express.Router();

// Upload image
router.post("/", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const base64Image = req.file.buffer.toString("base64");

    const newImage = new Image({
      image: base64Image
    });

    await newImage.save();

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// Fetch all images (IDs only)
router.get("/fetchall", async (req, res) => {
  try {
    const images = await Image
      .find()
      .select("+image") // 👈 FORCE include
      .sort({ createdAt: -1 });

    res.json(images);
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

module.exports = router;