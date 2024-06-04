const express = require('express');
const router = express.Router();


const positionsRouter = require('./shared/positions');
const categoriesRouter = require('./shared/categories');


router.use('/positions', positionsRouter);
router.use('/categories', categoriesRouter);

module.exports = router;