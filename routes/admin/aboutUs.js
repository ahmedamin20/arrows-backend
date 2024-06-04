const express = require('express');
const router = express.Router();
const { create, readAll, readOne, update, remove,createVideo, updateVideo,createAboutUs } = require('../../controllers/admin/aboutUs');
const imageUpload = require('../../utils/image');
const videoUpload = require('../../utils/video');
const upload = require('../../utils/multipleFiles');

router.post('/',upload,createAboutUs)
router.get('/', readAll);
router.get('/:id', readOne);
router.patch('/video/:id', videoUpload.single('image'), updateVideo);
router.patch('/:id', upload, update);

router.delete('/:id', remove);

module.exports = router