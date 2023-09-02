const Post = require("../models/post");
const User = require("../models/user");

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
    //console.log(posts);
    const users = await User.find({});
    return res.render("Home", {
      title: "CSLY User Tells!",
      posts: posts,
      allUsers: users,
    });
  } catch (error) {
    console.error("An error occurred:", error);
  }

  //console.log(req.cookies);
};
