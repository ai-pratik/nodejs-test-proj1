const express = require("express");

const router = express.Router();
const PostController = require("../controllers/posts_controller");

const passport = require("passport");

router.post("/create", passport.checkAuthentication, PostController.create);

module.exports = router;
