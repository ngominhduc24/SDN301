const bodyParser = require('body-parser');
const express = require('express');
const CategoryController = require('../controllers/category.controller'); // Assuming you have a category controller

const categoryRouter = express.Router();
categoryRouter.use(bodyParser.json());

categoryRouter.post('/', CategoryController.create);
categoryRouter.get('/', CategoryController.getAll);
categoryRouter.get('/:id', CategoryController.getById);
categoryRouter.put('/:id', CategoryController.update);

module.exports = categoryRouter;
