const express = require('express');
const router = express.Router();
const { create, readAll, readOne, update, remove } = require('../../controllers/admin/project');
const imageUpload = require('../../utils/image');
const upload = require('../../utils/uploadProjectFiles')

router.post('/',upload.fields([
    { name: 'icon', maxCount: 1 },
    { name: 'image', maxCount: 20 }
]), create);
router.get('/', readAll);
router.get('/:id', readOne);
router.patch('/:id',upload.fields([
    { name: 'icon', maxCount: 1 },
    { name: 'image', maxCount: 20 }
]), update);
router.delete('/:id', remove);

module.exports = router;
