const mongoose = require('mongoose');
const { MBTI, ENNEAGRAM, ZODIAC } = require('../constants/profileConstants');
const schema = mongoose.Schema;

const likeSchema = new schema({
  commentId: { type: schema.Types.ObjectId, required: true, ref: 'comment', index: true },
  userId: { type: schema.Types.ObjectId, required: true, ref: 'user', index: true },
});

module.exports = like = mongoose.model('like', likeSchema);
