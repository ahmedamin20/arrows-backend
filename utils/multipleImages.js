const multer = require('multer');

let MAX_FILE_SIZE = 1024 * 1024 * 4; // 4 MB

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
            cb(null, 'public/images');
        } else {
            cb({ error: 'Mime type not supported' });
        }
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const UploadImages = multer({ storage: storage, limits: { fileSize: MAX_FILE_SIZE } }).fields([{ name: 'image', maxCount: 2 }]);
module.exports = UploadImages;
