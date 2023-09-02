const express = require("express");

const router = express.Router();
const CommentController = require("../controllers/comment_controller");

const passport = require("passport");

router.post("/create", passport.checkAuthentication, CommentController.create);

module.exports = router;
