const { response } = require("express");
const ProductSchema = require("../models/product");

const createProduct = async (req, res = response) => {
  const { status, user, name, ...body } = req.body;
  const nameUpper = name.toUpperCase();
  const productFound = await ProductSchema.findOne({ name: nameUpper });

  if (productFound) {
    res.status(400).json({
      msg: `The product whit name ${name} already exists`,
    });
  }

  const data = {
    ...body,
    name: nameUpper,
    user: req.userAuthenticated._id,
  };
  const newProduct = new ProductSchema(data);
  newProduct.save();
  res.status(201).json(newProduct);
};

const getProductById = async (req, res = response) => {
  const { id } = req.params;
  const productFound = await ProductSchema.findById(id)
    .populate("user", "firstName")
    .populate("category", "name");
  res.status(200).json(productFound);
};

const geProductsPaginated = async (req, res = response) => {
  const { limit = 10, page = 0 } = req.query;
  const query = { status: true };

  const [total, products] = await Promise.all([
    ProductSchema.countDocuments(query),
    ProductSchema.find(query)
      .populate("user", "firstName")
      .populate("category", "name")
      .limit(Number(limit))
      .skip(Number(page)),
  ]);

  res.status(200).json({ total, products });
};

const putProduct = async (req, res = response) => {
  const { id } = req.params;
  const { user, status, ...product } = req.body;

  if (product.name) {
    product.name = product.name.toUpperCase();
  }
  product.user = req.userAuthenticated._id;

  const productUpdated = await ProductSchema.findByIdAndUpdate(id, product, {
    new: true,
  }).populate("user", "firstName");
  res.status(200).json(productUpdated);
};

const deleteProduct = async (req, res = responde) => {
  const { id } = req.params;
  const productDeleted = await ProductSchema.findByIdAndUpdate(
    id,
    { status: false },
    { new: true }
  );
  res.status(200).json(productDeleted);
};

module.exports = {
  createProduct,
  deleteProduct,
  getProductById,
  geProductsPaginated,
  putProduct,
};
