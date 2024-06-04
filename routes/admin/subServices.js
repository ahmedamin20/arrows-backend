
const express = require('express');
const router = express.Router();
const { create, readAll, readOne, update, remove ,createVideo,updateVideo } = require('../../controllers/admin/subServices');
const imageUpload = require('../../utils/image');
const videoUpload = require('../../utils/video');
const upload = require('../../utils/multipleFiles');

router.post('/',upload,create);
router.post('/video', videoUpload.single('image'), createVideo);
router.get('/', readAll);
router.get('/:id', readOne);
router.patch('/:id',upload,update);
router.patch('/video/:id', videoUpload.single('image'), updateVideo);
router.delete('/:id', remove);

module.exports = router;