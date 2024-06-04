const express = require('express');
const router = express.Router();
const { readAll, remove , deleteSelected  } = require('../../controllers/admin/feedback');

router.delete('/deleteselected',deleteSelected);
router.delete('/:id', remove);
router.get('/', readAll);






module.exports = router;