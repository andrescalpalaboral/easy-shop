require("dotenv").config();

const environmentVariables = {
  jwt_secret_key: process.env.JWT_SECRET_KEY,
  port: process.env.PORT,
  mongoStringConnection: process.env.MONGO_CONNECTION_STRING,
};

module.exports = { environmentVariables };
