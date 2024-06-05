const multer = require('multer');
const supabase = require('./supabaseClient'); // Make sure to require your Supabase client

const MAX_FILE_SIZE = 1024 * 1024 * 10; // 10 MB

// Use memory storage
const storage = multer.memoryStorage();

const imageFilter = (req, file, cb) => {
    if (file.mimetype === 'image/png' || 
        file.mimetype === 'image/jpg' || 
        file.mimetype === 'image/jpeg' || 
        file.mimetype === 'image/svg+xml') {
        cb(null, true);
    } else {
        cb(new Error('Invalid File Extension.'));
    }
};

const imageUpload = multer({ 
    storage: storage, 
    fileFilter: imageFilter, 
    limits: { fileSize: MAX_FILE_SIZE } 
});

module.exports = imageUpload;
