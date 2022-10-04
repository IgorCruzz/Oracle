"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _repositories = require('../../database/repositories');

 class CreateCategoryService {
  async execute({ name }) {
    const repository = new (0, _repositories.CategoryRepository)();

    const verifyCategoryExists = await repository.findCategory({
      name,
    });

    if (verifyCategoryExists)
      return { error: 'Já existe uma Categoria registrada com este nome.' };

    const category = await repository.createCategory({ name });

    return {
      message: 'Categoria registrada com sucesso!',
      category: category.dataValues,
    };
  }
} exports.CreateCategoryService = CreateCategoryService;
