const categoryService = require('../services/category.service');

// Create a new category
async function create(req, res, next) {
  try {
    const categoryData = {
      name: req.body.name,
      description: req.body.description,
      status: req.body.status,
    };
    const newCategory = await categoryService.createCategory(categoryData);
    res.status(201).json(newCategory);
  } catch (error) {
    next(error);
  }
}

// Get all categories
async function getAll(req, res, next) {
  try {
    const categories = await categoryService.getAllCategories();
    res.status(200).send(categories);
  } catch (error) {
    next(error);
  }
}

// Get category by ID
async function getById(req, res, next) {
  try {
    const category = await categoryService.getCategoryById(req.params.id);
    if (!category) {
      return res.status(404).send({ message: 'Category not found' });
    }
    res.status(200).send(category);
  } catch (error) {
    next(error);
  }
}

// Update category by ID
async function update(req, res, next) {
  try {
    const updateCategoryData = {
      name: req.body.name,
      description: req.body.description,
      status: req.body.status,
    };
    const category = await categoryService.updateCategory(req.params.id, updateCategoryData);
    if (!category) {
      return res.status(404).send({ message: 'Category not found' });
    }
    res.status(200).send(category);
  } catch (error) {
    next(error);
  }
}

const categoryController = { create, getAll, getById, update };
module.exports = categoryController;
