const express = require('express');
const router = express.Router();
const { readAll , readOne } = require('../../controllers/user/services');

router.get('/', readAll);
router.get("/:id", readOne);

module.exports = router;