const express = require('express');
const router = express.Router();
const { readAll } = require('../../controllers/user/philosphy');

router.get('/', readAll);

module.exports = router;