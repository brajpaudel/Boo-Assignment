const { likeUnlikeComment } = require('../repositories/comment.repository');
const { likeAlreadyExists, saveNewLike, deleteLike } = require('../repositories/like.repository');

const postCommentLikeUnlikeService = async (commentId, userId, like) => {
  try {
    //like save
    let alreadyLike = await likeAlreadyExists(commentId, userId);
    if (alreadyLike && !like) {
      const deleteSuccess = await deleteLike(commentId, userId);
      if (deleteSuccess) {
        await likeUnlikeComment(commentId, -1);
        return true;
      }
    }
    if (like && !alreadyLike) {
      const saveSuccess = await saveNewLike(commentId, userId);
      if (saveSuccess) {
        await likeUnlikeComment(commentId, 1);
        return true;
      }
    }
  } catch (err) {
    throw err;
  }
};

module.exports = { postCommentLikeUnlikeService };
