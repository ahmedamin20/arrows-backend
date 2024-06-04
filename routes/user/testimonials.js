const express = require('express');
const router = express.Router();
const { readAll } = require('../../controllers/user/testimonials');

router.get('/', readAll);

module.exports = router;