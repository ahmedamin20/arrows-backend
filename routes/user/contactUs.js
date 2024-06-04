const express = require('express');
const router = express.Router();
const { createContact } = require('../../controllers/user/contactUsRequest');

router.post('/', createContact);

module.exports = router;