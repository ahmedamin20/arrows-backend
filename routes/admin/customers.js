const express = require('express');
const router = express.Router();
const { readAll, readOne, remove ,update,updateComment ,deleteSelected } = require('../../controllers/admin/customer');

router.delete('/deleteselected',deleteSelected);
router.get('/:id', readOne);
router.delete('/:id', remove);
router.get('/', readAll);
router.post('/comment/:id',updateComment);
router.patch('/:id', update);




module.exports = router;