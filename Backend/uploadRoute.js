// uploadRoute.js
const express = require("express");
const upload = require("./multerConfig");
const Image = require("./model/Image");

const router = express.Router();

// POST: Upload image, store in DB
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

    res.json({
      success: true,
      message: "Image uploaded successfully",
      data: newImage
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/fetchall", async (req, res) => {
  try {
    const images = await Image.find().sort({ createdAt: -1 });
    res.json(images);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

// Test route
router.get("/", (req, res) => {
  res.json({ message: "Never Give Up" });
});

module.exports = router;
