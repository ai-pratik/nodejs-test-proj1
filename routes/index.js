const express = require("express");
const router = express.Router();

const HomeController = require("../controllers/home_controller");
// console.log("Router is Running..");
router.get("/", HomeController.home);
router.use("/users", require("./users"));

router.use("/posts", require("./posts"));

router.use("/comments", require("./comments"));

module.exports = router;
