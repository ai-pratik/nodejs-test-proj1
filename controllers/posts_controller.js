const Post = require("../models/post");

module.exports.create = async (req, res) => {
  try {
    const post = await Post.create({
      content: req.body.content,
      user: req.user._id,
    });

    console.log(post);
    return res.redirect("back");
  } catch (error) {
    console.log("Error:", error);
    // You should also handle the error response here
    res.status(500).json({ error: "An error occurred" });
  }
};
