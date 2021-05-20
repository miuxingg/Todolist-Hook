require("dotenv").config();

const express = require("express");
const app = express();
const port = process.env.APP_PORT;
const cors = require("cors");
const { errorHandler } = require("./middlewares/errorHandler");

app.use(cors());

//Body parser  => chuyen doi thong so nguoi dung de noi chuyen voi server
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

//Connect DB
const { connect } = require("./config/db");
connect();

//Routes
const AuthRoute = require("./routes/AuthRouter");
const TaskRoute = require("./routes/TaskRouter");
app.use("/api/v1/auth", AuthRoute);
app.use("/api/v1/task", TaskRoute);

//Xu li loi
app.all("*", (req, res, next) => {
  const err = new Error("Page is not found");
  err.statusCode = 404;
  next(err);
});
app.use(errorHandler);
app.listen(port, () => {
  console.log("Running port ", port);
});
