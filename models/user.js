const mongoose = require("mongoose");
const { Schema } = mongoose;
const jwt = require("jsonwebtoken");
const config = require("../config/keys");

const userSchema = new Schema({
  email: String,
  firstName: String,
  lastName: String,
  password: String,
  userName: {
    type: String,
    unique: true,
  },
  level: {
    type: Array,
  },
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id, userName: this.userName, avatar: this.avatar },
    config.cookieKey
  );
  return token;
};

const User = mongoose.model("User", userSchema);
exports.User = User;
