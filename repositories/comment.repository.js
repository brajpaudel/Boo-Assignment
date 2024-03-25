const commentModule = require('../models/comment');

const findCommentForProfile = async (profileId, searchParams) => {
  try {
    const page = searchParams.page ? parseInt(searchParams.page) : 1;
    const size = searchParams.size ? parseInt(searchParams.size) : 10;
    let searchQuery = { profileId: profileId };
    let sortQuery = {};
    if (searchParams.sort == 'recent' || searchParams.sort == 'Recent') {
      sortQuery = { _id: -1 };
    } else if (searchParams.sort == 'best' || searchParams.sort == 'Best') {
      sortQuery = { ...sortQuery, likeCount: -1 };
    }
    if (searchParams && searchParams.mbti) {
      searchQuery = { ...searchQuery, mbti: searchParams.mbti };
    }
    if (searchParams && searchParams.enneagram) {
      searchQuery = { ...searchQuery, enneagram: searchParams.enneagram };
    }
    if (searchParams && searchParams.zodiac) {
      searchQuery = { ...searchQuery, zodiac: searchParams.zodiac };
    }
    const totalData = await commentModule.countDocuments(searchQuery);
    let comments = await commentModule
      .find(searchQuery)
      .select({ userId: 1, title: 1, description: 1, mbti: 1, enneagram: 1, zodiac: 1, likeCount: 1 })
      .populate([{ path: 'userId', select: { name: 1, image: 1, _id: 0 } }])
      .sort(sortQuery)
      .skip(parseInt(page - 1) * parseInt(size))
      .limit(parseInt(size));
    if (totalData > 0) {
      return {
        query: {
          searchParams,
          totalData,
          page: page,
          size: size,
        },
        data: comments,
      };
    }
  } catch (err) {
    throw err;
  }
};

const saveNewComment = async (commentData) => {
  try {
    const savedComment = await commentModule.create(commentData);
    if (savedComment && savedComment._id) {
      return {
        data: savedComment,
      };
    }
  } catch (err) {
    throw err;
  }
};

const likeUnlikeComment = async (commentId, likeCount) => {
  try {
    if (commentId && (likeCount == 1 || likeCount == -1)) {
      let updatedData = await commentModule.findByIdAndUpdate(
        commentId,
        {
          $inc: { likeCount: likeCount },
        },
        { new: true },
      );
      if (updatedData && updatedData._id) {
        return {
          data: updatedData,
        };
      }
    }
  } catch (err) {
    throw err;
  }
};

module.exports = { findCommentForProfile, saveNewComment, likeUnlikeComment };
