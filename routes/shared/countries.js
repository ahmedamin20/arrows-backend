const express = require('express');
const router = express.Router();
const { readAll } = require('../../controllers/shared/countries');

router.get('/', readAll);

module.exports = router;


