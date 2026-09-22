const express = require('express');
const router = express.Router();
const usersController = require('./users.controller');
const { verifyToken, isOwner } = require('../../middleware/authMiddleware');

router.get('/pending', verifyToken, isOwner, usersController.getPending);
router.put('/:id/role', verifyToken, isOwner, usersController.updateRole);

module.exports = router;