const express = require('express');
const router = express.Router();
const { readAll } = require('../../controllers/shared/db-countries');

router.post('/', readAll);

module.exports = router;


