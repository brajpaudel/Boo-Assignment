const httpStatus = require('http-status');
const generalConstants = require('../constants/generalConstants').EN;
const { respondError, respondSuccess } = require('../helpers/responseHelper');
const { saveNewUser } = require('../repositories/user.repository');

const postSingleUser = async (req, res, next) => {
  try {
    const { name } = req.body;
    const userData = { name };
    const user = await saveNewUser(userData);
    if (user) {
      return respondSuccess(res, httpStatus.OK, generalConstants.SAVE_USER, generalConstants.USER_SAVE_SUCCESS, user);
    } else {
      return respondError(res, httpStatus.NOT_FOUND, generalConstants.SAVE_USER, generalConstants.USER_SAVE_FAILURE);
    }
  } catch (err) {
    next(err);
  }
};

module.exports = { postSingleUser };
