const express = require('express');
const router = express.Router();
const { create, readAll, readOne, update, remove } = require('../../controllers/admin/testimonals');
const imageUpload = require('../../utils/image');

router.post('/', create);
router.get('/', readAll);
router.get('/:id', readOne);
router.patch('/:id', update);
router.delete('/:id', remove);

module.exports = router;