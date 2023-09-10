const express = require("express");
const router = express.Router();
const User = require("../models/User");

//Create a user usigg:POST "/api/auth" . Dosen't require auth
router.post("/", (req, res) => {
  res.send(req.body);
  // @ts-ignore
  const user = User(req.body);
  user.save();
  console.log(req.body);
});
module.exports = router;
