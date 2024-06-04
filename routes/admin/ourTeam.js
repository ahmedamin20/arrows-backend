const express = require('express');
const router = express.Router();
const { create, readAll, readOne, update, remove } = require('../../controllers/admin/ourTeam');
const imageUpload = require('../../utils/image');

router.post('/', imageUpload.single('image'), create);
router.get('/', readAll);
router.get('/:id', readOne);
router.patch('/:id', imageUpload.single('image'), update);
router.delete('/:id', remove);

module.exports = router;