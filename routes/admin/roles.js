const express = require('express');
const { readAll ,readOne,create,update,remove,readAllAdmin} = require('../../controllers/admin/roles');
const router = express.Router();

router.get('/',readAll);
router.get('/readAllAdmin',readAllAdmin);
router.get('/:id',readOne);
router.post('/',create);
router.patch('/:id',update);
router.delete('/:id',remove);



module.exports = router;