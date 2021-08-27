const path = require("path");
const cloudinary = require("cloudinary").v2;
const { response } = require("express");
const { removeFile, uploadFile } = require("../helpers/file-management");
const ProductSchema = require("../models/product");
const UserSchema = require("../models/user");

const getImage = async (req, res = response) => {
  const { id, collection } = req.params;
  let model;
  switch (collection) {
    case "users":
      model = await UserSchema.findById(id);
      if (!model) {
        res.status(400).json({
          msg: `User with id ${id} not found`,
        });
      }
      break;
    case "products":
      model = await ProductSchema.findById(id);
      if (!model) {
        res.status(400).json({
          msg: `Product with id ${id} not found`,
        });
      }
      break;
    default:
      res.status(500).json({
        msg: "Internal server error",
      });
  }
  if (model.image) {
    const pathImage = path.join(
      __dirname,
      "../uploads/",
      collection,
      model.image
    );
    res.sendFile(pathImage);
  }

  const pathImageNotFound = path.join(
    __dirname,
    "../assets/image-not-found.png"
  );

  res.sendFile(pathImageNotFound);
};

const updateImageLocal = async (req, res = response) => {
  const { id, collection } = req.params;
  let model;
  switch (collection) {
    case "users":
      model = await UserSchema.findById(id);
      if (!model) {
        res.status(400).json({
          msg: `User with id ${id} not found`,
        });
      }
      break;
    case "products":
      model = await ProductSchema.findById(id);
      if (!model) {
        res.status(400).json({
          msg: `Product with id ${id} not found`,
        });
      }
      break;
    default:
      res.status(500).json({
        msg: "Internal server error",
      });
  }
  if (model.image) {
    const pathImage = path.join(
      __dirname,
      "../uploads/",
      collection,
      model.image
    );
    removeFile(pathImage);
  }
  const fileName = await uploadFile(req.files, collection);
  model.image = fileName;
  await model.save();
  res.status(200).json(model);
};

const updateImageCloudinary = async (req, res = response) => {
  const { id, collection } = req.params;
  let model;
  switch (collection) {
    case "users":
      model = await UserSchema.findById(id);
      if (!model) {
        res.status(400).json({
          msg: `User with id ${id} not found`,
        });
      }
      break;
    case "products":
      model = await ProductSchema.findById(id);
      if (!model) {
        res.status(400).json({
          msg: `Product with id ${id} not found`,
        });
      }
      break;
    default:
      res.status(500).json({
        msg: "Internal server error",
      });
  }
  if (model.image) {
    // TO-DO delete remote image
    const nameArray = model.image.split("/");
    const fileName = nameArray[nameArray.length - 1];
    const [public_id] = fileName.split(".");
    cloudinary.uploader.destroy(public_id);
  }
  const { tempFilePath } = req.files.file;

  const { secure_url } = await cloudinary.uploader.upload(tempFilePath);

  model.image = secure_url;
  await model.save();
  res.status(200).json(model);
};

const uploadFiles = async (req, res = response) => {
  try {
    const fileName = await uploadFile(req.files);
    res.status(200).json({ fileName });
  } catch (error) {
    res.status(400).json({ msg: error });
  }
};

module.exports = {
  getImage,
  updateImage: updateImageLocal,
  updateImageCloudinary,
  uploadFiles,
};
