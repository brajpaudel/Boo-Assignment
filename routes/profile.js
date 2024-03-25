'use strict';

const express = require('express');
const router = express.Router();
const { validateRequestBody, validateRequestParams } = require('../validation/validator');
const { profileSaveValidationSchema, fetchSingleProfileSchema } = require('../validation/profileValidationSchema');
const { postSingleProfile, getSingleProfile } = require('../controllers/profile.controller');

router.post('/', validateRequestBody(profileSaveValidationSchema, 'Save Comment'), postSingleProfile);
router.get('/:profileId', validateRequestParams(fetchSingleProfileSchema, 'Fetch Single Profile'), getSingleProfile);

module.exports = router;
