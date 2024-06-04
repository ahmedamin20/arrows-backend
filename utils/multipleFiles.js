const multer = require('multer');

const MAX_FILE_SIZE = 1024 * 1024 * 4; // 4 MB

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log('Processing file:', file.originalname);
        console.log('MIME type:', file.mimetype);
        console.log('Field name:', file.fieldname);
        
        if (file.mimetype === 'application/pdf') {
            if (file.fieldname !== 'pdf') {
                console.error('Error: Invalid File Extension For Pdf.');
                cb(new Error('Invalid File Extension For Pdf.'));
            } else {
                console.log('Storing PDF in public/pdfs');
                cb(null, 'public/pdfs');
            }
        } else if (
            file.mimetype === 'image/png' ||
            file.mimetype === 'image/jpg' ||
            file.mimetype === 'image/jpeg'
        ) {
            if (
                file.fieldname === 'image' ||
                file.fieldname === 'imageDesc' ||
                file.fieldname === 'images' ||
                file.fieldname === 'imageHomeCover' ||
                file.fieldname === 'imageCover' ||
                file.fieldname === 'banner' ||
                file.fieldname === 'companyLogo'
            ) {
                console.log('Storing Image in public/images');
                cb(null, 'public/images');
            } else {
                console.error('Error: Invalid File Extension For Image.');
                cb(new Error('Invalid File Extension For Image.'));
            }
        } else if (
            file.mimetype === 'video/mp4' ||
            file.mimetype === 'video/quicktime' ||
            file.mimetype === 'video/x-msvideo'
        ) {
            if (file.fieldname === 'video' || file.fieldname === 'banner' || file.fieldname === 'videos') {
                console.log('Storing Video in public/videos');
                cb(null, 'public/videos');
            } else {
                console.error('Error: Invalid File Extension For Video.');
                cb(new Error('Invalid File Extension For Video.'));
            }
        } else {
            console.error('Error: Mime type not supported');
            cb(new Error('Mime type not supported'));
        }
    },
    filename: (req, file, cb) => {
        const newFileName = `${Date.now()}-${file.originalname}`;
        console.log('New file name:', newFileName);
        cb(null, newFileName);
    }
});

function upload(type) {
    return multer({ storage: storage, limits: { fileSize: MAX_FILE_SIZE } }).fields([
        { name: 'pdf', maxCount: 1 },
        { name: 'image', maxCount: 1 },
        { name: 'imageDesc', maxCount: 1 },
        { name: 'video', maxCount: 1 },
        { name: 'imageHomeCover', maxCount: 1 },
        { name: 'imageCover', maxCount: 1 },
        { name: 'companyLogo', maxCount: 1 },
        { name: 'icon', maxCount: 1 },
        { name: 'banner', maxCount: 1 },
        { name: 'videos', maxCount: 100 }, // Accept any number of videos
        { name: 'images', maxCount: 100 }, // Accept any number of images
    ]);
}

module.exports = upload;
