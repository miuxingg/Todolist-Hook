const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Username must be require"],
    },
    email: {
      type: String,
      trim: true,
      unique: true,
      required: [true, "Email must be require"],
    },
    password: {
      type: String,
      trim: true,
      required: [true, "Password must be require"],
      minlength: [6, "Password must be at 6 character"],
    },
  },
  { timestamps: true }
);

userSchema.pre("save", function (next) {
  let user = this;
  bcrypt.hash(user.password, 10, function (error, hash) {
    if (error) {
      return next(error);
    } else {
      user.password = hash;
      next();
    }
  });
});

const User = mongoose.model("users", userSchema);
module.exports = User;
