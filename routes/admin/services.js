
const express = require('express');
const router = express.Router();
const { create, readAll, readOne, update, remove } = require('../../controllers/admin/services');
const upload = require('../../utils/multipleFiles');

router.post('/',upload,create);
router.get('/', readAll);
router.get('/:id', readOne);
router.patch('/:id',upload,update);
router.delete('/:id', remove);

module.exports = router;