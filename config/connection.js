const mongoose = require("mongoose");

const env = process.env.NODE_ENV || 'development';
console.log("Running Envirenment ", env);
const env_vars = require('./config')[env];

const connectToDatabase = async () => {
  mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => {
      console.log(`MongoDB Connected ${process.env.MONGODB_URL}`);
    })
    .catch((err) => {
      console.log(
        `Error While Connecting Database\n${err}\nRetry Database Connection after 5000ms\n`
      );
      setTimeout(() => {
        connectToDatabase();
      }, 5000);
    });
};

module.exports = connectToDatabase;
