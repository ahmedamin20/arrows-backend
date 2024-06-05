const multer = require('multer');
const MAX_FILE_SIZE = 1024 * 1024 * 10; // 10 MB

// Use memory storage
const storage = multer.memoryStorage();

const videoFilter = (req, file, cb) => {
    if (file.mimetype === 'video/mp4' || 
        file.mimetype === 'video/mpeg' || 
        file.mimetype === 'video/webm') {
        cb(null, true);
    } else {
        cb(new Error('Invalid File Extension. Only MP4, MPEG, and WEBM files are allowed for videos.'));
    }
};

const videoUpload = multer({ 
    storage: storage, 
    fileFilter: videoFilter, 
    limits: { fileSize: MAX_FILE_SIZE } 
});

module.exports = videoUpload;
