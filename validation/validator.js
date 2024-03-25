const { respondError } = require('../helpers/responseHelper');
const httpStatus = require('http-status');
const generalConstants = require('../constants/generalConstants').EN;

const buildUsefulErrorObject = (errors) => {
  try {
    let sendObject = {};
    if (errors) {
      let errorProcess = errors.detail ? errors.detail : errors.details ? errors.details : errors;
      errorProcess.forEach((detail) => {
        let msg = `${detail.message.replace(/['"]/g, '')}`;
        if (detail.path.length > 1) {
          const keys = detail.path;
          let ref = sendObject;
          for (let i = 0; i < keys.length; i++) {
            let k = keys[i];
            if (!ref[k]) {
              if (Number.isInteger(keys[i + 1])) {
                ref[k] = [];
              } else {
                ref[k] = {};
              }
            }
            if (Number.isInteger(keys[i])) {
              if (i === keys.length - 1) {
                if (Array.isArray(ref[k])) {
                  ref[k].push(msg);
                } else {
                  ref[k] = [msg];
                }
              } else {
                ref = ref[k];
              }
            } else {
              if (i === keys.length - 1) {
                ref[k] = msg;
              } else {
                ref = ref[k];
              }
            }
          }
        } else {
          sendObject[detail.path[0]] = msg;
        }
      });
    }
    return sendObject;
  } catch (err) {
    throw err;
  }
};

const validateRequestBody = (schema, title, opt) => (req, res, next) => {
  const options = opt || {
    abortEarly: false,
  };
  const validation = schema.validate(req.body ? req.body : {}, options);
  if (validation.error) {
    const errors = validation.error ? buildUsefulErrorObject(validation.error.details) : null;
    return respondError(res, httpStatus.UNPROCESSABLE_ENTITY, title, generalConstants.INPUT_ERRORS, errors);
  }
  next();
};

const validateRequestParams = (schema, title, opt) => (req, res, next) => {
  const options = opt || {
    abortEarly: false,
  };
  const validation = schema.validate(req.params ? req.params : {}, options);
  if (validation.error) {
    const errors = validation.error ? buildUsefulErrorObject(validation.error.details) : null;
    return respondError(res, httpStatus.UNPROCESSABLE_ENTITY, title, generalConstants.INPUT_ERRORS, errors);
  }
  next();
};

module.exports = { validateRequestBody, validateRequestParams };
