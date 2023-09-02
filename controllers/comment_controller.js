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
