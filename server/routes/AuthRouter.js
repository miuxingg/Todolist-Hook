const express = require("express");
const Route = express.Router();

const { register, login, getCurrentUser } = require("../controllers/AuthController");
const {checkCurrentUser} = require("../middlewares/checkCurrentUser");

Route.route("/register").post(register);
Route.route("/login").post(login);
Route.route("/").get(checkCurrentUser, getCurrentUser);

module.exports = Route;
