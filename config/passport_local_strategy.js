const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const User = require("../models/user");

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
    },
    async (email, password, done) => {
      //find user and establish identity
      try {
        const user = await User.findOne({ email: email });

        if (!user || user.password !== password) {
          console.log("UserID / Password is Incorrect !");
          return done(null, false);
        } else {
          return done(null, user);
        }
      } catch (err) {
        console.log("Error in Finding User! ", err);
        return done(err);
      }
    }
  )
);

//serialize the key and store in the browesers cookie

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

//deserialize the key and find in the database

passport.deserializeUser(async function (id, done) {
  try {
    const user = await User.findById(id);
    return done(null, user);
  } catch {
    console.log("Error in Finding User! ");
    return done(err);
  }
});

// check if the user is authenticated
passport.checkAuthentication = function (req, res, next) {
  // if the user is signed in, then pass on the request to the next function(controller's action)
  if (req.isAuthenticated()) {
    return next();
  }

  // if the user is not signed in
  return res.redirect("/users/sign-in");
};

passport.setAuthenticatedUser = function (req, res, next) {
  if (req.isAuthenticated()) {
    // req.user contains the current signed in user from the session cookie and we are just sending this to the locals for the views
    res.locals.user = req.user;
  }

  next();
};

module.exports = passport;
