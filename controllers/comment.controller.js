const { saveNewComment, findCommentForProfile, likeUnlikeComment } = require('../repositories/comment.repository');
const { postCommentLikeUnlikeService } = require('../services/comment.service');
const { respondError, respondSuccess } = require('../helpers/responseHelper');
const generalConstants = require('../constants/generalConstants').EN;
const httpStatus = require('http-status');

const commentController = {};

const postSingleComment = async (req, res, next) => {
  try {
    const { profileId, userId, title, description, mbti, enneagram, zodiac } = req.body;
    const commentData = { profileId, userId, title, description, mbti, enneagram, zodiac };
    const comments = await saveNewComment(commentData);
    if (comments) {
      return respondSuccess(res, httpStatus.OK, generalConstants.SAVE_COMMENT, generalConstants.COMMENT_SAVE_SUCCESS, comments);
    } else {
      return respondError(res, httpStatus.BAD_REQUEST, generalConstants.SAVE_COMMENT, generalConstants.COMMENT_SAVE_FAILURE);
    }
  } catch (err) {
    next(err);
  }
};

const getCommentForProfile = async (req, res, next) => {
  try {
    const profileId = req.params.profileId;
    const searchOptions = {
      page: req.query.page ? parseInt(req.query.page) : 1,
      size: req.query.size ? parseInt(req.query.size) : 10,
      sort: req.query.sort ? req.query.sort : null,
      mbti: req.query.mbti ? req.query.mbti : null,
      enneagram: req.query.enneagram ? req.query.enneagram : null,
      zodiac: req.query.zodiac ? req.query.zodiac : null,
    };
    const comments = await findCommentForProfile(profileId, searchOptions);
    if (comments) {
      return respondSuccess(res, httpStatus.OK, generalConstants.GET_COMMENT, generalConstants.COMMENTS_FETCH_USER_SUCCESS, comments);
    } else {
      return respondError(res, httpStatus.NOT_FOUND, generalConstants.GET_COMMENT, generalConstants.COMMENTS_NOT_FOUND);
    }
  } catch (err) {
    next(err);
  }
};

const postCommentLikeUnlike = async (req, res, next) => {
  try {
    const commentId = req.body.commentId;
    const userId = req.body.userId;
    const like = req.body.like;
    const comments = await postCommentLikeUnlikeService(commentId, userId, like);
    if (comments) {
      return respondSuccess(res, httpStatus.OK, generalConstants.COMMENT_LIKE, req.body.like ? generalConstants.COMMENT_LIKE_SUCCESS : generalConstants.COMMENT_UNLIKE_SUCCESS, { data: commentId });
    } else {
      return respondError(res, httpStatus.NOT_FOUND, generalConstants.COMMENT_LIKE, generalConstants.COMMENT_LIKE_FAILURE);
    }
  } catch (err) {
    next(err);
  }
};

module.exports = { postSingleComment, getCommentForProfile, postCommentLikeUnlike };
