const { create } = require("../models/Task");
const Task = require("../models/Task");

// GET all task
exports.getAllTask = async (req, res, next) => {
  try {
    const tasks = await Task.find({}).populate("author");
    res.status(200).json({
      status: "Success",
      length: tasks.length,
      data: { tasks },
    });
  } catch (error) {
    res.json({
      message: error,
    });
  }
};

// [POST] create one task
exports.createOneTask = async (req, res, next) => {
  try {
    const { userId } = req.user;
    const task = await Task.create({ ...req.body, author: userId });
    res.status(200).json({
      status: "success",
      data: task,
    });
  } catch (error) {
    next(error);
  }
};

//[PUT] update one task
exports.updateOneTask = async (req, res, next) => {
  try {
    const { taskId } = req.params;
    const post = await Task.findByIdAndUpdate(taskId, { ...req.body });
    res.status(200).json({
      status: "success",
      data: { post },
    });
  } catch (error) {
    next(error);
  }
};

//  [DELETE] delete one task
exports.deleteOneTask = async (req, res, next) => {
  try {
    const { taskId } = req.params;
    const task = await Task.findByIdAndDelete(taskId);
    res.status(200).json({
      status: "success",
      data: { task },
    });
  } catch (error) {
    next(error);
  }
};

// [GET] get all user tasks
exports.getUserTasks = async (req, res, next) => {
  try {
    const { userId } = req.user;
    const task = await Task.find({ author: userId });
    res.status(200).json({
      status: "success",
      data: task,
    });
  } catch (error) {
    res.status(400).json({
      status: "Error",
      message: error,
    });
  }
};

exports.getWithPagination = async (req, res, next) => {
  try {
    const { userId } = req.user;
    const { page, limit } = req.query;
    const task = await Task.find({ author: userId })
      .sort({ _id: -1 })
      .limit(Number(limit))
      .skip((Number(page) - 1) * Number(limit));
    const totalRow = await Task.count({ author: userId });
    res.status(200).json({
      length: totalRow,
      status: "success",
      data: task,
    });
  } catch (error) {
    next(error);
  }
};
