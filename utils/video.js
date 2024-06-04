const multer = require('multer');
const MAX_FILE_SIZE = 1024 * 1024 * 10; // 10 MB

const videoStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const videoFilter = (req, file, cb) =>
    (file.mimetype === 'video/mp4' || file.mimetype === 'video/mpeg' || file.mimetype === 'video/webm') ?
    cb(null, true) : cb(new Error('Invalid File Extension. Only MP4, MPEG, and WEBM files are allowed for videos.'));

const videoUpload = multer({ storage: videoStorage, fileFilter: videoFilter, limits: { fileSize: MAX_FILE_SIZE } });

module.exports = videoUpload;
