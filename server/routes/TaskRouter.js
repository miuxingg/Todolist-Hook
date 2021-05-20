const express = require("express");
const Route = express.Router();
const {
  getAllTask,
  createOneTask,
  updateOneTask,
  deleteOneTask,
  getUserTasks,
  getWithPagination,
} = require("../controllers/TaskController");
const { verifyToken } = require("../middlewares/verifyToten");

Route.route("/")
  // .get(getAllTask)
  .get(verifyToken, getWithPagination)
  .post(verifyToken, createOneTask)
  .get(verifyToken, getUserTasks);

Route.route("/:taskId")
  .put(verifyToken, updateOneTask)
  .delete(verifyToken, deleteOneTask);

module.exports = Route;
