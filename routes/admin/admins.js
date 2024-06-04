const express = require('express');
const router = express.Router();
const { login, info, createAdmin, readAllAdmins, readUser, removeAdmin ,userRoles,userPages} = require('../../controllers/admin/admins');
const { verifyAccessToken } = require('../../helpers/jwtHelpers');

router.post('/login', login);
router.get('/info', verifyAccessToken, info);
router.get('/userRoles', verifyAccessToken, userRoles);
router.get('/userPages', verifyAccessToken, userPages);
router.post('/register', verifyAccessToken, createAdmin);
router.get('/:id', verifyAccessToken, readUser);
router.delete('/:id', verifyAccessToken, removeAdmin);
router.get('/', verifyAccessToken, readAllAdmins);

module.exports = router;