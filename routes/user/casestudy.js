const express = require('express');
const router = express.Router();
const { readAll ,readOne,readHighlighted,readBySubService,readByService} = require('../../controllers/user/caseStudy');

router.get('/', readAll);
router.get("/:id", readOne);
router.get("/highlighted",readHighlighted)
router.get('/readByService/:id', readByService);
router.get('/readBySubService/:id', readBySubService);

module.exports = router;