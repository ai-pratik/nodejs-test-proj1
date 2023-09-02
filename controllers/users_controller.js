const User = require("../models/user");

module.exports.profile = async (req, res) => {
  try {
    // Use async/await to ensure that the query completes before proceeding
    const puser = await User.findById(req.params.id);

    if (puser) {
      console.log("the username is", puser.name);
      return res.render("user_profile", {
        title: "Hi this is Users Section!!!",
        profile_user: puser,
      });
    } else {
      // Handle the case where the user is not found
      return res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    // Handle errors, such as database connection issues or other unexpected errors
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
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
