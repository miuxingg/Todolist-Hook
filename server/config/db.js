const mongoose = require("mongoose");

const connect = async () => {
  try {
    mongoose.connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database connect success");
  } catch (error) {
    console.log(error);
  }
};

module.exports = { connect };
