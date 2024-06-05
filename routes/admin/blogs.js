const express = require('express');
const router = express.Router();
const { create, readAll, readOne, update, remove, createVideo, updateVideo } = require('../../controllers/admin/blogs');
const imageUpload = require('../../utils/image');
const videoUpload = require('../../utils/video');
const signal = "image"
router.post('/', imageUpload.single(signal), create);
router.post('/video', videoUpload.single(signal), createVideo);
router.get('/', readAll);
router.get('/:id', readOne);
router.patch('/:id', imageUpload.single(signal), update);
router.patch('/video/:id', videoUpload.single(signal), updateVideo);
router.delete('/:id', remove);

module.exports = router;
