const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const port = 8040;
const expressLayout = require("express-ejs-layouts");

const db = require("./config/mongoose");

//used for session cookie
const session = require("express-session");
const passport = require("passport");
const passportLocal = require("./config/passport_local_strategy");

const MongoStore = require("connect-mongo");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

//for using assets
app.use(express.static("./assets"));

app.use(expressLayout);

//extract style and script
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

//set up the View Engine
app.set("view engine", "ejs");
app.set("views", "./views");

app.use(
  session({
    name: "csly",
    //we have to change the secret when deployment to prod
    secret: "HabibiComeToDubai",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 100,
    },
    //mongostore is use to store the mongodb session in db
    store: MongoStore.create({
      client: db.getClient(),
      autoRemove: "disabled",
    }),
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

//Use Express Router
app.use("/", require("./routes"));

app.listen(port, function (err) {
  if (err) {
    console.log(err);
    return;
  }
  console.log(`Server Started With Success for port ${port}`);
});
