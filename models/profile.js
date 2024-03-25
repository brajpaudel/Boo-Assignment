const mongoose = require('mongoose');
const schema = mongoose.Schema;
const counterModule = require('./counter');
const { PROFILE_IMAGE, CATEGORY, MBTI, ENNEAGRAM, SOCIONICS, ATTITUDINAL_PSYCHE } = require('../constants/profileConstants');

const profileSchema = new schema(
  {
    id: { type: Number, unique: true },
    name: { type: String, required: true },
    image: { type: String, default: PROFILE_IMAGE },
    category: { type: [{ type: String, enum: CATEGORY }], required: true },
    description: { type: String },
    mbti: { type: String, enum: MBTI },
    enneagram: { type: String, enum: ENNEAGRAM },
    tritype: { type: Number },
    socionics: { type: String, enum: SOCIONICS },
    psyche: { type: String, enum: ATTITUDINAL_PSYCHE },
    sloan: { type: String },
    variant: { type: String },
    temperaments: { type: String },
  },
  { timestamps: true },
);

profileSchema.pre('save', async function (next) {
  const counter = await counterModule.findOneAndUpdate({ _id: 'profileSequenceId' }, { $inc: { seq: 1 } }, { new: true, upsert: true });
  this.id = counter.seq;
  next();
});

module.exports = profile = mongoose.model('profile', profileSchema);
