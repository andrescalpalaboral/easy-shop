const { response } = require("express");

const isFileInRequest = (req, res = response, next) => {
  if (!req.files || Object.keys(req.files).length === 0 || !req.files.file) {
    return res.status(400).json({ msg: "There is no file(s) to upload." });
  }
  next();
};

module.exports = { isFileInRequest };
