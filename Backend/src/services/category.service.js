const Category = require('../models/category');

async function createCategory(data) {
  const category = new Category(data);
  return await category.save();
}

async function getAllCategories() {
  return await Category.find();
}

async function getCategoryById(id) {
  return await Category.findById(id);
}

async function updateCategory(id, data) {
  return await Category.findByIdAndUpdate(id, data, { new: true, runValidators: true });
}

module.exports = {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
};
