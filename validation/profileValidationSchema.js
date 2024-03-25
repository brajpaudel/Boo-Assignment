const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const { CATEGORY, MBTI, ENNEAGRAM, SOCIONICS, ATTITUDINAL_PSYCHE } = require('../constants/profileConstants');

const profileSaveValidationSchema = Joi.object({
  name: Joi.string().required().label('Name'),
  category: Joi.array()
    .items(Joi.string().valid(...CATEGORY))
    .min(1)
    .required()
    .label('Category'),
  description: Joi.string().label('Description'),
  mbti: Joi.string()
    .valid(...MBTI)
    .label('MBTI'),
  enneagram: Joi.string()
    .valid(...ENNEAGRAM)
    .label('Enneagram'),
  variant: Joi.string().label('Instinctual Variant'),
  tritype: Joi.number().label('Tritype'),
  socionics: Joi.string()
    .valid(...SOCIONICS)
    .label('Socionics'),
  sloan: Joi.string().label('Big Five Slogan'),
  psyche: Joi.string()
    .valid(...ATTITUDINAL_PSYCHE)
    .label('Attitudinal Psyche'),
  temperaments: Joi.string().label('temperaments'),
});

const fetchSingleProfileSchema = Joi.object({
  profileId: Joi.number().required().label('Profile ID'),
});

module.exports = { profileSaveValidationSchema, fetchSingleProfileSchema };
