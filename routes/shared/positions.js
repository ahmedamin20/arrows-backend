const express = require('express');
const router = express.Router();
const { readAll } = require('../../controllers/shared/positions');

router.get('/', readAll);

module.exports = router;


