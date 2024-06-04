const multer = require('multer');

const MAX_FILE_SIZE = 1024 * 1024 * 10; // 10 MB

const imageStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images');
    },
    filename: (req, file, cb) => {
        // Check if the file is SVG or an image file
        const ext = file.mimetype === 'image/svg+xml' ? 'svg' : file.originalname.split('.').pop();
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const imageFilter = (req, file, cb) =>
    (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' 
    || file.mimetype === 'image/jpeg' || file.mimetype === 'image/svg+xml') ?
    cb(null, true) : cb(new Error('Invalid File Extension.'));


const imageUpload = multer({ storage: imageStorage, fileFilter: imageFilter, limits: { fileSize: MAX_FILE_SIZE } });

module.exports = imageUpload;
