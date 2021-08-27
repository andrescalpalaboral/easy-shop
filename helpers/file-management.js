const path = require("path");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

const allowedEXtensions = ["jpg", "jpeg", "png", "gif"];

const removeFile = (pathImage = "") => {
  if (fs.existsSync(pathImage)) {
    fs.unlinkSync(pathImage);
  }
};

const uploadFile = (files, folder = "") => {
  return new Promise((resolve, reject) => {
    const { file } = files;

    const fileNameSplit = file.name.split(".");
    const extensionFile = fileNameSplit[fileNameSplit.length - 1];

    if (!allowedEXtensions.includes(extensionFile)) {
      reject(`File extension ${extensionFile} is not allowed`);
    }

    const fileName = `${uuidv4()}.${extensionFile}`;

    const uploadPath = path.join(__dirname, "../uploads/", folder, fileName);

    file.mv(uploadPath, function (err) {
      if (err) {
        console.log(err);
        reject(err);
      }

      resolve(fileName);
    });
  });
};

module.exports = { removeFile, uploadFile };
