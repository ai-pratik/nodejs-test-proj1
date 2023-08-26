const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const port = 8040;
const expressLayout = require("express-ejs-layouts");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
const cslydb = require("./config/mongoose");
//for using assets
app.use(express.static("./assets"));

app.use(expressLayout);

//extract style and script
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

//Use Express Router
app.use("/", require("./routes"));

app.set("view engine", "ejs");
app.set("views", "./views");

app.listen(port, function (err) {
  if (err) {
    console.log(err);
    return;
  }
  console.log(`Server Started With Success for port ${port}`);
});
