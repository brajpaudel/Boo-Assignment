const express = require('express');
const router = express.Router();
const userRoutes = require('./user');
const commentRoutes = require('./comment');

router.use('/user', userRoutes);
router.use('/comment', commentRoutes);

module.exports = router;
