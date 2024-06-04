const express = require('express');
const router = express.Router();
const { readAll,readOne ,readHighlighted} = require('../../controllers/user/blogs');

router.get('/', readAll);
router.get('/:id',readOne);
router.get('/highlighted',readHighlighted)

module.exports = router;