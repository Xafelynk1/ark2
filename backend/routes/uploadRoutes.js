const express = require('express');
const multer = require('multer');
const router = express.Router();

// Set up storage for uploaded files
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Specify the directory to save uploaded files
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname); // Append timestamp to the original file name
    }
});

// Initialize multer with the storage configuration
const upload = multer({ storage: storage });

// Create an upload route
router.post('/upload', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }
    res.status(200).json({ message: 'File uploaded successfully', file: req.file });
});

module.exports = router;
