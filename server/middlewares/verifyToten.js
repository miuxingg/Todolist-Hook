const jwt = require("jsonwebtoken");
exports.verifyToken = (req, res, next) => {
  //Lay
  const Authorization = req.header("authorization");
  if (!Authorization) {
    //Khong ton tai token
    const err = new Error("Unauthorization");
    err.statusCode = 401;
    return next(err);
  }

  //get token
  const token = Authorization.replace("Bearer ", "");
  //Verify token
  const { userId } = jwt.verify(token, process.env.SECRET_KEY);
  req.user = { userId };
  next();
};
