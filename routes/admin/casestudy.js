const express = require('express');
const router = express.Router();
const { create, readAll, readOne, update, remove ,createVideo} = require('../../controllers/admin/caseStudy');

const upload = require('../../utils/uploadCaseStudyFiles');

router.post('/',upload.fields([
    { name: 'imageHomePageCover', maxCount: 1 },
    { name: 'imageCover', maxCount: 1 },
    {name :'image',maxCount:1},
    {name :'companyLogo',maxCount:1},

]), create);
router.get('/', readAll);
router.get('/:id', readOne);

router.patch('/:id',upload.fields([
    { name: 'imageHomePageCover', maxCount: 1 },
    { name: 'imageCover', maxCount: 1 },
    {name :'image',maxCount:1},
    {name :'companyLogo',maxCount:1},

]), update);
router.delete('/:id', remove);

module.exports = router;