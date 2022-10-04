"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _repositories = require('../../database/repositories');

 class FindCategoriesService {
  async execute({ page, limit, nm_category }) {
    const repository = new (0, _repositories.CategoryRepository)();

    const findCategories = await repository.findCategories({
      limit,
      page,
      nm_category,
    });

    if (findCategories.length === 0)
      return { error: 'Não há nenhuma Categoria registrada.' };

    return {
      categories: findCategories,
    };
  }
} exports.FindCategoriesService = FindCategoriesService;
