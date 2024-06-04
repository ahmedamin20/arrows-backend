const multer = require('multer');

const MAX_FILE_SIZE = 1024 * 1024 * 10; // 10 MB

// Storage configuration for images and videos
const mediaStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (file.fieldname === 'imageHomePageCover') {
            console.log('Saving icon to public/images');
            cb(null, 'public/images');
        } else if (file.fieldname === 'imageCover') {
            console.log('Saving media to public/images');
            cb(null, 'public/images');
        }  else if (file.fieldname === 'companyLogo') {
            console.log('Saving media to public/images');
            cb(null, 'public/images');
        } else if (file.fieldname === 'image') {
            console.log('Saving media to public/images');
            cb(null, 'public/images');
        } 
        else if (file.fieldname === 'images') {
            console.log('Saving media to public/images');
            cb(null, 'public/images');
        } else {
            console.log(`Unexpected fieldname: ${file.fieldname}`);
            cb(new Error('Unexpected field'));
        }
    },
    filename: (req, file, cb) => {
        const ext = file.originalname.split('.').pop();
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

// File filter for images and videos
const mediaFilter = (req, file, cb) => {
    if (file.fieldname === 'imageHomePageCover' ||
    file.fieldname === 'imageCover' ||
    file.fieldname === 'companyLogo' 
    ) {
        if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' 
            || file.mimetype === 'image/jpeg' || file.mimetype === 'image/svg+xml') {
            cb(null, true);
        } else {
            cb(new Error('Invalid Icon File Extension.'));
        }
    } else if (file.fieldname === 'image') {
        if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' 
            || file.mimetype === 'image/jpeg' || file.mimetype === 'image/svg+xml' 
            || file.mimetype === 'video/mp4' || file.mimetype === 'video/mpeg' 
            || file.mimetype === 'video/quicktime') {
            cb(null, true);
        } else {
            cb(new Error('Invalid Media File Extension.'));
        }
    } else {
        console.log(`Unexpected fieldname in filter: ${file.fieldname}`);
        cb(new Error('Unexpected field'));
    }
};

// Multer configuration
const upload = multer({ 
    storage: mediaStorage, 
    fileFilter: mediaFilter, 
    limits: { fileSize: MAX_FILE_SIZE } 
});

module.exports = upload;
