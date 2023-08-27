const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const User = require("../models/user");

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
    },
    async (email, password, done) => {
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

passport.deserializeUser(function (id, done) {
  try {
    const user = User.findById(id);
    return done(null, user);
  } catch {
    console.log("Error in Finding User! ");
    return done(err);
  }
});

//check if the user is authenticated
passport.checkAuthentication = (req, res, next) => {
  //if the user is signed in then pass on the request on next function
  if (req.isAuthenticated()) {
    return next();
  }
  //if the user is not signed in
  return res.redirect("/users/sign-in");
};

passport.setAuthenticatedUser = (req, res, next) => {
  if (req.isAuthenticated()) {
    //req.user contains the current signed in cookie info we are just sending it to  the locals for the view

    res.locals.user = res.user;
  }
  next();
};
module.exports = passport;
