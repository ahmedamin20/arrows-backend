const express = require('express');
const router = express.Router();
const { readAll } = require('../../controllers/shared/categories');

router.get('/', readAll);

module.exports = router;


