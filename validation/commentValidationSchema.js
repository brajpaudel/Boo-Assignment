const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const { MBTI, ENNEAGRAM, ZODIAC } = require('../constants/profileConstants');
const commentSaveSchema = Joi.object({
  profileId: Joi.objectId().required().label('Profile ID'),
  userId: Joi.objectId().required().label('User ID'),
  title: Joi.string().optional().label('Title'),
  description: Joi.string().optional().label('Description'),
  mbti: Joi.string()
    .valid(...MBTI)
    .label('mbti'),
  enneagram: Joi.string()
    .valid(...ENNEAGRAM)
    .label('enneagram'),
  zodiac: Joi.string()
    .valid(...ZODIAC)
    .label('zodiac'),
})
  .or('mbti', 'zodiac', 'enneagram')
  .custom((value, helpers) => {
    // Check if profileId and userId are not the same
    if (value.profileId.toString() === value.userId.toString()) {
      return helpers.error('any.invalid');
    }
    return value;
  })
  .messages({
    'any.invalid': 'Cannot Comment Same User Profile',
  });

const commentForProfileSchema = Joi.object({
  profileId: Joi.objectId().required().label('Profile ID'),
});

const likeUnlikeForCommentSchema = Joi.object({
  userId: Joi.objectId().required().label('User ID'),
  commentId: Joi.objectId().required().label('Comment ID'),
  like: Joi.boolean().required().valid(true, false).label('Like Value'),
});

module.exports = { commentSaveSchema, commentForProfileSchema, likeUnlikeForCommentSchema };
