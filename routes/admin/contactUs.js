const express = require('express');
const router = express.Router();
const { readAll, remove ,update,updateComment,deleteSelected} = require('../../controllers/admin/contactUs');

router.delete('/deleteselected',deleteSelected);
 router.delete('/:id', remove);
 router.post('/', readAll);
 router.post('/comment/:id',updateComment);
 router.patch('/:id', update);


module.exports = router;