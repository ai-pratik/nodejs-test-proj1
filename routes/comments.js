const express = require("express");

const router = express.Router();
const CommentController = require("../controllers/comment_controller");

const passport = require("passport");

router.post("/create", passport.checkAuthentication, CommentController.create);

router.get(
  "/destroy/:id",
  passport.checkAuthentication,
  CommentController.destroy
);

module.exports = router;
