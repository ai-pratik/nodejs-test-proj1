const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/csly_development");

const db = mongoose.connection;

db.on("error", console.error.bind(console, "Error Connecting to DB"));

//if DB is Connected Succesfully
db.once("open", () => {
  console.log("Connection to Db is Succesfull");
});
