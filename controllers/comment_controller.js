const Comment = require("../models/comment");
const Post = require("../models/post");

module.exports.create = async (req, res) => {
  try {
    const post = await Post.findById(req.body.post);
    if (!post) {
      return res.status(404).send("Post not found");
    }

    try {
      const comment = await Comment.create({
        content: req.body.content,
        user: req.user._id,
        post: req.body.post,
      });

      post.comments.push(comment);
      await post.save();

      return res.redirect("/");
    } catch (error) {
      return res.status(500).send("Error creating comment");
    }
  } catch (e) {
    return res.status(500).send("Error finding post");
  }
};

module.exports.destroy = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) {
      return res.status(500).send("Error finding the comment in DB");
    }
    if (comment.user == req.user.id) {
      const postId = comment.post;

      comment.deleteOne();

      const post = await Post.findByIdAndUpdate(postId, {
        $pull: { comments: req.params.id },
      });
      return res.redirect("back");
    }
  } catch (e) {
    return res.status(500).send("Error finding post");
  }
};
