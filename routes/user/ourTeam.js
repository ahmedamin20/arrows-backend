const express = require('express');
const router = express.Router();
const { readAll } = require('../../controllers/user/ourTeam');

router.get('/', readAll);

module.exports = router;