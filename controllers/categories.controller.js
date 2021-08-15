const { response } = require("express");
const CategorySchema = require("../models/category");

const createCategory = async (req, res = response) => {
  const name = req.body.name.toUpperCase();
  const categoryFound = await CategorySchema.findOne({ name });

  if (categoryFound) {
    res.status(400).json({
      msg: `The category with name ${name} already exists`,
    });
  }

  const data = { name, user: req.userAuthenticated._id };
  const newCategory = new CategorySchema(data);
  newCategory.save();
  res.status(201).json(newCategory);
};

const getCategoryById = async (req, res = response) => {
  const { id } = req.params;
  const categoryFound = await CategorySchema.findById(id).populate(
    "user",
    "firstName"
  );
  res.status(200).json(categoryFound);
};

const getCategoriesPaginated = async (req, res = response) => {
  const { limit = 10, page = 0 } = req.query;
  const query = { status: true };

  const [total, categories] = await Promise.all([
    CategorySchema.countDocuments(query),
    CategorySchema.find(query)
      .populate("user", "firstName")
      .limit(Number(limit))
      .skip(Number(page)),
  ]);

  res.status(200).json({ total, categories });
};

const putCategory = async (req, res = response) => {
  const { id } = req.params;
  const { user, status, ...category } = req.body;

  category.name = category.name.toUpperCase();
  category.user = req.userAuthenticated._id;

  const categoryUpdated = await CategorySchema.findByIdAndUpdate(id, category, {
    new: true,
  }).populate("user", "firstName");
  res.status(200).json(categoryUpdated);
};

const deleteCategory = async (req, res = responde) => {
  const { id } = req.params;
  const categoryDeleted = await CategorySchema.findByIdAndUpdate(
    id,
    { status: false },
    { new: true }
  );
  res.status(200).json(categoryDeleted);
};

module.exports = {
  createCategory,
  deleteCategory,
  getCategoryById,
  getCategoriesPaginated,
  putCategory,
};
