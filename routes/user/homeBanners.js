const express = require('express');
const router = express.Router();
const { readAll } = require('../../controllers/user/homeBanners');

router.get('/', readAll);

module.exports = router;