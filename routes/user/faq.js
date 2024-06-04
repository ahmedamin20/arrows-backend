const express = require('express');
const router = express.Router();
const { readByService,read } = require('../../controllers/user/faq');

router.get('/:id', readByService);
router.get('/common', read);
module.exports = router;