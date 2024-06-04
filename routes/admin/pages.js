const express = require('express');
const { readAll } = require('../../controllers/admin/pages');
const router = express.Router();

router.get('/',readAll);

module.exports = router;