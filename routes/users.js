const express = require("express");

const router = express.Router();

const users_controller = require("../controllers/users_controller");

const passport = require("passport");

router.get(
  "/profile/:id",
  passport.checkAuthentication,
  users_controller.profile
);

router.get("/sign-up", users_controller.signUp);
router.get("/sign-in", users_controller.signIn);

router.get("/sign-out", users_controller.destroySession);

router.post("/create", users_controller.create);

//use passport as a middleware for Authenticate
router.post(
  "/create-session",
  passport.authenticate("local", { failureRedirect: "/users/sign-in" }),
  users_controller.createSession
);

module.exports = router;
