const likeModule = require('../models/like');

const saveNewLike = async (commentId, userId) => {
  try {
    const likeDataSave = await likeModule.create({ commentId, userId });
    if (likeDataSave) {
      return true;
    }
  } catch (err) {
    throw err;
  }
};

const likeAlreadyExists = async (commentId, userId) => {
  try {
    const likeData = await likeModule.countDocuments({ commentId, userId });
    if (likeData) {
      return likeData;
    }
  } catch (err) {
    throw err;
  }
};

const deleteLike = async (commentId, userId) => {
  try {
    const likeDataDelete = await likeModule.deleteMany({ commentId, userId });
    if (likeDataDelete) {
      return true;
    }
  } catch (err) {
    throw err;
  }
};

module.exports = { saveNewLike, deleteLike, likeAlreadyExists };
