const { Route } = require("express");
const express = require("express");
const Router = express.Router();

const usersControllers = require("../controllers/users");

Router.post("/auth", usersControllers.loginUser);

module.exports = Router;
