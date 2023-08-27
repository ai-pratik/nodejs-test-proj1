const User = require("../models/user");

module.exports.user = async (req, res) => {
  if (req.cookies.user_id) {
    try {
      const user = await User.findById(req.cookies.user_id);
      if (user) {
        return res.render("user_profile", {
          title: "User Profile",
          user: user,
        });
      }
    } catch (e) {
      return res.status(500).send("Internal Server Error!!");
    }
  } else {
    return res.redirect("/users/sign-in");
  }
};

module.exports.signUp = (req, res) => {
  return res.render("user_sign_up", {
    title: "CSLY | Sign UP",
  });
};

module.exports.signIn = (req, res) => {
  return res.render("user_sign_in", {
    title: "CSLY | Sign In",
  });
};

module.exports.create = (req, res) => {
  if (req.body.password !== req.body.confirm_password) {
    return res.redirect("back");
  }

  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return User.create(req.body);
      } else {
        return Promise.reject("User already exists"); // You can customize the error message if needed
      }
    })
    .then((user) => {
      return res.redirect("/users/sign-in");
    })
    .catch((err) => {
      console.log("Error:", err);
      return res.redirect("back");
    });
};

module.exports.createSession = async (req, res) => {
  //find the user
  console.log("In session");
  try {
    const user = await User.findOne({ email: req.body.email });
    //handle user not find
    if (!user) {
      return res.redirect("back");
    } else {
      //password does not match
      if (user.password !== req.body.password) {
        return res.redirect("back");
      }
      //create session and cookie
      res.cookie("user_id", user.id);
      return res.redirect("/users/profile");
    }
  } catch (err) {
    //DB does not find
    console.log("Error in Fetching the user from DB", err);
    return res.status(500).send("Internal Server Error!!");
  }
};
