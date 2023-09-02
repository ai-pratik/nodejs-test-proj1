const express = require("express");

const router = express.Router();
const PostController = require("../controllers/posts_controller");

const passport = require("passport");

router.post("/create", passport.checkAuthentication, PostController.create);

router.get(
  "/destroy/:id",
  passport.checkAuthentication,
  PostController.destroy
);

module.exports = router;
