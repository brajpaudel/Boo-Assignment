const profileModule = require('../models/profile');

const saveNewProfile = async (profileData) => {
  try {
    const savedProfile = await profileModule.create(profileData);
    if (savedProfile && savedProfile._id) {
      return {
        data: savedProfile,
      };
    }
  } catch (err) {
    throw err;
  }
};

const findSingleProfile = async (profileId) => {
  try {
    const profileData = await profileModule.findOne({ id: profileId }).select({ name: 1, image: 1, category: 1, description: 1, mbti: 1, enneagram: 1, tritype: 1, socionics: 1, psyche: 1, sloan: 1, variant: 1, temperaments: 1 });
    if (profileData && profileData._id) {
      return {
        data: profileData,
      };
    }
  } catch (err) {
    throw err;
  }
};

module.exports = { saveNewProfile, findSingleProfile };
