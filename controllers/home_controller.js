const Post = require("../models/post");

module.exports.home = async (req, res) => {
  try {
    const posts = await Post.find({})
      .populate("user")
      .populate({
        path: "comments",
        populate: {
          path: "user",
        },
      })

      .exec();
    console.log(posts);
    return res.render("Home", {
      title: "CSLY User Tells!",
      posts: posts,
    });
  } catch (error) {
    console.error("An error occurred:", error);
  }

  //console.log(req.cookies);
};

