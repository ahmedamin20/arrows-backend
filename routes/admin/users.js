const express = require('express');
const router = express.Router();
const  { createUser, readAll, readOne, update, remove ,login,info,userRoles, updateInfo} = require('../../controllers/admin/users');
const { verifyAccessToken } = require('../../helpers/jwtHelpers');

router.post('/login', login);
router.get('/info', verifyAccessToken, info);
router.get('/userRoles', verifyAccessToken, userRoles);
router.post('/register', verifyAccessToken, createUser);
router.get('/', verifyAccessToken, readAll);
router.get('/:id', verifyAccessToken, readOne);
router.delete('/:id', verifyAccessToken, remove);
router.patch('/:id',update);
router.patch('/updateInfo/:id',updateInfo);


module.exports = router;