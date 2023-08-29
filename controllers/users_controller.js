const User = require("../models/user");

module.exports.user = (req, res) => {
  return res.render("users", {
    title: "Hi this is Users Section!!!",
  });
};

module.exports.signUp = (req, res) => {
  if (req.isAuthenticated()) {
    return res.redirect("/users/profile");
  }
  return res.render("user_sign_up", {
    title: "CSLY | Sign UP",
  });
};

module.exports.signIn = (req, res) => {
  if (req.isAuthenticated()) {
    return res.redirect("/users/profile");
  }
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

module.exports.createSession = (req, res) => {
  //create session for the user
  return res.redirect("/");
};

//logout controller
module.exports.destroySession = (req, res) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
};
