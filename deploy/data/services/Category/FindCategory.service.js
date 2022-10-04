"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _repositories = require('../../database/repositories');

 class FindCategoryService {
  async execute({ id }) {
    const repository = new (0, _repositories.CategoryRepository)();

    const findCategory = await repository.findCategoryById({
      id,
    });

    if (!findCategory)
      return { error: `Não existe uma Categoria com este ID -> ${id}.` };

    return {
      category: findCategory,
    };
  }
} exports.FindCategoryService = FindCategoryService;
