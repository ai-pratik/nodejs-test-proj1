module.exports.home = (req, res) => {
  console.log(req.cookies);
  res.cookie("user_id", 9975778911);
  return res.render("Home", {
    title: "88888800",
  });
};
