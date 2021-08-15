const mongoose = require("mongoose");
const { environmentVariables } = require("../config");

const dbMongoConnection = async () => {
  try {
    mongoose.connect(environmentVariables.mongoStringConnection, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log("Mongo Database Connection Succesfully");
  } catch (error) {
    console.log(error);
    throw new Error("Mongo Database Connection Error!");
  }
};

module.exports = { dbMongoConnection };
