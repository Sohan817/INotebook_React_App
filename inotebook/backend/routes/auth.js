const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchUser = require("../middleware/fetchuser");

const JWT_SECRET = "sohan";

//Route 1:Create a user usigg:POST "/api/auth/createuser" . No login required
router.post(
  "/createuser",
  [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Pasword must be 5 characters").isLength({ min: 5 }),
  ],
  async (req, res) => {
    let success = false;
    //If there are errors return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }
    //check whether the user with this email exits already
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ success, errors: "Sorry! Email already exists" });
      }
      const salt = bcrypt.genSaltSync(10);
      const secretPassword = bcrypt.hashSync(req.body.password, salt);
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secretPassword,
      });
      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET);

      // res.json(user);
      success = true;
      return res.json({ success, authToken });
    } catch (error) {
      console.error(error.message);
      return res.status(500).send("Some error occured");
    }
  }
);

//Route 2: Authenticate a user usigg:POST "/api/auth/login" . No login required
router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Pasword can not be blank").exists(),
  ],
  async (req, res) => {
    let success = false;
    //If there are errors return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        success = false;
        return res
          .status(400)
          .json({ success, error: "Please enter correct email" });
      }
      // @ts-ignore
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        success = false;
        return res.status(400).json({ error: "Please enter correct password" });
      }
      const data = {
        user: {
          // @ts-ignore
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET);
      success = true;
      return res.json({ success, authToken });
    } catch (error) {
      console.error(error.message);
      //return res.status(500).send("Some error occured");
    }
  }
);
//Route 3: Get loggedin user detail using this.post.Login required
router.post("/getuser", fetchUser, async (req, res) => {
  try {
    // @ts-ignore
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    return res.send(user);
  } catch (error) {
    console.error(error.message);
    return res.status(500).send("Some error occured");
  }
});

module.exports = router;
