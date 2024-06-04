const multer = require('multer');
const MAX_FILE_SIZE = 1024 * 1024 * 4; //4 MB

const pdfStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/pdfs');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`);
    }
});

const pdfFilter = (req, file, cb) => {
    if (file.mimetype !== 'application/pdf') {
        return cb(new Error('Invalid File Extension.'));
    }
    return cb(null, true);
}

const pdfUpload = multer({ storage: pdfStorage, fileFilter: pdfFilter, limits: { fileSize: MAX_FILE_SIZE } });

module.exports = pdfUpload;