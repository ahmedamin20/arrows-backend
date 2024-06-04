const express = require('express');
const router = express.Router();
const { create, readAll, readOne, update, remove,createVideo ,updateVideo} = require('../../controllers/admin/homeBanners');
const imageUpload = require('../../utils/image');
const videoUpload = require('../../utils/video')

router.post('/', imageUpload.single('image'), create);
router.post('/video', videoUpload.single('image'), createVideo);
router.get('/', readAll);
router.get('/:id', readOne);
router.patch('/:id', imageUpload.single('image'), update);
router.patch('/video/:id', videoUpload.single('image'), updateVideo);
router.delete('/:id', remove);

module.exports = router;