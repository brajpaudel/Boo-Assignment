'use strict';

const express = require('express');
const router = express.Router();
const { getCommentForProfile, postSingleComment, postCommentLikeUnlike } = require('../../controllers/comment.controller');
const { validateRequestBody, validateRequestParams } = require('../../validation/validator');
const { commentSaveSchema, commentForProfileSchema, likeUnlikeForCommentSchema } = require('../../validation/commentValidationSchema');

router.get('/:profileId', validateRequestParams(commentForProfileSchema, 'Get Comment'), getCommentForProfile);
router.post('/', validateRequestBody(commentSaveSchema, 'Save Comment'), postSingleComment);
router.post('/like', validateRequestBody(likeUnlikeForCommentSchema, 'Like/Unlike Comment'), postCommentLikeUnlike);

module.exports = router;
