const Post = require("../models/post");
const Comment = require("../models/comment");

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

// module.exports.destroy = async (req, res) => {
//   try {
//     const post = await Post.findById(req.params.id);
//     if (!post) {
//       return res.redirect("back");
//     }

//     // console.log(post.user.toString());
//     // console.log(req.user.id);

//     //_id object is converted into string as id

//     if (post.user.toString() == req.user.id) {
//       await post.remove();

//       try {
//         const comments = await Comment.deleteMany({ post: req.params.id });
//       } catch (error) {
//         return res.redirect("back");
//       }
//     }
//   } catch (error) {
//     res.status(500).json({ error: "An error occurred" });
//   }
// };

module.exports.destroy = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.redirect("back");
    }

    //_id object is converted into string as id

    if (post.user == req.user.id) {
      post.deleteOne();

      try {
        const comments = await Comment.deleteMany({ post: req.params.id });
        return res.redirect("back");
      } catch (error) {
        res
          .status(500)
          .json({ error: "while deleting the comments associated posts" });
      }
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
