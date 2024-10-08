// middleware/upload.js
const multer = require("multer");
const path = require("path");

// Set storage for uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Save the file with a unique name
  },
});

const upload = multer({ storage });

module.exports = upload;
