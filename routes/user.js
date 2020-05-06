const express = require("express");
const router = express.Router();
const { User } = require("../models/user");
const bcrypt = require("bcrypt");
const valid = require("../validators/user");
const jwtDecode = require("jwt-decode");
const auth = require("../middlewares/auth");

//Manual Registretion
router.post("/register", async (req, res) => {
  let { errors } = valid.validateNewUser(req.body);
  if (errors) {
    return res.status(c.SERVER_BAD_REQUEST_HTTP_CODE).json(errors);
  }
  let email = await User.findOne({ email: req.body.email });
  let userName = await User.findOne({ userName: req.body.userName });
  if (email || userName) {
    errors = c.USER_ALREADY_EXISTS;
    return res.status(c.SERVER_BAD_REQUEST_HTTP_CODE).json(errors);
  }
  const salt = await bcrypt.genSalt(10);
  const newPassword = await bcrypt.hash(req.body.password, salt);
  user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: newPassword,
    userName: req.body.userName,
  });
  await user.save();
  const token = user.generateAuthToken();
  res
    .header("x-auth-token", token)
    .header("access-control-expose-headers", "x-auth-token")
    .send(user);
});
module.exports = router;
