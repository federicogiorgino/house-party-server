const express = require("express");
const router = express.Router();
const parser = require("../config/cloudinary");

router.post("/", parser.single("image"), (req, res, next) => {
  const imageUrl = req.file.secure_url;
  res.status(201).json(imageUrl);
});

module.exports = router;
