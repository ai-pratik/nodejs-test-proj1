const express = require("express");
const app = express();
const port = 8030;

//Use Express Router
app.use("/", require("./routes"));

app.listen(port, function (err) {
  if (err) {
    console.log(err);
    return;
  }
  console.log(`Server Started With Success for port ${port}`);
});
