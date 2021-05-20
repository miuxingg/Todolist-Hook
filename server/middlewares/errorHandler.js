exports.errorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;

  //Trung ten
  if (err.code === 11000) {
    for (let x in err.keyValue) {
      err.message = `${x} have to be unique`;
    }
  }

  //Sai ID
  if (err.kind === "ObjectId") {
    err.message = `${err.value} is wrong`;
  }

  //Validation
  if (err.errors) {
    err.statusCode = 400;
    err.message = [];
    for (let x in err.errors) {
      err.message.push(err.errors[x].properties.message);
    }
  }

  res.status(err.statusCode).json({
    status: "fail",
    message: err.message,
  });
};
