const { response } = require("express");
const { ObjectId } = require("mongoose").Types;
const { User, Category, Product } = require("../models");

const allowCollections = ["categories", "products", "users"];

const searchCategories = async (value = "", res = response) => {
  const isMongoId = ObjectId.isValid(value);

  if (isMongoId) {
    const categoryFound = await Category.findById(value).populate(
      "user",
      "name"
    );
    res.status(200).json({
      results: categoryFound ? [categoryFound] : [],
    });
  }

  const regex = new RegExp(value, "i");
  const categoriesFound = await Category.find({
    name: regex,
    status: true,
  }).populate("user", "name");

  res.status(200).json({ results: categoriesFound });
};

const searchProducts = async (value = "", res = response) => {
  const isMongoId = ObjectId.isValid(value);

  if (isMongoId) {
    const productFound = await Product.findById(value).populate(
      "category",
      "name"
    );
    res.status(200).json({
      results: productFound ? [productFound] : [],
    });
  }

  const regex = new RegExp(value, "i");
  const productsFound = await Product.find({ name: regex, status: true });

  res.status(200).json({ results: productsFound });
};

const searchUsers = async (value = "", res = response) => {
  const isMongoId = ObjectId.isValid(value);

  if (isMongoId) {
    const userFound = await User.findById(value);
    res.json({
      results: userFound ? [userFound] : [],
    });
  }

  const regex = new RegExp(value, "i");

  const usersFound = await User.find({
    $or: [{ firstName: regex }, { lastName: regex }, { email: regex }],
    $and: [{ status: true }],
  });

  res.status(200).json({ results: usersFound });
};

const customSearch = async (req, res = response) => {
  const { collection, value } = req.params;

  if (!allowCollections.includes(collection)) {
    res.status(400).json({
      msg: `The ${collection} collection is not allowed`,
    });
  }
  switch (collection) {
    case "categories":
      searchCategories(value, res);
      break;
    case "products":
      searchProducts(value, res);
      break;
    case "users":
      searchUsers(value, res);
      break;
    default:
      res.status(500).json({
        msg: "Internal server error",
      });
  }
};

module.exports = { customSearch };
