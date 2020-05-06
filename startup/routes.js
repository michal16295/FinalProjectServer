const users = require("../routes/user");
const express = require("express");

module.exports = (app) => {
  app.use(express.json());
  app.use("/users", users);
};
