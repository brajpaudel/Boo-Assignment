const userModule = require('../models/user');

const saveNewUser = async (userData) => {
  try {
    const savedUser = await userModule.create(userData);
    if (savedUser && savedUser._id) {
      return {
        data: savedUser,
      };
    }
  } catch (err) {
    throw err;
  }
};

module.exports = { saveNewUser };
