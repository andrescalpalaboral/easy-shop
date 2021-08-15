const CategorySchema = require("../models/category");
const ProductSchema = require("../models/product");

const categoryAlreadyExists = async (id) => {
  const categoryFound = await CategorySchema.findById(id);
  if (!categoryFound) {
    throw new Error(`Category with id: ${id} not found`);
  }
};

const categoryIsActive = async (id) => {
  const categoryFound = await CategorySchema.findById(id);
  if (categoryFound && !categoryFound.status) {
    throw new Error(`Category with id ${id} not found`);
  }
};

const productAlreadyExists = async (id) => {
  const productFound = await ProductSchema.findById(id);
  if (!productFound) {
    throw new Error(`Product with id: ${id} not found`);
  }
};

const productIsActive = async (id) => {
  const productFound = await ProductSchema.findById(id);
  if (productFound && !productFound.status) {
    throw new Error(`Product with id ${id} not found`);
  }
};

module.exports = {
  categoryAlreadyExists,
  categoryIsActive,
  productAlreadyExists,
  productIsActive,
};
