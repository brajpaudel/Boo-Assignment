const mongoose = require('mongoose');
const { MBTI, ENNEAGRAM, ZODIAC } = require('../constants/profileConstants');
const schema = mongoose.Schema;

const commentSchema = new schema(
  {
    profileId: { type: schema.Types.ObjectId, required: true, ref: 'profile', index: true },
    userId: { type: schema.Types.ObjectId, required: true, ref: 'user', index: true },
    title: { type: String },
    description: { type: String },
    mbti: { type: String, enum: MBTI },
    enneagram: { type: String, enum: ENNEAGRAM },
    zodiac: { type: String, enum: ZODIAC },
    likeCount: { type: Number, default: 0 },
  },
  { timestamps: true },
);

module.exports = comment = mongoose.model('comment', commentSchema);
