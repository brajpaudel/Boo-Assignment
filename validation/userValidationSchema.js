const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const userSaveValidationSchema = Joi.object({
  name: Joi.string().required().label('Name'),
});

module.exports = { userSaveValidationSchema };
