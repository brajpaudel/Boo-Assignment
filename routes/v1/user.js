'use strict';

const express = require('express');
const router = express.Router();
const { validateRequestBody } = require('../../validation/validator');
const { userSaveValidationSchema } = require('../../validation/userValidationSchema');
const { postSingleUser } = require('../../controllers/user.controller');

router.post('/', validateRequestBody(userSaveValidationSchema, 'Save User'), postSingleUser);

module.exports = router;
