const httpStatus = require('http-status');
const generalConstants = require('../constants/generalConstants').EN;
const { respondError, respondSuccess } = require('../helpers/responseHelper');
const { findSingleProfile, saveNewProfile } = require('../repositories/profile.repository');

const postSingleProfile = async (req, res, next) => {
  try {
    const { name, category, title, description, mbti, enneagram, tritype, socionics, psyche, sloan, variant, temperaments } = req.body;
    const profileData = { name, category, title, description, mbti, enneagram, tritype, socionics, psyche, sloan, variant, temperaments };
    const profile = await saveNewProfile(profileData);
    if (profile) {
      return respondSuccess(res, httpStatus.OK, generalConstants.SAVE_PROFILE, generalConstants.PROFILE_SAVE_SUCCESS, profile);
    } else {
      return respondError(res, httpStatus.NOT_FOUND, generalConstants.SAVE_PROFILE, generalConstants.PROFILE_SAVE_FAILURE);
    }
  } catch (err) {
    next(err);
  }
};

const getSingleProfile = async (req, res, next) => {
  try {
    const profileId = req.params.profileId;
    const profileData = await findSingleProfile(profileId);
    if (profileData && profileData.data) {
      res.render('profile_template', {
        profile: profileData.data,
      });
      // return respondSuccess(res, httpStatus.OK, generalConstants.GET_PROFILE, generalConstants.PROFILE_FETCH_SUCCESS, profileData);
    } else {
      return respondError(res, httpStatus.NOT_FOUND, generalConstants.GET_PROFILE, generalConstants.PROFILE_NOT_FOUND);
    }
  } catch (err) {
    next(err);
  }
};

module.exports = { postSingleProfile, getSingleProfile };
