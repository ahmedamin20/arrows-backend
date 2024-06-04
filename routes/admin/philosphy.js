const express = require('express');
const router = express.Router();
const { create, readAll, readOne, update, remove } = require('../../controllers/admin/philosphy');
const imageUpload = require('../../utils/image');

router.post('/', imageUpload.array('images',2), create);
router.get('/', readAll);
router.get('/:id', readOne);
router.patch('/:id', imageUpload.array('images',2), update);
router.delete('/:id', remove);

module.exports = router;